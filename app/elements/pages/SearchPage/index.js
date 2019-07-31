import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadTasks } from 'elements/pages/SearchPage/actions';
import TaskDeck from 'elements/organisms/TaskDeck';
import { MDBCol, MDBRow } from 'mdbreact';
import reducer from 'elements/pages/SearchPage/reducer';
import saga from 'elements/pages/SearchPage/saga';
import { makeSelectSearchData } from 'elements/pages/SearchPage/selectors';

export function SearchPage({ data, onPageLoad }) {
  useInjectReducer({ key: 'searchPage', reducer });
  useInjectSaga({ key: 'searchPage', saga });

  useEffect(() => {
    onPageLoad();
  }, []);

  return (
    <div>
      <Helmet>
        <title>SearchPage</title>
        <meta name="description" content="Description of SearchPage" />
      </Helmet>
      <MDBRow>
        <MDBCol sm="12" md="8">
          <TaskDeck {...data} />
        </MDBCol>
        <MDBCol sm="12" md="4">
          side-content
        </MDBCol>
      </MDBRow>
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
