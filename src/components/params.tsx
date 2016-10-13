import * as React from "react";

export interface UrlParamsProps {
  params: {
    username: string;
    roomId: number;
  };
  location: {
    query: {
      filter: string;
    }
  };
}

export class UrlParams extends React.Component<UrlParamsProps, {}> {
  public render() {
    return (
      <div>
        URL params:
        <ul>
          <li>username: {this.props.params.username}</li>
          <li>roomId: {this.props.params.roomId}</li>
        </ul>
        Query Params:
        <ul>
          <li>filter: {this.props.location.query.filter}</li>
        </ul>
      </div>
    );
  }
}
