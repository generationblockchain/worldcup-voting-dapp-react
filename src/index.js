import React from 'react'
import ReactDOM from 'react-dom'
import Particles from 'react-particles-js'

import App from './App'
import particlesjsConfig from '../particlesjs-config.json'

import './css/pure-min.css'
import './index.css'

ReactDOM.render(
  <main className="genb-main">
    <Particles className="genb-particles" params={particlesjsConfig} />
    <App />
  </main>,
  document.getElementById('root')
)
