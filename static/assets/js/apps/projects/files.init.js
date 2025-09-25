/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: files init Js File
*/

import filesData from '../../../json/apps/projects/files';

function fileUpload() {
  return {
    files: [],
    init() {
      this.files = filesData;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.files.unshift({ name: file.name, size: file.size });
        // Clear the file input to allow the same file to be uploaded again if needed
        event.target.value = '';
      }
    },
    getIconClass(fileType) {
      if (typeof fileType === 'undefined') {
        return 'ri-file-text-line'; // Default icon if fileType is undefined
      }
      switch (true) {
        case fileType.startsWith('image/'):
          return 'ri-file-image-line';
        case fileType === 'application/pdf':
          return 'ri-file-pdf-2-line';
        case fileType.startsWith('audio/'):
          return 'ri-file-music-line';
        case fileType.startsWith('video/'):
          return 'ri-file-2-line';
        case fileType === 'application/msword' ||
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return 'ri-file-word-line';
        case fileType === 'application/vnd.ms-excel' ||
          fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return 'ri-file-excel-line';
        case fileType === 'application/vnd.ms-powerpoint' ||
          fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          return 'ri-file-ppt-line';
        case fileType === 'application/zip' || fileType === 'application/x-rar-compressed':
          return 'ri-file-zip-line';
        case fileType === 'text/plain':
          return 'ri-file-text-line';
        default:
          return 'ri-file-line';
      }
    },
    get fileCount() {
      return this.files.length;
    },
    formatSize(sizeInBytes) {
      if (sizeInBytes >= 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
      } else {
        return (sizeInBytes / 1024).toFixed(2) + ' KB';
      }
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('fileUpload', fileUpload);
});
