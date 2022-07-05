import React from "react";
import { useLocation } from "react-router";

function withRouter(Component) {
 return props => <Component {...props} location={useLocation()} />;
}

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);