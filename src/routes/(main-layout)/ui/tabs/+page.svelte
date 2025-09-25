<script>
	import Tab from '$lib/components/ui/tab/Tab.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import AlertDemo from '$lib/components/ui/alert/AlertDemo.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import { writable } from 'svelte/store';

	let openTab = writable(2);
	const tabs = [
		{ id: 1, name: 'Home', icon: 'Home' },
		{ id: 2, name: 'Service', icon: 'Tangent' },
		{ id: 3, name: 'Contact Us', icon: 'Home' }
	];
</script>

<PageHeading title="Tabs" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Basic</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<Tab
						color="primary"
						tabs={[
							{
								title: 'Home',
								content:
									'The Admin Dashboard displays tabs for multiple pages that provide a personalized view of BI performance, data correctness, required cube maintenance and required administrative actions. These pages contain the results of detailed analyses, represented by links, images, graphs, pie charts and BI reports.'
							},
							{
								title: 'Service',
								content:
									'A service administrator is responsible for overseeing all aspects of the work order for a service department. Your job duties include coordinating with the service manager on the completion of customer work orders, putting together billing for work completed, and reviewing time cards for service employees.'
							},
							{
								title: 'Contact Us',
								content:
									'The official business definition of a Contact Administrator is an individual responsible for managing the contact database of an organization. This includes the maintenance of contact information, the creation of contact groups, and the organization of contact information into categories.'
							}
						]}
					/>
				</div>
			</CardBody>
		</Card>
	</Col><!--end col-->
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Basic Justify</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<Tab
						varient="justify"
						tabs={[
							{
								title: 'Home',
								content:
									'The Admin Dashboard displays tabs for multiple pages that provide a personalized view of BI performance, data correctness, required cube maintenance and required administrative actions. These pages contain the results of detailed analyses, represented by links, images, graphs, pie charts and BI reports.'
							},
							{
								title: 'Service',
								content:
									'A service administrator is responsible for overseeing all aspects of the work order for a service department. Your job duties include coordinating with the service manager on the completion of customer work orders, putting together billing for work completed, and reviewing time cards for service employees.'
							},
							{
								title: 'Contact Us',
								content:
									'The official business definition of a Contact Administrator is an individual responsible for managing the contact database of an organization. This includes the maintenance of contact information, the creation of contact groups, and the organization of contact information into categories.'
							}
						]}
					/>
				</div>
			</CardBody>
		</Card>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Pill Tabs</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<Tab
						varient="pills-justify"
						tabs={[
							{
								title: 'Home',
								content:
									'The Admin Dashboard displays tabs for multiple pages that provide a personalized view of BI performance, data correctness, required cube maintenance and required administrative actions. These pages contain the results of detailed analyses, represented by links, images, graphs, pie charts and BI reports.'
							},
							{
								title: 'Service',
								content:
									'A service administrator is responsible for overseeing all aspects of the work order for a service department. Your job duties include coordinating with the service manager on the completion of customer work orders, putting together billing for work completed, and reviewing time cards for service employees.'
							},
							{
								title: 'Contact Us',
								content:
									'The official business definition of a Contact Administrator is an individual responsible for managing the contact database of an organization. This includes the maintenance of contact information, the creation of contact groups, and the organization of contact information into categories.'
							}
						]}
					/>
				</div>
			</CardBody>
		</Card>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Pill Justify Tabs</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<Tab
						varient="pills"
						tabs={[
							{
								title: 'Home',
								content:
									'The Admin Dashboard displays tabs for multiple pages that provide a personalized view of BI performance, data correctness, required cube maintenance and required administrative actions. These pages contain the results of detailed analyses, represented by links, images, graphs, pie charts and BI reports.'
							},
							{
								title: 'Service',
								content:
									'A service administrator is responsible for overseeing all aspects of the work order for a service department. Your job duties include coordinating with the service manager on the completion of customer work orders, putting together billing for work completed, and reviewing time cards for service employees.'
							},
							{
								title: 'Contact Us',
								content:
									'The official business definition of a Contact Administrator is an individual responsible for managing the contact database of an organization. This includes the maintenance of contact information, the creation of contact groups, and the organization of contact information into categories.'
							}
						]}
					/>
				</div>
			</CardBody>
		</Card>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Icon with Animation Tabs</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<Tab
						varient="icon"
						tabs={[
							{
								title: 'Home',
								content:
									'The Admin Dashboard displays tabs for multiple pages that provide a personalized view of BI performance, data correctness, required cube maintenance and required administrative actions. These pages contain the results of detailed analyses, represented by links, images, graphs, pie charts and BI reports.',
								icon: 'Home'
							},
							{
								title: 'Service',
								content:
									'A service administrator is responsible for overseeing all aspects of the work order for a service department. Your job duties include coordinating with the service manager on the completion of customer work orders, putting together billing for work completed, and reviewing time cards for service employees.',
								icon: 'Airplay'
							},
							{
								title: 'Contact Us',
								content:
									'The official business definition of a Contact Administrator is an individual responsible for managing the contact database of an organization. This includes the maintenance of contact information, the creation of contact groups, and the organization of contact information into categories.',
								icon: 'SquareUser'
							}
						]}
					/>
				</div>
			</CardBody>
		</Card>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Icon with Text Tabs</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<Tab
						varient="icon-text"
						setClass="tabs-pills"
						tabs={[
							{
								title: 'Home',
								icon: 'Home',
								content:
									'The Admin Dashboard displays tabs for multiple pages that provide a personalized view of BI performance, data correctness, required cube maintenance and required administrative actions. These pages contain the results of detailed analyses, represented by links, images, graphs, pie charts and BI reports.'
							},
							{
								title: 'Service',
								icon: 'Airplay',
								content:
									'A service administrator is responsible for overseeing all aspects of the work order for a service department. Your job duties include coordinating with the service manager on the completion of customer work orders, putting together billing for work completed, and reviewing time cards for service employees.'
							},
							{
								title: 'Contact Us',
								icon: 'SquareUser',
								content:
									'The official business definition of a Contact Administrator is an individual responsible for managing the contact database of an organization. This includes the maintenance of contact information, the creation of contact groups, and the organization of contact information into categories.'
							}
						]}
					/>
				</div>
			</CardBody>
		</Card>
	</Col>
	<Col cols={{ span: 12 }} md={{ span: 6 }}>
		<Card>
			<CardHeader>
				<CardTitle>Animation Tabs</CardTitle>
			</CardHeader>
			<CardBody>
				<div>
					<ul class="tabs-animation">
						{#each tabs as tab}
							<li class="w-32" on:click={() => openTab.set(tab.id)} role="presentation">
								<a
									href="#!"
									class="nav-item group/item [&.active]:bg-green-500 [&.active]:text-green-50"
									class:active={$openTab === tab.id}
									class:inactive={$openTab !== tab.id}
								>
									<LucideIcon name={tab.icon} class="icon group-hover/item:translate-y-11" />
									<span class="content group-hover/item:visible group-hover/item:-translate-y-3">
										{tab.name}
									</span>
								</a>
							</li>
						{/each}
					</ul>
					<div class="mt-4">
						{#if $openTab === 1}
							<p class="dark:text-dark-500 text-gray-500">
								The Admin Dashboard displays tabs for multiple pages that provide a personalized
								view of BI performance, data correctness, required cube maintenance and required
								administrative actions. These pages contain the results of detailed analyses,
								represented by links, images, graphs, pie charts and BI reports.
							</p>
						{/if}
						{#if $openTab === 2}
							<p class="dark:text-dark-500 text-gray-500">
								A service administrator is responsible for overseeing all aspects of the work order
								for a service department. Your job duties include coordinating with the service
								manager on the completion of customer work orders, putting together billing for work
								completed, and reviewing time cards for service employees.
							</p>
						{/if}
						{#if $openTab === 3}
							<p class="dark:text-dark-500 text-gray-500">
								The official business definition of a Contact Administrator is an individual
								responsible for managing the contact database of an organization. This includes the
								maintenance of contact information, the creation of contact groups, and the
								organization of contact information into categories.
							</p>
						{/if}
					</div>
				</div>
			</CardBody>
		</Card>
	</Col>
</Grid><!--end grid-->
