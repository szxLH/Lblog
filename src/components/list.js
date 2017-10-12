import React from 'react'
import Card from './card'

class List extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.lists && this.props.lists.map((list, i) => <Card key={i} data={list} />)
        }
      </div>
    )
  }
}

List.propTypes = {
  lists: React.PropTypes.array
}

export default List
