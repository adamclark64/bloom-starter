pragma solidity ^0.4.11;

import './BaseCard.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

/**
 * @title CardLauncher
 */
contract CardLauncher {
    using SafeMath for uint256;

    // Cards array and counter
    BaseCard[] public Cards;
    uint256 public BaseCardCounter = 0;

    // address where funds are collected
    address public wallet;

    // amount of raised money in wei
    uint256 public weiRaised;

    function CardLauncher(address _wallet) {

        require(_wallet != 0x0);

        wallet = _wallet;

    }

    function createCards(bytes32 _cardName, bytes32 _cardSymbol, uint _cardDecimals, uint _cardCount) public returns (uint) {

        BaseCard customBaseCard = new BaseCard(_cardName, _cardSymbol, _cardDecimals, wallet);

        BaseCardCounter++;

        Cards.push(customBaseCard);

        customBaseCard.mint(wallet, _cardCount);

        return BaseCardCounter - 1;

    }

    function getCardsCount() public returns(uint) {
        return Cards.length;
    }

    function getCards() public returns (BaseCard[]) {

        return Cards;

    }

}