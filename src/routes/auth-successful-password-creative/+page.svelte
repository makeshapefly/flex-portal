<script>
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<div class="relative">
  <Grid cols={12}>
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
          src="assets/images/others/auth-creative.png"
          alt=""
          class="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] ltr:xl:left-[115px] rtl:xl:right-[115px]"
        />
      </div>
    </div>
    <div class="flex items-center col-span-12 lg:min-h-screen lg:col-span-6 py-9 md:py-12">
      <Grid cols={12} class="w-full">
        <div class="col-span-12 mx-4 mb-0 2xl:col-span-8 2xl:col-start-3 md:mx-12 card">
          <CardBody class="md:p-10">
            <div class="mb-4 text-center">
              <div class="flex items-center justify-center mx-auto size-14">
                <LucideIcon
                  name="CircleCheckBig"
                  class="text-green-500 stroke-1 size-10 fill-green-500/10"
                />
              </div>
            </div>
            <h4
              class="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text"
            >
              Password Reset!
            </h4>
            <p class="mb-5 text-center text-gray-500 dark:text-dark-500">
              Your password has been successfully reset. Click below to continue accessing your
              account.
            </p>
            <div class="text-center">
              <a href="/auth-signin-basic" class="btn btn-primary"
                ><span class="align-middle">Return to SignIn</span>
                <LucideIcon name="MoveRight" class="inline-block size-4 ml-0.5" /></a
              >
            </div>
          </CardBody>
        </div>
      </Grid>
    </div>
  </Grid>
</div>
