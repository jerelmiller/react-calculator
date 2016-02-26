const { Component } = React

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const push = (arr, value) => [...arr, value]
const intFromString = string => parseInt(string, 10)
const identity = val => val

const calculateValue = (stack, operation) => stack.reduce(operation)
const concatDisplay = (state, digit) => (
  state.digitPressed ? intFromString(`${state.display}${digit}`) : digit
)

const bindAction = (handler, action) => () => handler(action)

const initialState = {
  display: 0,
  digitPressed: false,
  operation: identity,
  stack: []
}

const pressDigit = digit => ({
  type: 'PRESS_DIGIT',
  digit
})

const pressOperation = operation => ({
  type: 'PRESS_OPERATION',
  operation
})

const pressEqual = () => ({ type: 'PRESS_EQUAL' })
const pressClear = () => ({ type: 'PRESS_CLEAR' })

const calculateState = (state = initialState, action) => {
  switch (action.type) {
    case 'PRESS_DIGIT':
      return Object.assign({}, state, {
        display: concatDisplay(state, action.digit),
        digitPressed: true
      })
    case 'PRESS_OPERATION':
      return Object.assign({}, state, {
        operation: action.operation,
        stack: push(state.stack, intFromString(state.display)),
        digitPressed: false
      })
    case 'PRESS_EQUAL':
      const finalStack = push(state.stack, intFromString(state.display))

      return Object.assign({}, state, {
        stack: [],
        operation: identity,
        display: calculateValue(finalStack, state.operation),
        digitPressed: false
      })
    case 'PRESS_CLEAR':
      return initialState
    default:
      return state
  }
}

const Button = ({ label, onClick, style }) => (
  <button className='calculator-button' onClick={ onClick } style={ style }>
    { label }
  </button>
)

const Display = ({ value }) => (
  <div className='calculator-display'>{ value }</div>
)

class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = calculateState(undefined, {})
    this.handleAction = this.handleAction.bind(this)
  }

  handleAction(action) {
    this.setState(calculateState(this.state, action))
  }

  render() {
    const { display } = this.state

    return (
      <div className='calculator-body'>
        <Display value={ display } />
        <div className='calculator-buttons'>
          <Button label='7' onClick={ bindAction(this.handleAction, pressDigit(7)) } />
          <Button label='8' onClick={ bindAction(this.handleAction, pressDigit(8)) } />
          <Button label='9' onClick={ bindAction(this.handleAction, pressDigit(9)) } />
          <Button
            label='%'
            onClick={ () => this.handleAction(pressOperation(divide)) }
          />
          <Button label='4' onClick={ bindAction(this.handleAction, pressDigit(4)) } />
          <Button label='5' onClick={ bindAction(this.handleAction, pressDigit(5)) } />
          <Button label='6' onClick={ bindAction(this.handleAction, pressDigit(6)) } />
          <Button
            label='&times;'
            onClick={ bindAction(this.handleAction, pressOperation(multiply)) }
          />
          <Button label='1' onClick={ bindAction(this.handleAction, pressDigit(1)) } />
          <Button label='2' onClick={ bindAction(this.handleAction, pressDigit(2)) } />
          <Button label='3' onClick={ bindAction(this.handleAction, pressDigit(3)) } />
          <Button
            label='-'
            onClick={ bindAction(this.handleAction, pressOperation(subtract)) }
          />
          <Button label='0' onClick={ bindAction(this.handleAction, pressDigit(0)) } />
          <Button label='C' onClick={ bindAction(this.handleAction, pressClear()) } />
          <Button
            label='='
            onClick={ bindAction(this.handleAction, pressEqual()) }
            style={ styles.equalsButton }
          />
          <Button
            label='+'
            onClick={ bindAction(this.handleAction, pressOperation(add)) }
          />
        </div>
      </div>
    )
  }
}

const styles = {
  equalsButton: {
    background: '#4d90fe',
    color: '#fff'
  }
}


ReactDOM.render(<Calculator />, document.getElementById('root'))
