import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadTimesheets } from "../../../actions/timesheetsActions";
import DropzoneComponent from "react-dropzone-component";
//import { Divider } from "semantic-ui-react";

class UploadTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    //this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
      acceptedFiles: "image/jpeg,image/png",
      autoProcessQueue: false,
      uploadMultiple: false,
      maxFiles: 1
    };

    this.componentConfig = {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "no-url"
    };
  }

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

  /*onChange(e) {
    this.setState({ file: e.target.files[0] });
  }*/

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      addedfile: this.onDrop
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
