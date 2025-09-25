<script>
    let props = {};
    export let text = "Card Heading 6";
	$:{
		const { class: _, text:__, ...rest } = $$props;
		props = rest;
	}
</script>

<h6 class="card-title{$$props.class ? ' '+$$props.class:''}" {...props}>
    {#if $$slots.default}
		<slot></slot>
	{:else}
		{text}
	{/if}
</h6>