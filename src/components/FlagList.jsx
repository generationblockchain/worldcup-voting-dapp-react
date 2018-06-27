import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

const flags = [
  { code: 'br', country: 'Brazil', description: 'Description' },
  { code: 'de', country: 'Germany', description: 'Description' },
  { code: 'it', country: 'Italy', description: 'Description' },
  { code: 'ar', country: 'Argentina', description: 'Description' },
  { code: 'uy', country: 'Uruguay', description: 'Description' },
  { code: 'fr', country: 'France', description: 'Description' },
  { code: 'gb', country: 'England', description: 'Description' },
  { code: 'es', country: 'Spain', description: 'Description' }
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
              <Overdrive id={flag.code} duration={100}>
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
