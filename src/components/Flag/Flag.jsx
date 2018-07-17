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
    const isRefereeURL = checkRefereeURL()
    const userIsReferee = this.props.isRefereeAddress
    const { voteFlag, resetFlag, selectFlag, removeFlag, stateIsLoaded } = this.props
    const { flags, winner, voteOpen, flagVoted, flagSelected, totalStake } = this.props

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
          { stateIsLoaded ? (
              flagVoted ? (
                <FlagLoad onReset={resetFlag} />
              ) : flagSelected ? (
                <FlagView
                  voteFlag={voteFlag}
                  removeFlag={removeFlag}
                  flagSelected={flagSelected}
                  amount={flagSelected.amount}
                  isRefereeAddress={userIsReferee}
                />
              ) : (
                <FlagList
                  flags={flags}
                  winner={winner}
                  totalStake={totalStake}
                  voteOpen={voteOpen}
                  onSelect={selectFlag}
                />
              )
          ): (
            <ChasingDots size={100} color={'white'} />
          )}

        </div>
      </div>
    )
  }
}

export default Flag
