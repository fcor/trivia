import React, { Component } from 'react'
import Onboarding from './components/Onboarding'
import Game from './components/Game'
import Results from './components/Results'
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
    this.letsPlay = this.letsPlay.bind(this)
  }

  toggleBg(){
    const { bgColor } = this.state
    const newBg = (bgColor === lightBG) ? darkBG : lightBG
    this.setState({
      bgColor: newBg
    })
  }

  letsPlay(){
    this.toggleBg()
    this.setState({
      playground: 'GAME'
    })
  }

  render() {
    const { bgColor, playground } = this.state

    const selectContent = (playground) =>{
      if (playground === 'ONBOARDING') {
        return <Onboarding toggleBg={this.toggleBg} letsPlay={this.letsPlay} />
      } else if (playground === 'GAME') {
        return <Game />
      }
      return <Results />
    }

    return (
      <div className="app" style={{ backgroundColor: bgColor }}>
        {selectContent(playground)}
      </div>
    )
  }
}

export default App
