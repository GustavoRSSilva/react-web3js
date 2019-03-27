import React from 'react';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <form>
          <label>
            Car (1000 StoreTokens):
            <input type="submit" value="Buy a new car" />
          </label>
        </form>

        <form>
          <label>
            Gas (1000 StoreTokens):
            <input
                type="text"
                name="name"
              />
          </label>
          <input
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

export default HomePage;
