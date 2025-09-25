export const data = {
  id: 'Lucas_Alex',
  data: {
    name: 'Ezekiel Halvorson',
    imageURL: '/assets/images/avatar/user-18.png',
    
  },
  children: [
    {
      id: 'Alex_Lee',
      data: {
        name: 'Erin Dicki',
        imageURL: '/assets/images/avatar/user-19.png'
      },

      children: [
        {
          id: 'Mia_Patel',
          data: {
            name: 'Norval Murray',
            imageURL: '/assets/images/avatar/user-20.png'
          }
        },
        {
          id: 'Ryan_Clark',
          data: {
            name: 'Oliver Boehm',
            imageURL: '/assets/images/avatar/user-21.png'
          }
        },
        {
          id: 'Zoe_Wang',
          data: {
            name: 'Gino Prosacco',
            imageURL: '/assets/images/avatar/user-22.png'
          }
        }
      ]
    },
    {
      id: 'Leo_Kim',
      data: {
        name: 'Edgardo Kessler',
        imageURL: '/assets/images/avatar/user-23.png'
      },

      children: [
        {
          id: 'Ava_Jones',
          data: {
            name: 'Marcos Stracke',
            imageURL: '/assets/images/avatar/user-24.png'
          }
        },
        {
          id: 'Maya_Gupta',
          data: {
            name: 'Waylon Erdman',
            imageURL: '/assets/images/avatar/user-25.png'
          }
        }
      ]
    },

    {
      id: 'Max_Ruiz',
      data: {
        name: 'Eleanora Hayes',
        imageURL: '/assets/images/avatar/user-26.png'
      }
    }
  ]
};

export const options = {
  contentKey: 'data',
  width: '100%',
  height: 600,
  nodeWidth: 150,
  nodeHeight: 70,
  childrenSpacing: 70,
  fontSize: '12px',
  siblingSpacing: 30,
  direction: 'bottom',
  nodeBorderColor: 'transparent',
  nodeBGColor:'none',
  borderWidth: 0,
  borderRadius: '10px',
  nodeTemplate: (content: { imageURL: any; name: any; borderColor: any }) => {
    return `<div class="flex bg-white dark:bg-dark-850 border card flex-col h-full w-full"><div class="flex gap-2 items-center h-full rounded-t-md shadow-lg px-4">
    <img class="size-8 rounded-full" src='${content.imageURL}' alt=''>
    <h6 class="text-xs text-gray-500 dark:text-dark-500">${content.name}</h6>
   </div><div class="mt-auto rounded-b-sm " style='border-bottom: 10px solid ${content.borderColor}'></div></div>`;
  },
  enableToolbar: true
};
