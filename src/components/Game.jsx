import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
// import { CSSTransition } from "react-transition-group"
import Button from './Button'
import BouncingLoader from './BouncingLoader'
import logo from '../assets/trivia.png'

const selectQuestion = (questions, step) => {
  return questions[step].question.replace(/&quot;/g, '"')
}

class Game extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      questions: [],
      answers: {},
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
    const newAnswer = { [step]: answer }
    // const newStep = step + 1
    if (step === 9) {
      this.setState(prevState => ({
        answers: {...prevState.answers, ...newAnswer},
      }), () => this.props.gameOver(this.state.questions, this.state.answers))
    } else {
      this.setState({
        answers: {...answers, ...newAnswer},
        step: step + 1
      })
    }
  }

  render() {
    const { error, isLoading, step, questions } = this.state
    let question
    if (!isLoading && questions.length > 0) {
      question = selectQuestion(questions, step)
    }
    return(
      <div>
        { error ? (
          <p className="error">Something went wrong :(</p>
        ) : (
          <CardWithLoading
            isLoading={isLoading}
            question={question}
            handleAnswer={this.handleAnswer}
          />
        )}
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
          onClick={() => handleAnswer('true')}
          >
          TRUE
        </Button>
        <Button
          variant="false"
          onClick={() => handleAnswer('false')}
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
