<script lang="ts">
    import "./navlink.css";
    import { navlinkColors } from "./nav-link-css"
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";
    export let varient:UI.NavLinkVarient = 'default';
    export let color:UI.Colors;
    export let link:string;
    export let text:string = '';
    export let icon:string = '';
    export let active = false;
    export let actionCb:(e:Event)=>void = (e:Event)=>{};
    
    $: navLinkClass = navlinkColors[(varient+'-'+color) as UI.NavLinkVarientColor];
</script>

<a href={link} class="{navLinkClass} nav-link" class:active={active} on:click={actionCb}>
    {#if icon}
        <LucideIcon name={icon} class="mx-auto"/>
    {/if}
    {text}
</a>