import React,{Component} from "react";
import {withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIdea } from "../../actions/authActions";
import classnames from "classnames";
import Dashnav from "./Dashnav";


class CreateIdea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iname : "",
            icontent : "",
            iemail: "",
            errors : {}
        };
        
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
    
    onChange = e => {
        this.setState({ [e.target.id]:e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const newIdea = {
            iname : this.state.iname,
            icontent : this.state.icontent,
            iemail: this.state.iemail
        }
        this.props.createIdea( newIdea , this.props.history);
        console.log(newIdea);
    }

    render() {
        const {errors} = this.state;
        const {user} = this.props.auth;
        this.state.iemail = user.email;
    
        return (
          <div class="row">
  <Dashnav/>
  <div class="col s12 m8 l9">
            <div className="container">
        <div style={{ marginTop: "3rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Create Idea</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.iname}
                  error={errors.iname}
                  id="iname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.iname
                  })}
                />
                <label htmlFor="email">Title</label>
                <span className="red-text">
                  {errors.iname}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.icontent}
                  error={errors.icontent}
                  id="icontent"
                  type="text"
                  className={classnames("", {
                    invalid: errors.icontent
                  })}
                />
                <label htmlFor="icontent">Description</label>
                <span className="red-text">
                  {errors.icontent}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
        );
    }
}

CreateIdea.propTypes = {
  createIdea : PropTypes.func.isRequired,
  errors : PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {createIdea}
)(withRouter(CreateIdea));