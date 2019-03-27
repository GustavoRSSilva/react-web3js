var StoreDapp = artifacts.require("./StoreDapp.sol");


module.exports = function(deployer) {
  var StoreTokenAddress = '0x880a03FcBBD8cDd6aBAaeCc089e08D227c55f164';
  deployer.deploy(StoreDapp);
};
