import React, { Component } from "react";
import PostSalesForm from "./PostSalesForm";
import { connect } from "react-redux";
import { salesForm } from "../../actions/salesListActions";
import PropTypes from "prop-types";
import { Header, Divider } from "semantic-ui-react";

class PostSalesPage extends Component {
  submit = data =>
    this.props
      .salesForm(data)
      .then(() => this.props.history.push("/markettingSales"));

  render() {
    return (
      <div className="container h-100">
        <Divider hidden />
        <Header className="border-bottom pb-2 mb-3" textAlign="center" as="h2">
          Add submission
        </Header>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <div className="card">
              <div className="card-body">
                <PostSalesForm submit={this.submit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostSalesPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  salesForm: PropTypes.func.isRequired
};

export default connect(null, { salesForm })(PostSalesPage);
