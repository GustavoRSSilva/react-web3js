import React from 'react';
import Proptypes from 'prop-types';

class HomePage extends React.Component {

  render() {
    const {handleBuyCar, handleBuyGas } = this.props;
    return (
      <div>
        <form onSubmit={(evt) => handleBuyCar(evt)}>
          <label>
            Car (100 StoreTokens):
            <input type="submit" value="Buy a new car" onClick={() => null}/>
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
          <input
            type="submit"
            value="Submit"
            onClick={() => null}
          />
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
