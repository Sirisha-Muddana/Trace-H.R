import axios, { post } from "axios";

// Running on local machine
let serverhost = "http://localhost:3000/api/";

// Running on Dev(EC2) server
//let serverhost = "http://13.57.38.55:3000/api/";

export default {
  auth: {
    login: credentials =>
      axios
        .post(serverhost + "authenticate", credentials)
        .then(res => res.data.user),

    signup: user =>
      axios.post(serverhost + "register", user).then(res => res.data),

    confirm: token => axios.post(serverhost + "confirmation", { token: token }),

    resendConfirmation: email =>
      axios
        .post(serverhost + "resend_confirmation", { email: email })
        .then(res => res.data),

    resetPasswordRequest: email =>
      axios.post(serverhost + "reset_password_request", email),

    validateToken: token => axios.post(serverhost + "validate_token", token),

    resetPassword: data => axios.post(serverhost + "reset_password", data)
  },

  submissions: {
    submissionList: () =>
      axios.get(serverhost + "submissions_list").then(res => res.data),

    postSubmission: data => axios.post(serverhost + "post_submission", data),

    getSubmission: id =>
      axios.get(serverhost + `get_submission/${id}`).then(res => res.data),

    getSubmissions: id =>
      axios.get(serverhost + `get_submissions/${id}`).then(res => res.data)
  },

  users: {
    usersList: () => axios.get(serverhost + "users_list").then(res => res.data),

    getProfileById: id =>
      axios.get(serverhost + `get_profile_by_id/${id}`).then(res => res.data),

    currentUser: () =>
      axios.get(serverhost + "current_user").then(res => res.data),

    recruiterList: () =>
      axios.get(serverhost + "recruiter_list").then(res => res.data),

    allUsers: () => axios.get(serverhost + "all_users").then(res => res.data),

    createProfile: data => axios.post(serverhost + "create_profile", data),

    addImmigrationInfo: data =>
      axios.post(serverhost + "immigration_info", data),

    addExperience: data => axios.post(serverhost + "add_experience", data),

    addEducation: data => axios.post(serverhost + "add_education", data),

    getEducation: id =>
      axios.get(serverhost + `get_education/${id}`).then(res => res.data),

    getExperience: id =>
      axios.get(serverhost + `get_experience/${id}`).then(res => res.data),

    deleteExperience: id =>
      axios
        .delete(serverhost + `delete_experience/${id}`)
        .then(res => res.data),

    deleteEducation: id =>
      axios.delete(serverhost + `delete_education/${id}`).then(res => res.data)
  },

  timesheets: {
    timesheets: () =>
      axios.get(serverhost + "timesheets").then(res => res.data),

    allTimesheets: () =>
      axios.get(serverhost + "allTimesheets").then(res => res.data),

    getTimesheets: id =>
      axios.get(serverhost + `get_timesheets/${id}`).then(res => res.data),

    getTimesheetsByDate: (date, id) =>
      axios
        .get(serverhost + `get_timesheets_by_date/${date}/${id}`)
        .then(res => res.data),

    getImage: filename =>
      axios.get(serverhost + `image/${filename}`).then(res => res.data),

    uploadTimesheet: (formData, config) =>
      post(serverhost + "uploadTimesheet", formData, config)
  }
};
