<!-- Tooltip.svelte -->
<script lang="ts">
  import "./tooltip.css"
	import { animate } from '$lib/utils/hooks';
	import { onMount } from "svelte";
  export let message;  // Tooltip text passed from the parent
  export let position: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' = 'top';  // Position of the tooltip (optional)
  export let showArrow = true;  // Show arrow on the tooltip (optional)
  export let isAnimation = false;  // Show arrow on the tooltip (optional)
  export let variant: 'default' | 'clicked' = 'default';  // Show arrow on the tooltip (optional)
  let tooltipVisible = false;
  let tooltip:HTMLElement;
  let tooltipMessage:HTMLElement;
  let isLoading = true;
  
  function getTransformOrigin() {
    switch (position) {
      case 'top':
        return 'scale-bottom';
      case 'top-start':
        return 'scale-bottom-start';
      case 'top-end':
        return 'scale-bottom-end';
      case 'right':
        return 'scale-left';
      case 'right-start':
        return 'scale-left-start';
      case 'right-end':
        return 'scale-left-end';
      case 'bottom':
        return 'scale-top';
      case 'bottom-start':
        return 'scale-top-start';
      case 'bottom-end':
        return 'scale-top-end';
      case 'left':
        return 'scale-right';
      case 'left-start':
        return 'scale-right-start';
      case 'left-end':
        return 'scale-right-end';
      default:
        return 'scale-bottom';
    }
  }



  const showTooltip = () => {
    if(variant === 'clicked') return;
    tooltipVisible = true;
  };

  const hideTooltip = () => {
    tooltipVisible = false;
  };

  const toggleTooltip = () => {
    tooltipVisible = !tooltipVisible;
  };
  onMount(()=>{
    if(tooltip){
      const slot = tooltip?.firstChild as HTMLElement;
      slot.onmouseenter = showTooltip;
      // slot.onmouseleave = hideTooltip;
      slot.onclick = toggleTooltip;
      const slotRect = slot.getBoundingClientRect();
      const tooltipMessageRect = tooltipMessage.getBoundingClientRect();
      switch (position) {
        case 'top':
          tooltipMessage.style.left = `${slotRect.left}px`;
          tooltipMessage.style.top = `${slotRect.top-tooltipMessageRect.height}px`;
          break;
      
        default:
          break;
      }
      // tooltipMessage.style.top = `${0}px`;
    }
    isLoading = false;
  })
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="tooltip-container" bind:this={tooltip}>
  <slot></slot> <!-- The content inside Tooltip -->
  {#if tooltipVisible || isLoading}
  <div 
    bind:this={tooltipMessage} 
    transition:animate={{transition: isAnimation ? getTransformOrigin(): 'none'}} 
    class={`tooltip-box ${showArrow ? 'with-arrow' : ''} ${isLoading ?  ' opacity-0' : ''}`}>
    {message}
  </div>
  {/if}
</div>

