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

  ['isApproved', 'banned', 'isDeleted'].forEach(item => {
    if (transaction[item]) {
      switch (item) {
        case 'isApproved':
          status = 'Enabled';
          break;
        case 'banned':
          status = 'Banned';
          break;
        case 'isDeleted':
          status = 'Deleted';
          break;
        default:
          status = 'Disabled';
          break;
      }
    }
  });

  const rentalPeriod = [periodStart, periodEnd].join(' - ');
  if (!status) status = 'Disabled';
  return { ...transaction, borrower, owner, rentalPeriod, status, orderId: `Order ${orderId}`, rentalCost: `HK$ ${rentalCost}` };
};

export const shortFormats = (transactions) => {
  return transactions.map(transaction => shortFormat(transaction));
};
