<script lang="ts">
	import CodeHighLighter from '$lib/components/common/CodeHighLighter.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import { ticketsData } from './help';

	interface Ticket {
		id: string;
		time: string;
		title: string;
		description: string;
		author: string;
		avatar: string;
		tags: string[];
		comments: number;
		status: string;
	}

	interface TicketForm {
		title: string;
		projectName: string;
		description: string;
		keywords: string[];
		assignedTo: string;
		phone: string;
	}

	// Interface for reply
	interface Reply {
		user: string;
		message: string;
	}

	let filteredTickets: Ticket[] = [];
	let searchQuery = '';
	let selectedCategory = 'Getting Started';
	let selectedStatus = 'All';
	let ticketDetails: Ticket | null = null;
	let showTicketDetailsModal = false;
	let replyMessages: Reply[] = [];
	let newMessage: string = '';
	let showList = true;

	// Categories for ticket filtering
	const categories = [...new Set(ticketsData.map((item) => item.category))];

	// Function to filter tickets based on query, category, and status
	function filterTickets() {
		filteredTickets = ticketsData.flatMap((categoryData) => {
			return categoryData.tickets.filter((ticket) => {
				const statusMatch = selectedStatus === 'All' || ticket.status === selectedStatus;
				const categoryMatch = selectedCategory === categoryData.category;
				const searchMatch =
					ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					ticket.description.toLowerCase().includes(searchQuery.toLowerCase());

				return statusMatch && categoryMatch && searchMatch;
			});
		});
	}

	// Function to change the selected category
	const changeCategory = (category: string) => {
		selectedCategory = category;
		filterTickets();
	};

	// Function to change the selected status
	const changeValue = (status: string) => {
		selectedStatus = status;
		filterTickets();
	};

	// Open the ticket details in a modal and hide the list
	const openTicketDetails = (ticket: Ticket) => {
		ticketDetails = ticket;
		showTicketDetailsModal = true;
		showList = false;
	};

	// Close the ticket details modal and show the list again
	const closeTicketDetailsModal = () => {
		showTicketDetailsModal = false;
		ticketDetails = null;
		showList = true;
	};

	// Add a new reply
	const addMessage = () => {
		if (newMessage.trim()) {
			replyMessages = [...replyMessages, { user: 'You', message: newMessage }];
			newMessage = '';
		}
	};

	let ticketForm: TicketForm = {
		title: '',
		projectName: '',
		description: '',
		keywords: [],
		assignedTo: '',
		phone: ''
	};

	let errors: { [key: string]: string } = {};

	// Validation function
	function validateField(fieldName: string, fieldValue: any, errorMessage: string) {
		if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	}

	// Validate the entire form
	function validateForm() {
		errors = {}; // Reset errors
		validateField('title', ticketForm.title, 'Title is required.');
		validateField('description', ticketForm.description, 'Description is required.');
		validateField('projectName', ticketForm.projectName, 'Project Name is required.');
		validateField('keywords', ticketForm.keywords, 'Keywords are required.');
		validateField('assignedTo', ticketForm.assignedTo, 'Assignees are required.');
		validateField('phone', ticketForm.phone, 'Phone number is required.');

		// Return true if no errors exist
		return Object.keys(errors).length === 0;
	}

	let formStatusMessage: string = '';

	// Submit function
	function submitForm() {
		if (validateForm()) {
			// Simulate new ticket data (you can replace it with actual form data)
			const tags = ticketForm.keywords.split(' ');
			const newTicket: Ticket = {
				id: Math.random().toString(36).substr(2, 9), // Random ID for the ticket
				time: new Date().toISOString(),
				title: ticketForm.title,
				description: ticketForm.description,
				author: 'You',
				avatar: '/assets/images/avatar/user-1.png', // Add a placeholder avatar if needed
				tags: tags,
				comments: 0,
				status: 'New'
			};

			// Add the new ticket to the top of the filteredTickets array
			filteredTickets = [newTicket, ...filteredTickets];

			// Reset the form and validation errors
			ticketForm = {
				title: '',
				projectName: '',
				description: '',
				keywords: [],
				assignedTo: '',
				phone: ''
			};
			errors = {};
			formStatusMessage = 'Form submitted successfully!';
		} else {
			formStatusMessage = 'Form validation failed. Please check the errors and try again.';
		}
	}

	// let activeTab = 'All';
	const tabs = [
		{ label: 'All Tickets', value: 'All' },
		{ label: 'Active', value: 'Active' },
		{ label: 'Closed', value: 'Closed' },
		{ label: 'Deleted', value: 'Deleted' }
	];

	// Trigger the filtering whenever the search query, category, or status changes
	$: filterTickets();
