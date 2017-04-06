'use strict';

const initialState = {
  items: [
    {
      header: 'General',
      items: [
        {
          name: 'Transaction',
          link: '/admin/transactions',
          items: [
            {
              name: 'All',
              indexRoute: true,
              link: '/admin/transactions',
            },
            {
              name: 'Current',
              link: '/admin/transactions/current',
            },
            {
              name: 'Historical',
              link: '/admin/transactions/historical',
            },
          ],
        },
        {
          name: 'Users',
          link: '/admin/users',
        },
        {
          name: 'Delivery Schedule',
          link: '/admin/delivery-schedule',
        },
        {
          name: 'Promotion',
          link: '/admin/promotions',
        },
        {
          name: 'Anlytics',
          link: '/admin/anlytics',
        },
      ],
    },
    {
      header: 'Account',
      items: [
        {
          name: 'Logout',
          link: '/logout',
        },
      ],
    },
  ],
};

const leftMenu = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    default:
      return state;
  }
};

export default leftMenu;
