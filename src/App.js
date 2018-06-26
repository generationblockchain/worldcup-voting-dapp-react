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
              <div className="pure-u-1-6" />
              <div className="pure-u-2-3">
                {flags.map(flag => (
                  <div key={flag} className="pure-u-1-4 genb-flag">
                    <FlagIcon code={flag} size={256} />
                  </div>
                ))}
              </div>
              <div className="pure-u-1-6" />

              {this.state.flagSelected ? (
                <Overdrive id="content">
                  <div>
                    <FlagIcon code="IN" size={96} />
                  </div>
                </Overdrive>
              ) : (
                <Overdrive id="content">
                  <div style={{ position: 'fixed', right: '5px' }}>
                    <FlagIcon code="US" size={96} />
                  </div>
                </Overdrive>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
