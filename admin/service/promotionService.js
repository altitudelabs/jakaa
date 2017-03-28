import store from './store';
import fakerPromotions from '../fakers/promotions';

export const fetchPromotions = (dataSource, { page = 0, limit = 10 }) => {
  const offset = page * limit;
  const promotionCount = dataSource.length;
  const promotions = [...dataSource].splice(offset, limit);
  store.dispatch({
    promotions,
    promotionCount,
    type: 'SET_PROMOTIONS',
  });
};

export const getPromotions = ({ page = 0, limit = 10 }) => {
  fetchPromotions(fakerPromotions, { page, limit });
};

export const searchPromotionBy = (conditions, { page = 0, limit = 10 }) => {
  const results = fakerPromotions.filter(promotion => Object.keys(conditions).map(key => promotion[key].indexOf(conditions[key]) > -1).indexOf(false) === -1);
  fetchPromotions(results, { page, limit });
};

export const getPromotionBy = (conditions, { page = 0, limit = 10 }) => {
  const results = fakerPromotions.filter(promotion => Object.keys(conditions).map(key => promotion[key] === conditions[key]).indexOf(false) === -1);
  fetchPromotions(results, { page, limit });
};

export const getPromotionById = (id) => {
  id = parseInt(id, 10);
  const promotion = fakerPromotions.filter(_Promotion => _Promotion.id === id)[0] || {};
  store.dispatch({
    promotion,
    type: 'SET_PROMOTION_DETAIL',
  });
};

export const shortFormat = (promotions) => {
  return promotions.map(promotion => {
    const status = promotion['isDisabled'] ? 'Enabled' : 'Disabled';
    return { ...promotion, status };
  });
};
