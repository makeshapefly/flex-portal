<script>
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";
    import Col from "$lib/components/ui/grid/Col.svelte";
    import Grid from "$lib/components/ui/grid/Grid.svelte";


</script>

<div class="relative flex items-center justify-center min-h-screen py-20 from-sky-500/10 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-500/5 to-pink-500/5">
    <div class="container">
        <Grid cols={12}>
            <Col cols={{span:12}} lg={{span:8}} class="text-center lg:col-start-3">
                <div class="relative inline-block">
                    <img src="/assets/images/others/setting.png" alt="" class="absolute right-16 top-12 animate-bounce h-44">
                    <img src="/assets/images/others/maintenance.png" alt="" class="relative mx-auto h-96" data-tilt data-tilt-full-page-listening>
                </div>
                <h1 class="text-4xl font-bold text-transparent md:text-6xl lg:leading-relaxed drop-shadow-lg bg-gradient-to-r from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">Opp! We're Under Maintenance</h1>
                <p class="max-w-2xl mx-auto mt-3 mb-5 text-gray-500 dark:text-dark-500 text-16">This website is currently undergoing scheduled maintenance. We'll be back shortly.</p>
                <button type="button" class="btn btn-primary">Refresh</button>
                <div class="flex items-center justify-center gap-2 mt-5">
                    <a href="#!" class="inline-flex items-center justify-center text-white rounded-full shadow-lg bg-sky-500 shadow-gray-200 dark:shadow-dark-800 size-10"><LucideIcon name="Linkedin" class="size-5"/></a>
                    <a href="#!" class="inline-flex items-center justify-center text-white bg-pink-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10"><LucideIcon name="Dribbble" class="size-5"/></a>
                    <a href="#!" class="inline-flex items-center justify-center text-white rounded-full shadow-lg bg-primary-500 shadow-gray-200 dark:shadow-dark-800 size-10"><LucideIcon name="Facebook" class="size-5"/></a>
                    <a href="#!" class="inline-flex items-center justify-center text-white bg-purple-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10"><LucideIcon name="Twitch" class="size-5"/></a>
                    <a href="#!" class="inline-flex items-center justify-center text-white bg-pink-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10"><LucideIcon name="Instagram" class="size-5"/></a>
                    <a href="#!" class="inline-flex items-center justify-center text-white bg-orange-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10"><LucideIcon name="Gitlab" class="size-5"/></a>
                </div>
            </Col>
        </Grid>
    </div>
</div>