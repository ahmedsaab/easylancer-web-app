import produce from 'immer';
import HistoryIcon from '@material-ui/icons/History';
import {
  WorkerTaskCardFull,
  WorkerTaskCardNoOffer,
} from 'containers/MyTasksPage/WorkerTaskCard';
import {
  OwnerAssignedTaskCard,
  OwnerOpenTaskCard,
} from 'containers/MyTasksPage/OwnerTaskCard';
import {
  LOAD_MY_TASKS,
  LOAD_MY_TASKS_SUCCESS,
  LOAD_MY_TASKS_ERROR,
} from './constants';

export const initialState = {
  appliedNew: {
    name: 'appliedNew',
    title: 'New',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardFull,
    page: null,
    hasNext: null,
  },
  appliedHistory: {
    name: 'appliedHistory',
    title: 'History',
    data: null,
    loading: null,
    error: null,
    Icon: HistoryIcon,
    Task: WorkerTaskCardFull,
    page: null,
    hasNext: null,
  },
  appliedScheduled: {
    name: 'appliedScheduled',
    title: 'Scheduled',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedStarted: {
    name: 'appliedStarted',
    title: 'Started',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedPendingWorker: {
    name: 'appliedPendingWorker',
    title: 'Pending My Review',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedDone: {
    name: 'appliedDone',
    title: 'Done',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedNotDone: {
    name: 'appliedNotDone',
    title: 'Not Done',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedInvestigate: {
    name: 'appliedInvestigate',
    title: 'Reported',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedPendingOwner: {
    name: 'appliedPendingOwner',
    title: "Pending Owner's Review",
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  appliedCancelled: {
    name: 'appliedCancelled',
    data: null,
    loading: null,
    error: null,
    Task: WorkerTaskCardNoOffer,
    page: null,
    hasNext: null,
  },
  createdOpen: {
    name: 'createdOpen',
    data: null,
    loading: null,
    error: null,
    Task: OwnerOpenTaskCard,
    page: null,
    hasNext: null,
  },
  createdScheduled: {
    name: 'createdScheduled',
    title: 'Scheduled',
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdStarted: {
    name: 'createdStarted',
    title: 'Started',
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdPendingOwner: {
    name: 'createdPendingOwner',
    title: 'Pending My Review',
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdDone: {
    name: 'createdDone',
    title: 'Done',
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdNotDone: {
    name: 'createdNotDone',
    title: 'Not Done',
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdInvestigate: {
    name: 'createdInvestigate',
    title: 'Reported',
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdPendingWorker: {
    name: 'createdPendingWorker',
    title: "Pending Worker's Review",
    data: null,
    loading: null,
    error: null,
    Task: OwnerAssignedTaskCard,
    page: null,
    hasNext: null,
  },
  createdCancelled: {
    name: 'createdCancelled',
    title: 'Cancelled',
    data: null,
    loading: null,
    error: null,
    Task: OwnerOpenTaskCard,
    page: null,
    hasNext: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const myTasksPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MY_TASKS:
        if (action.page === 1) {
          draft[action.list] = initialState[action.list];
        }
        draft[action.list].loading = true;
        break;

      case LOAD_MY_TASKS_SUCCESS:
        if (action.page > 1) {
          draft[action.list].data = draft[action.list].data.concat(action.data);
        } else {
          draft[action.list].data = action.data;
        }
        draft[action.list].page = action.page;
        draft[action.list].hasNext = action.hasNext;
        draft[action.list].error = null;
        draft[action.list].loading = false;
        break;

      case LOAD_MY_TASKS_ERROR:
        draft[action.list].error = action.error;
        draft[action.list].loading = false;
        break;
    }
  });

export default myTasksPageReducer;
