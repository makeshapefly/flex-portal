<script lang="ts">
    import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '../grid/Col.svelte';
	import { colorClasses } from './card';
	import CardBody from './CardBody.svelte';
	export let color: keyof typeof colorClasses = 'primary';

	// Retrieve the classes based on the color prop
	const { containerClass, textClass} = colorClasses[color];
</script>

<Col cols={{span:12}} sm={{span:6}} xl={{span:3}} class={`card ${containerClass}`}>
    <CardBody>
        <h6 class="mb-2">Need a help in Claim?</h6>
        <p class="mb-3 text-gray-500 dark:text-dark-500">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class={`inline-flex items-center gap-2 font-medium ${textClass} hover:underline`}>
            See our guideline
            <LucideIcon name="SquareArrowOutUpRight" class="size-4"/>
        </a>
    </CardBody>
</Col>