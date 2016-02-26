const { Component } = React

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const push = (arr, value) => [...arr, value]
const intFromString = string => parseInt(string, 10)
const identity = val => val

const calculateValue = (stack, operation) => stack.reduce(operation)

const Button = ({ label, onClick, style }) => (
  <button className='calculator-button' onClick={ onClick } style={ style }>
    { label }
  </button>
)

const Display = ({ value }) => (
  <div className='calculator-display'>{ value }</div>
)

const calculateDisplay = (state, number) => (
  state.digitPressed ? intFromString(`${state.display}${number}`) : number
)

const initialState = {
  display: 0,
  digitPressed: false,
  operation: identity,
  stack: []
}

class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  handleNumberClick(number) {
    this.setState({
      display: calculateDisplay(this.state, number),
      digitPressed: true
    })
  }

  handleOperationClick(operation) {
    let { display, stack } = this.state

    this.setState({
      operation,
      stack: push(stack, intFromString(display)),
      digitPressed: false
    })
  }

  handleEqualClick() {
    const { display, operation, stack } = this.state
    const finalStack = push(stack, intFromString(display))

    this.setState({
      stack: [],
      operation: identity,
      display: calculateValue(finalStack, operation),
      digitPressed: false
    })
  }

  render() {
    const { display } = this.state

    return (
      <div className='calculator-body'>
        <Display value={ display } />
        <div className='calculator-buttons'>
          <Button label='7' onClick={ () => this.handleNumberClick(7) } />
          <Button label='8' onClick={ () => this.handleNumberClick(8) } />
          <Button label='9' onClick={ () => this.handleNumberClick(9) } />
          <Button
            label='%'
            onClick={ () => this.handleOperationClick(divide) }
          />
          <Button label='4' onClick={ () => this.handleNumberClick(4) } />
          <Button label='5' onClick={ () => this.handleNumberClick(5) } />
          <Button label='6' onClick={ () => this.handleNumberClick(6) } />
          <Button
            label='&times;'
            onClick={ () => this.handleOperationClick(multiply) }
          />
          <Button label='1' onClick={ () => this.handleNumberClick(1) } />
          <Button label='2' onClick={ () => this.handleNumberClick(2) } />
          <Button label='3' onClick={ () => this.handleNumberClick(3) } />
          <Button
            label='-'
            onClick={ () => this.handleOperationClick(subtract) }
          />
          <Button
            label='0'
            onClick={ () => this.handleNumberClick(0) }
            style={ styles.zeroButton }
          />
          <Button label='C' onClick={ () => this.setState(initialState) } />
          <Button
            label='='
            onClick={ () => this.handleEqualClick() }
            style={ styles.equalsButton }
          />
          <Button
            label='+'
            onClick={ () => this.handleOperationClick(add) }
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
