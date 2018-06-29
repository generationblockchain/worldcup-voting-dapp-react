import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import Overdrive from 'react-overdrive'

// import getWeb3 from './utils/getWeb3'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

import Remove from 'react-icons/lib/io/ios-close-empty'
import Success from 'react-icons/lib/io/ios-checkmark-empty'

import FlagList from './components/FlagList'
import FlagLoad from './components/FlagLoad'
import FlagView from './components/FlagView'

const flags = [
  { code: 'br', country: 'Brazil', description: 0.0004 },
  { code: 'de', country: 'Germany', description: 0.0007 },
  { code: 'it', country: 'Italy', description: 0.0039 },
  { code: 'ar', country: 'Argentina', description: 0.0054 },
  { code: 'uy', country: 'Uruguay', description: 0.0079 },
  { code: 'fr', country: 'France', description: 0.0101 },
  { code: 'gb-eng', country: 'England', description: 0.0192 },
  { code: 'es', country: 'Spain', description: 0.0256 }
]

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
        <ReactTooltip id="tip-r" place="left" type="error" effect="solid">
          Cancel
        </ReactTooltip>
        <ReactTooltip id="tip-s" place="right" type="success" effect="solid">
          Vote
        </ReactTooltip>

        <a href="https://generationblockchain.io">
          <img
            src="/logo.png"
            className="Logo"
            alt="Generation Blockchain Logo"
          />
        </a>
        <h2 className="Question">
          I want to vote for{this.state.flagSelected ? (
            <span style={{ fontWeight: 'bold', color: '#ff6f31' }}>
              {' '}
              {this.state.flagSelected.country}
              {'!'}
            </span>
          ) : (
            '...'
          )}
        </h2>
        <div className="Flag">
          <div className="FlagSide">
            <Overdrive id="remove">
              <Remove
                data-tip
                data-for="tip-r"
                onClick={this.removeFlag}
                className="FlagSideIcon FlagSideIconClose"
                style={{ left: this.state.flagSelected ? '' : '-350px' }}
              />
            </Overdrive>
          </div>

          {this.state.flagSelected ? (
            <FlagView
              onRemove={this.removeFlag}
              selected={this.state.flagSelected}
              amount={this.state.flagSelected.description}
            />
          ) : (
            <FlagList flags={flags} onSelect={this.selectFlag} />
          )}

          <div className="FlagSide">
            <Overdrive id="success">
              <Success
                data-tip
                data-for="tip-s"
                className="FlagSideIcon FlagSideIconCheck"
                style={{ right: this.state.flagSelected ? '' : '-350px' }}
              />
            </Overdrive>
          </div>
        </div>
      </div>
    )
  }
}

export default App
