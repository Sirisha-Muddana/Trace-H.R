import axios from "axios";

export default {
  auth: {
    login: credentials =>
      axios.post("/authenticate", credentials).then(res => res.data.user),

    signup: user => axios.post("/signup", { user }).then(res => res.data.user),

    confirm: token =>
      axios.post("/confirmation", { token }).then(res => res.data.user),

    resetPasswordRequest: email =>
      axios.post("/reset_password_request", { email }),

    validateToken: token => axios.post("/validate_token", { token }),

    resetPassword: data => axios.post("/reset_password", { data })
  },

  submissions: {
    submissionList: () => axios.get("/submissions_list").then(res => res.data),

    postSubmission: data => axios.post("/post_submission", { data }),

    getSubmission: id =>
      axios.get(`/get_submission/${id}`).then(res => res.data)
  }
};
