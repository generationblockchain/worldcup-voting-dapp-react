import React, { Component } from 'react'
import Overdrive from 'react-overdrive'
import ReactTooltip from 'react-tooltip'

import { getReferee } from '../../utils/tools'

import Remove from 'react-icons/lib/io/ios-close-empty'
import Success from 'react-icons/lib/io/ios-checkmark-empty'

const actionStyles = (side, selected) => ({
  margin: selected ? '0 150px' : null,
  [side]: selected ? 0 : null
})

class FlagView extends Component {
  state = { amount: this.props.amount }

  changeAmount = event => {
    const amount = event.target.value
    const isShort = amount.length < 10
    const isValid = Number(amount) || Number(amount) === 0

    if (isShort && isValid) this.setState({ amount })
  }

  render() {
    const isReferee = getReferee()
    const { flagSelected } = this.props
    const { voteFlag, removeFlag } = this.props

    return (
      <div className="FlagView">
        {/* Left Button */}
        <div className="FlagSide">
          <Overdrive id="remove">
            <Remove
              data-tip
              data-for="tip-r"
              onClick={removeFlag}
              className="FlagSideIcon FlagSideIconClose"
              style={actionStyles('left', flagSelected)}
            />
          </Overdrive>
        </div>

        {/* Main */}
        <div className="FlagViewContent">
          <Overdrive id={flagSelected.code}>
            <span
              className="FlagViewImage"
              style={{
                backgroundImage: `url(${require(`flag-icon-css/flags/4x3/${
                  flagSelected.code
                }.svg`)})`
              }}
            />
          </Overdrive>

          {!isReferee ? (
            <input
              data-tip
              type="text"
              data-for="amount"
              placeholder="000"
              value={this.state.amount}
              className="FlagAmountTitle"
              onChange={this.changeAmount}
            />
          ) : null}

          {!isReferee ? (
            <input
              disabled
              type="text"
              value="ETH"
              className="FlagAmountTitle"
            />
          ) : null}
        </div>

        {/* Right Button */}
        <div className="FlagSide">
          <Overdrive id="success">
            <Success
              data-tip
              data-for="tip-s"
              className="FlagSideIcon FlagSideIconCheck"
              onClick={() => voteFlag(this.state.amount)}
              style={actionStyles('right', flagSelected)}
            />
          </Overdrive>
        </div>

        <div className="FlagAction">
          <button
            id="vote"
            type="button"
            onClick={voteFlag}
            className="FlagAction"
          >
            Vote
          </button>
          <button
            id="cancel"
            type="button"
            onClick={removeFlag}
            className="FlagAction"
          >
            Cancel
          </button>
        </div>

        {/* Tooltip */}
        <ReactTooltip id="tip-r" place="left" type="error" effect="solid">
          Cancel
        </ReactTooltip>
        <ReactTooltip id="tip-s" place="right" type="success" effect="solid">
          Vote
        </ReactTooltip>
        <ReactTooltip id="amount" place="top" type="dark" effect="solid">
          Enter Vote Amount
        </ReactTooltip>
      </div>
    )
  }
}

export default FlagView
