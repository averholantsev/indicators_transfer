import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="Расходы"
          as={NavLink}
          to="/outlay"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Показания"
          as={NavLink}
          to="/send-indicators"
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default Navigation;
