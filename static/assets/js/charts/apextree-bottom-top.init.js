/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: bottom-top init Js File
*/

import ApexTree from 'apextree';
import { getColorCodes } from '../helpers/helper.js';
import user18 from '/assets/images/avatar/user-18.png';
import user19 from '/assets/images/avatar/user-19.png';
import user20 from '/assets/images/avatar/user-20.png';
import user21 from '/assets/images/avatar/user-21.png';
import user22 from '/assets/images/avatar/user-22.png';
import user23 from '/assets/images/avatar/user-23.png';
import user24 from '/assets/images/avatar/user-24.png';
import user25 from '/assets/images/avatar/user-25.png';
import user26 from '/assets/images/avatar/user-26.png';

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
        id: 'Lucas_Alex',
        data: {
          name: 'Ezekiel Halvorson',
          imageURL: user18,
          borderColor: this.colorCodes[3]
        },
        children: [
          {
            id: 'Alex_Lee',
            data: {
              name: 'Erin Dicki',
              imageURL: user19,
              borderColor: this.colorCodes[4]
            },

            children: [
              {
                id: 'Mia_Patel',
                data: {
                  name: 'Norval Murray',
                  imageURL: user20,
                  borderColor: this.colorCodes[5]
                }
              },
              {
                id: 'Ryan_Clark',
                data: {
                  name: 'Oliver Boehm',
                  imageURL: user21,
                  borderColor: this.colorCodes[5]
                }
              },
              {
                id: 'Zoe_Wang',
                data: {
                  name: 'Gino Prosacco',
                  imageURL: user22,
                  borderColor: this.colorCodes[5]
                }
              }
            ]
          },
          {
            id: 'Leo_Kim',
            data: {
              name: 'Edgardo Kessler',
              imageURL: user23,
              borderColor: this.colorCodes[6]
            },

            children: [
              {
                id: 'Ava_Jones',
                data: {
                  name: 'Marcos Stracke',
                  imageURL: user24,
                  borderColor: this.colorCodes[7]
                }
              },
              {
                id: 'Maya_Gupta',
                data: {
                  name: 'Waylon Erdman',
                  imageURL: user25,
                  borderColor: this.colorCodes[7]
                }
              }
            ]
          },

          {
            id: 'Max_Ruiz',
            data: {
              name: 'Eleanora Hayes',
              imageURL: user26,
              borderColor: this.colorCodes[6]
            }
          }
        ]
      }),
        (this.treeOptions = {
          contentKey: 'data',
          width: '100%',
          height: 600,
          nodeWidth: 150,
          nodeHeight: 70,
          childrenSpacing: 70,
          fontSize: '12px',
          siblingSpacing: 30,
          direction: 'bottom',
          nodeBGColor: this.colorCodes[2],
          nodeBGColorHover: this.colorCodes[2],
          fontColor: this.colorCodes[1],
          borderColor: this.colorCodes[0],
          edgeColor: this.colorCodes[0],
          edgeColorHover: this.colorCodes[2],
          tooltipBorderColor: this.colorCodes[0],
          nodeTemplate: (content) => {
            return `<div class="flex flex-col h-full"><div class="flex gap-2 items-center h-full rounded-t-md shadow-lg px-4">
                        <img class="size-8 rounded-full" src='${content.imageURL}' alt=''>
                        <h6 class="text-xs text-gray-500 dark:text-dark-500">${content.name}</h6>
                       </div><div class="mt-auto rounded-b" style='border-bottom: 10px solid ${content.borderColor}'></div></div>`;
          },
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
