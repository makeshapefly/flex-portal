export const data = {
  id: 'ms',
  data: {
    imageURL: '/assets/images/avatar/user-4.png',
    name: 'Jordan Davis',
    nodeBGColor: [3]
  },
  children: [
    {
      id: 'mh',
      data: {
        imageURL: '/assets/images/avatar/user-11.png',
        name: 'Chris Wilson'
      },
      children: [
        {
          id: 'kb',
          data: {
            imageURL: '/assets/images/avatar/user-13.png',
            name: 'Alex Lee'
          }
        },
        {
          id: 'cr',
          data: {
            imageURL: '/assets/images/avatar/user-14.png',
            name: 'Taylor Wilson'
          }
        }
      ]
    },
    {
      id: 'cs',
      data: {
        imageURL: '/assets/images/avatar/user-15.png',
        name: 'Jane Brown'
      },
      children: [
        {
          id: 'Noah_Chandler',
          data: {
            imageURL: '/assets/images/avatar/user-16.png',
            name: 'John Garcia'
          }
        },
        {
          id: 'Felix_Wagner',
          data: {
            imageURL: '/assets/images/avatar/user-17.png',
            name: 'Cameron Wilson'
          }
        }
      ]
    },
    {
      id: 'Lily_Chen',
      data: {
          name: 'Idella Heaney',
          imageURL: '/assets/images/avatar/user-9.png',
      },
      children: [
          {
              id: 'Jake_Scott',
              data: {
                  name: 'Lambert Schoen',
                  imageURL: '/assets/images/avatar/user-10.png',
              }
          },
      ],
  },
  {
      id: 'Max_Ruiz',
      data: {
          name: 'Cornelius Harris',
          imageURL: '/assets/images/avatar/user-11.png',
      }
  },
  ]
};
export const options = {
  contentKey: 'data',
  width: '100%',
  height: 700,
  nodeWidth: 150,
  nodeHeight: 70,
  childrenSpacing: 70,
  siblingSpacing: 30,
  fontSize: '12px',
  direction: 'left',
  borderRadius: 0,
  nodeTemplate: (content: { imageURL: any; name: any; }) => {
    return `<div class="flex gap-2 items-center h-full rounded-t-md shadow-lg px-4">
    <img class="size-8 rounded-full" src='${content.imageURL}' alt=''>
    <h6 class="text-xs text-gray-800 dark:text-dark-100">${content.name}</h6>
   </div>`;
},
  enableToolbar: true
};
