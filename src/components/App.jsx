import React from 'react'

import getWeb3 from '../utils/getWeb3'
import GBWorldCupVotingGame from '../../build/contracts/GBWorldCupVotingGame.json'

import Flag from './Flag/Flag'
import Header from './Header/Header'
import Dashboard from './Dashboard/Dashboard'

const flags = [
  { code: 'br', country: 'Brazil', amount: 0.0004 },
  { code: 'de', country: 'Germany', amount: 0.0007 },
  { code: 'it', country: 'Italy', amount: 0.0039 },
  { code: 'ar', country: 'Argentina', amount: 0.0054 },
  { code: 'uy', country: 'Uruguay', amount: 0.0079 },
  { code: 'fr', country: 'France', amount: 0.0101 },
  { code: 'gb-eng', country: 'England', amount: 0.0192 },
  { code: 'es', country: 'Spain', amount: 0.0256 }
]

class App extends React.Component {
  state = {
    web3: null,

    flags,
    flagVoted: false,
    flagSelected: null,

    dashOpen: false,
    transactions: [],

    winner: null,
    voteOpen: true,
    totalVotes: 1000,
    totalStake: 1000
  }

  selectFlag = flag => {
    this.setState({ flagSelected: flag })
  }

  removeFlag = () => {
    this.setState({ flagSelected: null })
  }

  toggleDash = () => {
    this.setState({ dashOpen: !this.state.dashOpen })
  }

  resetFlag = () => {
    this.setState({ dashOpen: false, flagVoted: false, flagSelected: null })
  }

  voteFlag = amount => {
    // Perform async request with flag data...

    const { flagSelected, transactions } = this.state
    flagSelected.amount = amount || flagSelected.amount

    this.setState({
      flagVoted: true,
      flagSelected: null,
      dashOpen: window.innerWidth > 982,
      transactions: [flagSelected].concat(transactions)
    })
  }

  componentDidMount() {
    // Logic to fetch flag votes and stake
    this.setState({
      flags: this.state.flags.map(flag =>
        Object.assign({}, flag, { votes: 5, stake: 1.3 })
      )
    })
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
        this.setState({
            web3: results.web3
        })
        
        // Instantiate contract once web3 provided.
        this.instantiateContract()
    })
    .catch(() => {
        console.log('Error finding web3.')
    })
  }

  instantiateContract() {

  }

  render() {
    const {
      flags,
      winner,
      dashOpen,
      voteOpen,
      flagVoted,
      totalVotes,
      totalStake,
      flagSelected,
      transactions
    } = this.state

    return (
      <div className="App">
        <Header
          voteOpen={voteOpen}
          totalVotes={totalVotes}
          totalStake={totalStake}
        />

        <Flag
          flags={flags}
          winner={winner}
          voteOpen={voteOpen}
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