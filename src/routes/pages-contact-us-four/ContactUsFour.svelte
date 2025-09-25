<script lang="ts">
  import Grid from '$lib/components/ui/grid/Grid.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
</script>

<Grid cols={12} gap={0} class="from-sky-500/10 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-500/5 to-pink-500/5">
    <Col cols={{span:12}} xl={{span:7}}>
        <div class="flex items-center py-10 border-gray-200 xl:py-0 xl:h-screen ltr:border-r rtl:border-l dark:border-dark-800">
            <div class="px-10 md:px-20 grow">
                <h1 class="mb-8 leading-normal xl:w-2/3">Let's now concentrate on the fundamental aspects of your projects.</h1>
                <form action="#!" class="mb-6 xl:w-2/3">
                    <Grid cols={12} gap={5}>
                        <Col cols={{span:12}}>
                            <label for="projectInput" class="form-label">Project Name</label>
                            <input type="text" id="projectInput" class="bg-transparent form-input dark:bg-transparent">
                        </Col>
                        <Col cols={{span:12}}>
                            <label for="textareaInput2" class="form-label">Description</label>
                            <textarea name="textareaInput2" id="textareaInput2" rows="3" class="h-auto bg-transparent form-input dark:bg-transparent"></textarea>
                        </Col>
                        <Col cols={{span:12}}>
                            <label for="filesInput" class="form-label">Please send us any additional files you want to send us below</label>
                            <input type="file" id="filesInput" class="form-file" multiple>
                        </Col>
                        <Col cols={{span:12}}>
                            <label for="linksInput" class="form-label">You can also upload links to your content, such as Google Docs or Dropbox</label>
                            <input type="url" id="linksInput" class="bg-transparent form-input dark:bg-transparent">
                        </Col>
                    </Grid>
                </form>
                <div class="flex flex-wrap gap-2">
                    <a href="/pages-contact-us-three" class="btn btn-outline-gray">
                        <LucideIcon name="MoveLeft" class="mr-1 ltr:inline-block rtl:hidden size-4" /> 
                        Back
                    </a>
                    <a href="/pages-contact-us-five" class="btn btn-primary">
                        Go Forward 
                        <LucideIcon name="MoveRight" class="ml-1 ltr:inline-block rtl:hidden size-4" />
                    </a>
                </div>
            </div>
        </div>
    </Col>
    <Col cols={{span:12}} xl={{span:5}}>
        <div class="flex flex-col justify-center w-full px-10 py-10 md:px-20 xl:py-0 xl:h-screen">
            <div>
                <h5 class="mb-3">Send Additional Files</h5>
                <p class="mb-5 text-gray-500 dark:text-dark-500">Please provide any supplementary materials (files or links) that will assist us in formulating the estimate.</p>
                <ul class="space-y-2 mb-7">
                    <li>
                        <LucideIcon
                        name="CornerUpRight"
                        class="mr-1 text-green-500 ltr:inline-block rtl:hidden size-4"
                      />
                        Description of your project
                    </li>
                    <li>
                        <LucideIcon
                        name="CornerUpRight"
                        class="mr-1 text-green-500 ltr:inline-block rtl:hidden size-4"
                      />
                        Wireframes or functional sketches
                    </li>
                    <li>
                        <LucideIcon
                        name="CornerUpRight"
                        class="mr-1 text-green-500 ltr:inline-block rtl:hidden size-4"
                      />
                        Visual identification materials
                    </li>
                </ul>
            </div>
        </div>
    </Col>
</Grid>
