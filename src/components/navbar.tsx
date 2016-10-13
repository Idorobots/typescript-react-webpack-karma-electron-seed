import * as React from "react";
import {Link} from "react-router";

const styles = require("./navbar.css");

export class NavBar extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.navbar}>
        <h1>Navigation Bar</h1>
        <ul role="nav">
          <li><Link to="/">"/"(HOME)</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/params/bob/8765?filter=all">"/prams/bob/8765?filter=all"</Link></li>
          <li><Link to="/nonexistingpage">NotExistingPage</Link></li>
        </ul>

        {this.props.children}
      </div>
    );
  }
}
