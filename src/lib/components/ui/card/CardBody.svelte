<script>
    let props = {};

	$:{
		const { class: _, ...rest } = $$props;
		props = rest;
	}
</script>

<div class="card-body{$$props.class ? ' '+$$props.class:''}" {...props}>
    <slot></slot>
</div>