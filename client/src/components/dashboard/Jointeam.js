import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchothersIdea,teamapprovalReq} from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Jointeam extends Component {
    constructor(props){

        super(props)
        const {user} = this.props.auth;
        this.state={
          user: user
        };
        console.log(user.email);
        this.props.fetchothersIdea({email:user.email});
    }

    

    onSubmit = (leaderemail,ideaname,e)=>{
      e.preventDefault();
      const newMember = {
          email: leaderemail,
          member: this.state.user.email,
          name: ideaname
      }
      this.props.teamapprovalReq( newMember);
      this.props.fetchothersIdea({email:this.state.user.email});
      console.log(newMember);
  }

render() {

    const ideasits = this.props.idea.map((ideas,key) =>
      (
        <div class="col s21 m20" key={key}>
          <div class="card #76ff03 light-green accent-3">
          <div class="card-content black-text">
              <span class="card-title">{ideas.iname}</span>
              <p>{ideas.icontent}</p>
            </div>
            <div class="card-action">
            <a href="#" style={{color:"#76ff03"}}>*******</a>
                          <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={(e) => this.onSubmit(ideas.iemail,ideas.iname,e)}
                  className="btn btn waves-effect waves-light hoverable blue accent-3"
                >
                  Join
                </button>
                <a href="#" style={{color:"#76ff03"}}>*******</a>
            </div>
          </div>
      </div>         
      ));

return (
  <div class="row">
  <Dashnav/>
  <div class="col s12 m8 l9">
  <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "11.250px",marginLeft:"6rem"}}>
                                    <h4>
                                        <b>Join</b> Team
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
  <div className="col s12 center-align">
    {ideasits}
  </div>
  </div>
  </div>
    );
  }
}


Jointeam.propTypes = {
  fetchothersIdea: PropTypes.func.isRequired,  
  teamapprovalReq: PropTypes.func.isRequired, 
  idea: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  idea: state.idea.oideas,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {fetchothersIdea,teamapprovalReq}
)(Jointeam);