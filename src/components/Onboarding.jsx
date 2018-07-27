import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import logo from '../assets/trivia.png'

const setNextStep = (step) => {
  if (step === 'ONE') {
    return 'TWO'
  }
  return 'THREE'
}

const selectButtonText = (step) => step === 'TWO' ? 'NEXT' : 'BEGIN'

const selectText = (step) => (
  step === 'TWO'
    ? 'You will be presented with 10 True or False questions.'
    : 'We are going to test your knowledge on different categories.'
)

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
        {step === 'ONE'
          ? <StepOne handleNext={this.handleNext} />
          : <StepTwoThree handleNext={this.handleNext} step={step} />
        }

      </div>
    )
  }
}

Onboarding.propTypes = {
  toggleBg: PropTypes.func.isRequired,
};

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
  const text = selectText(step)
  return(
    <div className="onboarding-step-two column">
      <div className="onboarding-top column">
        {step === 'TWO' && (
          <Welcome />
        )}
        <p className="onboarding-text" >
          {text}
        </p>
        {step === 'THREE' && (
          <Score />
        )}
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

const Welcome = () =>
  <p className="onboarding-title" >
    Welcome to the Trivia challenge!
  </p>

const Score = () =>
  <p className="onboarding-text score" >
    Can you score 100%?
  </p>

const Circles = ({step}) =>
  <div className="onboarding-circles row">
    <div className={getCs(step, 'TWO')}></div>
    <div className={getCs(step, 'THREE')}></div>
  </div>

export default Onboarding
