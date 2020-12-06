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
                justifyContent:"center",
                textAlign:"center"
              }}
              className="col s5 brand-logo center">
              <i className="material-icons">code</i>
              Vircom
            </Link>
          </div>
        </nav>
      </div>
        );
    }
}