import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from "react-transition-group"
import Button from './Button'
import logo from '../assets/trivia.png'

const setNextStep = (step) => {
  if (step === 'ONE') {
    return 'TWO'
  }
  return 'THREE'
}

const selectButtonText = (step) => step === 'TWO' ? 'NEXT' : 'BEGIN'

const getCs = (currentStep, refStep) => {
  if (currentStep === refStep) {
    return 'circle selected'
  }
  return 'circle'
}

class Onboarding extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 'ONE',
    }
    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { step } = this.state

    if (step === 'THREE') {
      this.props.letsPlay()
    }

    const nextStep = setNextStep(step)

    if (nextStep === 'TWO') {
      this.props.toggleBg()
    }

    this.setState({
      step: nextStep
    })
  }

  render() {
    const { step } = this.state

    return(
      <div>
        {step === 'ONE' ? (
          <StepOne handleNext={this.handleNext} />
        ) : (
          <StepTwoThree
            handleNext={this.handleNext}
            step={step}
          />
        )}

      </div>
    )
  }
}

Onboarding.propTypes = {
  toggleBg: PropTypes.func.isRequired,
  letsPlay: PropTypes.func.isRequired,
}

const StepOne = ({ handleNext }) =>
  <div className="onboarding-step-one column">
    <img
      src={logo}
      alt="logo"
      className="onboarding-logo"
    />
    <Button
      onClick={handleNext}
      variant={"big"}
      >
      LET'S BEGIN!
    </Button>
  </div>

const StepTwoThree = ({ handleNext, step }) => {
  const buttontext = selectButtonText(step)
  return(
    <div className="onboarding-step-two column">
      <div className="box"></div>
      <div className="onboarding-top column">
        <CSSTransition
          unmountOnExit
          in={step === "TWO"}
          timeout={250}
          classNames="two"
          >
          <Two />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          in={step === "THREE"}
          timeout={250}
          classNames="three"
          >
          <Three />
        </CSSTransition>
      </div>
      <div className="onboarding-bottom column">
        <Circles step={step} />
        <Button
          onClick={handleNext}
          >
            {buttontext}
          </Button>
      </div>
    </div>
  )
}

const Two = () =>
  <div className="onboarding-top-rtg">
    <p className="onboarding-title" >
      Welcome to the Trivia challenge!
    </p>
    <p className="onboarding-text" >
      You will be presented with 10 True or False questions.
    </p>
  </div>

const Three = () =>
  <div className="onboarding-top-rtg">
    <p className="onboarding-text long" >
      We are going to test your knowledge on different categories.
      <br/>
      <br/>
      After that, you will get the results and play again.
    </p>
    <p className="onboarding-text score" >
      Can you score 100%?
    </p>
  </div>

const Circles = ({step}) =>
  <div className="onboarding-circles row">
    <div className={getCs(step, 'TWO')}></div>
    <div className={getCs(step, 'THREE')}></div>
  </div>

export default Onboarding
