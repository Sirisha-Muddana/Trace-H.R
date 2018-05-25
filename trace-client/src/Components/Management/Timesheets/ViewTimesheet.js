import React, { Component } from "react";
import PropTypes from "prop-types";
import ViewTimesheetImage from "./ViewTimesheetImage";
import { connect } from "react-redux";
import { getImage } from "../../../actions/timesheetsActions";
import { Loader } from "semantic-ui-react";
import PDFViewer from "mgr-pdf-viewer-react";

class ViewTimesheet extends Component {
  componentDidMount() {
    this.props.getImage(this.props.match.params.filename);
  }

  render() {
    const { image, loading } = this.props.timesheets;
    var base64String = JSON.stringify(image).charAt(1);
    let extension;
    if (base64String === "/") extension = "jpg";
    else if (base64String === "i") extension = "png";
    else extension = "pdf";
    let getImage;
    if (loading) {
      getImage = <Loader active inline="centered" />;
    } else {
      if (Object.keys(image).length > 0) {
        if (extension === "jpg" || extension === "png") {
          getImage = <ViewTimesheetImage image={image} extension={extension} />;
        } else {
          getImage = (
            <PDFViewer
              document={{ url: `data:application/pdf;base64,${image}` }}
              css="customViewer"
              navigation={{
                css: {
                  previousPageBtn: "customPrevBtn",
                  nextPageBtn: "customNextBtn",
                  pages: "customPages",
                  wrapper: "customWrapper"
                }
              }}
            />
          );
        }
      } else {
        getImage = <h4> No Timesheets found</h4>;
      }
    }

    return <div>{getImage}</div>;
  }
}

ViewTimesheet.propTypes = {
  getImage: PropTypes.func.isRequired,
  timesheets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

export default connect(mapStateToProps, { getImage })(ViewTimesheet);
