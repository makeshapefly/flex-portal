<script lang="ts">
	import { badgeColors } from './badge-css';
	export let text: string = '';
	export let varient: UI.BadgeVarient = 'default';
	export let color: UI.Colors = 'primary';
	export let removeCb: (() => void) | null = null;
	$: badge = badgeColors[`${varient}-${color}`];
</script>

<span class="badge {badge} {$$props.class ? $$props.class : ''}"
	>{text}
	{#if removeCb}
		<a href="#!" on:click={removeCb} aria-label="Close" class="align-bottom"
			><i class="ri-close-fill ltr:ml-1 rtl:mr-1"></i></a
		>
	{/if}
</span>
