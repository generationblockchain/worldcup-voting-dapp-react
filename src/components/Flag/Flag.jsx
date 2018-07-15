import React from 'react'

import FlagList from './FlagList'
import FlagView from './FlagView'
import FlagLoad from './FlagLoad'

import {
  getReferee,
  preVoteUsrMsg,
  preVoteRefMsg,
  postVoteUsrMsg,
  postVoteRefMsg
} from '../../utils/tools'

class Flag extends React.Component {
  render() {
    const isReferee = getReferee()
    const { flags, flagVoted, flagSelected } = this.props
    const { voteFlag, resetFlag, selectFlag, removeFlag } = this.props

    return (
      <div>
        {/* Question */}
        {isReferee
          ? flagVoted
            ? postVoteRefMsg
            : preVoteRefMsg(flagSelected)
          : flagVoted
            ? postVoteUsrMsg
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
            <FlagList flags={flags} onSelect={selectFlag} />
          )}
        </div>
      </div>
    )
  }
}

export default Flag
