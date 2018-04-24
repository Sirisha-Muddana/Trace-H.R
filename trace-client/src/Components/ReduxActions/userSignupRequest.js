import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
       return axios.post('http://localhost:3000/api/signup', userData)
            .then(response => {
                //this.props.history.push("/login");
            })
            .catch(err => console.log(err));
    }
}