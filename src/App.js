import React, { Component } from 'react'
import './App.css'
import Form from './form'
import Item from './item'
import ErrorBoundary from './error_boundary'
const NUM_PER_PAGE = 6

class App extends Component {
  state = {
    contributors: [],
    page: 1 // current page
  }

  componentDidMount = async () => {
    try {
      // Initialize with current items
      const contributors = await fetch('/api/contributors').then(response => response.json())
      this.setState({ contributors })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  openDialog = () => {
    this.dialog.showModal()
  }

  closeDialog = () => {
    this.dialog.close()
  }

  onInviteSuccess = contributor => {
    this.setState({
      contributors: [contributor, ...this.state.contributors],
      error: ''
    })
    this.closeDialog()
  }

  onRemoveSuccess = index => {
    const { contributors } = this.state
    this.setState({
      contributors: [...contributors.slice(0, index), ...contributors.slice(index+1)]
    })
  }
  
  onRemoveError = error => {
    this.setState({ error: error.message })
  }

  prevPage = () => {
    const { page } = this.state
    if (page >= 2) this.setState({ page: page - 1})
  }

  nextPage = () => {
    const { page, contributors } = this.state
    if (page < Math.ceil(contributors.length/NUM_PER_PAGE))
      this.setState({ page: page + 1})
  }

  // Render current page items
  renderItems = () => {
    const result = []
    const { contributors, page } = this.state
    const currentStartIndex = page === 1 ? 0 : (page - 1) * NUM_PER_PAGE
    for (let i = currentStartIndex; i < contributors.length; i++) {
      const contributor = contributors[i]
      result.push(<li data-test-id="contributorItem" key={contributor.id} className="contributor">
        <Item contributor={contributor}
          index={i}
          onRemoveSuccess={this.onRemoveSuccess}
          onRemoveError={this.onRemoveError}
          />
      </li>)

      // Hit limit per page
      if (result.length === NUM_PER_PAGE) return result
    }

    return result
  }

  render() {
    const { contributors, error, page } = this.state
    const isLastPage = page === Math.ceil(contributors.length/NUM_PER_PAGE)

    return (
      <div className="app">
        <h1 className="app-heading">Contributors</h1>
        <button data-test-id="addButton" onClick={this.openDialog}>Invite a contributor</button>
        {
          error && <p className="error">{error}</p>
        }
        <ErrorBoundary>
        {
          contributors && contributors.length ? <ul className="contributors">
            { this.renderItems() }
          </ul> : <p data-test-id="emptyMessage">Currently empty</p>
        }
        </ErrorBoundary>
        <div className="pagination">
          <button data-test-id="prevPageButton" onClick={this.prevPage} disabled={page === 1}>Prev</button>
          <span className="pagination-current">{page}</span>
          <button data-test-id="nextPageButton" onClick={this.nextPage} disabled={isLastPage || !contributors.length}>Next</button>
        </div>
        <dialog data-test-id="addDialog" ref={node => this.dialog = node} className="dialog">
          <Form done={this.onInviteSuccess} />
          <button className="dialog-close" onClick={this.closeDialog}>X</button>
        </dialog>
      </div>
    );
  }
}

export default App
