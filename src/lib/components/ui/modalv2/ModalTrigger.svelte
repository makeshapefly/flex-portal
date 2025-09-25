<script lang="ts">
    // This Component is version of Button.svelte component with special functionality to open the modal
    // It must be used inside the Modal component
    
    import {  buttonSizeClasses } from "../buttons/button";
    import { buttonColors } from "../buttons/button-css";
    import LucideIcon from "$lib/components/common/LucideIcon.svelte";
    import { openModal } from "$lib/stores/modal";
    export let modalId:string ;
    export let text:string = '';
    export let color:UI.ThemeColors = 'primary';
    export let size:UI.ButtonSize = 'default';
    export let varient:UI.ButtonVariant = 'default';
    export let icon:string = '';
    export let iconPosition:'left' | 'right' | '' = '';
    let iconClass:string='';
    $: btnClass = buttonColors[(varient +'-'+ color) as UI.ButtonVariantColor];
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
    on:click={()=>openModal(modalId)} 
    type="button">
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