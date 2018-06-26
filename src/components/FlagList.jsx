import React from 'react'

const flags = ['IN', 'GB', 'US', 'CN', 'TV', 'IO', 'VN', 'IT']

class FlagList extends React.Component {
  render() {
    return (
      <ul className="genb-flag-list-ul">
        {flags.map(flag => (
          <li className="genb-flag-list-li">
            <div>
              <div className="genb-flag-list-img">
                <span />
              </div>
              <div className="genb-flag-list-title">{flag}</div>
              <div className="genb-flag-list-description">
                {flag}
                {flag}
                {flag}
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default FlagList
