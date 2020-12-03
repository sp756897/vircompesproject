import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchIdea} from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Ideasboard extends Component {
    constructor(props){
        super(props)
        this.props.fetchIdea();
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

return (
  <div class="row">
  <Dashnav/>
  <div class="col s12 m8 l9">
  <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "4px",marginLeft:"6rem" }}>
                                    <h4>
                                        <b>Ideas</b> Board
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


Ideasboard.propTypes = {
  fetchIdea: PropTypes.func.isRequired,
  idea: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  idea: state.idea.ideas
});
export default connect(
  mapStateToProps,
  {fetchIdea }
)(Ideasboard);