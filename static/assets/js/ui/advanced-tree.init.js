/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: tree init Js File
*/

let fileTree = function () {
  return {
    levels: [
      {
        title: 'Domiex-HTML Folders',
        children: [
          {
            title: 'dist/',
            children: [
              {
                title: 'assets',
                children: [
                  {
                    title: 'css'
                  },
                  {
                    title: 'images'
                  },
                  {
                    title: 'js'
                  },
                  {
                    title: 'libs'
                  },
                  {
                    title: 'main-*.js'
                  }
                ]
              },
              {
                title: 'All HTML Filses'
              }
            ]
          },
          {
            title: 'plugins',
            children: [
              {
                title: 'plugins',
                children: [
                  {
                    title: 'layouts',
                    children: [
                      {
                        title: 'Layouts Plugins'
                      }
                    ]
                  },
                  {
                    title: 'PLugins',
                    children: [
                      {
                        title: 'Plugins'
                      }
                    ]
                  }
                ]
              },
              {
                title: 'buttons.js'
              },
              {
                title: 'cards.js'
              },
              {
                title: 'forms.js'
              },
              {
                title: 'headings.js'
              }
            ]
          },
          {
            title: 'src/',
            children: [
              {
                title: 'assets',
                children: [
                  {
                    title: 'fonts',
                    children: [
                      {
                        title: 'All Fonts'
                      }
                    ]
                  },
                  {
                    title: 'images',
                    children: [
                      {
                        title: 'ALL Images'
                      }
                    ]
                  },
                  {
                    title: 'js',
                    children: [
                      {
                        title: 'All JS Files'
                      }
                    ]
                  },
                  {
                    title: 'libs',
                    children: [
                      {
                        title: 'All Libs Files'
                      }
                    ]
                  },
                  {
                    title: 'scss',
                    children: [
                      {
                        title: 'All Scss Files'
                      }
                    ]
                  }
                ]
              },
              {
                title: 'partials',
                children: [
                  {
                    title: 'body.html'
                  },
                  {
                    title: 'footer.html'
                  },
                  {
                    title: 'head-css.html'
                  },
                  {
                    title: 'main.html'
                  },
                  {
                    title: 'page-heading.html'
                  },
                  {
                    title: 'sidebar.html'
                  },
                  {
                    title: 'title-meta.html'
                  },
                  {
                    title: 'vendor-script.html'
                  }
                ]
              },
              {
                title: 'All HTML Pages Files'
              }
            ]
          },
          {
            title: 'vite.config.js'
          },
          {
            title: 'tailwind.confing.js'
          },
          {
            title: 'README.md'
          },
          {
            title: 'postcss.confing.js'
          },
          {
            title: 'package.json'
          },
          {
            title: 'package-lock.json'
          },
          {
            title: 'package-libs-confing.json'
          },
          {
            title: '.gitignore'
          }
        ]
      }
    ],
    renderLevel: function (obj, i) {
      let ref = 'l' + Math.random().toString(36).substring(7);
      let html = `<a href="#" class="block px-5 py-1 hover:text-gray-900 dark:text-dark-100" :class="{'has-children':level.children}" x-html="(level.children?'<i class=\\'icon ri-folder-3-line text-yellow-500\\'></i>':'<i class=\\'icon ri-file-line text-gray-500 dark-text-dark-500\\'></i>')+' '+level.title" ${obj.children ? `@click.prevent="toggleLevel($refs.${ref})"` : ''}></a>`;
      if (obj.children) {
        html += `<ul style="display:none;" x-ref="${ref}" class="pb-1 ltr:pl-5 rtl:pr-5 transition-all duration-1000 opacity-0">
                        <template x-for='(level,i) in level.children'>
                            <li x-html="renderLevel(level,i)"></li>
                        </template>
                    </ul>`;
      }
      return html;
    },
    showLevel: function (el) {
      if (el.style.length === 1 && el.style.display === 'none') {
        el.removeAttribute('style');
      } else {
        el.style.removeProperty('display');
      }
      setTimeout(() => {
        el.previousElementSibling.querySelector('i.icon').classList.add('ri-folder-open-line');
        el.previousElementSibling.querySelector('i.icon').classList.remove('ri-folder-3-line');
        el.classList.add('opacity-100');
      }, 10);
    },
    hideLevel: function (el) {
      el.style.display = 'none';
      el.classList.remove('opacity-100');
      el.previousElementSibling.querySelector('i.icon').classList.remove('ri-folder-open-line');
      el.previousElementSibling.querySelector('i.icon').classList.add('ri-folder-3-line');

      let refs = el.querySelectorAll('ul[x-ref]');
      for (var i = 0; i < refs.length; i++) {
        this.hideLevel(refs[i]);
      }
    },
    toggleLevel: function (el) {
      if (el.style.length && el.style.display === 'none') this.showLevel(el);
      else this.hideLevel(el);
    }
  };
};

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('fileTree', fileTree);
});
