import React from 'react'
import Header from './components/includes/header'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='wrap main'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.any
}

export default App
