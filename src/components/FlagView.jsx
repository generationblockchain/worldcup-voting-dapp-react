import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

import Remove from 'react-icons/lib/io/ios-close-outline'
import Success from 'react-icons/lib/io/ios-checkmark-outline'

class FlagView extends Component {
  state = {
    amount: 0.000001
  }

  changeAmount = event => {
    const amount = event.target.value
    if (Number(amount) && amount.length < 10) this.setState({ amount })
  }

  render() {
    return (
      <div className="FlagView">
        <Overdrive id="remove">
          <Remove
            onClick={this.props.onRemove}
            className="FlagViewIcon FlagViewIconClose"
          />
        </Overdrive>
        <Overdrive id="remove">
          <Success className="FlagViewIcon FlagViewIconCheck" />
        </Overdrive>

        <div className="FlagViewItem">
          <Overdrive id={this.props.selected.code}>
            <span
              className="FlagViewImage"
              style={{
                backgroundImage: `url(${require(`../../node_modules/flag-icon-css/flags/4x3/${
                  this.props.selected.code
                }.svg`)})`
              }}
            />
          </Overdrive>
          <div className="FlagViewDisplay">
            <input
              type="text"
              value={this.state.amount}
              className="FlagAmountTitle"
              onChange={this.changeAmount}
            />
            <input
              disabled
              type="text"
              value=" BTC"
              className="FlagAmountTitle"
              style={{ textAlign: 'left', width: '123px' }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FlagView
