import React, { Component } from 'react'
import Overdrive from 'react-overdrive'

class FlagSelect extends Component {
  render() {
    return (
      <div className="FlagSelect">
        <div className="FlagSelectActive">
          <div className="FlagSelectItem">
            <div className="FlagListImage">
              <Overdrive id={this.props.selected}>
                <span
                  className="FlagSelectImage"
                  style={{
                    backgroundImage: `url(${require(`../../node_modules/flag-icon-css/flags/4x3/${this.props.selected.toLowerCase()}.svg`)})`
                  }}
                />
              </Overdrive>
            </div>
            <div className="FlagListTitle">asdf</div>
          </div>
        </div>
      </div>
    )
  }
}

export default FlagSelect
