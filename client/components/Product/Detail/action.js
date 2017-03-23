import { prefix } from './reducer';
import store from '../../../store';

const getType = (str) => {
  return `${prefix}_#_${str}`;
};

export default {
  openRequest: () => {
    store.dispatch({
      type: getType('SET_REQUEST_OPEN'),
      open: true,
    });
  },
  closeRequest: () => {
    store.dispatch({
      type: getType('SET_REQUEST_OPEN'),
      open: false,
    });
  },
  openTOC: () => {
    store.dispatch({
      type: getType('SET_TOC_OPEN'),
      open: true,
    });
  },
  closeTOC: () => {
    store.dispatch({
      type: getType('SET_TOC_OPEN'),
      open: false,
    });
  },
};
