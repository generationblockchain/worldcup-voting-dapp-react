import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

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

        <input
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
      </div>
    )
  }
}

export default FlagView
