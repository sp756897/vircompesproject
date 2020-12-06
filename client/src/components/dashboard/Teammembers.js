import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTeamMembers } from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Teammembers extends Component {

    constructor(props) {
        super(props)
        const { user } = this.props.auth;
        this.props.fetchTeamMembers({ email: user.email });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.noteam){
            this.setState({
                noteam:nextProps.noteam,
            });
        }
    }

    render() {
        const req = Array.from(this.props.team).map((reqs, key) =>
            (
                <div class="col s12 m8 offset-m2 l6 offset-l3" key={key}>
                    <div class="card-panel #eceff1 blue-grey lighten-5 z-depth-1" style={{borderWidth:"1px",borderColor:"black",borderBlockStyle:"double"}}>
                        <div class="row valign-wrapper">
                            <div class="col s2">
                                <img src="images/vpd.png" alt="" class="circle responsive-img" style={{ height: "30px", width: "30px", fontFamily: "caudex" }}></img>
                            </div>
                            <div class="col s10">
                                <span class="black-text">
                                    {reqs}
                                </span>
                            </div>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    color:"black"
                                }}
                                className="btn btn-small waves-effect waves-light hoverable #76ff03 light-green accent-3"
                            >
                                Approved
                </button>
                        </div>
                    </div>
                </div>
            )
        );

        const no = (
        
            <div className="col s12 center-align">
                <h6  style={{color:"grey",marginTop:"10rem"}}>Nobody in Team! Don't Worry,</h6><h6><Link to="/othersideas">Join Now :)</Link></h6>
            </div>
        
        );

        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9">
                    <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "11.250px",marginLeft:"3rem" }}>
                                    <h4>
                                        <b>Team</b> Members
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.noteam?no:req}
                </div>
            </div>
        );
    }
}

Teammembers.propTypes = {
    fetchTeamMembers: PropTypes.func.isRequired,
    team: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    noteam:PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    team: state.team.teamData,
    noteam:state.team.noTeam,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { fetchTeamMembers }
)(Teammembers);
