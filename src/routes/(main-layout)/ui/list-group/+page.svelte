<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ListGroup from '$lib/components/ui/list-group/ListGroup.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	let features = [
		'Build functional APIs with zero coding.',
		'Resources with permissions.',
		'Built-in user authentication.',
		'Easy integration with existing apps and tools.'
	];

	let records = [
		{
			title: 'Item 1',
			description: 'Description for Item 1',
			status: 'Active',
			statusColor: 'text-green-500'
		},
		{
			title: 'Item 2',
			description: 'Description for Item 2',
			status: 'Inactive',
			statusColor: 'text-red-500'
		},
		{
			title: 'Item 3',
			description: 'Description for Item 3',
			status: 'Pending',
			statusColor: 'text-yellow-500'
		}
	];

	let users = [
		{ name: 'Emily Jones', points: 1234, avatar: '/assets/images/avatar/user-11.png' },
		{ name: 'David Lee', points: 987, avatar: '/assets/images/avatar/user-12.png' },
		{ name: 'Sophia Williams', points: 876, avatar: '/assets/images/avatar/user-13.png' },
		{ name: 'Michael Chen', points: 765, avatar: '/assets/images/avatar/user-14.png' },
		{ name: 'Mia Davis', points: 654, avatar: '/assets/images/avatar/user-15.png' }
	];
</script>

<PageHeading title="List Group" sub_title="UI" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Basic List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup>
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Disc List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="disc">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Number List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="decimal">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Square List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="square">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Roman Uper List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="roman">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Circle List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="circle">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Disc color List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="disc" listStyle="marker:text-primary-500">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Marker color List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="circle" listStyle="marker:text-green-500">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Number color List</CardTitle>
		</CardHeader>
		<CardBody>
			<ListGroup type="disc" listStyle="marker:text-purple-500">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ListGroup>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Image List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul
				class="flex list-inside list-image-[url('/assets/images/others/arrow-right.png')] flex-col gap-2"
			>
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Flush List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul class="dark:*:border-dark-800 flex flex-col *:border-b *:border-gray-200 *:p-2">
				{#each features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Border List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul
				class="dark:*:border-dark-800 flex flex-col *:border *:border-b-0 *:border-gray-200 *:p-2"
			>
				{#each features as item, index}
					<li
						class="[&.active]:bg-primary-500 [&.active]:border-primary-500 last:border-b [&.active]:text-white"
						class:active={index === 1}
					>
						{item}
					</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Hovered List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul class="dark:*:border-dark-800 flex flex-col *:border-b *:border-gray-200 *:p-2">
				{#each features as text}
					<li class="dark:hover:bg-dark-850 transition duration-200 ease-linear hover:bg-gray-100">
						{text}
					</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Link List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul class="dark:*:border-dark-800 flex flex-col *:border-b *:border-gray-200">
				{#each features as item}
					<li class="dark:hover:bg-dark-850 transition duration-200 ease-linear hover:bg-gray-100">
						<a href="#!" class="block p-2">{item}</a>
					</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Checkbox List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul class="dark:*:border-dark-800 flex flex-col *:border-b *:border-gray-200 *:p-2">
				{#each features as option, index}
					<li>
						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								id="checkboxList{index}"
								name="checkboxListGroup"
								class="checked:bg-primary-500 checked:border-primary-500 size-5 flex-shrink-0 cursor-pointer appearance-none rounded border"
							/>
							<label for="checkboxList{index}" class="cursor-pointer select-none">{option}</label>
						</div>
					</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Radio List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul class="dark:*:border-dark-800 flex flex-col *:border-b *:border-gray-200 *:p-2">
				{#each features as choice, index}
					<li>
						<div class="flex items-center gap-2">
							<input
								type="radio"
								id="radioList{index}"
								name="radioListGroup"
								class="checked:bg-primary-500 checked:border-primary-500 size-5 flex-shrink-0 cursor-pointer appearance-none rounded-full border"
							/>
							<label for="radioList{index}" class="cursor-pointer select-none">{choice}</label>
						</div>
					</li>
				{/each}
			</ul>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} class="card">
		<CardHeader>
			<CardTitle>Boxed List</CardTitle>
		</CardHeader>
		<CardBody>
			<ul
				class="dark:*:border-dark-800 flex flex-col gap-2 *:rounded-md *:border *:border-gray-200 *:p-2"
			>
				{#each features as item, index}
					<li class:active={index === 1}>
						{item}
					</li>
				{/each}
			</ul>
		</CardBody>
	</Col>
</Grid>

<Col col={{ span: 12 }} class="card">
	<CardHeader>
		<CardTitle>Content List</CardTitle>
	</CardHeader>

	<CardBody>
		<Grid cols={12} gap={5}>
			<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
				<ul class="dark:border-dark-800 overflow-hidden border border-gray-200 sm:rounded-md">
					{#each records as record, index}
						<li class={index !== 0 ? 'dark:border-dark-800 border-t border-gray-200' : ''}>
							<div class="p-5">
								<div class="flex items-center justify-between">
									<h6>{record.title}</h6>
									<p class="dark:text-dark-500 mt-1 max-w-2xl text-sm text-gray-500">
										{record.description}
									</p>
								</div>
								<div class="mt-3 flex items-center justify-between">
									<p class="dark:text-dark-500 text-sm font-medium text-gray-500">
										Status: <span class={record.statusColor}>{record.status}</span>
									</p>
									<!-- svelte-ignore a11y-invalid-attribute -->
									<a href="#" class="text-primary-500 hover:text-primary-500 font-medium">Edit</a>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</Col>

			<Col col={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
				<div class="dark:border-dark-800 overflow-hidden rounded-md border border-gray-200">
					<div class="dark:border-dark-800 border-b border-gray-200 px-4 py-2">
						<h6>Top Users</h6>
					</div>
					<ul class="dark:divide-dark-800 divide-y divide-gray-200">
						{#each users as user}
							<li class="flex items-center gap-3 px-6 py-4">
								<img
									class="size-10 shrink-0 rounded-full object-cover"
									src={user.avatar}
									alt={user.name}
								/>
								<div class="grow">
									<h6>{user.name}</h6>
									<p class="dark:text-dark-500 text-gray-500">{user.points} points</p>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</Col>
		</Grid>
	</CardBody>
</Col>
