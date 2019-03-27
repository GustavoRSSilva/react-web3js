import React from 'react';
import Proptypes from 'prop-types';
import SportCar from '../../assets/sportsCar.svg';
import Fuel from '../../assets/fuel.svg';
import './homepage.css';

class HomePage extends React.Component {

  render() {
    const {handleBuyCar, handleBuyGas } = this.props;
    return (
      <div>
        <form onSubmit={(evt) => handleBuyCar(evt)}>
          <label>
            Car (100 StoreTokens):
            <button type="submit"  onClick={() => null} >
              <img
                src={SportCar}
                alt="car"
              />
            </button>
          </label>
        </form>

        <form onSubmit={(evt) => handleBuyGas(evt, this.input.value)}>
          <label>
            Gas (1 StoreTokens):
            <input
                type="number"
                name="name"
                ref={(input) => this.input = input}
                required
              />
          </label>
          <button
            type="submit"
            value="Submit"
            onClick={() => null}
          >
            <img
              src={Fuel}
              alt="fuel"
            />
          </button>
        </form>
      </div>
    );
  }
}

HomePage.propstypes = {
  handleBuyCar: Proptypes.func.isRequired,
  handleBuyGas: Proptypes.func.isRequired,
}

export default HomePage;
