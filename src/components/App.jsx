import React from 'react'

// import getWeb3 from './utils/getWeb3'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

import Flag from './Flag/Flag'
import Header from './Header/Header'
import Dashboard from './Dashboard/Dashboard'

class App extends React.Component {
  state = {
    web3: null,
    storageValue: 0,

    dashOpen: false,
    flagVoted: false,
    flagSelected: null,
    pastTransactions: []
  }

  voteFlag = () => {
    // Perform async request with flag data...
    this.setState({
      flagVoted: true,
      flagSelected: null,
      dashOpen: window.innerWidth > 982,
      pastTransactions: [this.state.flagSelected].concat(
        this.state.pastTransactions
      )
    })
  }

  toggleDash = () => {
    this.setState({ dashOpen: !this.state.dashOpen })
  }

  resetFlag = () => {
    this.setState({ dashOpen: false, flagVoted: false, flagSelected: null })
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
    const {
      dashOpen,
      flagVoted,
      flagSelected,
      pastTransactions: transactions
    } = this.state

    return (
      <div className="App">
        <Header />

        <Flag
          flagVoted={flagVoted}
          flagSelected={flagSelected}
          voteFlag={this.voteFlag}
          resetFlag={this.resetFlag}
          removeFlag={this.removeFlag}
          selectFlag={this.selectFlag}
        />

        <Dashboard
          isOpen={dashOpen}
          transactions={transactions}
          toggleDash={this.toggleDash}
        />
      </div>
    )
  }
}

export default App
