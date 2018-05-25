import axios, { post } from "axios";

export default {
  auth: {
    login: credentials =>
      axios.post("/api/authenticate", credentials).then(res => res.data.user),

    signup: user =>
      axios.post("/api/register", user).then(res => res.data.user),

    confirm: token =>
      axios.post("/api/confirmation", token).then(res => res.data.user),

    resetPasswordRequest: email =>
      axios.post("/api/reset_password_request", email),

    validateToken: token => axios.post("/api/validate_token", token),

    resetPassword: data => axios.post("/api/reset_password", data)
  },

  submissions: {
    submissionList: () =>
      axios.get("/api/submissions_list").then(res => res.data),

    postSubmission: data => axios.post("/api/post_submission", data),

    getSubmission: id =>
      axios.get(`/api/get_submission/${id}`).then(res => res.data),

    getSubmissions: id =>
      axios.get(`/api/get_submissions/${id}`).then(res => res.data)
  },

  users: {
    usersList: () => axios.get("/api/users_list").then(res => res.data),

    currentUser: () => axios.get("/api/current_user").then(res => res.data),

    recruiterList: () => axios.get("/api/recruiter_list").then(res => res.data),

    allUsers: () => axios.get("/api/all_users").then(res => res.data),

    createProfile: data => axios.post("/api/create_profile", { data }),

    addImmigrationInfo: data => axios.post("/api/immigration_info", { data }),

    addExperience: data => axios.post("/api/add_experience", { data }),

    addEducation: data => axios.post("/api/add_education", { data })
  },

  timesheets: {
    timesheets: () => axios.get("/api/timesheets").then(res => res.data),

    allTimesheets: () => axios.get("/api/allTimesheets").then(res => res.data),

    getTimesheets: id =>
      axios.get(`/api/get_timesheets/${id}`).then(res => res.data),

    getTimesheetsByDate: date =>
      axios.get(`/api/get_timesheets_by_date/${date}`).then(res => res.data),

    getImage: filename =>
      axios.get(`/api/image/${filename}`).then(res => res.data),

    uploadTimesheet: (formData, config) =>
      post("/api/uploadTimesheet", formData, config)
  }
};
