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
            {this.props.transactions.length ? (
              <ul className="FlagList FlagDash">
                {this.props.transactions.map((flag, index) => (
                  <li
                    key={index}
                    className="FlagListItem FlagDashItem"
                    onClick={() =>
                      window.open('https://etherscan.io/', '_blank')
                    }
                  >
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
            ) : (
              <ul
                className="FlagList FlagDash"
                style={{ justifyContent: 'center' }}
              >
                <li
                  style={{ border: 'none' }}
                  className="FlagListItem FlagDashItem"
                >
                  <div className="FlagListTitle">
                    No Past Transactions! <br /> Please vote for a team...
                  </div>
                </li>
              </ul>
            )}
          </div>
        </Overdrive>
      </div>
    )
  }
}

export default FlagDash
