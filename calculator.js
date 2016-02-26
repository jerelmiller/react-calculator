const { Component } = React

const ADD = 'ADD'
const SUBSTRACT = 'SUBSTRACT'
const MULTIPLY = 'MULTIPLY'
const DIVIDE = 'DIVIDE'

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const operate = (a, b, operation) => {
  switch (operation) {
    case ADD:
      return add(a, b)
    case SUBSTRACT:
      return subtract(a, b)
    case MULTIPLY:
      return multiply(a, b)
    case DIVIDE:
      return divide(a, b)
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

    this.state = {
      display: '0',
      digitPressed: false,
      operation: null,
      stack: []
    }
  }

  handleNumberClick(number) {
    let { display, digitPressed } = this.state
    display = digitPressed ? `${display}${number}` : number

    this.setState({ display, digitPressed: true })
  }

  handleOperationClick(operation) {
    let { display, stack } = this.state
    stack = [...stack, parseInt(display, 10)]

    if (this.state.operation) {
      this.handleEqualClick()
    }

    this.setState({ stack, operation, digitPressed: false })
  }

  handleEqualClick() {
    let { display, operation, stack } = this.state
    stack = [...stack, parseInt(display, 10)]
    const memo = stack.shift()
    display = stack.reduce((memo, num) => operate(memo, num, operation), memo)

    this.setState({ stack: [], operation: null, display, digitPressed: false })
  }

  handleClear() {
    this.setState({
      display: '0',
      stack: [],
      operation: null,
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
            onClick={ () => this.handleOperationClick(DIVIDE) }
          />
          <Button label='4' onClick={ () => this.handleNumberClick(4) } />
          <Button label='5' onClick={ () => this.handleNumberClick(5) } />
          <Button label='6' onClick={ () => this.handleNumberClick(6) } />
          <Button
            label='&times;'
            onClick={ () => this.handleOperationClick(MULTIPLY) }
          />
          <Button label='1' onClick={ () => this.handleNumberClick(1) } />
          <Button label='2' onClick={ () => this.handleNumberClick(2) } />
          <Button label='3' onClick={ () => this.handleNumberClick(3) } />
          <Button
            label='-'
            onClick={ () => this.handleOperationClick(SUBSTRACT) }
          />
          <Button
            label='0'
            onClick={ () => this.handleNumberClick(0) }
            style={ styles.zeroButton }
          />
          <Button label='C' onClick={ () => this.handleClear() } />
          <Button
            label='='
            onClick={ () => this.handleEqualClick() }
            style={ styles.equalsButton }
          />
          <Button
            label='+'
            onClick={ () => this.handleOperationClick(ADD) }
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
