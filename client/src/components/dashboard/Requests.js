import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRequests,teamApproval } from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Requests extends Component {

    constructor(props) {
        super(props)
        const { user } = this.props.auth;
        this.state={
            user: user,
          };
        this.props.fetchRequests({ email: user.email });
        console.log(this.props.team);
        console.log(this.props.noreq);
    }

    componentWillReceiveProps(nextProps){
            this.setState({
                noreq:nextProps.noreq
            });
        }
    

    onSubmit = (mememail,e)=>{
        e.preventDefault();
        const Member = {
            email: this.state.user.email,
            member:  mememail,
        }
        this.props.teamApproval(Member);
        this.props.fetchRequests({ email: this.state.user.email });
        console.log(Member);
    }

    render() {

            const req = Array.from(this.props.team).map((reqs, key) =>
            (
                <div class="col s12 m8 offset-m2 l6 offset-l3" key={key}>
                    <div class="card-panel #eceff1 blue-grey lighten-5 z-depth-1" style={{borderWidth:"1px",borderColor:"black",borderBlockStyle:"double"}}>
                        <div class="row valign-wrapper">
                            <div class="col s2">
                                <img src="images/vpd.png" alt="" class="circle responsive-img" style={{height:"30px",width:"30px",fontFamily:"caudex"}}></img>
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
                    marginTop: "1rem"
                  }}
                  onClick={(e) =>this.onSubmit(reqs,e)}
                  className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                >
                  Approve
                </button>
                        </div>
                    </div>
                </div>
            )
        );

        const no = (
        
            <div className="col s12 center-align">
                <h6  style={{color:"grey",marginTop:"10rem"}}>No Requests at the moment...So Relax :)</h6>
            </div>
        
        );

        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9">
                <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "11.250px"}}>
                                    <h4>
                                        <b>Requests</b> For TeamMember
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.noreq?no:req}
                </div>
            </div>
        );
    }
}

Requests.propTypes = {
    fetchRequests: PropTypes.func.isRequired,
    teamApproval: PropTypes.func.isRequired,
    team: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    noreq: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    team: state.team.freqData,
    noreq:state.team.noReq,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { fetchRequests,teamApproval }
)(Requests);
