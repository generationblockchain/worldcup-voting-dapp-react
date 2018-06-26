import React from 'react'
import { render } from 'react-dom'

import Particles from './Particles'
import App from './App'

import './index.css'

render(
  <main>
    <Particles />
    <App />
  </main>,
  document.getElementById('root')
)
