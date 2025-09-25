import { writable } from 'svelte/store';

export interface FileTreeNode {
  title: string;
  children?: FileTreeNode[];
  isOpen?:boolean
}

const initialFileTree: FileTreeNode[] = [
  {
    title: 'Domiex-Svelte Folders',
    children: [
      {
        title: 'dist/',
        children: [
          {
            title: 'assets',
            children: [
              { title: 'css' },
              { title: 'images' },
              { title: 'js' },
              { title: 'libs' },
              { title: 'main-*.js' },
            ],
          },
          { title: 'All HTML Files' },
        ],
      },
      {
        title: 'plugins',
        children: [
          {
            title: 'plugins',
            children: [
              {
                title: 'layouts',
                children: [{ title: 'Layouts Plugins' }],
              },
              {
                title: 'Plugins',
                children: [{ title: 'Plugins' }],
              },
            ],
          },
          { title: 'buttons.js' },
          { title: 'cards.js' },
          { title: 'forms.js' },
          { title: 'headings.js' },
        ],
      },
      {
        title: 'src/',
        children: [
          {
            title: 'assets',
            children: [
              { title: 'fonts' },
              { title: 'images' },
              { title: 'js' },
              { title: 'libs' },
              { title: 'scss' },
            ],
          },
          {
            title: 'partials',
            children: [
              { title: 'body.html' },
              { title: 'footer.html' },
              { title: 'head-css.html' },
              { title: 'main.html' },
              { title: 'page-heading.html' },
              { title: 'sidebar.html' },
              { title: 'title-meta.html' },
              { title: 'vendor-script.html' },
            ],
          },
          { title: 'All HTML Pages Files' },
        ],
      },
      { title: 'vite.config.js' },
      { title: 'tailwind.confing.js' },
      { title: 'README.md' },
      { title: 'postcss.confing.js' },
      { title: 'package.json' },
      { title: 'package-lock.json' },
      { title: 'package-libs-confing.json' },
      { title: '.gitignore' },
    ],
  },
];

export const fileTreeStore = writable({
  levels: initialFileTree,
  openNodes: new Set<number>(), // To track which nodes are open
});

export const toggleNodeVisibility = (index: number) => {
  fileTreeStore.update((state) => {
    const openNodes = new Set(state.openNodes);
    if (openNodes.has(index)) {
      openNodes.delete(index);
    } else {
      openNodes.add(index);
    }
    return { ...state, openNodes };
  });
};