</script>

<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} xl={{ span: 4 }} class="2xl:col-span-3">
		<Card>
			<CardBody>
				<h6>Search for a Question</h6>
				<p class="dark:text-dark-500 mb-3 text-gray-500">Type your question or search keyword</p>
				<div class="group/form relative">
					<input
						type="text"
						id="iconWithInput"
						bind:value={searchQuery}
						on:input={filterTickets}
						class="form-input ltr:pl-9 ltr:group-[&.right]/form:pr-9 ltr:group-[&.right]/form:pl-4 rtl:pr-9 rtl:group-[&.right]/form:pr-4 rtl:group-[&.right]/form:pl-9"
						placeholder="Start typing ..."
					/>
					<button
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 ltr:group-[&.right]/form:right-3 ltr:group-[&.right]/form:left-auto rtl:right-3 rtl:group-[&.right]/form:right-auto rtl:group-[&.right]/form:left-3"
					>
						<LucideIcon name="Search" class="size-4" />
					</button>
				</div>
				<Simplebar class="h-auto lg:h-[calc(100vh_-_28rem)]">
					<ul class="my-5 space-y-3 px-1">
						{#each categories as category}
							<li>
								<a
									href="#!"
									class={`dark:outline-dark-800 hover:text-primary-500 dark:hover:text-primary-500 [&.active]:bg-primary-500/10 [&.active]:text-primary-500 [&.active]:!outline-primary-500/20 block rounded-md px-4 py-2 text-sm font-medium outline-1
                    outline-offset-2 outline-gray-200
                    transition duration-200 ease-linear [&.active]:outline
                    ${selectedCategory === category ? 'active' : 'dark:text-dark-500 text-gray-500'}
                  `}
									on:click={() => changeCategory(category)}
									class:selected={category === selectedCategory}
								>
									{category}
								</a>
							</li>
						{/each}
					</ul>
				</Simplebar>

				<div class="bg-primary-600 relative overflow-hidden rounded-md px-4 py-3">
					<div class="absolute bottom-0 ltr:right-0 rtl:left-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="300"
							height="160"
							preserveAspectRatio="none"
							viewBox="0 0 300 160"
						>
							<g mask="url(&quot;#SvgjsMask1016&quot;)" fill="none">
								<path
									d="M161.32 191.44C190.36 168.14 173.39 56.82 222.5 55.64 271.61 54.46 310.21 119.21 344.86 121.24"
									class="stroke-primary-400/15"
									stroke-width="2"
								></path>
								<path
									d="M103.48 160.94C139.34 155.85 149.02 78.76 217.61 71.68 286.2 64.6 298.91 8.36 331.74 6.08"
									class="stroke-primary-400/15"
									stroke-width="2"
								></path>
								<path
									d="M118.76 180.58C146.95 179.59 162.2 139.63 222.03 135.17 281.86 130.71 293.38 62.42 325.3 58.37"
									class="stroke-primary-400/15"
									stroke-width="2"
								></path>
								<path
									d="M96.26 168.19C127.98 167.05 145.97 121.03 212.32 116.71 278.68 112.39 293.56 41.87 328.39 38.31"
									class="stroke-primary-400/15"
									stroke-width="2"
								></path>
								<path
									d="M50.02 170.02C76.2 169.48 99.14 134.5 148.57 134.49 198 134.48 197.84 154.49 247.12 154.49 296.39 154.49 320.53 134.59 345.67 134.49"
									class="stroke-primary-400/15"
									stroke-width="2"
								></path>
							</g>
							<defs>
								<mask id="SvgjsMask1016">
									<rect width="300" height="160" fill="#ffffff"></rect>
								</mask>
							</defs>
						</svg>
					</div>
					<h6 class="text-primary-50 mb-4">Do you still need our help ?</h6>
					<ModalTrigger
						icon="MoveRight"
						modalId="help-modal"
						text="Contact Us"
						class="group/effect bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 focus:bg-primary-600 focus:border-primary-600 btn relative flex-row-reverse text-white hover:text-white focus:text-white"
					/>
					<Modal modalId="help-modal" let:modalId size="2xl" transition="fly-top">
						<ModalBody class="p-0">
							<div>
								<div class="grid grid-cols-12">
									<div
										class="relative col-span-4 flex flex-col justify-end rounded-l-md bg-gray-50 p-8"
									>
										<img
											src="/assets/images/others/mail.png"
											alt=""
											class="absolute top-10 left-0"
										/>
										<div>
											<img src="/assets/images/main-logo.png" alt="" class="h-8" />
											<p class="mt-3 text-gray-500">
												Whether you need help with customization, troubleshooting, or general
												inquiries, don't hesitate to reach out to us.
											</p>
										</div>
									</div>
									<div class="col-span-8 p-8">
										<ModalClose {modalId} class="link link-red float-end"></ModalClose>
										<h5 class="mb-1">Feel free to connect with us.</h5>
										<p class="text-gray-500">
											Our team is here to assist you with any questions or issues you may encounter
											while using our admin template.
										</p>
										<form>
											<div class="mt-5 grid grid-cols-12 gap-5">
												<div class="col-span-6">
													<label for="firstNameInput" class="mb-2 block text-sm font-medium"
														>First Name</label
													>
													<input type="text" id="firstNameInput" class="form-input" required />
												</div>
												<!--end col-->
												<div class="col-span-6">
													<label for="lastNameInput" class="mb-2 block text-sm font-medium"
														>Last Name</label
													>
													<input type="text" id="lastNameInput" class="form-input" required />
												</div>
												<!--end col-->
												<div class="col-span-12">
													<label for="emailInput" class="mb-2 block text-sm font-medium"
														>Email</label
													>
													<input type="email" id="emailInput" class="form-input" required />
												</div>
												<!--end col-->
												<div class="col-span-12">
													<label for="phomenoInput" class="mb-2 block text-sm font-medium"
														>Phone No</label
													>
													<input type="tel" id="phomenoInput" class="form-input" required />
												</div>
												<!--end col-->
												<div class="col-span-12">
													<label for="descriptionInput" class="mb-2 block text-sm font-medium"
														>Description</label
													>
													<textarea
														name="descriptionInput"
														id="descriptionInput"
														rows="3"
														class="form-input h-auto"
														required
													></textarea>
												</div>
												<!--end col-->
												<div class="col-span-12">
													<div class="text-right">
														<button type="submit" class="btn btn-primary">Send Message</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									<!--end grid-->
								</div>
							</div>
						</ModalBody>
					</Modal>
				</div>
			</CardBody>
		</Card>
	</Col>

	<Col cols={{ span: 12 }} xl={{ span: 8 }} class="2xl:col-span-9">
		{#if showList}
			<div class="list">
				<!-- Status filter buttons -->
				<div class="mb-5 flex flex-wrap items-center gap-3">
					<ul class="tabs grow overflow-x-auto">
						{#each tabs as { label, value }}
							<li>
								<a
									href="#!"
									on:click={() => changeValue(value)}
									class={`nav-item [&.active]:text-primary-500 [&.active]:after:w-full [&.active]:after:opacity-100 ${selectedStatus == label ? 'active' : ''}`}
									class:active={selectedStatus === value}
								>
									{label}
								</a>
							</li>
						{/each}
					</ul>
					<div class="shrink-0">
						<ModalTrigger
							modalId="pencil-modal"
							icon="Pencil"
							text="New Tickets"
							color=""
							iconCss="size-10 icon h-full ms-2 p-3 ml-0"
							class="btn-sky btn btn-icon-overlay"
						/>
					</div>
				</div>
				<Simplebar class="h-[calc(100vh_-_16.8rem)]">
					<div class="flex flex-col gap-3">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						{#each filteredTickets as ticket, index (index)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div class="card !mb-0">
								<div class="card-body">
									<div class="mb-4 flex items-center gap-5">
										<h6 class="grow underline">
											<a href="#!" on:click={() => openTicketDetails(ticket)}>
												Ticket #{ticket.id}
											</a>
										</h6>
										<div class="flex shrink-0 items-center gap-4">
											<p class="dark:text-dark-500 text-sm text-gray-500">{ticket.time}</p>
											<Dropdown class="dropdown shrink-0" alignTo="right-bottom">
												<DropdownButton class="btn flex items-center gap-2 p-0">
													<i class="ri-more-2-fill"></i>
												</DropdownButton>
												<DropdownMenu class="dropdown-menu !fixed hidden p-2">
													<a
														href="#!"
														class="dropdown-item"
														on:click={() => openTicketDetails(ticket)}
													>
														<span>Reply Task</span>
													</a>

													<a href="#!" class="dropdown-item">
														<span>More Details</span>
													</a>
												</DropdownMenu>
											</Dropdown>
										</div>
									</div>
									<h6 class="mb-1"><a href="#!">{ticket.title}</a></h6>
									<p class="dark:text-dark-500 line-clamp-2 text-gray-500">{ticket.description}</p>
									<div class="mt-5 flex flex-wrap items-center gap-4">
										<div class="flex grow items-center gap-2">
											<img src={ticket.avatar} alt="" class="size-8 shrink-0 rounded-full" />
											<h6>{ticket.author}</h6>
										</div>
										<div class="shrink-0">
											{#each ticket.tags as tag}
												<a
													href="#!"
													class="dark:text-dark-500 hover:text-primary-500 dark:hover:text-primary-500 p-1 text-gray-500 transition duration-200 ease-linear"
													>{tag}</a
												>
											{/each}
										</div>
										<div class="shrink-0">
											<a
												href="#!"
												class="dark:text-dark-500 hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 transition duration-200 ease-linear"
											>
												<i class="ri-chat-3-line inline-block size-5 align-middle"></i>
												{ticket.comments}
											</a>
										</div>
									</div>
								</div>
							</div>
						{/each}

						{#if filteredTickets.length === 0}
							<TableRowNotFound />
						{/if}
					</div>
				</Simplebar>
			</div>
		{/if}

		{#if showTicketDetailsModal}
			<div class="mb-4 flex items-center gap-5">
				<div class="grow">
					<h5 class="mb-1"><a href="#!">Ticket # {ticketDetails?.id}</a></h5>
					<div class="flex items-center gap-3">
						<span class="dark:text-dark-500 text-gray-500">
							<LucideIcon name="UserRound" class="mr-1 inline-block size-4" />
							<a href="#!" class="dark:text-dark-500 text-gray-500">{ticketDetails?.author}</a>
						</span>
						<span class="dark:text-dark-500 text-gray-500"
							><LucideIcon name="Calendar" class="mr-1 inline-block size-4" />
							{ticketDetails?.time}</span
						>
						<span class="badge badge-sub-green">{ticketDetails?.status}</span>
					</div>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<p
						class="dark:text-dark-500 cursor-pointer text-gray-500"
						on:click={closeTicketDetailsModal}
					>
						Close
					</p>
				</div>
			</div>

			<div class="card">
				<Simplebar class="h-[calc(100vh_-_17rem)]">
					<div class="space-y-4 p-5">
						<div>
							<h5 class="mb-1">{ticketDetails?.title}</h5>
							<p class="dark:text-dark-500 text-gray-500">{ticketDetails?.description}</p>
						</div>

						<div class="flex gap-2">
							<img src={ticketDetails?.avatar} alt="" class="size-10 rounded-md" />
							<div class="space-y-2">
								<!-- Add more details as needed -->
								<p class="dark:text-dark-500 text-gray-500">
									To enable dark mode in Tailwind CSS, update your <span class="text-pink-500"
										>tailwind.config.js</span
									>
									file with the <span class="text-pink-500">darkMode</span> option. You can choose
									between two different dark mode strategies:
									<span class="text-pink-500">[data-mode="dark"]</span>
									or <span class="text-pink-500">class</span>.
								</p>
								<p class="dark:text-dark-500 text-gray-500">
									Using <span class="text-pink-500">[data-mode="dark"]</span>, the dark mode is
									enabled based on the user's operating system preference:
								</p>
								<CodeHighLighter
									code={`module.exports = {
    darkMode: ['[data-mode="dark"]'],
    // ...
}`}
								/>
								<p class="dark:text-dark-500 text-gray-500">
									Using <span class="text-pink-500">class</span>, the dark mode is enabled by adding
									a <span class="text-pink-500">.dark</span> class to an ancestor element of your components:
								</p>
								<CodeHighLighter
									code={`module.exports = {
    darkMode: ['class'],
    // ...
}`}
								/>
								<p class="dark:text-dark-500 text-gray-500">
									To apply styles for dark mode, simply prefix your utility classes with <span
										class="text-pink-500">dark:</span
									> followed by the desired state variant, if any.
								</p>
								<p class="dark:text-dark-500 text-gray-500">
									For example, if you want to change the background color of an element in dark
									mode, you can use the following code:
								</p>
								<CodeHighLighter
									code={`<div class="bg-white dark:bg-gray-800">
    <-- Your content here -->
</div>`}
								/>
							</div>
						</div>
					</div>

					{#each replyMessages as reply}
						<div class="flex gap-2 p-5">
							<img src="/assets/images/avatar/user-17.png" alt="" class="size-10 rounded-md" />
							<!-- Replace with actual avatar -->
							<div class="space-y-2">
								<p class="dark:text-dark-500 text-gray-500">{reply.message}</p>
							</div>
						</div>
					{/each}

					<form on:submit|preventDefault={addMessage} class="p-5 pt-0">
						<h5 class="mb-2">Comment</h5>

						<div class="grid grid-cols-12 gap-5">
							<div class="col-span-12">
								<div class="mb-5">
									<label for="textareaInput" class="mb-2 block text-sm">Your Reply</label>
									<textarea
										id="textareaInput"
										rows="3"
										bind:value={newMessage}
										class="form-input h-auto"
										placeholder="Enter your reply..."
									></textarea>
								</div>
								<div class="ltr:text-right rtl:text-left">
									<button class="btn btn-primary"
										>Reply Now <LucideIcon
											name="MoveRight"
											class="ml-1 inline-block size-4"
										/></button
									>
								</div>
							</div>
						</div>
					</form>
				</Simplebar>
			</div>
		{/if}
	</Col>
</Grid>

<Modal modalId="pencil-modal" let:modalId size="2xl">
	<ModalHeader {modalId}>
		<h6>Create New Ticket</h6>
	</ModalHeader>
	<ModalBody>
		<div class="grid grid-cols-12 gap-5">
			<!-- Task Title -->
			<div class="col-span-6">
				<label for="taskTitleInput" class="mb-2 block text-sm font-medium">Task Title</label>
				<input
					type="text"
					id="taskTitleInput"
					class="form-input"
					bind:value={ticketForm.title}
					on:input={() => validateField('title', ticketForm.title, 'Title is required.')}
				/>
				{#if errors.title}
					<span class="text-red-500">{errors.title}</span>
				{/if}
			</div>

			<!-- Project Name -->
			<div class="col-span-6">
				<label for="projectNameInput" class="mb-2 block text-sm font-medium">Project Name</label>
				<input
					type="text"
					id="projectNameInput"
					class="form-input"
					bind:value={ticketForm.projectName}
					on:input={() =>
						validateField('projectName', ticketForm.projectName, 'Project Name is required.')}
				/>
				{#if errors.projectName}
					<span class="text-red-500">{errors.projectName}</span>
				{/if}
			</div>

			<!-- Description -->
			<div class="col-span-12">
				<label for="descriptionInput" class="mb-2 block text-sm font-medium">Description</label>
				<textarea
					id="descriptionInput"
					rows="3"
					class="form-input h-auto"
					bind:value={ticketForm.description}
					on:input={() =>
						validateField('description', ticketForm.description, 'Description is required.')}
				></textarea>
				{#if errors.description}
					<span class="text-red-500">{errors.description}</span>
				{/if}
			</div>

			<!-- Keywords -->
			<div class="col-span-6">
				<label for="keywordsInput" class="mb-2 block text-sm font-medium">Keywords</label>
				<input
					type="text"
					id="keywordsInput"
					class="form-input"
					bind:value={ticketForm.keywords}
					on:input={() => validateField('keywords', ticketForm.keywords, 'Keywords are required.')}
				/>
				{#if errors.keywords}
					<span class="text-red-500">{errors.keywords}</span>
				{/if}
			</div>

			<!-- Assigned To -->
			<div class="col-span-6">
				<label for="assignedToSelect" class="mb-2 block text-sm font-medium">Assigned To</label>
				<select
					id="assignedToSelect"
					class="form-input"
					bind:value={ticketForm.assignedTo}
					on:change={() =>
						validateField('assignedTo', ticketForm.assignedTo, 'Assignees are required.')}
				>
					<option value="">Select</option>
					<option value="John">John</option>
					<option value="Jane">Jane</option>
				</select>
				{#if errors.assignedTo}
					<span class="text-red-500">{errors.assignedTo}</span>
				{/if}
			</div>

			<!-- Phone Number -->
			<div class="col-span-12">
				<label for="phoneInput" class="mb-2 block text-sm font-medium">Phone No</label>
				<input
					type="tel"
					id="phoneInput"
					class="form-input"
					bind:value={ticketForm.phone}
					on:input={() => validateField('phone', ticketForm.phone, 'Phone number is required.')}
				/>
				{#if errors.phone}
					<span class="text-red-500">{errors.phone}</span>
				{/if}
			</div>

			<!-- Submit Button -->
			<div class="col-span-12">
				<div class="text-right">
					<button class="btn btn-primary" on:click={submitForm}>Send Message</button>
				</div>
			</div>
		</div>
	</ModalBody>
</Modal>
