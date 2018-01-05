import React, { Component } from 'react'
import { Menu,Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

export default class Header extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted secondary color='blue'>
        <Menu.Item as={Link} to='/' name='web' active={activeItem === 'web'} onClick={this.handleItemClick}>
          Website
        </Menu.Item>


        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/signup' name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick} >
          <Icon name='signup'/>
           Signup
          </Menu.Item>

          <Menu.Item as={Link} to='/login' name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
          <Icon name='user circle'/>
           Login
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}