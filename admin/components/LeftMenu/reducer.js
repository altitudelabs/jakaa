'use strict';

const initialState = {
  items: [
    {
      header: 'General',
      items: [
        {
          name: 'Transaction',
          link: '/transaction',
          items: [
            {
              name: 'All',
              link: '/transaction',
            },
            {
              name: 'Current',
              link: '/transaction/current',
            },
            {
              name: 'Historical',
              link: '/transaction/historical',
            },
          ],
        },
        {
          name: 'Users',
          link: '/users',
        },
        {
          name: 'Delivery Schedule',
          link: '/delivery-schedule',
        },
        {
          name: 'Promotion',
          link: '/promotions',
        },
        {
          name: 'Anlytics',
          link: '/anlytics',
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
