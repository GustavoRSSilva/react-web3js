import React, { Component } from "react";
import StoreDappContract from "./contracts/StoreDapp.json";
import StoreTokenContract from "./contracts/StoreToken.json";
import getWeb3 from "./utils/getWeb3";
import HomePage from './containers/HomePage';

import "./App.css";

const storeTokenAddress = "0x880a03fcbbd8cdd6abaaecc089e08d227c55f164";
const storeDappAddress = "0x8E2F53C1f21Ec9c2192F15dA3c0f146eEDF75b4D"

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

  constructor(props) {
    super(props);

    this.handleBuyCar = this.handleBuyCar.bind(this);
    this.handleBuyGas = this.handleBuyGas.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];

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

    // Get the value from the contract to prove it worked.
    const userTokens = await StoreTokenContract.methods.balanceOf(accounts[0]).call();

    // Get the value from the contract to prove it worked.
    const userCars = await StoreDappContract.methods.getUserCars(accounts[0]).call();

    // Get the value from the contract to prove it worked.
    const userGas = await StoreDappContract.methods.getUserGas(accounts[0]).call();

    // Update state with the result.
    this.setState({ userCars: userCars, userGas: userGas, userTokens: userTokens });
  };

  handleBuyCar = async (evt) => {
    evt.preventDefault();

    const { web3, StoreDappContract, StoreTokenContract } = this.state;

    const carPrice = 100;

    // Allow amount
    await StoreTokenContract.methods.approve(storeDappAddress, carPrice).send({ from: web3.eth.defaultAccount });

    // Get the value from the contract to prove it worked.
    const result = await StoreDappContract.methods.buyCar().send({ from: web3.eth.defaultAccount });

    if (result) {
      this.runExample();
      alert("You just brought a car!!");
    }
  };

  handleBuyGas = async (evt, amount) => {
    evt.preventDefault();

    const { web3, StoreDappContract, StoreTokenContract } = this.state;

    const gasPrice = 1;
    const total = amount * gasPrice;

    // Allow amount
    await StoreTokenContract.methods.approve(storeDappAddress, total).send({ from: web3.eth.defaultAccount });

    // Get the value from the contract to prove it worked.
    const result = await StoreDappContract.methods.buyGas(amount).send({ from: web3.eth.defaultAccount });

    if (result) {
      this.runExample();
      alert(`You just brought ${amount} of gas!`);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const { userTokens, userCars, userGas } = this.state;

    return (
      <div className="App">
        <h1>Welcome to the shop</h1>
        <p>You have {userTokens} Store tokens available.</p>
        <p>You have {userCars} cars.</p>
        <p>You have {userGas} gas available.</p>

        <HomePage
          handleBuyCar={this.handleBuyCar}
          handleBuyGas={this.handleBuyGas}
          />

      </div>
    );
  }
}

export default App;
