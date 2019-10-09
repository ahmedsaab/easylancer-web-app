import React, { memo, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Container from 'components/atoms/Container';
import Title from 'components/atoms/Title';
import PersonIcon from '@material-ui/icons/Person';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import { loadUserSettings } from 'containers/SettingsPage/actions';
import FitPageSpinner from 'components/molecules/FitPageSpinner';
import Error500 from 'components/atoms/Error500';
import Section from 'components/molecules/Section';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectSettingsPageSettingsLoading,
  makeSelectSettingsPageSettingsError,
  makeSelectSettingsPageSettingsData,
} from './selectors';
import PersonalSettings from './PersonalSettings';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1, 1),
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
  section: {
    marginBottom: theme.spacing(3),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

function SettingsPage({ loading, error, data, onLoad }) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  useEffect(() => {
    onLoad();
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading || !data) {
    return <FitPageSpinner />;
  }

  if (error) {
    return <Error500 />;
  }

  return (
    <Container className={classes.container}>
      {!compact ? <Title>Settings</Title> : null}
      <div className={classes.section}>
        <Section title="Personal" Icon={PersonIcon} />
        <PersonalSettings />
      </div>
      <div className={classes.section}>
        <Section title="Account" Icon={AlternateEmailOutlinedIcon} />
        <div />
      </div>
      <div className={classes.section}>
        <Section title="App" Icon={SettingsApplicationsIcon} />
        <div />
      </div>
      <div className={classes.section}>
        <Section title="Support" Icon={HelpOutlineIcon} />
        <div />
      </div>
      <div className={classes.section}>
        <Section title="Feedback" Icon={FeedbackOutlinedIcon} />
        <div />
      </div>
    </Container>
  );
}

SettingsPage.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
  error: PropTypes.instanceOf(Error),
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSettingsPageSettingsData(),
  loading: makeSelectSettingsPageSettingsLoading(),
  error: makeSelectSettingsPageSettingsError(),
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
