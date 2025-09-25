<script>
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';

  import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<div
  class="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10"
>
  <div class="container">
    <Grid cols={12}>
      <Col
        cols={{ span: 12 }}
        md={{ span: 10 }}
        lg={{ span: 6 }}
        xl={{ span: 4 }}
        class="mb-0 md:col-start-2 lg:col-start-4 xl:col-start-5 card"
      >
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
      </Col>
    </Grid>
  </div>
</div>
