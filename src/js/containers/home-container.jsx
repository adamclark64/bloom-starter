import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';
import BaseCardContract from '../../../build/contracts/BaseCard.json'
import CardLauncherContract from '../../../build/contracts/CardLauncher.json'
import getWeb3 from 'util/getWeb3'
// import Dragons from 'util/dragons.js'

import { cosmicDragon, crimsonDragon, flamingDragon, greenDragon, magicDragon, seaDragon } from 'icons'


import { convertWeiToEth } from 'helpers';
import { getUser } from 'redux-store/actions/userActions';
import { UserType } from 'types';

import SideBar from 'presentation/navigation/side-bar';

import { Button } from 'bloom-forms';
import 'styles/components/home';

const Dragons = [
  {
    "id": 0,
    "picture": cosmicDragon
  },
  {
    "id": 1,
    "picture": crimsonDragon
  },
  {
    "id": 2,
    "picture": flamingDragon
  },
  {
    "id": 3,
    "picture": greenDragon
  },
  {
    "id": 4,
    "picture": magicDragon
  },
  {
    "id": 5,
    "picture": seaDragon
  }
];

class HomeContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      dragons: [],
      cards: [],
      storageValue: 0,
      web3: null,
    }
  }
  static propTypes = {
    history: PropTypes.object,
    getUser: PropTypes.func,
    user: PropTypes.shape(UserType)
  };

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    this.setState({ dragons: Dragons })

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch((err) => {
      console.log('Error finding web3.' ,err)
    })
  }

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id && this.props.user.id) {
      // logged out
      this.props.history.push('/login');
    }

    if (newProps.getUser && !this.props.getUser) {
      try {
        newProps.getUser()
      } catch(err) {
        console.log('get user error: ', err)
      }
    }
  };

  componentDidMount = () => {
    if (this.props.getUser) {
      try {
        this.props.getUser()
      } catch(err) {
        console.log('get user error: ', err)
      }
    }
  };

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const baseCard = contract(BaseCardContract)
    const cardLauncher = contract(CardLauncherContract)
    baseCard.setProvider(this.state.web3.currentProvider)
    cardLauncher.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      cardLauncher.deployed().then(async (instance) => {
        const CardLauncherInstance = instance;

        const BaseCardWallet = await CardLauncherInstance.wallet.call();

        return CardLauncherInstance.getCards.call();
      }).then( async (cards) => {
        var myAddress = 0x0;
        cards.map( async (card, index) => {
          var BaseCardContract = card;
          var BaseCardInstance = await baseCard.at(BaseCardContract);
          var BaseCardName = this.state.web3.toAscii(await BaseCardInstance.name.call()).replace(/\u0000/g, '');
          var BaseCardSymbol = this.state.web3.toAscii(await BaseCardInstance.symbol.call()).replace(/\u0000/g, '');
          var BaseCardDecimals = await BaseCardInstance.decimals.call();
          var BaseCardTotal = await BaseCardInstance.totalSupply();
          var BaseCardOwner = await BaseCardInstance.owner.call();
          var BaseCardRemaining = await BaseCardInstance.balanceOf(myAddress);
          var BaseCardImage = this.state.dragons[index].picture;

          console.log(BaseCardImage);
          const newCard = {
            name: BaseCardName,
            symbol: BaseCardSymbol,
            decimals: BaseCardDecimals,
            total: BaseCardTotal,
            owner: BaseCardOwner,
            remaining: BaseCardRemaining,
            image: BaseCardImage
          }
          var joined = this.state.cards.concat(newCard);
          return this.setState({ cards: joined })
        })
      });
    })
  }


  renderCards() {
    if (!this.state.cards) {
      return;
    }
    return this.state.cards.map( (card, index) => {
      console.log('%c (card)', 'color:tomato;font-size:30px;', card)
      // <p>{ card.decimals }</p>
      // <p>{ card.total }</p>
      // <p>{ card.remaining }</p>
       

      return (
        <div key={ `${card}-${index}` }  className='Home-cards-container'>
          <img className='Home-cards-image' alt="dragon-card" src={ card.image } />
          <div className='Home-cards-content' >
            <h1 className='Home-cards-name'>{card.name}</h1>
            <div className='Home-cards-desc'>
              <p className='Home-cards-text'>Symbol: {card.symbol}</p>
              <p className='Home-cards-text Home-cards-owner'>Owner: {card.owner}</p>
            </div>
          </div >
        </div>
      );
    })
  }


  render() {
    return (
      <div className='Home'>
        <SideBar user={ this.props.user } />
        <div className='Home-content'>
          <h1>Main Content Here</h1>
          <p>Below is an overview of some basic elements used throughout the starterkit.</p>
          <h2>Buttons</h2>
          <p>Use any of the examples below to quickly create a styled button.</p>
          <Button id="test" onClick="" contents="Default"/>
          { this.renderCards() }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUser: () =>
        dispatch(getUser())
    }
  };

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
