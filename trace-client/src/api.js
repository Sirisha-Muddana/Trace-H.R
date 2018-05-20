import axios, { post } from "axios";

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
      axios.get(`/get_submission/${id}`).then(res => res.data),

    getSubmissions: id =>
      axios.get(`/get_submissions/${id}`).then(res => res.data)
  },

  users: {
    usersList: () => axios.get("/users_list").then(res => res.data),

    currentUser: () => axios.get("/current_user").then(res => res.data),

    recruiterList: () => axios.get("/recruiter_list").then(res => res.data),

    allUsers: () => axios.get("/all_users").then(res => res.data),

    createProfile: data => axios.post("/create_profile", { data }),

    addImmigrationInfo: data => axios.post("/immigration_info", { data }),

    addExperience: data => axios.post("/add_experience", { data }),

    addEducation: data => axios.post("/add_education", { data })
  },

  timesheets: {
    timesheets: () => axios.get("/timesheets").then(res => res.data),

    allTimesheets: () => axios.get("/allTimesheets").then(res => res.data),

    getTimesheets: id =>
      axios.get(`/get_timesheets/${id}`).then(res => res.data),

    getImage: filename => axios.get(`/image/${filename}`).then(res => res.data),

    uploadTimesheet: (formData, config) =>
      post("/uploadTimesheet", formData, config)
  }
};
