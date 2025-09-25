<script lang="ts">
    import { X } from "lucide-svelte";
  
    // Props
    export let message = "By visiting this site, you consent to the use of cookies, which are employed to enrich your browsing experience.";
    // export let color: string = 'green'; // Default button color
    export let variant: string = 'simple'; // Default to "simple" variant
    export let autoClose: boolean = true; // Prop to control auto-close behavior (default to true)
    let isOpen = true;
  
    // Function to close the cookie message
    const close = () => {
      if (autoClose) {
        isOpen = false;
      }
    };
  </script>
  
  {#if isOpen}
  {#if variant === 'simple'}
    <!-- Simple Cookie Card -->
    <div class="absolute p-4 ltr:ml-5 rtl:mr-5 max-w-80 card ltr:right-5 rtl:left-5 bottom-5">
      <div class="flex items-center gap-3 mb-3">
        <img src="/assets/images/cookie.png" alt="Cookie Icon" class="h-6" />
        <h6 class="grow">Cookie Policy</h6>
        <button on:click={close} class="link link-red">
          <X />
        </button>
      </div>
      <p class="mb-3 text-gray-500 dark:text-dark-500">{message}</p>
      <div>
        <!-- Custom button slot with close prop -->
        <slot name="button" {close}></slot>
      </div>
    </div>

  {:else if variant === 'horizontal'}
    <!-- Horizontal Cookie Card -->
    
      <div class="absolute p-5 ltr:ml-5 rtl:mr-5 max-w-96 card ltr:right-5 rtl:left-5 bottom-5">
        <button on:click={close} class="absolute top-5 link link-red ltr:right-5 rtl:left-5">
          <X />
        </button>
        <img src="/assets/images/cookie.png" alt="Cookie Icon" class="h-9" />
        <h6 class="mt-4 mb-2">Here's another reminder about cookies!</h6>
        <p class="mb-3 text-gray-500 dark:text-dark-500">
          y utilizing UI Design Daily, you acknowledge our use of cookies to enhance your experience and agree to the data collection outlined in our 
          <a href="#!" class="text-gray-500 underline transition duration-200 ease-linear hover:text-primary-500">Cookie Policy</a>.
        </p>
        <div class="flex items-center gap-3 ltr:justify-end rtl:justify-start">
          <!-- Custom button slot with close prop for horizontal layout -->
          <slot name="button" {close}></slot>
        </div>
      </div>
    
  {/if}
{/if}