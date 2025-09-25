export const data = {
  id: 'ms',
  data: {
    imageURL: '/assets/images/avatar/user-4.png',
    name: 'Jordan Davis',
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
    }
  ]
};
export const options = {
  contentKey: 'data',
  width: '100%',
  height: 600,
  nodeWidth: 150,
  nodeHeight: 120,
  childrenSpacing: 50,
  siblingSpacing: 20,
  direction: 'top',
  fontColor:[1],
  nodeTemplate: (content: { imageURL: string; name: string }) => `
  <div class="flex gap-5 justify-center flex-col items-center p-3">
    <img class="size-12 rounded-full" src='${content.imageURL}' alt='' />
    <h6 class="text-white">${content.name}</h6>
  </div>`,
  enableToolbar: true
};
