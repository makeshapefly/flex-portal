<script lang="ts">
	import VectorMap from '$lib/components/common/vectorMap.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const markerVector = {
		markers: [{ coords: [-14.235, -51.9253] }, { coords: [35.8617, 104.1954] }],
		selectedMarkers: [0]
	};
	const imageMarker = {
		markers: [
			{
				name: 'Egypt',
				coords: [26.8206, 30.8025],
				style: {
					initial: {
						image: '/assets/images/others/pin.png' // Add a marker image for this particular marker.
					}
				}
			},
			{
				name: 'United States',
				coords: [37.0902, -95.7129],
				style: {
					initial: {
						image: '/assets/images/others/pin.png' // Add a marker image for this particular marker.
					}
				}
			},
			{
				name: 'United Kingdom',
				coords: [55.3781, 3.436],
				style: {
					initial: {
						image: '/assets/images/others/pin.png' // Add a marker image for this particular marker.
					}
				}
			}
		]
	};

	const lineMapOptions = {
		map: 'world',
		lineStyle: {
			stroke: '#676767',
			strokeWidth: 1.5,
			fill: '#ff5566',
			fillOpacity: 1,
			strokeDasharray: '6 3 6',
			animation: true
		},
		markers: [
			{ name: 'Brazil', coords: [-14.235, -51.9253], style: { fill: 'red' } },
			{ name: 'Greenland', coords: [71.7069, -42.6043], style: { fill: 'green' } },
			{ name: 'Egypt', coords: [26.8206, 30.8025], style: { fill: 'blue' } },
			{ name: 'United States', coords: [37.0902, -95.7129], style: { fill: 'purple' } },
			{ name: 'Norway', coords: [60.472, 8.4689], style: { fill: 'yellow' } }
		],
		lines: [
			{ from: 'Brazil', to: 'Greenland' },
			{ from: 'Greenland', to: 'Egypt' },
			{ from: 'Egypt', to: 'United States' },
			{ from: 'United States', to: 'Norway' },
			{ from: 'Norway', to: 'Brazil' }
		]
	};

	const tooltipVector = {
		map: 'world',
		onRegionTooltipShow(event: any, tooltip: any, code: any) {
			tooltip.text(
				`<h6 class="mb-2">${tooltip.text()} - Country</h6>` +
					`<p class="text-xs">Get better Us with Srbthemes.</p>`,
				true // Enables HTML
			);
		}
	};

	const dataSeries = {
		map: 'world',
		// Notice: you should declare a list of markers to apply series configuration.
		markers: [
			{ coords: [61, 105] },
			{ coords: [72, -42] },
			{ coords: [56, -106] },
			{ coords: [31.5, 34.8] },
			{ coords: [-14.235, -51.9253] },
			{ coords: [35.8617, 104.1954] }
		],
		series: {
			markers: [
				{
					attribute: 'fill',
					legend: {
						title: 'Something (marker)'
					},
					scale: {
						mScale1: '#ffc371',
						mScale2: '#c79efd'
					},
					values: {
						// Notice: the key must be a number of the marker.
						0: 'mScale1',
						1: 'mScale2',
						2: 'mScale2'
					}
				}
			]
		}
	};
</script>

<PageHeading title="Vector" sub_title="Maps" />

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="map-basic" height="384" />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Markers</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="map-markers" height="384" options={markerVector} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Image Marker</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="mage-image" height="384" options={imageMarker} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Line Style</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="mage-line" height="384" options={lineMapOptions} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>With Tooltip</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="mage-tooltip" height="384" options={tooltipVector} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Data Series</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="mage-data" height="384" options={dataSeries} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Reflect user location</CardTitle>
		</CardHeader>
		<CardBody>
			<VectorMap mapId="mage-reflect" height="384" />
			<div class="flex gap-x-5">
				<button id="request-location" class="btn btn-blue text-white">Find My Location</button>
				<button id="clear-location" class="btn btn-red text-white">Clear Location</button>
			</div>
		</CardBody>
	</Col>
</Grid>
