<script lang="ts">
	export let variant: UI.TimelineVariant = 'basic';
</script>

<ul
	class={` ${
		variant === 'square'
			? 'timeline timeline-square'
			: variant === 'icon'
				? '*:before:absolute *:before:w-0.5 *:before:bg-gray-200 dark:*:before:bg-dark-800 *:before:inset-y-0 *:relative rtl:*:before:right-4 ltr:*:before:left-4 flex flex-col *:pb-6'
				: 'timeline'
	}`}
>
	<slot></slot>
</ul>
