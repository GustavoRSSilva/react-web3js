var StoreToken = artifacts.require("./StoreToken.sol");

module.exports = function(deployer) {
  deployer.deploy(StoreToken);
};
