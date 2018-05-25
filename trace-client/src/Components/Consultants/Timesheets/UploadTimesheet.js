import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadTimesheets } from "../../../actions/timesheetsActions";
import DropzoneComponent from "react-dropzone-component";
//import { Divider } from "semantic-ui-react";

class UploadTimesheet extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.onProgress = this.onProgress.bind(this);

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
      acceptedFiles:
        "image/jpeg,image/png, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      autoProcessQueue: false,
      uploadMultiple: false,
      maxFiles: 1,
      dictDefaultMessage: "Click to browse or Drop files here to upload"
    };

    this.componentConfig = {
      iconFiletypes: [".jpg", ".png", ".pdf", ".xslx"],
      showFiletypeIcon: true,
      postUrl: "no-url"
    };
  }

  onProgress = file => {
    var progressElement = file.previewElement.querySelector(
      "[data-dz-uploadprogress]"
    );
    progressElement.style.width = "100%";
  };
  onDrop = file => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    this.props.uploadTimesheets(formData, config).then(response => {
      this.props.history.push("/timesheetsPage");
    });
  };
  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      addedfile: this.onDrop,
      thumbnail: this.onProgress
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <h2 className="text-center my-4">Timesheet Upload</h2>
            <DropzoneComponent
              config={config}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
          </div>
        </div>
      </div>
    );
  }
}

UploadTimesheet.propTypes = {
  uploadTimesheets: PropTypes.func.isRequired
};

export default connect(null, { uploadTimesheets })(UploadTimesheet);
