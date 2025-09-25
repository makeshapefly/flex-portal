<script>
	import GoogleMap from '$lib/components/common/GoogleMap.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const apiKey = 'AIzaSyB_dQ6dcSGTdhjDI7sGD8R74UnqYdnNK88'; // Replace with your key!
	const center = { lat: -31.397, lng: 125.644 }; // New York Example
	const centerLocation = { lat: -34.397, lng: 150.644 };
</script>

<svelte:head>
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_dQ6dcSGTdhjDI7sGD8R74UnqYdnNK88"
	></script>
</svelte:head>

<PageHeading title="Google Maps" sub_title="Maps" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<GoogleMap {apiKey} {center} zoom={10} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Track your Location</CardTitle>
		</CardHeader>
		<CardBody>
			<GoogleMap {apiKey} center={centerLocation} zoom={10} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Map with LatLang</CardTitle>
		</CardHeader>
		<CardBody>
			<GoogleMap {apiKey} center={{ lat: -25.363882, lng: 131.044922 }} zoom={10} />
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>POI Click Events</CardTitle>
		</CardHeader>
		<CardBody>
			<GoogleMap {apiKey} center={{ lat: -33.871, lng: 151.197 }} zoom={10} />
		</CardBody>
	</Col>
</Grid>
