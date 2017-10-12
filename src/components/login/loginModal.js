import React from 'react'
// import { getUser } from '$service/user'
import { bind } from 'decko'
import {
  Modal
} from 'antd'
import LoginForm from './form'
class LoginModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  @bind
  show () {
    this.setState({
      visible: true
    })
  }

  @bind
  cancel () {
    this.setState({
      visible: false
    })
  }

  @bind
  handleSucc (user) {
    this.setState({
      visible: false
    })
    this.props.handleSucc(user)
  }

  render () {
    return (
      <Modal
        visible={this.state.visible}
        footer={false}
        onCancel={this.cancel}
      >
        <LoginForm handleSucc={this.handleSucc}/>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  handleSucc: React.PropTypes.func
}

export default LoginModal
