import React from 'react'
class NoData extends React.Component {
  render () {
    const { visable } = this.props
    const noDataStyle = {
      lineHeight: '150px',
      background: '#fff',
      textAlign: 'center',
      fontSize: '20px'
    }
    return (
      <div
        style={noDataStyle}
        className={visable ? '' : 'hide'}
      >data not found</div>
    )
  }
}

NoData.propTypes = {
  visable: React.PropTypes.bool
}

export default NoData
