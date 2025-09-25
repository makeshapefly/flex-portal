<script lang="ts">
    let charCount = 0;
    let textarea: HTMLTextAreaElement | null = null;
  
    // Function to resize textarea based on its content
    const resizeTextarea = (el: HTMLTextAreaElement) => {
      el.style.height = 'auto';  // Reset height
      el.style.height = el.scrollHeight + 4 + 'px';  // Adjust height based on scrollHeight
    };
  
    // Update character count and resize the textarea
    const updateTextarea = () => {
      if (textarea) {
        resizeTextarea(textarea);
        charCount = textarea.value.length;
      }
    };
  </script>
  
  <div>
    <div>
      <!-- Bind the textarea and trigger updateTextarea on input -->
      <textarea
        bind:this={textarea}
        class="h-auto form-input"
        rows="3"
        placeholder="Message..."
        maxlength="255"
        on:input={updateTextarea}
      ></textarea>
    </div>
    <div class="mt-1 leading-none text-right">
      <!-- Display character count -->
      <span class="text-xs text-gray-500 dark:text-dark-500">
        {charCount} / 255
      </span>
    </div>
  </div>
  