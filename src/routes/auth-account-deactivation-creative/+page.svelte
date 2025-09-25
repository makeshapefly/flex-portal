<script>
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
    import CardBody from '$lib/components/ui/card/CardBody.svelte';
    import Col from '$lib/components/ui/grid/Col.svelte';
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
          class="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]"
        />
      </div>
    </div>
    <div class="flex items-center col-span-12 lg:min-h-screen lg:col-span-6 py-9 md:py-12">
      <Grid cols={12} class="w-full">
        <Col cols={{span:12}} class="mx-4 mb-0 2xl:col-span-8 2xl:col-start-3 md:mx-12 card">
          <CardBody class="md:p-10">
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
              class="mb-1 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text"
            >
              Account Deactivation
            </h4>
            <p class="mb-6 text-center text-gray-500 dark:text-dark-500">
              Domiex Security and Privacy
            </p>
            <div class="flex gap-3 mb-3">
              <div class="shrink-0">
                <LucideIcon name="EyeOff" />
              </div>
              <div class="grow">
                <h6 class="mb-1">Temporary Disable</h6>
                <p class="text-gray-500 dark:text-dark-500">
                  The customer is very important and will be followed up with care. Everyone's needs
                  are expected to be met. It is not just about the process, but about benefiting
                  everyone, with an emphasis on ecological mindfulness.
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="shrink-0">
                <LucideIcon name="Trash2" />
              </div>
              <div class="grow">
                <h6 class="mb-1">Permanent Delete</h6>
                <p class="text-gray-500 dark:text-dark-500">
                  The customer is very important and will receive dedicated attention. Everyone's
                  needs and expectations are considered. This process is undertaken for the benefit
                  of all, with a focus on ecological responsibility.
                </p>
              </div>
            </div>
            <div class="justify-center gap-2 mt-6 sm:flex">
              <a href="#!" class="btn btn-primary">Temporary Disable</a>
              <a href="#!" class="btn btn-red mt-2.5 sm:mt-0">Permanent Delete</a>
            </div>
          </CardBody>
        </Col>
      </Grid>
    </div>
  </Grid>
</div>
