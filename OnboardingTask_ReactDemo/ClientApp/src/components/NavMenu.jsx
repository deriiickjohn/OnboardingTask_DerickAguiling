import React, { Component } from 'react'
import {  Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    
  }
  

  render() {
    const { activeItem } = this.state
    console.log(activeItem);
    return (
      <div>
      <Menu inverted  >
              <Menu.Item
                as={NavLink} to="/"
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
               
              />
            
              <Menu.Item
                as={NavLink} to="/customer"
                name='Customer'
                active={activeItem === 'customer'}
                
                onClick={this.handleItemClick}
              />

            <Menu.Item
                as={NavLink} to="/product"
                name='Product'
                active={activeItem === 'product'}
                
                onClick={this.handleItemClick}
              />

            <Menu.Item
                as={NavLink} to="/store"
                name='Store'
                active={activeItem === 'store'}
                
                onClick={this.handleItemClick}
              />

            <Menu.Item
                as={NavLink} to="/sales"
                name='Sales'
                active={activeItem === 'sales'}
                
                onClick={this.handleItemClick}
              />
            
            </Menu>
      </div>
     
    )
  }
}