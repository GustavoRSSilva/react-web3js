pragma solidity ^0.5.0;

import "./StoreToken.sol";

contract StoreDapp {
    mapping(address => uint256) public _userCars;
    mapping(address => uint256) public _userGas;
    uint256 _carPrice = 100;
    uint256 _gasPrice = 1;
    uint256 _total = 0;

    StoreToken private _storeToken;

    constructor () public {
      _storeToken = StoreToken(0x880a03FcBBD8cDd6aBAaeCc089e08D227c55f164);
    }


    function buyCar() public returns (bool success) {
      require(_storeToken.allowance(msg.sender, address(this)) >= _carPrice);
      _storeToken.transferFrom(msg.sender, address(this), _carPrice);
      _total = _total + _carPrice;
      _userCars[msg.sender] = _userCars[msg.sender] + 1;
      return true;
    }

    function getUserCars(address _userAddress) public view returns (uint256 userCars) {
      return _userCars[_userAddress];
    }

    function buyGas(uint256 _amount) public returns (bool success) {
      uint256 _price = _amount * _gasPrice;
      require(_storeToken.allowance(msg.sender, address(this)) >= _price);
      _storeToken.transferFrom(msg.sender, address(this), _price);
      _total = _total + _price;
      _userGas[msg.sender] = _userGas[msg.sender] + _amount;
      return true;
    }

    function getUserGas(address _userAddress) public view returns (uint256 userGas) {
      return _userGas[_userAddress];
    }

    function release(address _address) public returns (bool success) {
      _storeToken.transfer(_address, _total);
      return true;
    }
}
