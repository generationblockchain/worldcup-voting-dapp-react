import React from 'react'
import Overdrive from 'react-overdrive'
import ReactTooltip from 'react-tooltip'

import FlagList from './FlagList'
import FlagView from './FlagView'
import FlagLoad from './FlagLoad'

import Remove from 'react-icons/lib/io/ios-close-empty'
import Success from 'react-icons/lib/io/ios-checkmark-empty'

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

const actionStyles = (side, selected) => ({
  margin: selected ? '0 150px' : null,
  [side]: selected ? 0 : null
})

class Flag extends React.Component {
  render() {
    const flagVoted = this.props.flagVoted
    const flagSelected = this.props.flagSelected
    return (
      <div>
        {/* Tooltip */}
        <ReactTooltip id="tip-r" place="left" type="error" effect="solid">
          Cancel
        </ReactTooltip>
        <ReactTooltip id="tip-s" place="right" type="success" effect="solid">
          Vote
        </ReactTooltip>

        {/* Question */}
        {this.props.flagVoted ? (
          <h2 className="Question">Your vote has been submitted!</h2>
        ) : (
          <h2 className="Question">
            I want to vote for{flagSelected ? (
              <span style={{ fontWeight: 'bold', color: '#ff6f31' }}>
                {' '}
                {flagSelected.country}
                {'!'}
              </span>
            ) : (
              '...'
            )}
          </h2>
        )}
        {/* Main */}
        <div className="Flag">
          {/* Left Button */}
          <div className="FlagSide">
            <Overdrive id="remove">
              <Remove
                data-tip
                data-for="tip-r"
                onClick={this.removeFlag}
                className="FlagSideIcon FlagSideIconClose"
                style={actionStyles('left', flagSelected)}
              />
            </Overdrive>
          </div>

          {/* Flag */}
          {flagVoted ? (
            <FlagLoad onReset={this.resetFlag} />
          ) : flagSelected ? (
            <FlagView
              selected={flagSelected}
              onVote={this.voteFlag}
              onRemove={this.removeFlag}
              amount={flagSelected.description}
            />
          ) : (
            <FlagList flags={flags} onSelect={this.selectFlag} />
          )}

          {/* Right Button */}
          <div className="FlagSide">
            <Overdrive id="success">
              <Success
                data-tip
                data-for="tip-s"
                onClick={this.voteFlag}
                className="FlagSideIcon FlagSideIconCheck"
                style={actionStyles('right', flagSelected)}
              />
            </Overdrive>
          </div>
        </div>
      </div>
    )
  }
}

export default Flag
