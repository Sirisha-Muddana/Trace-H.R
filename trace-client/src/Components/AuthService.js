import axios from "axios";
import decode from "jwt-decode";

class AuthService {
  constructor() {
    this.authLogin = this.authLogin.bind(this);
  }
  authLogin(userInfo) {
    axios
      .request({
        method: "POST",
        url: "http://localhost:3000/api/authenticate",
        data: userInfo
      })
      .then(response => {
        this.setToken(response.data.token);
        return Promise.resolve(response);
      })
      .catch(err => console.log(err));
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(token) {
    // Saves user token to localStorage
    localStorage.setItem("token", token);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  // // Setting Authorization header
  // if (this.loggedIn()) {
  //   axios
  //     .get("http://localhost:3000/api/login", {
  //       headers: { Authorization: this.getToken() }
  //     })
  //     .then(this._checkStatus)
  //     .then(response => response.json());
  // }
  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}

export default AuthService;
