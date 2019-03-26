const path = require("path");

require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
        host: "localhost",
        port: 8545,
        network_id: "*", // Match any network id
        gas: 46000000
    },
    ropsten: {
        provider: function() {
          return new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/${process.env.INFURA_KEY}`)
        },
        network_id: "3",
        gas: 7000000, // Gas limit used for deploys
        gasPrice: 40000000000
    },
    main: {
        provider: function() {
          return new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.infura.io/${process.env.INFURA_KEY}`)
        },
        network_id: "1",
        gasPrice: 20000000000, // Be careful, this is in Shannon
        gas: 6000000 // Gas limit used for deploys
    },
}
};
