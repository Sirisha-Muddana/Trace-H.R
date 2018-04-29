import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    state = {activeItem: 'users'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <Menu pointing secondary vertical >
                <Menu.Item as={Link} to="/sales" name='daily sales' active={activeItem === 'daily sales'}
                           onClick={this.handleItemClick}/>
                <Menu.Item as={Link} to="/users" name='consultant list' active={activeItem === 'consultant list'}
                           onClick={this.handleItemClick}/>
                <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick}/>
                <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick}/>
            </Menu>
        )
    }
}
