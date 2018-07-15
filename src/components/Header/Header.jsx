import React from 'react'

class Header extends React.Component {
  state = {
    statusOpen: true
  }

  render() {
    return (
      <div className="Header">
        {/* Logo */}
        <a className="Logo" href="https://generationblockchain.io">
          <img
            src="/logo.png"
            className="LogoImage"
            alt="Generation Blockchain Logo"
          />
        </a>

        {/* Status */}
        <div className="Status">
          <div
            className="Dot"
            id={`Dot${this.state.statusOpen ? 'Green' : 'Red'}`}
          />
          <h2 className="Question">
            Voting is {this.state.statusOpen ? 'OPEN' : 'CLOSED'}
          </h2>
        </div>

        {/* Details */}
        <div className="Details">
          <p className="Question">
            Votes Received: <strong>N</strong>
          </p>
          <p className="Question">
            Total Stake: <strong>1.03 ETH</strong>
          </p>
        </div>
      </div>
    )
  }
}

export default Header
