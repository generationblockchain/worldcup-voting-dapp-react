import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

class FlagList extends Component {
  render() {
    return (
      <div className="FlagList">
        <ul className="FlagListContent">
          {this.props.flags.map(flag => (
            <li
              key={flag.code}
              className="FlagListItem"
              onClick={() => this.props.onSelect(flag)}
            >
              <div className="FlagListContainer">
                <Overdrive id={flag.code} duration={100}>
                  <span
                    className="FlagListImage"
                    style={{
                      backgroundImage: `url(${require(`flag-icon-css/flags/1x1/${
                        flag.code
                      }.svg`)})`
                    }}
                  />
                </Overdrive>
              </div>
              <div className="FlagListTitle">{flag.country}</div>
              <div className="FlagListDescription">
                {flag.votes
                  ? `${flag.votes} votes | ${flag.stake} ETH`
                  : `${flag.amount} ETH`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default FlagList
