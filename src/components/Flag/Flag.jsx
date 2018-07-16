import React from 'react'

import FlagList from './FlagList'
import FlagView from './FlagView'
import FlagLoad from './FlagLoad'

import {
  getReferee,
  winnerUsrMsg,
  preVoteUsrMsg,
  preVoteRefMsg,
  postVoteUsrMsg,
  postVoteRefMsg
} from '../../utils/tools'

class Flag extends React.Component {
  render() {
    const isReferee = getReferee()
    const { voteFlag, resetFlag, selectFlag, removeFlag } = this.props
    const { flags, winner, voteOpen, flagVoted, flagSelected } = this.props

    return (
      <div>
        {/* Question */}
        {isReferee
          ? flagVoted
            ? postVoteRefMsg
            : preVoteRefMsg(flagSelected)
          : flagVoted
            ? postVoteUsrMsg
            : !voteOpen
              ? winnerUsrMsg(winner)
              : preVoteUsrMsg(flagSelected)}

        {/* Main */}
        <div className="Flag">
          {flagVoted ? (
            <FlagLoad onReset={resetFlag} />
          ) : flagSelected ? (
            <FlagView
              voteFlag={voteFlag}
              removeFlag={removeFlag}
              flagSelected={flagSelected}
              amount={flagSelected.amount}
            />
          ) : (
            <FlagList
              flags={flags}
              winner={winner}
              voteOpen={voteOpen}
              onSelect={selectFlag}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Flag
