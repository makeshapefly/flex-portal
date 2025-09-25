<script lang="ts">
	import ApexChart from '$lib/components/common/ApexChart.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { options as invitationChart } from './invitation-chart';
	import { options as ticketChart } from './ticket-chart';
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="2xl:col-span-9">
	<Card>
		<CardHeader>
			<CardTitle>Event Details</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="mb-5">
				<img
					src="/assets/images/event/overview.jpg"
					alt=""
					class="h-72 w-full rounded-md object-cover"
				/>
			</div>
			<div class="mb-5 flex flex-wrap gap-3">
				<div
					class="mb-2.5 flex size-16 flex-col items-center justify-center rounded-md border border-red-200 bg-red-100 text-red-500"
				>
					<p class="mb-0.5">Fri</p>
					<h3 class="leading-none">20</h3>
				</div>
				<div class="grow">
					<h6 class="mb-1.5">Annual Music Festival!</h6>
					<p class="dark:text-dark-500 mb-4 text-gray-500">
						<span>20 Dec 2024</span><span
							class="dark:border-dark-800 border-gray-200 ltr:ml-1.5 ltr:border-l ltr:pl-2 rtl:mr-1.5 rtl:border-r rtl:pr-2"
							>Sydney, Australia</span
						>
					</p>

					<p class="dark:text-dark-500 mb-2 text-gray-500">Contributors & Sponsors</p>
					<div class="flex grow">
						<div class="transition duration-300 ease-linear hover:-translate-y-1">
							<img
								class="dark:border-dark-800 size-8 rounded-full border-2 border-white"
								alt=""
								src="/assets/images/avatar/user-5.png"
							/>
						</div>
						<div class="transition duration-300 ease-linear hover:-translate-y-1">
							<img
								class="dark:border-dark-800 size-8 rounded-full border-2 border-white"
								alt=""
								src="/assets/images/avatar/user-20.png"
							/>
						</div>
						<div class="transition duration-300 ease-linear hover:-translate-y-1">
							<img
								class="dark:border-dark-800 size-8 rounded-full border-2 border-white"
								alt=""
								src="/assets/images/avatar/user-13.png"
							/>
						</div>
						<div class="transition duration-300 ease-linear hover:-translate-y-1">
							<img
								class="dark:border-dark-800 size-8 rounded-full border-2 border-white"
								alt=""
								src="/assets/images/avatar/user-14.png"
							/>
						</div>
						<div class="transition duration-300 ease-linear hover:-translate-y-1">
							<img
								class="dark:border-dark-800 size-8 rounded-full border-2 border-white"
								alt=""
								src="/assets/images/avatar/user-15.png"
							/>
						</div>
						<div class="transition duration-300 ease-linear hover:-translate-y-1">
							<img
								class="dark:border-dark-800 size-8 rounded-full border-2 border-white"
								alt=""
								src="/assets/images/avatar/user-18.png"
							/>
						</div>
					</div>
				</div>
				<div class="shrink-0">
					<button class="btn btn-red" data-modal-target="bookEventModal"
						>Book Now <LucideIcon
							name="TicketMinus"
							class="inline-block size-5 ltr:ml-1 rtl:mr-1"
						/></button
					>
				</div>
			</div>
			<p class="dark:text-dark-500 mb-3 text-gray-500">
				Join us for an unforgettable experience filled with live performances, vibrant energy, and a
				celebration of music and culture. This year, we're bringing together some of the biggest
				names in the industry, alongside emerging artists, to create a diverse and dynamic lineup
				that promises to entertain and inspire.
			</p>
			<h6 class="mb-3">Event Highlights:</h6>
			<ul
				class="dark:text-dark-500 mb-4 list-inside list-disc space-y-3 text-gray-500 marker:text-green-500"
			>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Live Performances:</span> Enjoy non-stop
					music from top artists across multiple stages.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Food and Drinks:</span> Savor delicious
					cuisine and refreshing beverages from local vendors.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Workshops and Activities:</span>
					Participate in interactive workshops and activities for all ages.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Merchandise:</span> Get your hands
					on exclusive festival merchandise and memorabilia.
				</li>
			</ul>
			<h6 class="mb-3">Details:</h6>
			<ul
				class="dark:text-dark-500 mb-4 list-inside list-disc space-y-3 text-gray-500 marker:text-green-500"
			>
				<li><span class="dark:text-dark-50 font-medium text-gray-800">Date:</span> 20 Dec 2024</li>
				<li><span class="dark:text-dark-50 font-medium text-gray-800">Time:</span> 2:30 pm</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Location:</span> Sydney, Australia
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Tickets Price:</span> $599.00
				</li>
			</ul>
			<h6 class="mb-3">Additional Information:</h6>
			<ul
				class="dark:text-dark-500 mb-4 list-inside list-disc space-y-3 text-gray-500 marker:text-green-500"
			>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Parking:</span> On-site parking available
					with a shuttle service to the festival grounds.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Accommodations:</span> Partner hotels
					offering special festival rates for attendees. Check our website for more details.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Accessibility:</span> The event is
					fully accessible with dedicated areas for wheelchair users and assistance for those with disabilities.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Safety Measures:</span> We prioritize
					your safety with on-site medical facilities, security personnel, and clear signage throughout
					the venue.
				</li>
			</ul>
			<h6 class="mb-3">How to Prepare:</h6>
			<ul
				class="dark:text-dark-500 mb-4 list-inside list-disc space-y-3 text-gray-500 marker:text-green-500"
			>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Plan Ahead:</span> Check the schedule
					and plan which performances you want to catch.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Stay Hydrated:</span> Bring a reusable
					water bottle and stay hydrated throughout the event.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Dress Comfortably:</span> Wear comfortable
					clothing and shoes suitable for outdoor activities.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Stay Connected:</span> Follow us
					on social media for live updates and announcements.
				</li>
			</ul>
			<h6 class="mb-1">Sustainability Initiatives:</h6>
			<p class="dark:text-dark-500 mb-3 text-gray-500">
				We are committed to making this festival environmentally friendly:
			</p>
			<ul
				class="dark:text-dark-500 mb-4 list-inside list-disc space-y-3 text-gray-500 marker:text-green-500"
			>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Recycling Stations:</span> Easily
					accessible recycling bins throughout the venue.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Eco-friendly Products:</span> Encouraging
					the use of biodegradable and recyclable materials by our vendors.
				</li>
				<li>
					<span class="dark:text-dark-50 font-medium text-gray-800">Green Transportation:</span> Promoting
					the use of public transport, biking, and carpooling to reduce the festival’s carbon footprint.
				</li>
			</ul>
			<p class="dark:text-dark-500 mb-2 text-gray-500">
				Don’t miss out on the music event of the year! Gather your friends and family and come
				create lasting memories with us.
			</p>
			<h6 class="mb-2">Get your tickets now and be part of the magic!</h6>
			<p class="dark:text-dark-500 text-gray-500">
				For more information, visit our website or contact us at SRBThemes. We can’t wait to see you
				there!
			</p>
		</CardBody>
	</Card>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 4 }} class="2xl:col-span-3">
	<button type="button" class="btn btn-primary w-full"
		><LucideIcon name="Pencil" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Edit Event</button
	>
	<Card class="mt-5">
		<CardHeader>
			<CardTitle>Invitation Status</CardTitle>
		</CardHeader>
		<CardBody>
			<div>
				<ApexChart
					class="!min-h-full"
					colors={['bg-pink-500', 'bg-primary-500']}
					options={invitationChart}
				/>
			</div>

			<div
				class="dark:divide-dark-800 grid grid-cols-2 divide-x divide-gray-200 rtl:divide-x-reverse"
			>
				<div class="p-3 text-center">
					<h6 class="mb-1">1800</h6>
					<p class="dark:text-dark-500 text-gray-500">Sent</p>
				</div>
				<div class="p-3 text-center">
					<h6 class="mb-1">1593</h6>
					<p class="dark:text-dark-500 text-gray-500">Accept</p>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader class="flex items-center">
			<h6 class="card-title grow">Ticket Sale</h6>
			<Dropdown class="dropdown">
				<DropdownButton
					class="dark:border-dark-800 link link-red btn flex border-gray-200 px-2 py-1 text-xs"
					isChevron={true}
				>
					This Week
				</DropdownButton>
				<DropdownMenu class="dropdown-menu !fixed hidden p-2">
					<a href="#!" class="dropdown-item"> This Week </a>

					<a href="#!" class="dropdown-item"> This Month </a>
					<a href="#!" class="dropdown-item"> This Years </a>
				</DropdownMenu>
			</Dropdown>
		</CardHeader>
		<CardBody>
			<div>
				<ApexChart class="!min-h-full" colors={['bg-primary-500']} options={ticketChart} />
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Location</CardTitle>
		</CardHeader>
		<CardBody>
			<iframe
				class="aspect-4/3 w-full rounded-md border-0"
				title="video"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.7072578641!2d150.60233714782865!3d-33.847234937864414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sin!4v1716460671830!5m2!1sen!2sin"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</CardBody>
	</Card>
</Col>
