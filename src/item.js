import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

class Item extends PureComponent {
  remove = async contributor => {
    try {
      const { id } = this.props.contributor
      const result = await fetch(`/api/contributors/remove?id=${id}`, {
        method: 'DELETE',
      }).then(response => response.json())

      const { success, error } = result
      if (success) this.props.onRemoveSuccess(this.props.index)
      else throw new Error(error)
    } catch (error) {
      // log error
      this.props.onRemoveError(error)
    }
  }

  render() {
    const { firstName, lastName, photo } = this.props.contributor
    return <Fragment>
        <img src={photo} className="profile-image" alt={`${firstName} avatar`} />
        <div>{firstName} {lastName}</div><button className="contributor-remove" onClick={this.remove}>X</button>
    </Fragment>
  }

  static propTypes = {
    contributor: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    }).isRequired,
    onRemoveSuccess: PropTypes.func,
    onRemoveError: PropTypes.func
  }
}

export default Item
