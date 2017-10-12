import React from 'react'
import { getUser, logout } from '$service/user'
import { bind } from 'decko'
import LoginModal from './loginModal'
import {
  Modal
} from 'antd'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      user: null
    }
  }
  async componentDidMount () {
    const res = await getUser()
    if (res.return_code === 0) {
      this.setState({isLogin: true, user: res.data})
      this.props.loginCallback(true)
    }
  }

  @bind
  handleLogin () {
    const ctx = this
    const { isLogin } = this.state
    if (isLogin) {
      Modal.confirm({
        title: '你希望退出吗？',
        onOk: async function () {
          await logout()
          ctx.setState({
            isLogin: false,
            user: null
          })
          ctx.props.loginCallback(false)
        }
      })
    } else {
      this.refs.loginmodal.show()
    }
  }

  @bind
  handleSucc (user) {
    this.setState({
      user,
      isLogin: true
    })
    this.props.loginCallback(true)
  }

  render () {
    const { isLogin, user } = this.state
    return (
      <div className='login' onClick={this.handleLogin}>
        {
          isLogin
            ? [<img src='/avtor.jpg' />, <span>{user.name}</span>]
            : <span>登录</span>
        }
        <LoginModal
          ref='loginmodal'
          handleSucc={this.handleSucc}
        />
      </div>
    )
  }
}

Login.propTypes = {
  loginCallback: React.PropTypes.func
}

export default Login
