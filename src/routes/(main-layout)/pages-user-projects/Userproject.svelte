<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import User from '$lib/components/common/User.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Pagination from '$lib/components/ui/pagination/Pagination.svelte';
	import ProjectCard from './ProjectCard.svelte';

	const projects = [
		{
			title: 'Chat App Templates',
			description:
				'Chat applications typically run on centralized networks that are served by platform operator servers as opposed to peer-to-peer protocols such as XMPP. This allows two people to talk to each other in real time.Chat applications typically run on centralized networks that are served by platform operator servers as opposed to peer-to-peer protocols such as XMPP. This allows two people to talk to each other in real time.',
			icon: 'MessagesSquare',
			iconColor: 'from-sky-500/10 text-sky-500 fill-blue-500/10',
			tag: 'Features',
			views: 148,
			avatars: ['/assets/images/avatar/user-2.png', '/assets/images/avatar/user-3.png']
		},
		{
			title: 'Domiex - Admin & Dashboards Templates',
			description:
				'An admin dashboard template is a powerful tool that streamlines the process of building a robust and user-friendly admin panel for web applications. Image by ThemeMakker. It provides a pre-designed interface with various components and features to',
			icon: 'Box',
			iconColor: ' from-pink-500/10 text-pink-500 fill-pink-500/10',
			tag: 'Admin',
			views: 148,
			avatars: [
				'/assets/images/avatar/user-5.png',
				'/assets/images/avatar/user-20.png',
				'/assets/images/avatar/user-13.png'
			]
		},
		{
			title: 'Employee Management System',
			description:
				'Employee management is the process by which employers ensure workers perform their jobs to the best of their abilities so as to achieve business goals. It typically entails building and maintaining healthy relationships with employees, as well as monitoring',
			icon: 'Users',
			iconColor: 'from-green-500/10 text-green-500 fill-green-500/10',
			tag: 'Management',
			views: 179,
			avatars: [
				'/assets/images/avatar/user-15.png',
				'/assets/images/avatar/user-16.png',
				'/assets/images/avatar/user-17.png',
				'/assets/images/avatar/user-18.png',
				'/assets/images/avatar/user-22.png'
			]
		},
		{
			title: 'Create Business Website',
			description:
				'If all you need is a basic one-page website with an email address, phone number and maybe your business address, you can absolutely do that yourself. There are many website builders and one-page templates you can use to get up and running quickly.',
			icon: 'Globe',
			iconColor: 'from-purple-500/10 text-purple-500 fill-purple-500/10',
			tag: 'Design',
			views: 132,
			avatars: ['/assets/images/avatar/user-10.png']
		},
		{
			title: 'Contact Page Prototype',
			description:
				'A contact page prototype is a draft of a contact page. It can be used to test the design and functionality of the page before it is launched. There are many different ways to create a contact page prototype. Some popular methods include using a wireframe tool, a prototyping tool, or a content management system.',
			icon: 'Users',
			iconColor: 'from-primary-500/10 text-primary-500 fill-primary-500/10',
			tag: 'Figma',
			views: 163,
			avatars: [
				'/assets/images/avatar/user-20.png',
				'/assets/images/avatar/user-19.png',
				'/assets/images/avatar/user-22.png',
				'/assets/images/avatar/user-23.png'
			]
		},
		{
			title: 'Design System - Create Components',
			description:
				'A design system defines reusable components and their usage, and explains why and when designers should choose a component. This helps designers and developers learn design concepts and best practices for different components.',
			icon: 'Ruler',
			iconColor: 'from-red-500/10 text-red-500 fill-red-500/10',
			tag: 'Components',
			views: 245,
			avatars: ['/assets/images/avatar/user-10.png', '/assets/images/avatar/user-14.png']
		}
	];
</script>

<User variant="projects" />

<h5 class="text-16 mt-4 mb-5">Projects</h5>

<Grid cols={1} gapX={5} class="md:grid-cols-2 xl:grid-cols-3">
	{#each projects as project}
		<ProjectCard {project} />
	{/each}
</Grid>

<Grid cols={12} gap={5} class="mb-5 items-center gap-5">
	<Col cols={{ span: 12 }} lg={{ span: 5 }} class="flex flex-wrap justify-center lg:justify-start">
		<p class="dark:text-dark-500 text-gray-500">Showing <b>8</b> of <b>76</b> Results</p>
	</Col>
	<div class="col-span-12 lg:col-span-7">
		<div class="pagination pagination-primary flex justify-center lg:justify-end">
			<Pagination
				paginationConfig={{
					currentPage: 1,
					itemsPerPage: 5,
					totalItems: 50
				}}
			/>
		</div>
	</div>
</Grid>
