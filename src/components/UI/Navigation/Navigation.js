import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  state = { activeItem: "Расходы" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary>
        <Menu.Item
          name="Расходы"
          as={NavLink}
          to="/outlay"
          active={activeItem === "Расходы"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Показания"
          as={NavLink}
          to="/send-indicators"
          active={activeItem === "Показания"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default Navigation;
