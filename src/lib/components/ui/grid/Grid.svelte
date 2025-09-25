<script lang="ts">
	import {
		gridColsMap,
		gridColsSMMap,
		gridColsMDMap,
		gridColsLGMap,
		gridColsXLMap,
		gridCols2XLMap,
		gapMap,
		gapXMap,
		gapYMap
	} from './grid';
	export let cols: UI.Tailwind.GridCols = 1;
	export let sm: UI.Tailwind.GridCols | null = null;
	export let md: UI.Tailwind.GridCols | null = null;
	export let lg: UI.Tailwind.GridCols | null = null;
	export let xl: UI.Tailwind.GridCols | null = null;
	export let xxl: UI.Tailwind.GridCols | null = null;

	$: columns = cols ? gridColsMap[cols] : '';
	$: smColumns = sm ? gridColsSMMap[sm] : '';
	$: mdColumns = md ? gridColsMDMap[md] : '';
	$: lgColumns = lg ? gridColsLGMap[lg] : '';
	$: xlColumns = xl ? gridColsXLMap[xl] : '';
	$: xxlColumns = xxl ? gridCols2XLMap[xxl] : '';

	export let gap: UI.Tailwind.Gap | null = null;
	export let gapX: UI.Tailwind.Gap | null = null;
	export let gapY: UI.Tailwind.Gap | null = null;

	$: gapxy = gap ? gapMap[gap] : '';
	$: gapx = gapX ? gapXMap[gapX] : '';
	$: gapy = gapY ? gapYMap[gapY] : '';

	let props = {};

	$: {
		const {
			cols: _cols,
			sm: _sm,
			md: _md,
			lg: _lg,
			xl: _xl,
			xxl: _xxl,
			gap: _gap,
			gapX: _gapX,
			gapY: _gapY,
			class: _class,
			...rest
		} = $$props;
		props = rest;
	}
</script>

<div
	class={`grid${columns}${smColumns}${mdColumns}${lgColumns}${xlColumns}${xxlColumns}${gapxy}${gapx}${gapy}${$$props.class ? ' ' + $$props.class : ''}`}
	{...props}
>
	<slot></slot>
</div>
