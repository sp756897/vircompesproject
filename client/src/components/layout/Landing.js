import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div  className="container valign-wrapper">,
        <div className="row">
          <div className="col s12 center-align" style={{paddingTop:"21px",paddingBottom:"21px",marginTop:"120px"}}>
            <h4 style={{fontFamily:"caudex",fontSize:"45px"}}>
              Welcome To <b>Vircom</b> the Ideas Abode
            </h4>
            <h6 style={{fontSize:"21px"}} className="flow-text grey-text text-darken-1">
              Ready to bring your Ideas into Life ? Ofcourse right! Then Register Now !!!
            </h6>
            <br />
            <div className="col s6" style={{paddingTop:"21px",marginTop:"79px"}}>
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6" style={{paddingTop:"21px",marginTop:"79px"}}>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        <div class="row">
        <hr style={{marginTop:"540px"}}></hr>
      <div class="col s12" style={{marginTop:"240px",backgroundColor:"lightgrey"}}>
      <div class="col s6" style={{}}>
        <h3 style={{fontFamily:"caudex",textAlign:"center",paddingTop:"21px"}}>
          <b>Connect</b> Now with a wide range of Founders & Funders around the globe!!!
        </h3>
      </div>
      <div class="col s6">
        <img class="responsive-img" src="images/wenmag.png"></img>
      </div>
      </div> 
    </div>
    <div class="row">
      <hr style={{marginTop:"250px"}}></hr>
      <div class="col s12" style={{marginTop:"100px"}}>
        <h style={{textAlign:"center",fontSize:"30px",textDecoration: "solid",marginLeft:"30rem",fontFamily:"caudex"}}>Contact Us:
        <h6>Phone: Calc(log10 * sin(50*20*1) * 0</h6>
        <h6>Address: Milky Way Galaxy, Solar System, Mars</h6>
        <h6>Email: LogoutRightNow@goaway.com</h6>
        <h6>Created with Love : Akshay S P </h6>
        </h>
      </div>
    </div>
        </div>
      </div>
    );
  }
}