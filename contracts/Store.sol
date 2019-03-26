pragma solidity ^0.5.0;

import "./StoreToken.sol";

contract Store {
    mapping(address => uint256) public _userCars;
    mapping(address => uint256) public _userGas;
    uint256 _carPrice = 100;
    uint256 _gasPrice = 1;
    uint256 _total = 0;

    StoreToken private _storeToken;

    constructor (address _storeTokenAddress) public {
      _storeToken = StoreToken(_storeTokenAddress);
    }


    function buyCar() public returns (bool success) {
      require(_storeToken.allowance(msg.sender, address(this)) >= _carPrice);
      _storeToken.transferFrom(msg.sender, address(this), _carPrice);
      _total = _total + _carPrice;
      _userCars[msg.sender] += 1;
      return true;
    }

    function getUserCars() public view returns (uint256 userCars) {
      return _userGas[msg.sender];
    }

    function buyGas(uint256 _amount) public returns (bool success) {
      uint256 _price = _amount * _carPrice;
      require(_storeToken.allowance(msg.sender, address(this)) >= _price);
      _storeToken.transferFrom(msg.sender, address(this), _price);
      _total = _total + _price;
      _userCars[msg.sender] += _amount;
      return true;
    }

    function getUserGas() public view returns (uint256 userGas) {
      return _userGas[msg.sender];
    }

    function release(address _address) public returns (bool success) {
      _storeToken.transfer(_address, _total);
      return true;
    }
}
