import {
  shortFormat,
} from '../../service/transactionService';

const initialState = {
  id: null,
};

const transactionDetail = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'SET_TRANSACTION_DETAIL':
      return { ...state, ...shortFormat(action.transaction) };
    default:
      return state;
  }
};

export default transactionDetail;
