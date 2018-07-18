import React from 'react'

import getWeb3 from '../utils/getWeb3'
import GBWorldCupVotingGame from '../../build/contracts/GBWorldCupVotingGame.json'

import Flag from './Flag/Flag'
import Header from './Header/Header'
import Dashboard from './Dashboard/Dashboard'

import { getCountryCode } from '../utils/countries'

import _ from 'lodash'

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
    contractInstance: null,
    contractStateFetched: false,
    myAccountAddress: -1,
    initialBlockNumber: -1,

    contractState: {
      gameIteration: -1,
      phaseOfGameplay: '',
      voteOpen: true,
      teamNames: [],
      teamNamesAscii: [],
      voteCounts: [],
      voteBackings: [],
      teamStats: [],
      totalVotes: -1,
      totalBacking: -1,
      contractBalance: -1,
      lastWinner: null,
      refereeAddress: null
    },

    flagVoted: false,
    flagSelected: null,
    dashboardOpen: false,
    pastTxns: []
  }

  selectFlag = flag => {
    this.setState({ flagSelected: flag })
  }

  removeFlag = () => {
    this.setState({ flagSelected: null })
  }

  toggleDash = () => {
    this.setState({ dashboardOpen: !this.state.dashboardOpen })
  }

  resetFlag = (showDash) => {
    this.setState({
      flagVoted: false,
      flagSelected: null,
      dashboardOpen: showDash
    })
  }

  voteFlag = async (etherAmount) => {

    const { flagSelected, pastTxns } = this.state

    // Perform async request with flag data...
    const _txnId = await this.submitVote(flagSelected.country, etherAmount)

    
    const txnMetadata = Object.assign({}, flagSelected, {
      amount: etherAmount,
      txnId: _txnId
    })

    this.setState({
      flagVoted: true,
      flagSelected: null,
      dashboardOpen: window.innerWidth > 982,
      pastTxns: pastTxns.concat([txnMetadata]) // append to the end
    })
  }

  declareWinner = () => {}

  viewLatestTxnOnEtherscan = () => {
    const lastTxnHash = this.state.pastTxns[this.state.pastTxns.length - 1].txnId
    const url = `https://ropsten.etherscan.io/address/${lastTxnHash}`

    window.open(url, "_blank")
  }

  submitVote = async (teamName, etherAmount) => {
    var voteBackingInWei = this.state.web3.toWei(etherAmount, 'ether')
    var voterAddress = this.state.myAccountAddress

    let tx_hash = await this.state.contractInstance.voteForTeam.sendTransaction(
      teamName,
      { from: voterAddress, value: voteBackingInWei, gas: 3000000 }
    )

    console.log('Txn hash: ')
    console.log(tx_hash)

    return tx_hash;
  }

  componentDidMount() {}

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

  instantiateContract = async () => {
    const contract = require('truffle-contract')
    const gameContract = contract(GBWorldCupVotingGame)
    gameContract.setProvider(this.state.web3.currentProvider)

    //let accounts = await this.state.web3.eth.accounts

    // fetch accounts available, initialize this user's address on React state
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log('My Address: ' + accounts[0])
      this.setState({ myAccountAddress: accounts[0] })
    })

    // Obtain a reference to the deployed contract.
    // using one of the two:
    // .deployed() for local contracts (on Ganache, truffle develop)
    // .at() to fetch contract at an address if deployed outside of truffle e.g. via Remix
    let deployedContract = await gameContract.deployed()

    /*
    let deployedContract = await gameContract.at(
      '0x3ca1f7495303761ac1da9f69e48f5fbbe0532606'
    )
    */

    // Store reference to this deployed contract in React state, for global consumption
    // and when that's done, initiate a sync between contract state and local state
    this.setState({ contractInstance: deployedContract }, async () => {
      await this.syncContractStateWithLocal()
    })

    this.state.web3.eth.getBlockNumber((err, currentBlockNum) => {
      console.log('Current block number: ' + currentBlockNum)
      this.setState({ initialBlockNumber: currentBlockNum })

      // start listening for events from a block number a little before
      // the current block on the blockchain
      let startingBlock = currentBlockNum > 100 ? currentBlockNum - 100 : 0

      console.log('Registering events...')

      // Only listen for NewVote events where the voter is me,
      // so the front-end can change UI state accordingly,
      // sending user back to overall voting screen
      let event_NewVote = deployedContract.NewVote(
        { voter: this.state.myAccountAddress },
        { fromBlock: startingBlock }
      )

      // Only listen for Winner events where the winner is me
      // so the front-end can show Winner Modal
      let event_YouAreAWinner = deployedContract.YouAreAWinner(
        { winnerAddress: this.state.myAccountAddress },
        { fromBlock: startingBlock }
      )

      // General events, listen to all
      let event_GameStarted = deployedContract.GameStarted(
        {},
        { fromBlock: startingBlock }
      )
      let event_WinningTeamDeclared = deployedContract.WinningTeamDeclared(
        {},
        { fromBlock: startingBlock }
      )
      let event_PayoutsCompleted = deployedContract.PayoutsCompleted(
        {},
        { fromBlock: startingBlock }
      )
      let event_TeamStateUpdate = deployedContract.TeamStateUpdate(
        {},
        { fromBlock: startingBlock }
      )
      let event_GameStateUpdate = deployedContract.GameStateUpdate(
        {},
        { fromBlock: startingBlock }
      )

      // will be emitted from contract when new vote happens
      event_NewVote.watch(this.handle_NewVote)
      event_TeamStateUpdate.watch(this.handle_TeamStateUpdate)
      event_GameStateUpdate.watch(this.handle_GameStateUpdate)

      // These will be emitted from contract throughout the game.
      // We listen to them to track game lifecycle and update UI accordingly
      event_GameStarted.watch(this.handle_GameStarted)
      event_WinningTeamDeclared.watch(this.handle_WinningTeamDeclared)
      event_PayoutsCompleted.watch(this.handle_PayoutsCompleted)
      event_YouAreAWinner.watch(this.handle_YouAreAWinner)
    })
  }

  syncContractStateWithLocal = async () => {
    if (!this.state.contractInstance) return

    let CONTRACT_STATE = {
      gameIteration: -1,
      phaseOfGameplay: '',
      voteOpen: false,
      teamNames: [],
      teamNamesAscii: [],
      voteCounts: [],
      voteBackings: [],
      teamStats: [],
      totalVotes: -1,
      totalBacking: -1,
      contractBalance: -1,
      lastWinner: null,
      refereeAddress: null
    }

    let instance = this.state.contractInstance
    CONTRACT_STATE.teamNames = await instance.getTeamNames()

    for (var teamBytes32 of CONTRACT_STATE.teamNames) {
      const _votes = (await instance.getVoteCountForTeam(
        teamBytes32
      )).toNumber()
      const _ether_stake = this.state.web3.fromWei(
        (await instance.getVoteBackingInWeiForTeam(teamBytes32)).toNumber(),
        'ether'
      )
      const _ascii_name = this.state.web3
        .toAscii(teamBytes32)
        .replace(/\0/g, '')

      CONTRACT_STATE.voteCounts.push(_votes)
      CONTRACT_STATE.voteBackings.push(_ether_stake)
      CONTRACT_STATE.teamNamesAscii.push(_ascii_name)

      CONTRACT_STATE.teamStats.push({
        country: _ascii_name,
        votes: _votes,
        stake: parseFloat(_ether_stake),
        code: getCountryCode(_ascii_name)
      })
    }

    CONTRACT_STATE.totalVotes = (await instance.getTotalVoteCount()).toNumber()
    CONTRACT_STATE.totalBacking = parseFloat(
      this.state.web3.fromWei(
        (await instance.getTotalVoteBackingInWei()).toNumber(),
        'ether'
      )
    )
    CONTRACT_STATE.contractBalance = (await instance.getContractBalance()).toNumber()
    CONTRACT_STATE.gameIteration = (await instance.getGameIteration()).toNumber()

    const previous_winner = this.state.web3
      .toAscii(await instance.getLastWinner())
      .replace(/\0/g, '')

    CONTRACT_STATE.lastWinner = {
      country: previous_winner,
      code: getCountryCode(previous_winner),
      num_winners:
        this.state.contractState.lastWinner != null
          ? this.state.contractState.lastWinner.num_winners
          : null,
      amount_won:
        this.state.contractState.lastWinner != null
          ? this.state.contractState.lastWinner.amount_won
          : null
    }

    const possibleStates = [
      'AcceptingVotes',
      'WinnerDeclared',
      'PayoutsCompleted'
    ]
    let gameplayPhaseIndex = (await instance.getCurrentState()).toNumber()

    CONTRACT_STATE.phaseOfGameplay = possibleStates[gameplayPhaseIndex]
    CONTRACT_STATE.voteOpen = gameplayPhaseIndex == 0

    CONTRACT_STATE.refereeAddress = await instance.getRefereeAddress()

    this.setState({ contractState: CONTRACT_STATE, contractStateFetched: true })

    console.log('\nFETCHED + SYNCED CONTRACT STATE')
    console.log(CONTRACT_STATE)
  }

  handle_GameStarted = (error, result) => {
    if (error) {
      console.log(error)
      return
    }

    // we are starting a new contract state fetch,
    // so reflect that on the UI.
    // also clear out any past state for voting and transactions
    this.setState({ 
        contractStateFetched: false, 
        pastTxns: [],
        flagVoted: false,
        flagSelected: null,
        dashboardOpen: false,
    })

    console.log('GameStarted event')
    console.log(result.args)

    // rehydrate state when a new game starts
    this.syncContractStateWithLocal()
  }

  handle_NewVote = (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('New Vote event')
    console.log(result.args)

    // extract game's iteration counter from this event
    let eventGameIteration = result.args.gameIteration.toNumber()

    // reject this event if it pertains to a game that we are no longer playing.
    // this situation shouldn't arise. but we handle it just in case.
    if (eventGameIteration != this.state.contractState.gameIteration) return

    // Take user back to home view since vote has been accepted, if he's not already there.
    // after waiting 2 seconds, just to fake a more realistic block validation time

    if (this.state.flagVoted){
        setTimeout(() => {
            this.resetFlag(true)
        }, 4000)
    }
  }

  handle_TeamStateUpdate = (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Team State Update event')
    console.log(result.args)

    // extract game's iteration counter from this event
    let eventGameIteration = result.args.gameIteration.toNumber()

    // reject this event if it pertains to a game that we are no longer playing.
    // this situation shouldn't arise. but we handle it just in case.
    if (eventGameIteration != this.state.contractState.gameIteration) return

    const updatedCountry = this.state.web3
      .toAscii(result.args.teamName)
      .replace(/\0/g, '')
    const updatedVotes = result.args.votesForThisTeam.toNumber()
    const updatedBacking = this.state.web3.fromWei(
      result.args.backingForThisTeam.toNumber(),
      'ether'
    )

    // clone current team stats array from React state
    let teamStatsClone = _.cloneDeep(this.state.contractState.teamStats)

    // determine array index that needs to be udpated
    let teamIndex = _.findIndex(teamStatsClone, { country: updatedCountry })

    // make the update in cloned object
    teamStatsClone[teamIndex].votes = updatedVotes
    teamStatsClone[teamIndex].stake = parseFloat(updatedBacking)

    this.setState({
      contractState: {
        ...this.state.contractState,
        teamStats: teamStatsClone
      }
    })
  }

  handle_GameStateUpdate = (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Game State Update event')
    console.log(result.args)

    // extract game's iteration counter from this event
    let eventGameIteration = result.args.gameIteration.toNumber()

    // reject this event if it pertains to a game that we are no longer playing.
    // this situation shouldn't arise. but we handle it just in case.
    if (eventGameIteration != this.state.contractState.gameIteration) return

    const updatedTotalVotes = result.args.totalVotesInGame.toNumber()
    const updatedTotalBacking = this.state.web3.fromWei(
      result.args.totalBackingInGame.toNumber(),
      'ether'
    )

    this.setState({
      contractState: {
        ...this.state.contractState,
        totalVotes: updatedTotalVotes,
        totalBacking: parseFloat(updatedTotalBacking)
      }
    })
  }

  handle_WinningTeamDeclared = (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('WinningTeamDeclared event')
    console.log(result.args)

    // extract game's iteration counter from this event
    let eventGameIteration = result.args.gameIteration.toNumber()

    // reject this event if it pertains to a game that we are no longer playing.
    // this situation shouldn't arise. but we handle it just in case.
    if (eventGameIteration != this.state.contractState.gameIteration) return

    const winningCountry = this.state.web3
      .toAscii(result.args.winningTeam)
      .replace(/\0/g, '')

    // set the winning team's name and country code on our local react state,
    // notice the syntax is a bit more complex since it's a nested state object
    this.setState({
      contractState: {
        ...this.state.contractState,
        lastWinner: {
          country: winningCountry,
          code: getCountryCode(winningCountry)
        },
        voteOpen: false
      }
    })
  }

  handle_YouAreAWinner = (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('YouAreAWinner event')
    console.log(result.args)

    // extract game's iteration counter from this event
    let eventGameIteration = result.args.gameIteration.toNumber()

    // reject this event if it pertains to a game that we are no longer playing.
    // this situation shouldn't arise. but we handle it just in case.
    if (eventGameIteration != this.state.contractState.gameIteration) return

    // @TODO(abhagi), show a close-able Modal announcing that you won
  }

  handle_PayoutsCompleted = (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Payouts Completed:')
    console.log(result.args)

    // extract game's iteration counter from this event
    let eventGameIteration = result.args.gameIteration.toNumber()

    // reject this event if it pertains to a game that we are no longer playing.
    // this situation shouldn't arise. but we handle it just in case.
    if (eventGameIteration != this.state.contractState.gameIteration) return

    // set the winner on our local react state,
    // notice the syntax is a bit more complex since it's a nested state object
    this.setState({
      contractState: {
        ...this.state.contractState,
        lastWinner: {
          ...this.state.contractState.lastWinner,
          num_winners: result.args.numWinners.toNumber(),
          amount_won: result.args.totalWeiDistributed.toNumber()
        },
        voteOpen: false
      }
    })
  }

  render() {
    const {
      dashboardOpen,
      flagVoted,
      flagSelected,
      pastTxns,
      contractStateFetched,
      contractState
    } = this.state

    const totalVotes = contractState.totalVotes
    const totalStake = contractState.totalBacking
    const voteOpen = contractState.voteOpen
    const flags = contractState.teamStats
    const winner = contractState.lastWinner
    const isReferee =
      this.state.myAccountAddress == contractState.refereeAddress

    return (
      <div className="App">
        <Header
          voteOpen={voteOpen}
          totalVotes={totalVotes}
          totalStake={totalStake}
          stateIsLoaded={contractStateFetched}
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
          declareWinner={this.declareWinner}
          viewOnEtherscan={this.viewLatestTxnOnEtherscan}
          isRefereeAddress={isReferee}
          stateIsLoaded={contractStateFetched}
          totalStake={totalStake}
        />

        <Dashboard
          isOpen={dashboardOpen}
          transactions={pastTxns}
          toggleDash={this.toggleDash}
        />
      </div>
    )
  }
}

export default App
