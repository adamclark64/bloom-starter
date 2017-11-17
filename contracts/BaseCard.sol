pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract BaseCard is MintableToken {

    bytes32 public name;
    bytes32 public symbol;
    uint public decimals;

    function BaseCard (bytes32 _name, bytes32 _symbol, uint _decimals, address _wallet) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

}