import React, { Component } from 'react'

class FlagLoad extends Component {
  state = {
    amount: this.props.amount || 0.000001
  }

  changeAmount = event => {
    const amount = event.target.value
    if (Number(amount) && amount.length < 10) this.setState({ amount })
  }

  render() {
    return (
      <div id="container">
        <div id="stars" />
        <div id="wrapper">
          <div className="ball" id="ball-top" />
          <div className="ball" id="ball-bottom" />
        </div>
      </div>
    )
  }
}

export default FlagLoad
