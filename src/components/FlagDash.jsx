import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

class FlagDash extends Component {
  state = {
    isOpen: false
  }

  render() {
    const isOpen = this.state.isOpen
    return (
      <div className="FlagDash">
        <Overdrive id="dash-toggle">
          <div
            className="FlagDashToggle"
            style={{ bottom: !isOpen ? '20px' : '140px' }}
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            {isOpen
              ? '⤋ Hide Past Transactions ⤋'
              : '⥣ Show Past Transactions ⥣'}
          </div>
        </Overdrive>
        <Overdrive id="dash-view">
          <div
            className="FlagDashView"
            style={{ bottom: isOpen ? 0 : '-120px' }}
          />
        </Overdrive>
      </div>
    )
  }
}

export default FlagDash
