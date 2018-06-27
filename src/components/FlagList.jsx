import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

const flags = [
  { code: 'in', country: 'India', description: 'Description' },
  { code: 'gb', country: 'United Kingdom', description: 'Description' },
  { code: 'us', country: 'United States', description: 'Description' },
  { code: 'cn', country: 'China', description: 'Description' },
  { code: 'tv', country: 'Tuvalu', description: 'Description' },
  { code: 'au', country: 'Australia', description: 'Description' },
  { code: 'vn', country: 'Venezula', description: 'Description' },
  { code: 'it', country: 'Italy', description: 'Description' }
]

class FlagList extends Component {
  render() {
    return (
      <ul className="FlagList">
        {flags.map(flag => (
          <li
            key={flag.code}
            className="FlagListItem"
            onClick={() => this.props.onSelect(flag)}
          >
            <div className="FlagListImage">
              <Overdrive id={flag.code}>
                <span
                  className="FlagImage"
                  style={{
                    backgroundImage: `url(${require(`../../node_modules/flag-icon-css/flags/1x1/${
                      flag.code
                    }.svg`)})`
                  }}
                />
              </Overdrive>
            </div>
            <div className="FlagListTitle">{flag.country}</div>
            <div className="FlagListDescription">{flag.description}</div>
          </li>
        ))}
      </ul>
    )
  }
}

export default FlagList
