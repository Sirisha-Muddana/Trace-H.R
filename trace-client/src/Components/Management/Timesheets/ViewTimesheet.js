import React, { Component } from "react";
import axios from "axios";

class ViewTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: []
    };
  }

  componentDidMount() {
    axios.get(`/image/${this.props.match.params.filename}`).then(res => {
      this.setState({ image: res.data });
      console.log(res);
    });
  }

  render() {
    return (
      <div>
        <img src={`data:image/jpeg;base64,${this.state.image}`} alt="" />
      </div>
    );
  }
}

export default ViewTimesheet;
