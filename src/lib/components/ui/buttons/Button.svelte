<script lang="ts">
    import { buttonSizeClasses } from "./button";
    import { buttonColors } from "./button-css";
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";
    export let text:string = '';
    export let color:UI.ThemeColors = 'primary';
    export let size:UI.ButtonSize = 'default';
    export let varient:UI.ButtonVariant = 'default';
    export let actionCb:(e:Event)=>void = (e:Event)=>{};
    export let disabled:boolean = false;
    export let type:"button" | "submit" | "reset" | null | undefined = 'button';
    export let icon:string = '';
    export let iconPosition:'left' | 'right' | '' = '';
    let iconClass:string='';
    $: btnClass = buttonColors[`${varient}-${color}`];
    $: btnSizeClass = buttonSizeClasses[size];

    $: if(icon){
        if(iconPosition) {
            iconClass = ` btn-icon-overlay ${iconPosition === 'right'? 'right':''}`
        }else if(text){
            iconClass= ' btn-icon-text';
        }else{
            iconClass= ' btn-icon';
        }
    }

</script>

<button 
    class={`btn${btnClass}${btnSizeClass}${iconClass}${btnSizeClass} ${$$props.class ? $$props.class : ''}`}
    on:click={actionCb} disabled={disabled} 
    type={type}>
    {#if icon && !iconPosition}
        <LucideIcon name={icon} class="size-4"/>
    {/if}
    {#if icon && iconPosition}
        <span class="icon">
        <LucideIcon name={icon} class="size-4"/>
        </span>
    {/if}
    {text}
</button>