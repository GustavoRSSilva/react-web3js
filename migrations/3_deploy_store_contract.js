var StoreDapp = artifacts.require("./StoreDapp.sol");


module.exports = function(deployer) {
  var StoreTokenAddress = '0x880a03fcbbd8cdd6abaaecc089e08d227c55f164';
  deployer.deploy(StoreDapp, StoreTokenAddress);
};
