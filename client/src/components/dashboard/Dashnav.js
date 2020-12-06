import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Dashnav extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

    render() {
        return (
            <div class="col s12 m4 l3"> 
            <Link
                to="/dashboard"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
                Dashboard
              </Link>
              <Link
                to="/ideas"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
                Posts
              </Link>
              <Link
                to="/idea"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
                Create
              </Link>
              <Link
                to="/userideas"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
                Ideas
              </Link>
              <Link
                to="/search"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
               Search
              </Link>
              <Link
                to="/teammembers"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
               Team
              </Link>
              <Link
                to="/othersideas"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
               Join
              </Link>
              <Link
                to="/requests"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
               Requests
              </Link>
              <Link
                to="/chat"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                }}
                className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
               Chat
              </Link>
              <button
              style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  width:"100%",
                  margin: "6px 6px"
                    }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
              >
              Logout
          </button>
          </div>
        );
    }
}


Dashnav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
export default connect(
  null,
  { logoutUser }
)(Dashnav);