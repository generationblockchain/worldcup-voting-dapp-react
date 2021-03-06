import React from 'react'
import Overdrive from 'react-overdrive'

class Dashboard extends React.Component {
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
                {this.props.transactions.map((txn, index) => (
                  <li
                    key={index}
                    className="FlagListItem FlagDashItem"
                    onClick={() =>
                      window.open(`https://ropsten.etherscan.io/address/${txn.txnId}`, '_blank')
                    }
                  >
                    <div>
                      <span
                        className="FlagListImage FlagDashImage"
                        style={{
                          backgroundImage: `url(${require(`flag-icon-css/flags/1x1/${
                            txn.code
                          }.svg`)})`
                        }}
                      />
                    </div>
                    <div>
                      <div className="FlagListTitle">{txn.country}</div>
                      <div className="FlagListDescription">
                        {txn.amount} ETH
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
                  id="transactions"
                  className="FlagListItem FlagDashItem"
                  style={{ border: 'none', textAlign: 'center', width: '100%' }}
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

export default Dashboard
