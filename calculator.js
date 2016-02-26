const { Component } = React

const Button = ({ label, onClick, style }) => (
  <button className='calculator-button' onClick={ onClick } style={ style }>
    { label }
  </button>
)

const Display = () => (
  <div className='calculator-display'>0</div>
)


class Calculator extends Component {
  render() {
    return (
      <div className='calculator-body'>
        <Display />
        <div className='calculator-buttons'>
          <Button label='7' onClick={ () => {} } />
          <Button label='8' onClick={ () => {} } />
          <Button label='9' onClick={ () => {} } />
          <Button label='%' onClick={ () => {} } />
          <Button label='4' onClick={ () => {} } />
          <Button label='5' onClick={ () => {} } />
          <Button label='6' onClick={ () => {} } />
          <Button label='&times;' onClick={ () => {} } />
          <Button label='1' onClick={ () => {} } />
          <Button label='2' onClick={ () => {} } />
          <Button label='3' onClick={ () => {} } />
          <Button label='-' onClick={ () => {} } />
          <Button label='0' onClick={ () => {} } style={ styles.zeroButton } />
          <Button label='=' onClick={ () => {} } style={ styles.equalsButton }/>
          <Button label='+' onClick={ () => {} } />
        </div>
      </div>
    )
  }
}

const styles = {
  zeroButton: {
    width: '49%'
  },
  equalsButton: {
    background: '#4d90fe',
    color: '#fff'
  }
}


ReactDOM.render(<Calculator />, document.getElementById('root'))
