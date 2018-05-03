import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';
import {Form, Message} from 'semantic-ui-react';

class PostSalesForm extends Component {
    state = {
        data: {
            consultantName: '',
            skillset: '',
            location: '',
            billingRate: '',
            vendor: '',
            client: '',
            interviewDate: '',
            interviewType: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = e => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors, loading: false})
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!data.consultantName) errors.consultantName = "Please enter a consultantName";
        if (!data.skillset) errors.skillset = "Please enter a skillset";
        if (!data.location) errors.location = "Please enter a location";
        if (!data.billingRate) errors.billingRate = "Please enter a billing rate";
        if (!data.vendor) errors.vendor = "Please enter a vendor name";
        if (!data.client) errors.client = "Please enter a client name";
        if (!data.interviewDate) errors.interviewDate = "Please enter an interview date";
        if (!data.interviewType) errors.interviewType = "Please enter mode of interview";
        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.consultantName}>
                            <label htmlFor="consultantName">Consultant name</label>
                            <Form.Input
                                type="text"
                                name="consultantName"
                                value={data.consultantName}
                                onChange={this.onChange}
                            />
                            {errors.consultantName && <InlineError text={errors.consultantName}/>}
                        </Form.Field>
                    </div>
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.skillset}>
                            <label htmlFor="skillset">Skillset</label>
                            <Form.Input
                                type="text"
                                name="skillset"
                                value={data.skillset}
                                onChange={this.onChange}
                            />
                            {errors.skillset && <InlineError text={errors.skillset}/>}
                        </Form.Field>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.location}>
                            <label htmlFor="location">Location</label>
                            <Form.Input
                                type="text"
                                name="location"
                                value={data.location}
                                onChange={this.onChange}
                            />
                            {errors.location && <InlineError text={errors.location}/>}
                        </Form.Field>
                    </div>
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.billingRate}>
                            <label htmlFor="billingRate">Billing Rate</label>
                            <Form.Input
                                type="text"
                                name="billingRate"
                                placeholder="/hr"
                                value={data.billingRate}
                                onChange={this.onChange}
                            />
                            {errors.billingRate && <InlineError text={errors.billingRate}/>}
                        </Form.Field>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.vendor}>
                            <label htmlFor="vendor">Vendor name</label>
                            <Form.Input
                                type="text"
                                name="vendor"
                                value={data.vendor}
                                onChange={this.onChange}
                            />
                            {errors.vendor && <InlineError text={errors.vendor}/>}
                        </Form.Field>
                    </div>
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.client}>
                            <label htmlFor="client">Client name</label>
                            <Form.Input
                                type="text"
                                name="client"
                                value={data.client}
                                onChange={this.onChange}
                            />
                            {errors.client && <InlineError text={errors.client}/>}
                        </Form.Field>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.interviewDate}>
                            <label htmlFor="interviewDate">Interview Date</label>
                            <Form.Input
                                type="date"
                                name="interviewDate"
                                value={data.interviewDate}
                                onChange={this.onChange}
                            />
                            {errors.interviewDate && <InlineError text={errors.interviewDate}/>}
                        </Form.Field>
                    </div>
                    <div className="col-md-6">
                        <Form.Field required error={!!errors.interviewType}>
                            <label htmlFor="interviewType">Mode of Interview</label>
                            <Form.Input
                                type="text"
                                name="interviewType"
                                value={data.interviewType}
                                onChange={this.onChange}
                            />
                            {errors.interviewType && <InlineError text={errors.interviewType}/>}
                        </Form.Field>
                    </div>
                </div>
                <br/>
                <button className="btn btn-lg btn-primary btn-block">Submit</button>
            </Form>
        );
    }
}

PostSalesForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default PostSalesForm
