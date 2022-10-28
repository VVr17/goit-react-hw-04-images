export const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export const INITIAL_STATE = {
  page: 1,
  query: '',
  images: [],
  error: null,
  loadBtnIsShown: false,
  status: STATUS.idle,
};

export const TYPE_KEYS = {
  submit: 'submit',
  pending: STATUS.pending,
  resolved: STATUS.resolved,
  error: STATUS.error,
  loadBtnIsShown: 'loadBtnIsShown',
  loadBtnClick: 'loadBtnClick',
};
