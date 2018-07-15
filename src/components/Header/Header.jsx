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

        <div className="HeaderContent">
          {/* Status */}
          <div className="Status">
            <div
              className="Dot"
              id={`Dot${this.state.statusOpen ? 'Green' : 'Red'}`}
            />
            <h2 className="HeaderText">
              Voting is
              <strong>{this.state.statusOpen ? ' OPEN' : ' CLOSED'}</strong>
            </h2>
          </div>

          {/* Details */}
          <p className="HeaderText">
            Votes Received: <strong>N</strong>
          </p>
          <p className="HeaderText">
            Total Stake: <strong>1.03 ETH</strong>
          </p>
        </div>
      </div>
    )
  }
}

export default Header
