'use strict';

const initialState = {
  items: [
    {
      header: 'General',
      items: [
        {
          name: 'Transaction',
          link: '/admin/transaction',
          items: [
            {
              name: 'All',
              link: '/admin/transaction',
            },
            {
              name: 'Current',
              link: '/admin/transaction/current',
            },
            {
              name: 'Historical',
              link: '/admin/transaction/historical',
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
