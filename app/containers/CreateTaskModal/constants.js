export const UPDATE_TASK_FORM_GENERAL =
  'app/CreateTaskModal/UPDATE_TASK_FORM_GENERAL';
export const UPDATE_TASK_FORM_LOCATION =
  'app/CreateTaskModal/UPDATE_TASK_FORM_LOCATION';
export const UPDATE_TASK_FORM_COUNTRY =
  'app/CreateTaskModal/UPDATE_TASK_FORM_COUNTRY';
export const UPDATE_TASK_FORM_REMOVE_TAG =
  'app/CreateTaskModal/UPDATE_TASK_FORM_REMOVE_TAG';
export const UPDATE_TASK_FORM_PUSH_TAG =
  'app/CreateTaskModal/UPDATE_TASK_FORM_PUSH_TAG';
export const SEND_TASK = 'app/CreateTaskModal/SEND_TASK';
export const UPDATE_STEP = 'app/CreateTaskModal/UPDATE_STEP';
export const UPDATE_IS_OPEN = 'app/CreateTaskModal/UPDATE_IS_OPEN';
export const SEND_TASK_SUCCESS = 'app/CreateTaskModal/SEND_TASK_SUCCESS';
export const SEND_TASK_FAIL = 'app/CreateTaskModal/SEND_TASK_FAIL';
export const FETCH_TAGS = 'app/CreateTaskModal/FETCH_TAGS';

export const countries = [
  {
    text: 'Egypt',
    value: 'eg',
  },
  {
    text: 'Estonia',
    value: 'est',
  },
  {
    text: 'Germany',
    value: 'de',
  },
];

export const currencies = [
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'EGP',
    label: 'ج.م',
  },
];

export const categories = [
  {
    value: 1234,
    text: 'Beauty',
    types: [
      {
        value: 1,
        text: 'Manicure',
      },
      {
        value: 2,
        text: 'Hair',
      },
    ],
  },
  {
    value: 5678,
    text: 'Repair',
    types: [
      {
        value: 3,
        text: 'Computer',
      },
      {
        value: 4,
        text: 'Phone',
      },
      {
        value: 5,
        text: 'Bike',
      },
      {
        value: 6,
        text: 'Automotive',
      },
    ],
  },
  {
    value: 2853,
    text: 'Home',
    types: [
      {
        value: 7,
        text: 'Cleaning',
      },
      {
        value: 8,
        text: 'Renovation',
      },
      {
        value: 9,
        text: 'Electricity',
      },
      {
        value: 10,
        text: 'Plumping',
      },
    ],
  },
  {
    value: 1222,
    text: 'Expat',
    types: [
      {
        value: 11,
        text: 'Translation',
      },
      {
        value: 12,
        text: 'Paper work',
      },
    ],
  },
];
