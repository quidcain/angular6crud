import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    children: [
      {
          id: 'table',
          title: 'Table',
          type: 'item',
          url: '/samples',
      },
      {
        id : 'logout',
        title: 'Log out',
        type: 'item',
        url: '/logout',
      }
    ]
  }
];
