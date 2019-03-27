import React, { Component } from "react";
import StoreDappContract from "./contracts/StoreDapp.json";
import StoreTokenContract from "./contracts/StoreToken.json";
import getWeb3 from "./utils/getWeb3";
import HomePage from './containers/HomePage';

import "./App.css";

const storeTokenAddress = "0x880a03fcbbd8cdd6abaaecc089e08d227c55f164";
const storeDappAddress = "0x275e25348cC2219BC142c99fA4E43E68d91547D7"

class App extends Component {
  state = {
    userGas: 0,
    userCars: 0,
    userTokens: 0,
    web3: null,
    accounts: null,
    StoreDappContract: null,
    StoreTokenContract: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StoreDappContract.networks[networkId];
      const StoreDappContractInstance = new web3.eth.Contract(
        StoreDappContract.abi,
        deployedNetwork && storeDappAddress,
      );

      const StoreTokenContractInstance = new web3.eth.Contract(
        StoreTokenContract.abi,
        deployedNetwork && storeTokenAddress,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, StoreDappContract: StoreDappContractInstance, StoreTokenContract: StoreTokenContractInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, StoreDappContract, StoreTokenContract } = this.state;

    console.log(StoreDappContract.methods);

    // Get the value from the contract to prove it worked.
    const userTokens = await StoreTokenContract.methods.balanceOf(accounts[0]).call();

    // Get the value from the contract to prove it worked.
    const userCars = await StoreDappContract.methods.getUserCars().call();

    // Get the value from the contract to prove it worked.
    const userGas = await StoreDappContract.methods.getUserGas().call();

    // Update state with the result.
    this.setState({ userCars: userCars, userGas: userGas, userTokens: userTokens });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    console.log(this.state);

    const { userTokens } = this.state;

    return (
      <div className="App">
        <h1>Welcome to the shop</h1>
        <p>Your Truffle Box is installed and ready.</p>

        <p>You have {userTokens} available.</p>
        <HomePage />

      </div>
    );
  }
}

export default App;
