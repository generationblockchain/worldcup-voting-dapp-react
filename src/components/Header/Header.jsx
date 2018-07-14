import React from 'react'

class Header extends React.Component {
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
          <div id="DotRed" className="Dot" />
          <h2 className="Question">Voting is OPEN</h2>
        </div>

        {/* Details */}
        <div className="Details">
          <h2 className="Question">Voting is OPEN</h2>
        </div>
      </div>
    )
  }
}

export default Header
