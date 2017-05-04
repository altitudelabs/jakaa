import store from './store';
import fakerTransactions from '../fakers/transactions';
import fakerUsers from '../fakers/users';

export const fetchTransactions = (dataSource, { page = 0, limit = 10 }) => {
  const offset = page * limit;
  const transactionCount = dataSource.length;
  const transactions = [...dataSource].splice(offset, limit);
  store.dispatch({
    transactionCount,
    transactions,
    type: 'SET_TRANSACTIONS',
  });
};

export const getTransactions = ({ page = 0, limit = 10 }) => {
  fetchTransactions(fakerTransactions, { page, limit });
};

export const searchTransactionBy = (conditions, { page = 0, limit = 10 }) => {
  const results = fakerTransactions.filter(tran => Object.keys(conditions).map(key => tran[key].indexOf(conditions[key]) > -1).indexOf(false) === -1);
  fetchTransactions(results, { page, limit });
};

export const getTransactionBy = (conditions, { page = 0, limit = 10 }) => {
  const results = fakerTransactions.filter(tran => Object.keys(conditions).map(key => tran[key] === conditions[key]).indexOf(false) === -1);
  fetchTransactions(results, { page, limit });
};

export const getTransactionById = (id) => {
  id = parseInt(id, 10);
  const transaction = fakerTransactions.filter(_tran => _tran.id === id)[0] || {};
  store.dispatch({
    transaction,
    type: 'SET_TRANSACTION_DETAIL',
  });
};

export const shortFormat = (transaction) => {
  let status;
  const { periodStart, periodEnd, orderId, rentalCost, borrowerId, ownerId } = transaction;
  const borrower = fakerUsers[borrowerId - 1];
  const owner = fakerUsers[ownerId - 1];

  ['isPending', 'isApproved', 'isDelivered', 'isCancelled'].forEach(item => {
    if (transaction[item]) {
      switch (item) {
        case 'isPending':
          status = 'Pending request';
          break;
        case 'isApproved':
          status = 'Approved';
          break;
        case 'isDelivered':
          status = 'Delivered';
          break;
        case 'isCancelled':
          status = 'Cancelled';
          break;
        default:
          status = 'Pending request';
          break;
      }
    }
  });

  const rentalPeriod = [periodStart, periodEnd].join(' - ');
  if (!status) status = 'Pending request  ';

  return { ...transaction, borrower, owner, rentalPeriod, status, orderId, rentalCost: `HK$ ${rentalCost}` };
};

export const shortFormats = (transactions) => {
  return transactions.map(transaction => shortFormat(transaction));
};
