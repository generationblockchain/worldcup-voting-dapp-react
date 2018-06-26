import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

import FlagList from './components/FlagList'

// import getWeb3 from './utils/getWeb3'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

class App extends Component {
  state = {
    web3: null,
    storageValue: 0,
    flagSelected: ''
  }

  removeFlag = () => {
    this.setState({ flagSelected: '' })
  }

  selectFlag = flag => {
    this.setState({ flagSelected: flag })
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    // getWeb3
    //   .then(results => {
    //     this.setState({
    //       web3: results.web3
    //     })
    //     // Instantiate contract once web3 provided.
    //     this.instantiateContract()
    //   })
    //   .catch(() => {
    //     console.log('Error finding web3.')
    //   })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    // const contract = require('truffle-contract')
    // const simpleStorage = contract(SimpleStorageContract)
    // simpleStorage.setProvider(this.state.web3.currentProvider)
    // // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance
    // // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   simpleStorage
    //     .deployed()
    //     .then(instance => {
    //       simpleStorageInstance = instance
    //       // Stores a given value, 5 by default.
    //       return simpleStorageInstance.set(5, { from: accounts[0] })
    //     })
    //     .then(result => {
    //       // Get the value from the contract to prove it worked.
    //       return simpleStorageInstance.get.call(accounts[0])
    //     })
    //     .then(result => {
    //       // Update state with the result.
    //       return this.setState({ storageValue: result.c[0] })
    //     })
    // })
  }

  render() {
    return (
      <div className="content">
        <img
          src="/logo.png"
          className="logo"
          alt="Generation Blockchain Logo"
        />

        {this.state.flagSelected ? (
          <Overdrive id="back">
            <div
              className="genb-back"
              style={{ left: '100px' }}
              onClick={this.removeFlag}
            >
              <div>&lt;</div>
            </div>
          </Overdrive>
        ) : (
          <Overdrive id="back">
            <div className="genb-back">
              <div>&lt;</div>
            </div>
          </Overdrive>
        )}

        <div className="pure-u-1-1">
          <h2 className="genb-question">I want to bet on...</h2>
        </div>

        <div className="pure-u-1-1">
          <div className="pure-u-1-6" />
          <div className="pure-u-2-3">
            {this.state.flagSelected ? (
              <div className="genb-confirm">
                <div className="pure-u-1-2">
                  <Overdrive id={this.state.flagSelected} duration={400}>
                    
                  </Overdrive>
                </div>
                <div className="pure-u-1-2">
                  <div className="genb-amount" style={{ color: 'white' }}>
                    <h2>Select Amount?</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="genb-select">
                <FlagList />
                {/* {flags.map(flag => (
                  <div key={flag} className="pure-u-1-4">
                    <div className="genb-flag">
                      <Overdrive id={flag} key={flag}>
                        <div className="genb-flag-image">
                          <FlagIcon
                            size={100}
                            code={flag}
                            onClick={() => this.selectFlag(flag)}
                          />
                        </div>
                      </Overdrive>
                      <span className="genb-country-name">Country Name</span>
                    </div>
                  </div>
                ))} */}
              </div>
            )}
          </div>
          <div className="pure-u-1-6" />
        </div>
      </div>
    )
  }
}

export default App
