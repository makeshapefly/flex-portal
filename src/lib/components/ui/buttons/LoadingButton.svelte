<script lang="ts">

    import { buttonSizeClasses } from "./button";
    import { buttonColors } from "./button-css";
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";

    type Status = 'default' |'loading'| 'done' | 'error';
    export let text:string = '';
    export let textOnLoad:string = 'Done';
    export let color:UI.ThemeColors = 'primary';
    export let size:UI.ButtonSize = 'default';
    export let varient:UI.ButtonVariant = 'default';
    export let actionCb: (e: Event) => Promise<void> = async (e: Event) => {};
    export let type:"button" | "submit" | "reset" | null | undefined = 'button';
    export let icon:string = '';
    export let iconPosition:'left' | 'right' | '' = '';

    let status: Status = 'default';

    $: derivedColor = status==='error' ? 'red':color;
    
    $: btnClass = buttonColors[`${varient}-${derivedColor}`];
    $: btnSizeClass = buttonSizeClasses[size];

    async function handleClick(event:Event) {
        const old = status;
        status = 'loading';
        try {
            await actionCb(event);
            status = old === 'default' ? 'done' : 'default'
        } catch (error) {
            status = 'error';
            setTimeout(()=>{
                status = old;
            },2000)
        }
    }
    $: disabled = status === 'error' || status === 'loading' ? true : false;

</script>

<button 
    class={`transition-all btn btn-icon-text${btnClass}${btnSizeClass}${icon && !iconPosition ? ' btn-icon-text': ''}${btnSizeClass}${icon && iconPosition ? ' btn-icon-overlay': ''}${iconPosition==='right'? ' right': ''} ${status==='error'? 'animate-ping':''} ${$$props.class ? $$props.class : ''}`}
    on:click={handleClick} disabled={disabled} 
    type={type}>
    {#if icon && !iconPosition}
        <LucideIcon name={icon} class="size-4"/>
    {/if}
    {#if icon && iconPosition}
        <span class="icon">
        <LucideIcon name={icon} class="size-4"/>
        </span>
    {/if}
    {#if status === 'loading'}
        <span>Loading</span>
        <svg class="text-white size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    {:else if status === 'done'}
        <span>{textOnLoad}</span>
    {:else if status === 'error'}
     Error
    {:else}
        {text}
    {/if}

</button>