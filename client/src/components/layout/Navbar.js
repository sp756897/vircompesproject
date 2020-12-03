import React,{Component} from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component{
    render(){
        return(
            <div className="navbar-fixed">
        <nav className="z-depth-0">
        <div className="nav-wrapper white">
        <Link
              to="/"
              style={{
                fontFamily: "caudex",
                color: "black",
                paddingLeft:"70px"
              }}
              className="brand-logo">
              <i className="material-icons">code</i>
              Vircom
            </Link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
            <Link
              to="/register"
              style={{
                fontFamily: "caudex",
                borderRadius: "60px",
                letterSpacing: "2px",
                textTransform: "capitalize"
              }}
              className="btn waves-effect waves-light hoverable blue accent-3">
              Sign Up
            </Link>
            <Link
              to="/login"
              style={{
                fontFamily: "caudex",
                borderRadius: "60px",
                letterSpacing: "2px",
                textTransform: "capitalize",
                marginRight: "60px"
              }}
              className="btn waves-effect waves-light hoverable blue accent-3">
              Sign In
            </Link>
            </ul> 
          </div>
        </nav>
      </div>
        );
    }
}