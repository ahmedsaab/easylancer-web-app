import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadTasks } from 'containers/SearchPage/actions';
import TaskDeck from 'containers/SearchPage/TaskDeck';
import reducer from 'containers/SearchPage/reducer';
import saga from 'containers/SearchPage/saga';
import { makeSelectSearchData } from 'containers/SearchPage/selectors';

export function SearchPage({ data, onPageLoad }) {
  useInjectReducer({ key: 'searchPage', reducer });
  useInjectSaga({ key: 'searchPage', saga });

  useEffect(() => {
    onPageLoad();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Search</title>
        <meta name="description" content="Find services" />
      </Helmet>
      <TaskDeck {...data} />
    </div>
  );
}

SearchPage.propTypes = {
  onPageLoad: PropTypes.func,
  data: PropTypes.shape({
    tasks: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSearchData(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => dispatch(loadTasks()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SearchPage);
