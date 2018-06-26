import React, { Component } from 'react'
import { FlagIcon } from 'react-flag-kit'
import Overdrive from 'react-overdrive'

// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
// import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const flags = ['IN', 'GB', 'US', 'CN', 'TV', 'IO', 'VN', 'IT']

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flagSelected: '',
      storageValue: 0,
      web3: null
    }
  }

  selectFlag(flag) {
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
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">LOGO</div>

            <div className="pure-u-1-1">
              {this.state.flagSelected ? (
                <div style={{ position: 'fixed', right: '5px' }}>
                  <Overdrive id={this.state.flagSelected}>
                    <FlagIcon code={this.state.flagSelected} size={96} />
                  </Overdrive>
                </div>
              ) : (
                <div>
                  <div className="pure-u-1-6" />
                  <div className="pure-u-2-3">
                    {flags.map(flag => (
                      <div
                        key={flag}
                        className="pure-u-1-4 genb-flag"
                        onClick={() => this.selectFlag(flag)}
                      >
                        <Overdrive id={flag} key={flag}>
                          <FlagIcon code={flag} size={256} />
                        </Overdrive>
                      </div>
                    ))}
                  </div>
                  <div className="pure-u-1-6" />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
