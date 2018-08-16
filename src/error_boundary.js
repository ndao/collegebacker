/* Simple Error Boundary to catch unexpected error */

import React from 'react'

class ErrorBoundary extends React.PureComponent {
  state = {}

  componentDidCatch(error) {
    this.setState({ error: error.message })
  }

  render() {
    if (this.state.error) return <p className="error">{this.state.error}</p>
    else return this.props.children
  }
}

export default ErrorBoundary
