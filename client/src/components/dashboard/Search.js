import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {ideaSearch} from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Search extends Component {
    constructor(props){
        super(props)
        this.state ={
            val:""
        }
        this.props.ideaSearch();
    }

    onChange = e =>
    {
        this.setState({[e.target.id]:e.target.value});
        console.log(this.state.val);
        this.props.ideaSearch({val:this.state.val});
    };

    keyUp = e =>
    {
        this.props.ideaSearch({val:this.state.val});
    };

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
            <h6  style={{color:"grey",marginTop:"10rem"}}>No Results! Try any other Words</h6>
        </div>
    
    );

return (
  <div class="row">
  <Dashnav/>
  <div class="col s12 m8 l9">
  <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "11.250px",marginLeft:"3rem" }}>
                                    <h4>
                                        <b>Search</b> Ideas
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form class="col s12"  style={{marginLeft:"15rem"}}>
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">search</i>
          <input onChange={this.onChange} value={this.state.val} onKeyUp={this.keyUp} id="val" type="text" class="validate"></input>
          <label for="icon_prefix">Search</label>
          </div>
      </div>
    </form>
  <div className="col s12 center-align">
  {this.props.nosearch?no:ideasits}
  </div>
  </div>
  </div>
    );
  }
}


Search.propTypes = {
  ideaSearch: PropTypes.func.isRequired,
  idea: PropTypes.array.isRequired,
  nosearch: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  idea: state.idea.searchres,
  nosearch:state.idea.sno
});
export default connect(
  mapStateToProps,
  {ideaSearch}
)(Search);