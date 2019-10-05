import React, { Fragment, memo, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Container from 'components/atoms/Container';
import Title from 'components/atoms/Title';
import history from 'utils/history';
import Error404 from 'components/atoms/Error404';
import { makeSelectGlobalLocation } from 'containers/App/selectors';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'containers/SettingsPage/ExpanionPanel';
import { loadUserSettings } from 'containers/SettingsPage/actions';
import FitPageSpinner from 'components/molecules/FitPageSpinner';
import Error500 from 'components/atoms/Error500';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectSettingsPageSettingsLoading,
  makeSelectSettingsPageSettingsError,
} from './selectors';
import PersonalSettings from './PersonalSettings';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  heading: {
    textTransform: 'capitalize',
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const TABS = ['personal', 'account', 'app', 'support', 'feedback'];

function SettingsPage({ loading, error, location, onLoad }) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  useEffect(() => {
    onLoad();
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const activeTab = location.pathname.split('/').pop();

  if (activeTab === 'settings' && !compact) {
    history.push('settings/personal');
  }

  if (loading) {
    return <FitPageSpinner />;
  }

  if (error) {
    return <Error500 />;
  }

  const content = (
    <div className={classes.content}>
      <Switch>
        <Route path="/settings/personal" component={PersonalSettings} />
        <Route path="/settings/account" component={PersonalSettings} />
        <Route path="/settings/app" component={PersonalSettings} />
        <Route path="/settings/support" component={PersonalSettings} />
        <Route path="/settings/feedback" component={PersonalSettings} />
        <Route path="/my-orders/" component={Error404} />
      </Switch>
    </div>
  );

  const handleExpandChange = panel => (event, newExpanded) => {
    history.push(newExpanded ? `/settings/${panel}` : '/settings');
  };

  const tabs = TABS.map(tab => <Tab key={tab} label={tab} value={tab} />);

  const expansionPanels = TABS.map(tab => (
    <ExpansionPanel
      key={tab}
      square
      expanded={activeTab === tab}
      onChange={handleExpandChange(tab)}
    >
      <ExpansionPanelSummary>
        <Typography className={classes.heading}>{tab}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {activeTab === tab ? content : ''}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));

  return (
    <Container>
      {compact ? (
        <Fragment>{expansionPanels}</Fragment>
      ) : (
        <Fragment>
          <Title>Settings</Title>
          <Paper className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={(event, value) => {
                history.push(value);
              }}
              className={classes.tabs}
            >
              {tabs}
            </Tabs>
            {content}
          </Paper>
        </Fragment>
      )}
    </Container>
  );
}

SettingsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  location: PropTypes.object,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectSettingsPageSettingsLoading(),
  error: makeSelectSettingsPageSettingsError(),
  location: makeSelectGlobalLocation(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadUserSettings()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SettingsPage);
