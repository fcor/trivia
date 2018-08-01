import React, { Component } from 'react'
import PropTypes from 'prop-types'
import perfect from '../assets/perfect.png'
import emoji1 from '../assets/1.png'
import emoji2 from '../assets/2.png'
import emoji3 from '../assets/3.png'
import Button from './Button'

const getScore = (answers, questions) => {
  let score = 0
  questions.map((item, index) =>{
    if(item.correct_answer === answers[index]){
      score++
    }
  })
  return score
}

const escapeChars = (string) => {
  return string
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&epsilon;/g, 'ε')
      .replace(/&Phi;/g, 'φ')
      .replace(/&ocirc;/g, 'Ô')
}

const isCorrect = (answer, question) => {
  if (answer === question.correct_answer) {
    return true
  }
  return false
}

const getCs = (question, answer) =>{
  const match = isCorrect(answer, question)
  if (match) {
    return "results-question match"
  }
  return "results-question"
}

class Results extends Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.playAgain()
  }

  render() {
    const { answers, questions } = this.props
    const score = getScore(answers, questions)
    return(
      <div className="results column">
        <Emoji score={score} />
        <Score score={score} />
        <Questions
          questions={questions}
          answers={answers}
        />
        <Button
          onClick={this.handleClick}
          variant="big"
          >
            PLAY AGAIN
          </Button>
      </div>
    )
  }
}


Results.propTypes = {
  playAgain: PropTypes.func.isRequired,
}

const Emoji = ({ score }) => {
  let emoji
  if (score === 10) {
    emoji = perfect
  } else if (score < 10 && score > 6) {
    emoji = emoji3
  } else if (score < 7 && score > 3) {
    emoji = emoji2
  } else {
    emoji = emoji1
  }

  return(
    <img src={emoji}
      alt="emoji"
      className="results-emoji"
    />
  )
}

const Score = ({ score }) =>
  <div className="column">
    <p className="results-score-text">
      {score === 10 ? (
        'PERFECT SCORE'
      ) : (
        'YOU SCORED'
      )}
    </p>
    <p className="results-score-text score">{`${score}/10`}</p>
  </div>

const Questions = ({ questions, answers }) => (
  <div className="results-questions column">
    {questions.map((item, index) => {
      return (
        <div className={getCs(item, answers[index])}>
          {escapeChars(item.question)}
        </div>
      )
    })}
  </div>
)

export default Results
