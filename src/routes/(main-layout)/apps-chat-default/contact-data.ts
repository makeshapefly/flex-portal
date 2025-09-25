


// Defining the Contact interface
export interface Contact {
  id: number;
  name: string;
  avatar: string;
}

// Creating the contacts array with explicit types
const contacts: Contact[] = [
  {
    id: 1,
    name: 'Auli Ahokas',
    avatar: '/assets/images/avatar/user-5.png',
  },
  {
    id: 2,
    name: 'Sirpa Kolkka',
    avatar: '/assets/images/avatar/user-6.png'
  },
  {
    id: 3,
    name: 'Risto Saraste',
    avatar: '/assets/images/avatar/user-9.png'
  },
  {
    id: 4,
    name: 'Leena Laine',
    avatar: '/assets/images/avatar/user-12.png'
  },
  {
    id: 5,
    name: 'Mikko Virtanen',
    avatar: '/assets/images/avatar/user-14.png'
  },
  {
    id: 6,
    name: 'Tuula Nieminen',
    avatar: '/assets/images/avatar/user-21.png'
  },
  {
    id: 7,
    name: 'Jari Mäkinen',
    avatar: '/assets/images/avatar/user-29.png'
  },
  {
    id: 8,
    name: 'Heidi Kinnunen',
    avatar: '/assets/images/avatar/user-31.png'
  },
  {
    id: 9,
    name: 'Pekka Heikkinen',
    avatar: '/assets/images/avatar/user-36.png'
  },
  {
    id: 10,
    name: 'Kati Laakso',
    avatar: '/assets/images/avatar/user-37.png'
  }
];

export default contacts;
