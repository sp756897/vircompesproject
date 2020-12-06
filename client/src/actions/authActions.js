import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  FETCH_IDEA,
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_YOUR_IDEA,
  FETCH_OTHERS_IDEA,
  APPROVAL_REQUEST,
  FETCH_REQUESTS,
  APPROVED,
  SEARCH,
  FETCH_TEAMMEMBERS
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const teamapprovalReq = (reqdata) => dispatch  => {
  axios
  .post("/api/users/teamapprovalreq",reqdata)
  .then( res =>
    dispatch({
      type: APPROVAL_REQUEST,
      payload: res.data
    })
    )
    .catch(err => console.log(err));
};

export const teamApproval = (reqdata) => dispatch  => {
  axios
  .post("/api/users/teamapproval",reqdata)
  .then( res =>
    dispatch({
      type: APPROVED,
      payload: res.data
    })
    )
    .catch(err => console.log(err));
};

export const teamDelete = (reqdata)=>dispatch =>{
  axios
  .post("/api/users/teamdelete",reqdata)
  .then( res => dispatch({
    type: APPROVED,
    payload: res.data
  })
  )
    .catch(err => console.log(err));
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const createIdea = (newIdea, history) => dispatch => {
  axios
  .post("/api/users/idea",newIdea)
  .then(res => history.push("/dashboard"))
  .catch(err =>
    dispatch({
      type:GET_ERRORS,
      payload: err.response.data
    })
    );
};

export const fetchIdea = () => dispatch => {
  axios
  .get("/api/users/ideas")
  .then( res =>
    dispatch(
      {
        type:FETCH_IDEA,
        payload: res.data
      }
    )
  )
  .catch(err => console.log(err));
}

export const fetchyourIdea = (email) => dispatch => {
  axios
  .post("/api/users/userideas",email)
  .then( res =>
    dispatch(
      {
        type:FETCH_YOUR_IDEA,
        payload: res.data
      }
    )
  )
  .catch(err => console.log(err));
};

export const fetchothersIdea = (email) => dispatch => {
  axios
  .post("/api/users/othersideas",email)
  .then( res =>
    dispatch(
      {
        type:FETCH_OTHERS_IDEA,
        payload: res.data
      }
    )
  )
  .catch(err => console.log(err));
}

export const fetchRequests = (email) => dispatch => {
  axios
  .post("/api/users/teamrequests",email)
  .then( res =>
    dispatch(
      {
        type:FETCH_REQUESTS,
        payload: res.data
      }
    )
  )
  .catch(err => console.log(err));
};

export const fetchTeamMembers = (email) => dispatch => {
  axios
  .post("/api/users/teammembers",email)
  .then( res =>
    dispatch(
      {
        type:FETCH_TEAMMEMBERS,
        payload: res.data
      }
    )
  )
  .catch(err => console.log(err));
};

/*export const fetchTeamMembers = (email) => dispatch => {
  axios.post("/api/users/teamnames",reqs)
  .then(res => {
          res
  })
  .catch(()=>console.log("Check your Internet Connection"));
};*/

export const ideaSearch = (val) => dispatch => {
  axios
  .post("/api/users/search",val)
  .then( res =>
    dispatch(
      {
        type:SEARCH,
        payload: res.data
      }
    )
  )
  .catch(err => console.log(err));
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};