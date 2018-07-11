import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

class FlagView extends Component {
  state = {
    amount: this.props.amount || 0.000001
  }

  changeAmount = event => {
    const amount = event.target.value
    if (Number(amount) && amount.length < 10) this.setState({ amount })
  }

  render() {
    return (
      <div className="FlagView">
        <Overdrive id={this.props.selected.code}>
          <span
            className="FlagViewImage"
            style={{
              backgroundImage: `url(${require(`flag-icon-css/flags/4x3/${
                this.props.selected.code
              }.svg`)})`
            }}
          />
        </Overdrive>

        <input
          disabled
          type="text"
          value={this.state.amount}
          className="FlagAmountTitle"
          onChange={this.changeAmount}
        />
        <input
          disabled
          type="text"
          value="ETH"
          style={{ width: '123px' }}
          className="FlagAmountTitle"
        />
        <div className="FlagAction">
          <button
            id="vote"
            type="button"
            className="FlagAction"
            onClick={this.props.onVote}
          >
            Vote
          </button>
          <button
            id="cancel"
            type="button"
            className="FlagAction"
            onClick={this.props.onRemove}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default FlagView
