<script lang="ts">
    
    export let message: string = 'This website utilizes cookies to enhance your browsing experience.';
    export let privacyMessage: string = 'Google utilizes cookies for analyzing traffic to this site and for displaying personalized advertisements. Please refer to our';
    
    // Variant to determine which type of cookie banner to display
    export let variant: 'consent' | 'policy' = 'consent'; // Default is 'consent'
    
    // Local state to manage the visibility of the banner
    let isOpen = true;
  
    // Function to close the banner when the button is clicked
    const closeBanner = () => {
      isOpen = false;
    };
  </script>
  
  {#if isOpen}
    {#if variant === 'consent'}
      <!-- Cookie Consent Banner -->
      <div class="absolute text-center inset-x-5 bottom-5">
        <div class="items-center gap-3 p-3 rounded-full ltr:pl-5 rtl:pr-5 sm:inline-flex card">
          <p class="mb-0 text-gray-500 dark:text-dark-500">{message}</p>
          <div>
            <!-- Default button with color prop, or allow customization via slot -->
            <slot name="button" {closeBanner} >
              <button 
                on:click={closeBanner} 
                type="button" 
                class="rounded-full btn btn-xs">Accept All</button>
            </slot>
          </div>
        </div>
      </div>
    {/if}
  
    {#if variant === 'policy'}
      <!-- Cookie Policy -->
      <div class="absolute inset-x-0 bottom-0 p-3 mb-0 bg-gray-900 border-gray-900 rounded-none card dark:bg-dark-800 dark:border-dark-800">
        <div class="items-center gap-3 sm:flex">
          <p class="mb-0 text-gray-200 dark:text-dark-200 grow">{privacyMessage} <a href="#!" class="text-gray-200 transition duration-200 ease-linear hover:text-red-500">privacy policy</a> for further details.</p>
          <div class="mt-3 shrink-0 sm:mt-0">
            <!-- Default button with color prop, or allow customization via slot -->
            <slot name="button" {closeBanner}>
              <button 
                on:click={closeBanner} 
                type="button" 
                class="rounded-full btn btn-xs">Ok</button>
            </slot>
          </div>
        </div>
      </div>
    {/if}
  {/if}
  