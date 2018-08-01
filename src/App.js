import React, { Component } from 'react'
import Onboarding from './components/Onboarding'
import Game from './components/Game'
import Results from './components/Results'
import './App.css'

const darkBG = '#2A7D57'
const lightBG = '#58FCB0'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      playground: 'ONBOARDING',
      bgColor: lightBG,
      questions: [],
      answers: []
    }
    this.toggleBg = this.toggleBg.bind(this)
    this.letsPlay = this.letsPlay.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.playAgain = this.playAgain.bind(this)
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

  gameOver(questions, answers){
    this.setState({
      questions,
      answers,
      playground: 'RESULTS',
      bgColor: darkBG
    })
  }

  playAgain(){
    this.setState({
      playground: 'GAME',
      bgColor: lightBG
    })
  }

  render() {
    const { bgColor, playground, questions, answers } = this.state

    const selectContent = (playground) =>{
      if (playground === 'ONBOARDING') {
        return <Onboarding
                  toggleBg={this.toggleBg}
                  letsPlay={this.letsPlay}
                />
      } else if (playground === 'GAME') {
        return <Game gameOver={this.gameOver} />
      }
      return <Results
                questions={questions}
                answers={answers}
                playAgain={this.playAgain}
              />
    }

    return (
      <div className="app" style={{ backgroundColor: bgColor }}>
        {selectContent(playground)}
      </div>
    )
  }
}

export default App
