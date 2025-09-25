<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	export let name;
	export let image;
	export let location;
	export let specialization;
	export let rating;
</script>

<div class="card relative overflow-hidden transition duration-300 ease-linear hover:-translate-y-2">
	<span
		class="badge badge-sub-orange text-13 absolute top-6 rounded-sm px-5 py-1.5 ltr:-left-0.5 rtl:-right-0.5"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="inline-block size-3 ltr:mr-1 rtl:ml-1"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
			/>
		</svg>
		{rating}
	</span>

	<div class="p-8">
		<div
			class="dark:shadow-dark-800 dark:ring-offset-dark-900 mx-auto mt-6 size-24 overflow-hidden rounded-full shadow-lg ring-1 shadow-slate-200 ring-sky-500/20 ring-offset-2"
		>
			<img src={image} alt={name} />
		</div>
		<div class="mt-5 text-center">
			<h6 class="mb-1">
				<a href="#!" class="link link-sky text-slate-800">{name}</a>
			</h6>
			<p class="dark:text-dark-500 mb-3 text-gray-500">{location}</p>
			<span class="badge badge-sky text-13 min-w-32 rounded-sm">{specialization}</span>
		</div>
	</div>

	<div class="dark:border-dark-800 grid grid-cols-2 border-t border-gray-200">
		<div class="p-4 text-center">
			<a href="#!" class="link link-sky">
				<LucideIcon name="CalendarRange" class="mb-0.5 inline-block size-4 ltr:mr-1 rtl:ml-1" />
				Availability
			</a>
		</div>
		<div class="dark:border-dark-800 border-l border-gray-200 p-4 text-center">
			<a href="#!" class="link link-sky">
				<LucideIcon name="Phone" class="mb-0.5 inline-block size-4 ltr:mr-1 rtl:ml-1" />
				Book Now
			</a>
		</div>
	</div>
</div>
