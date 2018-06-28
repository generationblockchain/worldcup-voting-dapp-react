import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

import Remove from 'react-icons/lib/io/ios-close-outline'
import Success from 'react-icons/lib/io/ios-checkmark-outline'

import FlagList from './components/FlagList'
import FlagView from './components/FlagView'

// import getWeb3 from './utils/getWeb3'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

class App extends Component {
  state = {
    web3: null,
    storageValue: 0,
    flagSelected: null
  }

  removeFlag = () => {
    this.setState({ flagSelected: null })
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
      <div>
        <a href="https://generationblockchain.io">
          <img
            src="/logo.png"
            className="Logo"
            alt="Generation Blockchain Logo"
          />
        </a>

        <h2 className="Question">
          I want to bet on{this.state.flagSelected
            ? ' ' + this.state.flagSelected.country + '!'
            : '...'}
        </h2>

        <div className="Flag">
          <div className="FlagSide">
            <Overdrive id="remove">
              <Remove
                onClick={this.props.onRemove}
                className="FlagSideIcon FlagSideIconClose"
              />
            </Overdrive>
          </div>

          {this.state.flagSelected ? (
            <FlagView
              onRemove={this.removeFlag}
              selected={this.state.flagSelected}
            />
          ) : (
            <FlagList onSelect={this.selectFlag} />
          )}

          <div className="FlagSide">
            <Overdrive id="success">
              <Success className="FlagSideIcon FlagSideIconCheck" />
            </Overdrive>
          </div>
        </div>
      </div>
    )
  }
}

export default App
