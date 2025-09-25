<script lang="ts">
	import { derived } from "svelte/store";
	import Breadcrumb from "../ui/bredcrumb/Breadcrumb.svelte";
	import { page } from "$app/stores";
    

        // Derive breadcrumb items from the current route
    const items:any = derived(page, $page => {
        const segments = $page.url.pathname.split('/').filter(Boolean);
        const breadcrumbItems = segments.map((segment, index) => {
            try {
                const href = '/' + segments.slice(0, index + 1).join('/');
                return { name: segment.split('-').map((str)=>str.charAt(0).toUpperCase() + str.slice(1)).join(' '), href };
            } catch (error) {}
        });
        return breadcrumbItems;
    });

    $: title = $items[$items?.length-1]?.name;
</script>

<div class="flex-col items-start gap-1 page-heading sm:flex-row sm:items-center">
    <h6 class="grow group-data-[nav-type=pattern]:text-white">{title}</h6>
    <Breadcrumb varient="arrow"/>
</div>