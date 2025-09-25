export const data = {
    id: 'Lucas_Alex',
    data: {
        name: 'Omer Sporer',
        imageURL: '/assets/images/avatar/user-1.png',
    },
    children: [
        {
            id: 'Alex_Lee',
            data: {
                name: 'Reva Botsford',
                imageURL: '/assets/images/avatar/user-2.png',
            },
            children: [
                {
                    id: 'Mia_Patel',
                    data: {
                        name: 'Tyshawn Marquardt',
                        imageURL: '/assets/images/avatar/user-3.png',
                    },
                },
                {
                    id: 'Ryan_Clark',
                    data: {
                        name: 'Kailey Corkery',
                        imageURL:  '/assets/images/avatar/user-4.png',
                    },
                },
                {
                    id: 'Zoe_Wang',
                    data: {
                        name: 'Zoe Wang',
                        imageURL: '/assets/images/avatar/user-5.png',
                    },
                },
            ],
        },
        {
            id: 'Leo_Kim',
            data: {
                name: 'Hardy Maggio',
                imageURL: '/assets/images/avatar/user-6.png',
            },
            children: [
                {
                    id: 'Ava_Jones',
                    data: {
                        name: 'Adelle Abbott',
                        imageURL: '/assets/images/avatar/user-7.png',
                    },
                },
                {
                    id: 'Maya_Gupta',
                    data: {
                        name: 'Vincenzo Hirthe',
                        imageURL: '/assets/images/avatar/user-8.png',
                    },
                },
            ],
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
                    },
                },
            ],
        },
        {
            id: 'Max_Ruiz',
            data: {
                name: 'Cornelius Harris',
                imageURL: '/assets/images/avatar/user-11.png',
            },
        },
    ],
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
    enableExpandCollapse: true,
    nodeTemplate: (content: { imageURL: any; name: any; }) => {
        return `<div class="flex gap-2 items-center h-full rounded-t-md shadow-lg px-4">
        <img class="size-8 rounded-full" src='${content.imageURL}' alt=''>
        <h6 class="text-xs text-gray-500 dark:!text-white">${content.name}</h6>
       </div>`;
    },
    enableToolbar: true
  };
  