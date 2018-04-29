import React from 'react';
import { withRouter } from 'react-router-dom';
import Main from './Components/Routes/Main';
import Navbar from './Components/Navigation/Navbar';
import {Grid, Divider, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Sidebar from './Components/Navigation/Sidebar';


const App = ({isAuthenticated}) => (
    <div>
        <Navbar/>
        {!isAuthenticated ? (
            <Grid centered columns={2}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Divider section hidden/>
                    <Main/>
                </Grid.Column>
            </Grid>
        ) : (
            <Grid>
                <Grid.Column width={3}>
                    <Sidebar/>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Segment>
                    <Divider section hidden/>
                    <Main/>
                    </Segment>
                </Grid.Column>
            </Grid>
        )}
    </div>
)

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default withRouter(connect(mapStateToProps)(App));
