import React from 'react'
import classNames from 'classnames'
import Overdrive from 'react-overdrive'

class FlagList extends React.Component {
  render() {
    const { winner, voteOpen } = this.props

    return (
      <div className="FlagList">
        <ul className="FlagListContent">
          {this.props.flags.map(flag => (
            <li
              key={flag.code}
              onClick={() => {
                if (voteOpen) this.props.onSelect(flag)
              }}
              className={classNames('FlagListItem', {
                FlagListItemWon: !voteOpen && winner.code === flag.code,
                FlagListItemLost: !voteOpen && winner.code !== flag.code
              })}
            >
              <div className="FlagListContainer">
                <Overdrive id={flag.code} duration={100}>
                  <span
                    className={classNames('FlagListImage', {
                      FlagListImageWon: !voteOpen && winner.code === flag.code,
                      FlagListImageLost: !voteOpen && winner.code !== flag.code
                    })}
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
                {!voteOpen && winner.code === flag.code
                    ? `${flag.votes} voters split ${flag.stake.toFixed(3)} ETH`
                    : `${flag.votes} ${flag.votes == 1 ? 'vote' : 'votes'} | ${flag.stake.toFixed(3)} ETH`
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default FlagList
