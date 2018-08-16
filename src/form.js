import React, { PureComponent } from 'react'
import './App.css'

class Form extends PureComponent {
  state = {}

  invite = async event => {
    event.preventDefault()
    try {
      const form = new FormData(event.target)

      // submit
      const result = await fetch('/api/contributors/add', {
        method: 'PUT',
        body: form
      }).then(response => response.json())
  
      const { success, error, contributor } = result
      if (success) {
        this.setState( { done: true, error: '' })
        this.props.done(contributor)
      } else {
        throw new Error(error)
      }

    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    const { error } = this.state

    return (
        <form onSubmit={this.invite}>
            <h2>Invite a contributor</h2>
            {
              error && <p className="error">{error}</p>
            }
            <div className="form-group">
              <label htmlFor="firstName">First Name</label> <input required type="text" id="firstName" name="firstName" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label> <input required type="text" id="lastName" name="lastName" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Last Name</label> <input type="file" id="photo" name="photo" className="form-input" />
            </div>
            <button>Save</button>
        </form>
    )
  }
}

export default Form
