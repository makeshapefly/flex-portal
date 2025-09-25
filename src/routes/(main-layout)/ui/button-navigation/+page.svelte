<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import NavLink from '$lib/components/ui/navigation/NavLink.svelte';
	import Nav from '$lib/components/ui/navigation/Nav.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	const navLinks: UI.NavLink[] = [
		{ link: '#!', icon: 'Home' },
		{ link: '#!', icon: 'Zap' },
		{ link: '#!', icon: 'BarChartBig' },
		{ link: '#!', icon: 'Settings' }
	];

	const navLinks2: UI.NavLink[] = [
		{ link: '#!', text: 'Home' },
		{ link: '#!', text: 'Notifications' },
		{ link: '#!', text: 'Dashboard' },
		{ link: '#!', text: 'Settings' }
	];
	const navLinks4: UI.NavLink[] = [
		{ link: '#!', icon: 'Home', text: 'Home' },
		{ link: '#!', icon: 'Zap', text: 'Notifications' },
		{ link: '#!', icon: 'BarChartBig', text: 'Dashboard' },
		{ link: '#!', icon: 'Settings', text: 'Settings' }
	];

	// Set the default active index
	let active1 = 0;
	let active2 = 1;
	let active3 = 2;
	let active4 = 3;
	let active5 = 4;
	let active6 = 5;

	function handleNavigation1(e: Event, index: number): void {
		// Prevent the default action
		e.preventDefault();

		// Your custom logic here
		// ...

		// Update the active index
		active1 = index;
	}
	function handleNavigation2(e: Event, index: number): void {
		// Prevent the default action
		e.preventDefault();

		// Your custom logic here
		// ...

		// Update the active index
		active2 = index;
	}
	function handleNavigation3(e: Event, index: number): void {
		// Prevent the default action
		e.preventDefault();

		// Your custom logic here
		// ...

		// Update the active index
		active3 = index;
	}
	function handleNavigation4(e: Event, index: number): void {
		// Prevent the default action
		e.preventDefault();

		// Your custom logic here
		// ...

		// Update the active index
		active4 = index;
	}

	function handleNavigation5(e: Event, index: number): void {
		// Prevent the default action
		e.preventDefault();

		// Your custom logic here
		// ...

		// Update the active index
		active5 = index;
	}

	function handleNavigation6(e: Event, index: number): void {
		// Prevent the default action
		e.preventDefault();

		// Your custom logic here
		// ...

		// Update the active index
		active6 = index;
	}
</script>

<PageHeading title="Button Navigation" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Bottom Navigation</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={1} gap="space" lg={2}>
				<Nav color="primary" {navLinks} activeIndex={active1} actionCb={handleNavigation1} />
			</Grid>
		</CardBody>
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Animation Navigation</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={1} gap="space" lg={2}>
				<Nav
					color="purple"
					{navLinks}
					varient="dot"
					activeIndex={active2}
					actionCb={handleNavigation3}
				/>
			</Grid>
		</CardBody>
	</Col><!--end col-->
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Border Navigation</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={1} gap="space" lg={2}>
				<Nav
					color="green"
					{navLinks}
					varient="border-bottom"
					activeIndex={active4}
					actionCb={handleNavigation5}
				/>
				<Nav
					color="sky"
					{navLinks}
					varient="border-top"
					activeIndex={active2}
					actionCb={handleNavigation6}
				/>
			</Grid>
		</CardBody>
	</Col><!--end col-->
</Grid><!--end grid-->
