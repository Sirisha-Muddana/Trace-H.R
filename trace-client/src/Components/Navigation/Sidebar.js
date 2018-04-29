import React, {Component} from 'react';
import {Menu, Grid} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (

                    <Menu fluid vertical tabular>
                        <Menu.Item as={Link} to="/users" name='Users' active={activeItem === 'users'} onClick={this.handleItemClick}/>
                        <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick}/>
                        <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick}/>
                        <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick}/>
                    </Menu>
        )
    }
}
