const cards = [
  {
    header: 'Card Header',
    footer: 'Card Footer',
    body: 'Business Content means any sound recordings, musical works, album cover artwork, photographs, images, audiovisual works, third party metadata (including editorial content) and other copyrighted materials made available by Seller through the Business Products, but excluding the Business Product Software and Incorporated.'
  },
  {
    header: 'Card Header',
    footer: '',
    body: 'Business Content means any sound recordings, musical works, album cover artwork, photographs, images, audiovisual works, third party metadata (including editorial content) and other copyrighted materials made available by Seller through the Business Products, but excluding the Business Product Software and Incorporated.'
  },
  {
    header: '',
    footer: 'Card Footer',
    body: 'Business Content means any sound recordings, musical works, album cover artwork, photographs, images, audiovisual works, third party metadata (including editorial content) and other copyrighted materials made available by Seller through the Business Products, but excluding the Business Product Software and Incorporated.'
  }
];

const profiles = [
  {
    name: 'Linda J. Bell',
    role: 'Sr. Web Designer',
    avatar: '/assets/images/avatar/user-21.png',
    cover: '/assets/images/gallery/img-01.jpg',
    stars: '2k',
    followers: '10k',
    projects: '15'
  },
  {
    name: 'Jennifer Brunner',
    role: 'Laravel Developer',
    avatar: '/assets/images/avatar/user-18.png',
    cover: '/assets/images/gallery/img-02.jpg',
    stars: '1.1k',
    followers: '2.5k',
    projects: '2'
  },
  {
    name: 'Sandra Alexander',
    role: 'ASP.Net Developer',
    avatar: '/assets/images/avatar/user-17.png',
    cover: '/assets/images/gallery/img-03.jpg',
    stars: '3.6k',
    followers: '12k',
    projects: '8'
  },
  {
    name: 'James Hazelwood',
    role: 'Wordpress Developer',
    avatar: '/assets/images/avatar/user-14.png',
    cover: '/assets/images/gallery/img-04.jpg',
    stars: '3.6k',
    followers: '12k',
    projects: '8'
  }
];

// Define the array of card data
const hoverCards = [
  { type: 'hover', textColor: 'text-primary-500', bgCss: 'bg-primary-500/15', color: 'primary' },
  { type: 'hover', textColor: 'text-purple-500', bgCss: 'bg-purple-500/15', color: 'purple' },
  {
    type: 'hover',
    textColor: 'text-green-500',
    bgCss: 'bg-green-500/15',
    opacity: true,
    color: 'green'
  },
  {
    type: 'hover',
    textColor: 'text-yellow-500',
    bgCss: 'bg-yellow-500/15',
    opacity: true,
    color: 'yellow'
  },
  { type: 'icon', textColor: 'text-primary-500', bgCss: 'bg-primary-500/15', color: 'primary' },
  { type: 'icon', textColor: 'text-purple-500', bgCss: 'bg-purple-500/15', color: 'purple' },
  { type: 'icon', textColor: 'text-orange-500', bgCss: 'bg-orange-500/15', color: 'orange' },
  { type: 'icon', textColor: 'text-green-500', bgCss: 'bg-green-500/15', color: 'green' }
];

const colors = ['primary', 'purple', 'green', 'red', 'yellow', 'sky', 'pink', 'indigo', 'orange'];

const galleryItems = [
  {
    img: '/assets/images/gallery/img-01.jpg',
    title: 'A heritage Shophouse at Little India SG',
    description:
      'Today, I’m covering one of my favorite parts of the Nordstrom Anniversary Sale: the activewear!',
    author: 'Daniel',
    categories: ['Traveling', 'Business']
  },
  {
    img: '/assets/images/gallery/img-02.jpg',
    title: 'Purple flowers with green leaves',
    description:
      'Today, I’m covering one of my favorite parts of the Nordstrom Anniversary Sale: the activewear!',
    author: 'Daniel',
    categories: ['Traveling', 'Business']
  },
  {
    img: '/assets/images/gallery/img-04.jpg',
    title: 'The white and blue boat on river under blue sky during daytime',
    description:
      'Today, I’m covering one of my favorite parts of the Nordstrom Anniversary Sale: the activewear!',
    author: 'Daniel',
    categories: ['Traveling', 'Business']
  }
];

const galleryOverlayItems = [
  {
    img: '/assets/images/gallery/img-02.jpg',
    title: 'Water Lily',
    description: 'Flowers of love',
    gradient: 'from-primary-500/30 via-green-500/30'
  },
  {
    img: '/assets/images/gallery/img-03.jpg',
    title: 'Art Of Holiday',
    gradient: 'from-primary-500/80 via-sky-500/30'
  },
  {
    img: '/assets/images/gallery/img-04.jpg',
    title: 'River Water',
    description: 'City of love',
    gradient: 'from-primary-500/50 via-sky-500/50'
  }
];
export { cards, profiles, hoverCards, colors, galleryItems, galleryOverlayItems };
