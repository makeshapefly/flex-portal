/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: right-left init Js File
*/

import ApexTree from 'apextree';
import { getColorCodes } from '../helpers/helper.js';
import user1 from '/assets/images/avatar/user-1.png';
import user2 from '/assets/images/avatar/user-2.png';
import user3 from '/assets/images/avatar/user-3.png';
import user4 from '/assets/images/avatar/user-4.png';
import user5 from '/assets/images/avatar/user-5.png';
import user6 from '/assets/images/avatar/user-6.png';
import user7 from '/assets/images/avatar/user-7.png';
import user8 from '/assets/images/avatar/user-8.png';
import user9 from '/assets/images/avatar/user-9.png';
import user10 from '/assets/images/avatar/user-10.png';
import user11 from '/assets/images/avatar/user-11.png';

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
          name: 'Omer Sporer',
          imageURL: user1
        },
        options: {
          nodeBGColor: this.colorCodes[3],
          nodeBGColorHover: this.colorCodes[3]
        },
        children: [
          {
            id: 'Alex_Lee',
            data: {
              name: 'Reva Botsford',
              imageURL: user2
            },
            options: {
              nodeBGColor: this.colorCodes[4],
              nodeBGColorHover: this.colorCodes[4]
            },
            children: [
              {
                id: 'Mia_Patel',
                data: {
                  name: 'Tyshawn Marquardt',
                  imageURL: user3
                },
                options: {
                  nodeBGColor: this.colorCodes[5],
                  nodeBGColorHover: this.colorCodes[5]
                }
              },
              {
                id: 'Ryan_Clark',
                data: {
                  name: 'Kailey Corkery',
                  imageURL: user4
                },
                options: {
                  nodeBGColor: this.colorCodes[5],
                  nodeBGColorHover: this.colorCodes[5]
                }
              },
              {
                id: 'Zoe_Wang',
                data: {
                  name: 'Zoe Wang',
                  imageURL: user5
                },
                options: {
                  nodeBGColor: this.colorCodes[5],
                  nodeBGColorHover: this.colorCodes[5]
                }
              }
            ]
          },
          {
            id: 'Leo_Kim',
            data: {
              name: 'Hardy Maggio',
              imageURL: user6
            },
            options: {
              nodeBGColor: this.colorCodes[6],
              nodeBGColorHover: this.colorCodes[6]
            },
            children: [
              {
                id: 'Ava_Jones',
                data: {
                  name: 'Adelle Abbott',
                  imageURL: user7
                },
                options: {
                  nodeBGColor: this.colorCodes[7],
                  nodeBGColorHover: this.colorCodes[7]
                }
              },
              {
                id: 'Maya_Gupta',
                data: {
                  name: 'Vincenzo Hirthe',
                  imageURL: user8
                },
                options: {
                  nodeBGColor: this.colorCodes[7],
                  nodeBGColorHover: this.colorCodes[7]
                }
              }
            ]
          },

          {
            id: 'Lily_Chen',
            data: {
              name: 'Idella Heaney',
              imageURL: user9
            },
            options: {
              nodeBGColor: this.colorCodes[8],
              nodeBGColorHover: this.colorCodes[8]
            },
            children: [
              {
                id: 'Jake_Scott',
                data: {
                  name: 'Lambert Schoen',
                  imageURL: user10
                },
                options: {
                  nodeBGColor: this.colorCodes[9],
                  nodeBGColorHover: this.colorCodes[9]
                }
              }
            ]
          },
          {
            id: 'Max_Ruiz',
            data: {
              name: 'Cornelius Harris',
              imageURL: user11
            },
            options: {
              nodeBGColor: this.colorCodes[10],
              nodeBGColorHover: this.colorCodes[10]
            }
          }
        ]
      }),
        (this.treeOptions = {
          contentKey: 'data',
          width: '100%',
          height: 700,
          nodeWidth: 150,
          nodeHeight: 70,
          childrenSpacing: 70,
          siblingSpacing: 30,
          fontSize: '12px',
          direction: 'right',
          borderRadius: 0,
          nodeBGColor: this.colorCodes[2],
          nodeBGColorHover: this.colorCodes[2],
          fontColor: this.colorCodes[1],
          borderColor: this.colorCodes[0],
          edgeColor: this.colorCodes[0],
          edgeColorHover: this.colorCodes[0],
          tooltipBorderColor: this.colorCodes[0],
          nodeTemplate: (content) => {
            return `<div class="flex gap-2 items-center h-full rounded-t-md shadow-lg px-4">
                        <img class="size-8 rounded-full" src='${content.imageURL}' alt=''>
                        <h6 class="text-xs text-gray-500 dark:text-dark-100">${content.name}</h6>
                       </div>`;
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
