import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

class FlagDash extends Component {
  render() {
    const isOpen = this.props.isOpen
    return (
      <div>
        <Overdrive id="dash-toggle">
          <div
            className="FlagDashToggle"
            onClick={this.props.toggleDash}
            style={{ bottom: !isOpen ? '20px' : '140px' }}
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
          >
            <ul className="FlagList FlagDash">
              {this.props.transactions.map(flag => (
                <li className="FlagListItem FlagDashItem">
                  <div>
                    <span
                      className="FlagListImage FlagDashImage"
                      style={{
                        backgroundImage: `url(${require(`../../node_modules/flag-icon-css/flags/1x1/${
                          flag.code
                        }.svg`)})`
                      }}
                    />
                  </div>
                  <div>
                    <div className="FlagListTitle">{flag.country}</div>
                    <div className="FlagListDescription">
                      {flag.description} ETH
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Overdrive>
      </div>
    )
  }
}

export default FlagDash
