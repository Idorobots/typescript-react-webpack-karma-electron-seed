import * as React from "react";
import * as ReactDOM from "react-dom";
import { hashHistory, IndexRoute, Route, Router } from "react-router";

import { About } from "../components/about";
import { Contact } from "../components/contact";
import { Home } from "../components/home";
import { NavBar } from "../components/navbar";
import { PageNotFound } from "../components/notfound";
import { UrlParams } from "../components/params";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
          <div><NavBar/></div>
        );
    }

    public run() {
        ReactDOM.render(
        (
          <Router history={hashHistory}>
            <Route path="/" component={NavBar}>
              <IndexRoute component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/params/:username/:roomId" component={UrlParams}/>
              <Route path="*" component={PageNotFound}/>
            </Route>
          </Router>
        ), document.getElementById("content")
      );
    }
}
