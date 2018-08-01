import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
// import { CSSTransition } from "react-transition-group"
import Button from './Button'
import BouncingLoader from './BouncingLoader'
import logo from '../assets/trivia.png'

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

const selectQuestion = (questions, step) => {
  return escapeChars(questions[step].question)
}

const selectCategory = (questions, step) => {
  return questions[step].category.toUpperCase()
}

const getCs = (category) => {
  if (category.length <= 16 ) {
    return 'game-card-category'
  }
  return 'game-card-category long'
}

class Game extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      questions: [],
      answers: [],
      isLoading: true,
      error: null,
      step: 0
    };
    this.setQuestions = this.setQuestions.bind(this)
    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  componentDidMount(){
    this._isMounted = true
    this.fetchQuestions()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchQuestions = () => {
    this.setState({ isLoading: true })

    axios('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then(result => this.setQuestions(result.data.results))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  setQuestions(questions){
    this.setState({
      questions,
      isLoading: false
    })
  }

  handleAnswer(answer){
    const { step, answers } = this.state

    if (step === 9) {
      this.setState(prevState => ({
        answers: [...prevState.answers, answer],
      }), () => this.props.gameOver(this.state.questions, this.state.answers))
    } else {
      this.setState({
        answers: [...answers, answer],
        step: step + 1
      })
    }
  }

  render() {
    const { error, isLoading, step, questions } = this.state

    let question
    let category

    const isPlaying = !isLoading && questions.length > 0

    if (isPlaying) {
      question = selectQuestion(questions, step)
      category = selectCategory(questions, step)
    }

    return(
      <div>
        { isPlaying &&
            <p className={getCs(category)}>
              {`${category}`}
            </p>
        }
        { error ? (
          <p className="error">Something went wrong :(</p>
        ) : (
          <CardWithLoading
            isLoading={isLoading}
            question={question}
            handleAnswer={this.handleAnswer}
          />
        )}
        { isPlaying &&
            <p className="game-card-step">
              {`${step + 1}/10`}
            </p>
        }
      </div>
    )
  }
}

Game.propTypes = {
  gameOver: PropTypes.func.isRequired,
}

const Card = ({question, handleAnswer}) =>{
  return(
    <div className="game-card column">
      <div className="game-card-top">
        <img
          src={logo}
          alt="logo"
          className="game-card-logo"
        />
      </div>
      <div className="game-card-mid">
        <p className="game-card-question">
          {`${question}`}
        </p>
      </div>
      <div className="game-card-bottom column">
        <Button
          variant="true"
          onClick={() => handleAnswer('True')}
          >
          TRUE
        </Button>
        <Button
          variant="false"
          onClick={() => handleAnswer('False')}
          >
          FALSE
        </Button>
      </div>
    </div>
  )
}


const withLoading = (Component) => ({ isLoading,  ...rest  }) =>
  isLoading
  ? <BouncingLoader />
  : <Component { ...rest } />


const CardWithLoading = withLoading(Card);


export default Game
