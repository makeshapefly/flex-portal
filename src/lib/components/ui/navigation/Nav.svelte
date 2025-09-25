<script lang="ts">
    import { navClasses } from "./nav";
	import NavLink from "./NavLink.svelte";
    export let color:UI.Colors;
    export let varient:UI.Nav = 'default';
    export let navLinks:UI.NavLink[];
    export let activeIndex:number = 0;
    export let actionCb:(event:Event,index:number)=>void = (event:Event, index:number)=>{};

    $: navClass = navClasses[varient];
    $: linkVarient = (varient === 'default' ? 'default' : 'animation') as UI.NavLinkVarient;
</script>

<div class="{navClass}">
    {#each navLinks as {link, icon, text},index (index)}
        <NavLink active={activeIndex === index} {color} varient={linkVarient} {link} {icon} {text} actionCb={(e)=>{ actionCb(e,index) }}/>
    {/each}
</div>