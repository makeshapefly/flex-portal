<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import User from '$lib/components/common/User.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Pagination from '$lib/components/ui/pagination/Pagination.svelte';

	let users = [
		{
			id: 1,
			name: 'Christina Williams',
			email: 'christina@example.com',
			phone: '+(546) 01234 567 89',
			img: 'assets/images/avatar/user-13.png',
			isFollowing: false,
			loading: false
		},
		{
			id: 2,
			name: 'Thomas Blamer',
			email: 'thomas@example.com',
			phone: '651-705-2653',
			img: 'assets/images/avatar/user-14.png',
			isFollowing: true,
			loading: false
		},
		{
			id: 3,
			name: 'Patricia Graham',
			email: 'pg@example.com',
			phone: '704-316-0398',
			img: 'assets/images/avatar/user-15.png',
			isFollowing: true,
			loading: false
		},
		{
			id: 4,
			name: 'Patricia Graham',
			email: 'patricia@example.com',
			phone: '952-542-3403',
			img: 'assets/images/avatar/user-19.png',
			isFollowing: false,
			loading: false
		},
		{
			id: 5,
			name: 'Joseph Obrien',
			email: 'josepho@example.com',
			phone: '907-675-5342',
			img: 'assets/images/avatar/user-20.png',
			isFollowing: false,
			loading: false
		},
		{
			id: 6,
			name: 'Edward Chapman',
			email: 'edward@example.com',
			phone: '267-645-5685',
			img: 'assets/images/avatar/user-45.png',
			isFollowing: true,
			loading: false
		},
		{
			id: 7,
			name: 'Annie Akins',
			email: 'annie@example.com',
			phone: '812-278-7277',
			img: 'assets/images/avatar/user-38.png',
			isFollowing: true,
			loading: false
		},
		{
			id: 8,
			name: 'Gena Kelly',
			email: 'kelly@example.com',
			phone: '713-229-0339',
			img: 'assets/images/avatar/user-35.png',
			isFollowing: false,
			loading: false
		}
	];

	const toggleFollow = (
		/** @type {{ id?: number; name?: string; email?: string; phone?: string; img?: string; isFollowing: any; loading: any; }} */ user
	) => {
		user.loading = true;
		setTimeout(() => {
			user.isFollowing = !user.isFollowing;
			user.loading = false;
		}, 2000);
	};
</script>

<User variant="followers" />

<Grid cols={1} gapX={5} class="mt-5 lg:grid-cols-2">
	{#each users as user}
		<div class="card">
			<div class="card-body flex flex-wrap items-center gap-3">
				<div class="shrink-0">
					<img src={user.img} alt="" class="size-20 rounded-md" />
				</div>
				<div class="grow">
					<h6 class="mb-1">{user.name}</h6>
					<div class="mb-3 flex flex-wrap items-center gap-4">
						<p class="dark:text-dark-500 text-gray-500">
							<LucideIcon name="Mail" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
							<a href={`mailto:${user.email}`} class="align-middle whitespace-nowrap">
								{user.email}
							</a>
						</p>
						<p class="dark:text-dark-500 text-gray-500">
							<LucideIcon name="Phone" class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
							<span class="align-middle whitespace-nowrap">{user.phone}</span>
						</p>
					</div>
					<a href="/pages-user" class="text-primary-500">
						View More
						<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
					</a>
				</div>
				<div>
					<button
						on:click={() => toggleFollow(user)}
						class="btn btn-sub-gray btn-icon-text"
						disabled={user.loading}
					>
						{#if user.loading}
							<svg
								class="size-4 animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-0"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						{:else if user.isFollowing}
							<span class="flex items-center gap-2">
								<i class="ri-user-unfollow-line"></i> UnFollow
							</span>
						{:else}
							<span class="flex items-center gap-2">
								<i class="ri-user-add-line"></i> Follow
							</span>
						{/if}
					</button>
				</div>
			</div>
		</div>
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
