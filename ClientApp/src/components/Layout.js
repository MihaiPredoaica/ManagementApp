import React, { Component } from "react";
import { Container } from "@chakra-ui/react";
import { NavBar } from "./navBar/NavBar";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBar />
        <Container maxW="20000">{this.props.children}</Container>
      </div>
    );
  }
}
