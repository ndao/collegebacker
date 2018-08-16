import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })

  describe('Contributors list', () => {
    const wrapper = shallow(<App />)

    it('should display an empty message', () => {
      expect(wrapper.find('[data-test-id="emptyMessage"]').length).toBe(1)
    })

    it('should display a list of contributors', () => {
      wrapper.setState({ contributors: [{id: '1', firstName: 'a'}, {id: '2', firstName: 'b'}] })
      expect(wrapper.find('[data-test-id="contributorItem"]').length).toBe(2)
    })
    
    it('should display a maximum of 6 contributors', () => {
      wrapper.setState({ contributors: [
        {id: '1', firstName: 'a'}, {id: '2', firstName: 'b'},
        {id: '3', firstName: 'a'}, {id: '4', firstName: 'b'},
        {id: '5', firstName: 'a'}, {id: '6', firstName: 'b'},
        {id: '7', firstName: 'a'}, {id: '8', firstName: 'b'}]
      })
      expect(wrapper.find('[data-test-id="contributorItem"]').length).toBe(6)
    })
  })

  describe('Pagination', () => {
    const wrapper = shallow(<App />)
    
    it('should disable previous page button when there is no items', () => {
      expect(wrapper.find('[data-test-id="prevPageButton"]').prop('disabled')).toBe(true)
    })
    
    it('should disable next page button when there is no items', () => {
      expect(wrapper.find('[data-test-id="nextPageButton"]').prop('disabled')).toBe(true)
    })
  })

  describe('Adding contributor', () => {
    const wrapper = shallow(<App />)
    
    it('should have an add button', () => {
      expect(wrapper.find('[data-test-id="addButton"]').length).toBe(1)
    })
    
    it('should have an dialog to add item', () => {
      expect(wrapper.find('[data-test-id="addDialog"]').length).toBe(1)
    })
  })
})
