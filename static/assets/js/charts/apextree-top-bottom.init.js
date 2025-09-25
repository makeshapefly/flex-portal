/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: top-bottom init Js File
*/

import ApexTree from 'apextree';

import { getColorCodes } from '../helpers/helper.js';
import user4 from '/assets/images/avatar/user-4.png';
import user11 from '/assets/images/avatar/user-11.png';
import user13 from '/assets/images/avatar/user-13.png';
import user14 from '/assets/images/avatar/user-14.png';
import user15 from '/assets/images/avatar/user-15.png';
import user16 from '/assets/images/avatar/user-16.png';
import user17 from '/assets/images/avatar/user-17.png';

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('apexTreeApp', () => ({
    init() {
      this.colorCodes = getColorCodes(this.$refs.apexTreeContainer.dataset);
      this.initializeTreeData();
      this.renderTree();

      // Reload tree on window resize
      window.addEventListener('resize', this.reloadTree.bind(this));
    },
    colorCodes: [],
    initializeTreeData() {
      (this.treeData = {
        id: 'ms',
        data: {
          imageURL: user4,
          name: 'Jordan Davis'
        },
        options: {
          nodeBGColor: this.colorCodes[2],
          nodeBGColorHover: this.colorCodes[2]
        },
        children: [
          {
            id: 'mh',
            data: {
              imageURL: user11,
              name: 'Chris Wilson'
            },
            options: {
              nodeBGColor: this.colorCodes[3],
              nodeBGColorHover: this.colorCodes[3]
            },
            children: [
              {
                id: 'kb',
                data: {
                  imageURL: user13,
                  name: 'Alex Lee'
                },
                options: {
                  nodeBGColor: this.colorCodes[4],
                  nodeBGColorHover: this.colorCodes[4]
                }
              },
              {
                id: 'cr',
                data: {
                  imageURL: user14,
                  name: 'Taylor Wilson'
                },
                options: {
                  nodeBGColor: this.colorCodes[5],
                  nodeBGColorHover: this.colorCodes[5]
                }
              }
            ]
          },
          {
            id: 'cs',
            data: {
              imageURL: user15,
              name: 'Jane Brown'
            },
            options: {
              nodeBGColor: this.colorCodes[6],
              nodeBGColorHover: this.colorCodes[6]
            },
            children: [
              {
                id: 'Noah_Chandler',
                data: {
                  imageURL: user16,
                  name: 'John Garcia'
                },
                options: {
                  nodeBGColor: this.colorCodes[7],
                  nodeBGColorHover: this.colorCodes[7]
                }
              },
              {
                id: 'Felix_Wagner',
                data: {
                  imageURL: user17,
                  name: 'Cameron Wilson'
                },
                options: {
                  nodeBGColor: this.colorCodes[8],
                  nodeBGColorHover: this.colorCodes[8]
                }
              }
            ]
          }
        ]
      }),
        (this.treeOptions = {
          contentKey: 'data',
          width: '100%',
          height: 600,
          nodeWidth: 150,
          nodeHeight: 120,
          fontColor: this.colorCodes[1],
          borderColor: this.colorCodes[0],
          edgeColor: this.colorCodes[0],
          edgeColorHover: this.colorCodes[2],
          tooltipBorderColor: this.colorCodes[0],
          childrenSpacing: 50,
          siblingSpacing: 20,
          direction: 'top',
          nodeTemplate: (content) => `
                <div class="flex gap-5 justify-center flex-col items-center p-3">
                    <img class="size-12 rounded-full" src='${content.imageURL}' alt='' />
                    <h6>${content.name}</h6>
                </div>`,
          // Use Alpine to set a dynamic class or inline styles if needed
          // canvasClass: this.colorCodes[1],
          enableToolbar: true
        });
    },

    renderTree() {
      if (this.$refs.apexTreeContainer) {
        this.$refs.apexTreeContainer.innerHTML = ''; // Clear the container
      }

      // Initialize new tree
      this.apexTree = new ApexTree(this.$refs.apexTreeContainer, this.treeOptions);
      this.apexTree.render(this.treeData);
    },
    reloadTree() {
      // Handle the logic for resizing
      this.renderTree(); // Re-render tree on resize
    }
  }));
});
