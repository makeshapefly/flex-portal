<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import CookieBanner from '$lib/components/ui/cookie/CookieBanner.svelte';
	import CookieCard from '$lib/components/ui/cookie/CookieCard.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const baseButtons: Array<{ text: string; color: string }> = [
		{ text: 'Primary', color: 'primary' },
		{ text: 'Purple', color: 'purple' },
		{ text: 'Green', color: 'green' },
		{ text: 'Red', color: 'red' },
		{ text: 'Yellow', color: 'yellow' },
		{ text: 'Sky', color: 'sky' },
		{ text: 'Pink', color: 'pink' },
		{ text: 'Indigo', color: 'indigo' },
		{ text: 'Orange', color: 'orange' },
		{ text: 'Dark', color: 'dark' },
		{ text: 'Light', color: 'light' },
		{ text: 'gray', color: 'gray' }
	];

	let showCookie = true;
	const firstButton = baseButtons[2];
</script>

<PageHeading title="Cookie Consent" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Cookie Card</CardTitle>
		</CardHeader>
		<CardBody class="relative min-h-72">
			<CookieCard
				variant="simple"
				message="By visiting this site, you consent to the use of cookies, which are employed to enrich your browsing experience."
				color={firstButton.color}
			>
				<span slot="button" let:close>
					<button
						type="button"
						class="btn btn-{firstButton.color}"
						on:click={() => {
							close();
							showCookie = false;
						}}
					>
						Accept
					</button>
				</span>
			</CookieCard>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Horizontal Cookie Card</CardTitle>
		</CardHeader>
		<CardBody class="relative min-h-96">
			<CookieCard variant="horizontal" color={firstButton.color}>
				<span slot="button" let:close>
					<button
						type="button"
						class="btn btn-active-{firstButton.color}"
						on:click={() => {
							close();
							showCookie = false;
						}}
					>
						ignore
					</button>
					<button
						type="button"
						class="btn btn-{firstButton.color}"
						on:click={() => {
							close();
							showCookie = false;
						}}
					>
						Accept
					</button>
				</span>
			</CookieCard>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Cookie Consent Banner</CardTitle>
		</CardHeader>
		<CardBody class="relative min-h-44">
			<CookieBanner variant="consent">
				<span slot="button" let:closeBanner>
					<button
						type="button"
						class="btn btn-xs rounded-full btn-{firstButton.color}"
						on:click={() => {
							closeBanner();
							showCookie = false;
						}}
					>
						Accept All
					</button>
				</span>
			</CookieBanner>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Cookie Policy</CardTitle>
		</CardHeader>
		<CardBody class="relative min-h-48 md:min-h-32">
			<CookieBanner variant="policy">
				<span slot="button" let:closeBanner>
					<button
						type="button"
						class="btn btn-xs rounded-full btn-{firstButton.color}"
						on:click={() => {
							closeBanner();
							showCookie = false;
						}}
					>
						Ok
					</button>
				</span>
			</CookieBanner>
		</CardBody>
	</Col>
</Grid>
