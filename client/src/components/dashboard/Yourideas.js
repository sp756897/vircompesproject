import React, { Component } from "react";
import {Link} from "react-router-dom"; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchyourIdea} from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Yourideas extends Component {
    constructor(props){

        super(props)
        const {user} = this.props.auth;
        console.log(user.email);
        this.props.fetchyourIdea({email:user.email});
    }
render() {
  
    const ideasits = this.props.idea.map((ideas,key) =>
      (
        <div class="col s21 m20" key={key}>
          <div class="card #76ff03 light-green accent-3">
            <div class="card-content black-text" style={{marginBottom:"3rem"}}>
              <span class="card-title">{ideas.iname}</span>
              <p>{ideas.icontent}</p>
            </div>
            <div class="card-action">
            <a href="#" style={{color:"#76ff03"}}>*******************</a>
            <a href="#" style={{color:"#76ff03"}}>*******************</a>
            </div>
          </div>
      </div>       
      ));

      const no = (
        
        <div className="col s12 center-align">
            <h6  style={{color:"grey",marginTop:"10rem"}}>No Ideas! Don't Worry,</h6><h6><Link to="/idea">Create Now :)</Link></h6>
        </div>
    
    );

return (
  <div class="row">
  <Dashnav/>
  <div class="col s12 m8 l9">
  <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "11.250px",marginLeft:"6rem" }}>
                                    <h4>
                                        <b>My </b> Ideas
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
  <div className="col s12 center-align">
  {this.props.noidea?no:ideasits}
  </div>
  </div>
  </div>
    );
  }
}


Yourideas.propTypes = {
  fetchyourIdea: PropTypes.func.isRequired,  
  idea: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  noidea:PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  idea: state.idea.yideas,
  auth: state.auth,
  noidea:state.idea.yno
});

export default connect(
  mapStateToProps,
  {fetchyourIdea}
)(Yourideas);