import React from 'react'

import FlagList from './FlagList'
import FlagView from './FlagView'
import FlagLoad from './FlagLoad'

class Flag extends React.Component {
  render() {
    const { flags, flagVoted, flagSelected } = this.props
    const { voteFlag, resetFlag, selectFlag, removeFlag } = this.props

    return (
      <div>
        {/* Question */}
        {flagVoted ? (
          <h2 className="Question">Your vote has been submitted!</h2>
        ) : (
          <h2 className="Question">
            I want to vote for{flagSelected ? (
              <span className="QuestionName">
                {` ${flagSelected.country}!`}
              </span>
            ) : (
              '...'
            )}
          </h2>
        )}

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
