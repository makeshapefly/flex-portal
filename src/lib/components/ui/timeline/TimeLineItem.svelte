<script lang="ts">
	// Import the timeLineColors object and Colors type
	import { timeLineColors, type Colors } from './timeline';

	// Declare the color prop with a default value of 'primary'
	export let color: Colors = 'default'; // Default to 'primary' if not provided

	// Dynamically assign the class based on the color prop
	$: colorClass = timeLineColors[color]; // Apply the color class

	// Apply 'active' class if 'color' is provided
	$: activeClass = color ? 'active' : '';
</script>

<li class={`${colorClass} ${activeClass}`}>
	<slot></slot>
</li>
