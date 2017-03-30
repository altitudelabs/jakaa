const initialState = {
  transactionCount: 0,
  transactions: [],
  limit: 10,
};

const transactions = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.transactions,
        transactionCount: action.transactionCount,
      };
    default:
      return state;
  }
};

export default transactions;
