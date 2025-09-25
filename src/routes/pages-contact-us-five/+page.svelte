<script>
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";
    import Col from "$lib/components/ui/grid/Col.svelte";
    import Grid from "$lib/components/ui/grid/Grid.svelte";


</script>

<Grid cols={12} gap={0} class="from-sky-500/10 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-500/5 to-pink-500/5">
    <Col cols={{span:12}} md={{span:6}} class="md:col-start-4">
        <div class="flex flex-col justify-center w-full h-screen px-10 md:px-0">
            <div>
                <LucideIcon name="CircleCheckBig" class="mb-6 text-green-500 size-10 fill-green-500/10"/>
                <h2 class="mb-2 leading-normal">Thank you, we accepted your Challenge</h2>
                <p class="mb-6 text-gray-500 dark:text-dark-500">Usually, we need 24 hours to read the information you sent. We will get back to you as soon as possible.</p>
                <a href="/index" class="btn btn-primary">
                    Back to Home
                    <LucideIcon name="MoveRight" class="ml-1 ltr:inline-block rtl:hidden size-4" />
                </a>
            </div>
        </div>
    </Col>
</Grid>