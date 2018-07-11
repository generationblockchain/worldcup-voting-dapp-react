import React from 'react'
import { render } from 'react-dom'

import './index.css'

import App from './components/App'
import Particles from './components/Particles'

render(
  <main>
    <App />
    <Particles />
  </main>,
  document.getElementById('root')
)
