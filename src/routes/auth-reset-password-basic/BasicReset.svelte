<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { passwordForm } from './password';

  // Initialize form data with logic from passwordForm
  let formData = passwordForm();

  // Flags for toggling password visibility
  let showPassword = false;
  let showConfirmPassword = false;

  // Flag for form submission state
  let isSubmitting = false;

  // Function to handle form submission
  const handleSubmit = () => {
    isSubmitting = true;
    formData.validateForm();
    isSubmitting = false;
  };
</script>

<div
  class="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10"
>
  <div class="container">
    <div class="grid grid-cols-12">
      <div
        class="col-span-12 mb-0 md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card"
      >
        <div class="md:p-10 card-body">
          <div class="mb-5 text-center">
            <a href="#!">
              <img src="/assets/images/main-logo.png" alt="" class="h-8 mx-auto dark:hidden" />
              <img
                src="/assets/images/logo-white.png"
                alt=""
                class="hidden h-8 mx-auto dark:inline-block"
              />
            </a>
          </div>
          <h4
            class="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text"
          >
            Set your new password
          </h4>
          <p class="mb-5 text-center text-gray-500 dark:text-dark-500">
            Ensure that your new password is different from any passwords you've previously used.
          </p>

          <!-- Updated form with explicit validation call -->
          <form on:submit|preventDefault={handleSubmit}>
            <div class="grid grid-cols-12 gap-4 mt-5">
              <!-- Password Input Field -->
              <div class="col-span-12">
                <label for="passwordInput" class="form-label">Password</label>
                <div class="relative">
                  {#if showPassword && !isSubmitting}
                    <input
                      type="text"
                      id="passwordInput"
                      bind:value={formData.password}
                      class="w-full ltr:pr-8 rtl:pl-8 form-input"
                      placeholder="Enter your password"
                    />
                  {:else}
                    <input
                      type="password"
                      id="passwordInput"
                      bind:value={formData.password}
                      class="w-full ltr:pr-8 rtl:pl-8 form-input"
                      placeholder="Enter your password"
                    />
                  {/if}
                  <button
                    type="button"
                    on:click={() => (showPassword = !showPassword)}
                    class="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-none dark:text-dark-500"
                    disabled={isSubmitting}
                  >
                    {#if showPassword}
                      <LucideIcon name="Eye" class="size-5" />
                    {:else}
                      <LucideIcon name="EyeOff" class="size-5" />
                    {/if}
                  </button>
                </div>
                {#if formData.errors.password}
                  <p class="text-sm text-red-500">{formData.errors.password}</p>
                {/if}
              </div>

              <!-- Confirm Password Input Field -->
              <div class="col-span-12">
                <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
                <div class="relative">
                  {#if showConfirmPassword && !isSubmitting}
                    <input
                      type="text"
                      id="confirmPasswordInput"
                      bind:value={formData.confirmPassword}
                      class="w-full ltr:pr-8 rtl:pl-8 form-input"
                      placeholder="Enter your confirm password"
                    />
                  {:else}
                    <input
                      type="password"
                      id="confirmPasswordInput"
                      bind:value={formData.confirmPassword}
                      class="w-full ltr:pr-8 rtl:pl-8 form-input"
                      placeholder="Enter your confirm password"
                    />
                  {/if}
                  <button
                    type="button"
                    on:click={() => (showConfirmPassword = !showConfirmPassword)}
                    class="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-none dark:text-dark-500"
                    disabled={isSubmitting}
                  >
                    {#if showConfirmPassword}
                      <LucideIcon name="Eye" class="size-5" />
                    {:else}
                      <LucideIcon name="EyeOff" class="size-5" />
                    {/if}
                  </button>
                </div>
                {#if formData.errors.confirmPassword}
                  <p class="text-sm text-red-500">{formData.errors.confirmPassword}</p>
                {/if}
              </div>

              <!-- Submit Button -->
              <div class="col-span-12">
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600"
                  disabled={isSubmitting}>Set Password</button
                >
                <p class="mt-3 text-center text-gray-500 dark:text-dark-500">
                  Return to the
                  <a href="auth-signin-basic" class="font-medium underline link link-primary">
                    <span class="align-middle">Sign In</span>
                    <LucideIcon name="MoveRight" class="inline-block ml-1 size-4" />
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
