<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { passwordForm } from '../auth-reset-password-basic/password';

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

<div class="relative">
  <div class="grid grid-cols-12">
    <div
      class="relative col-span-12 py-8 overflow-hidden bg-gray-100 dark:bg-dark-850 lg:min-h-screen lg:col-span-6 md:p-9 xl:p-12"
    >
      <div
        class="absolute bottom-0 w-32 -rotate-45 -top-64 -right-8 bg-gray-200/20 dark:bg-dark-800/20"
      ></div>
      <div class="p-4">
        <a href="/index">
          <img src="/assets/images/main-logo.png" alt="" class="h-8 dark:hidden" />
          <img src="/assets/images/logo-white.png" alt="" class="hidden h-8 dark:inline-block" />
        </a>
        <h1
          class="max-w-lg mt-8 text-2xl font-normal leading-tight capitalize md:leading-tight md:text-4xl"
        >
          The most straightforward way to manage your projects
        </h1>

        <img
          src="/assets/images/others/auth-creative.png"
          alt=""
          class="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]"
        />
      </div>
    </div>

    <div class="flex items-center col-span-12 lg:min-h-screen lg:col-span-6 py-9 md:py-12">
      <div class="grid w-full grid-cols-12">
        <div class="col-span-12 mx-4 mb-0 2xl:col-span-8 2xl:col-start-3 md:mx-12 card">
          <div class="md:p-10 card-body">
            <h4
              class="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text"
            >
              Set your new password
            </h4>
            <p class="mb-5 text-center text-gray-500 dark:text-dark-500">
              Ensure that your new password is different from any passwords you've previously used.
            </p>
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
</div>
