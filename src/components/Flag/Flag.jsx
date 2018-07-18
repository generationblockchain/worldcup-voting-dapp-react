import React from 'react'

import FlagList from './FlagList'
import FlagView from './FlagView'
import FlagLoad from './FlagLoad'

import { ChasingDots } from 'better-react-spinkit'

import {
  checkRefereeURL,
  winnerUsrMsg,
  winnerRefMsg,
  preVoteUsrMsg,
  preVoteRefMsg,
  postVoteUsrMsg,
  postVoteRefMsg
} from '../../utils/tools'

class Flag extends React.Component {
  render() {
    const DEFAULT_VOTE_STAKE = 0.5
    const isRefereeURL = checkRefereeURL()
    const userIsReferee = this.props.isRefereeAddress
    const {
      voteFlag,
      resetFlag,
      selectFlag,
      removeFlag,
      declareWinner,
      viewOnEtherscan,
      stateIsLoaded
    } = this.props
    const {
      flags,
      winner,
      voteOpen,
      flagVoted,
      flagSelected,
      totalStake
    } = this.props

    return (
      <div>
        {/* Question */}
        {isRefereeURL
          ? flagVoted
            ? postVoteRefMsg
            : !voteOpen
              ? winnerRefMsg(winner)
              : preVoteRefMsg(flagSelected)
          : flagVoted
            ? postVoteUsrMsg
            : !voteOpen
              ? winnerUsrMsg(winner)
              : preVoteUsrMsg(flagSelected)}

        {/* Main */}
        <div className="Flag">
            {stateIsLoaded ? (
                // if state is loaded
                flagVoted ? (
                    // IF a flag was just voted for,
                    // show the "ethereum miners are mining your txn" state
                    <FlagLoad 
                    onReset={resetFlag} 
                    viewOnEtherscan={viewOnEtherscan}
                    />
                ) : flagSelected ? (
                    // ELSE IF a flag was just selected
                    // show the "ethereum miners are mining your txn" state
                    <FlagView
                    voteFlag={voteFlag}
                    declareWinner={declareWinner}
                    removeFlag={removeFlag}
                    flagSelected={flagSelected}
                    amount={DEFAULT_VOTE_STAKE}
                    isRefereeAddress={userIsReferee}
                    />
                ) : (
                    // ELSE display our list/grid of flags
                    <FlagList
                    flags={flags}
                    winner={winner}
                    totalStake={totalStake}
                    voteOpen={voteOpen}
                    onSelect={selectFlag}
                    isRefereeAddress={userIsReferee}
                    />
                )
            ) : (
                // if state is not loaded
                <ChasingDots size={100} color={'white'} />
            )}
        </div>
      </div>
    )
  }
}

export default Flag
