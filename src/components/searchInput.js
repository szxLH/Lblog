import React from 'react'
import { Input, Button } from 'antd'
import classNames from 'classnames'
import { bind } from 'decko'
const InputGroup = Input.Group

class SearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      focus: false
    }
  }

  @bind
  handleInputChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  @bind
  handleFocusBlur (e) {
    this.setState({
      focus: e.target === document.activeElement
    })
  }

  @bind
  handleSearch () {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value)
    }
  }

  render () {
    const { style, size, placeholder } = this.props
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim()
    })
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus
    })

    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input size={size} placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} style={{paddingBottom: '5px'}} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    )
  }
}

SearchInput.propTypes = {
  style: React.PropTypes.any,
  size: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onSearch: React.PropTypes.func
}

export default SearchInput
