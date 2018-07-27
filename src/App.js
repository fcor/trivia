import React, { Component } from 'react'
import Onboarding from './components/Onboarding'
import './App.css'

const darkBG = '#0E2E1F'
const lightBG = '#58FCB0'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      playground: 'ONBOARDING',
      bgColor: lightBG
    }
    this.toggleBg = this.toggleBg.bind(this)
  }

  toggleBg(){
    const { bgColor } = this.state
    const newBg = (bgColor === lightBG) ? darkBG : lightBG
    this.setState({
      bgColor: newBg
    })
  }

  render() {
    const { bgColor } = this.state
    return (
      <div className="app" style={{ backgroundColor: bgColor }}>
        <Onboarding toggleBg={this.toggleBg} />
      </div>
    )
  }
}

export default App
