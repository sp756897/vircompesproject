import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import io from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BottomBar from './BottomBar';
import '../../App.css';
import { Link } from "react-router-dom";
import { fetchTeamMembers } from "../../actions/authActions";
import FaceIcon from '@material-ui/icons/Face';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props.auth;
    this.state = {
      from:user.email,
      to:"",
      chat:[],
      content: '',
      name: user.name,
    };
    
    this.Onclick = this.Onclick.bind(this);
    this.props.fetchTeamMembers({ email: user.email });
  }

  Onclick (cemail,e) {
    e.preventDefault();
    this.state.to = cemail;
    console.log(cemail); 
    this.setState({
      chat:[]
    });

    this.socket.emit("join",{temail:this.state.to,femail:this.state.from});

    this.socket.on('init',(msg) => {
      this.setState((state) => ({
        chat: [...msg],
      }), this.scrollToBottom);
    });

}

  componentDidMount() {
    
    if(window.location.href === "https://vircompespro.herokuapp.com/chat"){
      var url = "https://vircompespro.herokuapp.com";
    }

    else{
      var url = "http://localhost:5000";
    }

    this.socket = io(url,{transports: ['websocket']});
    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      const tofromarr = [];
      tofromarr.push(msg.to);
      tofromarr.push(msg.from);

      console.log(tofromarr);
      console.log(this.state.to+" "+this.state.from);

      if(tofromarr.includes(this.state.to) && tofromarr.includes(this.state.from)){
        this.setState((state) => ({
          chat: [...this.state.chat, msg],
        }), this.scrollToBottom);
      }

      else{
        console.log("Message not for you!!!");
      }
      
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit(event) {
    // Prevent the form to reload the current page.
    event.preventDefault();
    if(this.state.to === ""){
      console.log("Click on a User")
    }
    // Send the new message to the server.
    else{
      this.socket.emit('message', {
        name: this.state.name,
        content: this.state.content,
        from: this.state.from,
        to: this.state.to,
      });
  
      this.setState((state) => {
        // Update the chat with the user's message and remove the current message.
        return {
          chat: [...state.chat, {
            name: state.name,
            content: state.content,
          }],
          content: '',
        };
      }, this.scrollToBottom);
    }
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    const req = Array.from(this.props.team).map((reqs, key) =>
            (
                <div class="col s12 m8 offset-m2 l6 offset-l3" key={key}
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}>
                    <div class="card-panel #eceff1 blue-grey lighten-5 z-depth-1" onClick={(e) => this.Onclick(reqs,e)} style={{ borderWidth: "1px", borderColor: "black", borderBlockStyle: "double" }}>
                        <div class="row valign-wrapper">
                            <div class="col s2" >
                                <div>
                                    <FaceIcon />
                                </div>
                            </div>
                            <div class="col s10">
                                <span class="black-text">
                                    {reqs}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );

        const no = (

            <div className="col s12 center-align">
                <h6 style={{ color: "grey", marginTop: "10rem" }}>Nobody in Team! Don't Worry,</h6><h6><Link to="/othersideas">Join Now :)</Link></h6>
            </div>

        );

        const pressfirst = (
          <div className="col s12 center-align">
                <h6 style={{ color: "grey", marginTop: "10rem",fontSize:"30px",fontFamily:"caudex" }}>Click on any Team Member to Chat!!!</h6>
            </div>
        )

        const firstchat = (
          <div className="col s12 center-align">
                <h6 style={{ color: "grey", marginTop: "10rem",fontSize:"18px",fontFamily:"caudex" }}>Start your First Chat!!!</h6>
            </div>
        )

        const chatslist = this.state.chat.map((el, index) => {
          return (
            <div key={index}>
              <Typography variant="caption" className="name">
                {el.name}
              </Typography>
              <Typography variant="body1" className="content">
                {el.content}
              </Typography>
            </div>
          );
        });

        var resp;
        if(this.state.to === "") resp = pressfirst;
        else if(this.state.chat.length === 0) {
          resp = firstchat;
        }
        else resp = chatslist;
    
    return (
      <div class="row">
      <div class="col s12 m4 l3">
      <Link to="/dashboard" className="btn-flat waves-effect" style={{marginLeft:"5.4rem"}}>
              <i className="material-icons left">keyboard_backspace</i> Back to
              Dashboard
            </Link>
      <Paper id="chati" elevation={3}>
      {this.props.noteam ? no : req}
      </Paper>  
      </div>
        <div class="col s12 m8 l9">
        <div className="Chatptp">
        <Paper id="chat" elevation={3}>
          {resp}
        </Paper>
        <BottomBar
          content={this.state.content}
          handleContent={this.handleContent.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          name={this.state.name}
        />
      </div>
        </div>
      </div>
    );
  }
};

Chat.propTypes = {
  fetchTeamMembers: PropTypes.func.isRequired,
  team: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  noteam: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  team: state.team.teamData,
  noteam: state.team.noTeam,
  auth: state.auth
});

export default connect(
mapStateToProps,
{fetchTeamMembers}
)(Chat);
