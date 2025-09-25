export interface File {
  fileId?: string | number;
  image: string;
  type: string;
  documentName: string;
  size: string;
  lastEdit: string;
}
export const files: Array<File> = [
  {
    image: '/assets/images/file-manager/icons/document.png',
    type: 'txt',
    documentName: 'Domiex docs',
    size: '8.9 MB',
    lastEdit: '28 June, 2024'
  },
  {
    image: '/assets/images/file-manager/icons/pdf.png',
    type: 'pdf',
    documentName: 'Company of Certificate',
    size: '2.7 MB',
    lastEdit: '29 June, 2024'
  },
  {
    image: '/assets/images/file-manager/icons/power.png',
    type: 'ppt',
    documentName: 'Hospital Management',
    size: '154 MB',
    lastEdit: '21 June, 2024'
  },
  {
    image: '/assets/images/file-manager/icons/picture.png',
    type: 'PNG',
    documentName: 'Preview Images',
    size: '983 KB',
    lastEdit: '14 June, 2024'
  },
  {
    image: '/assets/images/file-manager/icons/mp3.png',
    type: 'MP3',
    documentName: 'Sound Effects',
    size: '14.9 MB',
    lastEdit: '24 May, 2024'
  },
  {
    image: '/assets/images/file-manager/icons/csv-file.png',
    type: 'CSV',
    documentName: 'Contact-list',
    size: '651 KB',
    lastEdit: '18 May, 2024'
  },
  {
    image: '/assets/images/file-manager/icons/office.png',
    type: 'Docs',
    documentName: 'Admin Bugs',
    size: '1.9 MB',
    lastEdit: '07 May, 2024'
  }
];

// Folders array
export const folders = [
  {
    name: 'My Documents',
    description: '154 Files',
    image: '/assets/images/file-manager/icons/folder.png'
  },
  {
    name: 'Images',
    description: '547 Images',
    image: '/assets/images/file-manager/icons/folder.png'
  },
  {
    name: 'Design Templates File',
    description: '364 file',
    image: '/assets/images/file-manager/icons/folder.png'
  },
  {
    name: 'Others Files',
    description: '21 Folder',
    image: '/assets/images/file-manager/icons/folder.png'
  }
];
