<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import ProjectHead from '$lib/components/common/ProjectHead.svelte';
  import { filesData } from './file';

  // Declare the reactive `files` variable
  let files = filesData;

  // Handle file upload
  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      const file = input.files[0];
      if (file) {
        // Add the uploaded file to the files array
        files = [{ name: file.name, size: file.size, type: file.type }, ...files];
        input.value = '';
      }
    }
  }

  // Function to get the icon class based on file type
  function getIconClass(fileType: string) {
    if (!fileType) {
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
  }

  // Format file size to display in KB or MB
  function formatSize(sizeInBytes: number) {
    if (sizeInBytes >= 1024 * 1024) {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (sizeInBytes / 1024).toFixed(2) + ' KB';
    }
  }
</script>

<ProjectHead variant="files" />

<h5 class="text-16">Files ({files.length})</h5>

<div class="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-5">
  {#each files as file, index}
    <div class="relative text-center card">
      <div class="card-body">
        <!-- Combine static and dynamic class here -->
        <i class="text-2xl fill-sky-500/10 {getIconClass(file.type)}"></i>
        <h6 class="mt-4 mb-1">
          <a href="#!" class="before:inset-0 before:absolute before:content-['']">{file.name}</a>
        </h6>
        <p class="text-gray-500 dark:text-dark-500">{formatSize(file.size)}</p>
      </div>
    </div>
  {/each}

  <label
    class="relative flex flex-col items-center justify-center p-5 cursor-pointer border-primary-500/20 bg-primary-50 dark:bg-primary-500/10 dark:border-primary-500/20 card"
  >
    <LucideIcon
      name="Upload"
      class="inline-block mb-3 text-primary-500 size-7 fill-primary-500/20"
    />
    <span class="font-medium card-title text-primary-500">Upload file</span>
    <input
      type="file"
      on:change={handleFileUpload}
      class="hidden w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
    />
  </label>
</div>
