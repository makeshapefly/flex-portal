<script>
    let props = {};

	$:{
		const { class: _, ...rest } = $$props;
		props = rest;
	}
</script>

<div class="card-footer{$$props.class ? ' '+$$props.class:''}" {...props}>
    <slot></slot>
</div>