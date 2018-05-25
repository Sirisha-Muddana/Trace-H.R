import React, { Component } from "react";

class ViewTimesheetImage extends Component {
  render() {
    const image = this.props.image;
    const extension = this.props.extension;
    //console.log(image.contentType);
    return (
      <div className="container">
        <img src={`data:image/` + extension + `;base64,${image}`} alt="" />
      </div>
    );
  }
}

export default ViewTimesheetImage;
