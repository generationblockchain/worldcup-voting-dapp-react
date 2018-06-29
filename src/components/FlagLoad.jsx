import React, { Component } from 'react'

const getRandom = size => Math.floor(Math.random() * size)

const updateStars = () => {
  const stars = document.getElementsByClassName('star')
  for (let i = 0; i < stars.length; i++) {
    const element = stars[i]
    element.style.top = getRandom(200) + 'px'
    element.style.left = getRandom(200) + 'px'
    element.style.opacity = (20 + getRandom(50)) / 100
  }
}

class FlagLoad extends Component {
  state = {
    interval: null
  }

  componentDidMount() {
    for (let i = 2; i < 12; i++) {
      var stars = document.getElementById('stars')
      stars.insertAdjacentHTML(
        'beforeend',
        `<div class="star-layer" style="transform: translateZ(${i}px) scale(${(15 -
          i) /
          15});"></div>`
      )
    }

    for (let i = 0; i < 70; i++) {
      const element = document.getElementsByClassName('star-layer')[
        getRandom(10)
      ]
      element.insertAdjacentHTML('beforeend', '<div class="star"></div>')
    }

    updateStars()

    const interval = setInterval(updateStars, 4000)

    this.setState({ interval })
  }

  componentWillUnmount() {
    if (this.state.interval) clearInterval(this.state.interval)
  }

  render() {
    return (
      <div className="FlagLoad">
        <div id="container">
          <div id="stars" />
          <div id="wrapper">
            <div className="ball" id="ball-top" />
            <div className="ball" id="ball-bottom" />
          </div>
        </div>
        <div
          className="FlagLoadMessage"
          onClick={this.props.onReset}
          style={{ position: 'relative', zIndex: 1 }}
        >
          Message
        </div>
        <div
          className="FlagLoadBack"
          onClick={this.props.onReset}
          style={{ position: 'relative', zIndex: 1 }}
        >
          BACK
        </div>
      </div>
    )
  }
}

export default FlagLoad
