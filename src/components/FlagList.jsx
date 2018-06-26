import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

const flags = ['IN', 'GB', 'US', 'CN', 'TV', 'IO', 'VN', 'IT']

class FlagList extends Component {
  render() {
    return (
      <ul className="FlagList">
        {flags.map(flag => (
          <li
            key={flag}
            className="FlagListItem"
            onClick={() => this.props.onSelect(flag)}
          >
            <div className="FlagListImage">
              <Overdrive id={flag}>
                <span
                  className="FlagImage"
                  style={{
                    backgroundImage: `url(${require(`../../node_modules/flag-icon-css/flags/1x1/${flag.toLowerCase()}.svg`)})`
                  }}
                />
              </Overdrive>
            </div>
            <div className="FlagListTitle">{flag}</div>
            <div className="FlagListDescription">
              {flag}
              {flag}
              {flag}
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default FlagList
