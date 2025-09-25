<script lang="ts">
  export let message = '';               // Tooltip text passed from the parent
  export let position = 'top';            // Position of the tooltip
  export let customClass = '';            // Allow custom classes for styling
  export let showArrow = true;            // Boolean to determine whether to show the arrow
  export let variant = 'mouseenter';      // Behavior variant: click, mouseenter, follow-cursor
  export let followCursor = false;        // Enable tooltip to follow cursor
  export let scaleAnimation = true;       // Boolean to apply scale animation

  let tooltipVisible = false;             // Controls tooltip visibility
  let tooltipPosition = { x: 0, y: 0 };   // Position for follow cursor variant

  const showTooltip = () => {
    tooltipVisible = true;
  };

  const hideTooltip = () => {
    tooltipVisible = false;
  };

  const handleClick = () => {
    tooltipVisible = !tooltipVisible;
  };

  const handleMouseEnter = () => {
    if (variant === 'mouseenter') showTooltip();
  };

  const handleMouseLeave = () => {
    if (variant === 'mouseenter') hideTooltip();
  };

  const handleMouseMove = (e:any) => {
    if (variant === 'follow-cursor') {
      tooltipPosition.x = e.clientX + 10; // Adjust offset
      tooltipPosition.y = e.clientY + 10;
    }
  };

  $: tooltipStyle = followCursor
    ? `top: ${tooltipPosition.y}px; left: ${tooltipPosition.x}px;`
    : '';
</script>


<!-- Tooltip component structure -->
 <!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="tooltip-container"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousemove={variant === 'follow-cursor' ? handleMouseMove : undefined}
  on:click={variant === 'click' ? handleClick : undefined}
>
  <slot></slot>
  <div
    class="tooltip-box {position} {tooltipVisible ? 'visible' : ''} {showArrow ? 'with-arrow' : ''} {scaleAnimation ? 'scale' : ''} {customClass}"
    style={tooltipStyle}
  >
    {message}
  </div>
</div>
