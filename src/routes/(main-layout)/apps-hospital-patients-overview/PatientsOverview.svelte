<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import { onMount } from 'svelte';
	import { ReportData } from './report';
	import { medicineData } from './medicine';
	import { appointmentsData } from './appointment';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
	import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
	import MedicineFormComponent from './MedicineFormComponent.svelte';

	interface Report {
		name: string;
		date: string;
		status: string;
		doctor: string;
	}

	interface Medicine {
		date: string;
		time: string;
		medicineName: string;
		dosage: string;
		frequency: string;
		startDate: string;
		endDate: string;
		prescribingDoctor: string;
		reasonCondition: string;
		notes: string;
	}

	interface Appointment {
		date: string;
		time: string;
		treatmentType: string;
		doctor: string;
		reasonCondition: string;
		notes: string;
		status: string;
	}

	// Pagination state
	let currentPageReport = 1;
	let reportsPerPage = 5;
	let displayedReports: Report[] = [];

	let currentPageMedicine = 1;
	let displayedMedicine: Medicine[] = [];

	let currentPageAppointment = 1;
	let displayedAppointment: Appointment[] = [];

	let sortBy: string = 'date';
	let sortDirection: 'asc' | 'desc' = 'asc';

	// Initialize data for each category
	let reports = [...ReportData];
	let medicines = [...medicineData];
	let appointments = [...appointmentsData];
	let totalPages = 1;
	let showingStart = 1;
	let showingEnd = 0;

	let reportForm = {
		reportType: '',
		date: '',
		doctor: '',
		clientDetails: '',
		impressions: '',
		recommendations: '',
		status: ''
	};

	let errors: any = {};

	// Validate the entire form
	const validateForm = () => {
		errors = {}; // Clear previous errors

		validateField('date', reportForm.date, 'Date is required.');
		validateField('reportType', reportForm.reportType, 'Report type is required.');
		validateField('recommendations', reportForm.recommendations, 'Recommendations is required.');
		validateField('doctor', reportForm.doctor, 'Doctor name is required.');
		validateField('clientDetails', reportForm.clientDetails, 'Client details are required.');
		validateField('status', reportForm.status, 'Status is required.');
		validateField('impressions', reportForm.impressions, 'Impressions are required.');

		return Object.keys(errors).length === 0;
	};

	// Validate individual fields
	const validateField = (fieldName: string, fieldValue: string, errorMessage: string) => {
		if (!fieldValue) {
			errors[fieldName] = errorMessage;
		} else {
			delete errors[fieldName];
		}
	};

	// Function to calculate the displayed reports based on pagination
	const calculatePageData = (dataType: 'report' | 'medicine' | 'appointment') => {
		let startIndex = 0;
		let endIndex = 0;
		let totalData = [];

		switch (dataType) {
			case 'report':
				startIndex = (currentPageReport - 1) * reportsPerPage;
				endIndex = startIndex + reportsPerPage;
				totalData = reports;
				displayedReports = totalData.slice(startIndex, endIndex);
				break;

			case 'medicine':
				startIndex = (currentPageMedicine - 1) * reportsPerPage;
				endIndex = startIndex + reportsPerPage;
				totalData = medicines;
				displayedMedicine = totalData.slice(startIndex, endIndex);
				break;

			case 'appointment':
				startIndex = (currentPageAppointment - 1) * reportsPerPage;
				endIndex = startIndex + reportsPerPage;
				totalData = appointments;
				displayedAppointment = totalData.slice(startIndex, endIndex);
				break;
		}

		totalPages = Math.ceil(totalData.length / reportsPerPage);
		const totalItems = totalData.length;
		showingStart = startIndex + 1;
		showingEnd = endIndex > totalItems ? totalItems : endIndex;
	};

	const sort = (column: string) => {
		if (sortBy === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = column;
			sortDirection = 'asc';
		}
		medicines = [...medicines].sort((a, b) => {
			let valueA = a[sortBy as keyof Medicine];
			let valueB = b[sortBy as keyof Medicine];

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				return sortDirection === 'asc'
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			if (typeof valueA === 'number' && typeof valueB === 'number') {
				return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
			}

			return 0;
		});

		calculatePageData('report');
		calculatePageData('medicine');
		calculatePageData('appointment');
	};

	const prevPageReport = () => {
		if (currentPageReport > 1) {
			currentPageReport--;
			calculatePageData('report');
		}
	};

	const nextPageReport = () => {
		if (currentPageReport < totalPages) {
			currentPageReport++;
			calculatePageData('report');
		}
	};

	const gotoPageReport = (page: number) => {
		currentPageReport = page;
		calculatePageData('report');
	};

	// Pagination for Medicine
	const prevPageMedicine = () => {
		if (currentPageMedicine > 1) {
			currentPageMedicine--;
			calculatePageData('medicine');
		}
	};

	const nextPageMedicine = () => {
		if (currentPageMedicine < totalPages) {
			currentPageMedicine++;
			calculatePageData('medicine');
		}
	};

	const gotoPageMedicine = (page: number) => {
		currentPageMedicine = page;
		calculatePageData('medicine');
	};

	// Pagination for Appointments
	const prevPageAppointment = () => {
		if (currentPageAppointment > 1) {
			currentPageAppointment--;
			calculatePageData('appointment');
		}
	};

	const nextPageAppointment = () => {
		if (currentPageAppointment < totalPages) {
			currentPageAppointment++;
			calculatePageData('appointment');
		}
	};

	const gotoPageAppointment = (page: number) => {
		currentPageAppointment = page;
		calculatePageData('appointment');
	};

	const submitReport = () => {
		if (validateForm()) {
			// Create a new report object based on the form values
			const newReport: Report = {
				name: reportForm.reportType,
				date: reportForm.date,
				status: reportForm.status,
				doctor: reportForm.doctor
			};

			// Add the new report to the beginning of the reports array using unshift
			reports = [newReport, ...reports];

			// Optionally, reset the form for the next entry
			reportForm = {
				reportType: '',
				date: '',
				doctor: '',
				clientDetails: '',
				impressions: '',
				recommendations: '',
				status: ''
			};

			// Recalculate the page data to include the newly added report
			calculatePageData('report');
			// Optionally, show a success message or feedback to the user
		}
	};

	onMount(() => {
		calculatePageData('report');
		calculatePageData('medicine');
		calculatePageData('appointment');
	});

	// ---- table activity --------------
	let addForm = false;
	let editMode = false;
	let selectedCustomerDetails: any | null = null;
	function openAddForm() {
		addForm = true;
		editMode = false;
		selectedCustomerDetails = null;
	}

	function openEditForm(data: any) {
		addForm = false;
		editMode = true;
		selectedCustomerDetails = data;
	}
	function getDataForDelete(data: any) {
		console.log(data);
	}
	function deleteHandler() {
		console.log('deleted');
	}
</script>

<Col cols={{ span: 12 }} class="card">
	<CardBody>
		<div class="flex flex-wrap gap-5">
			<div class="shrink">
				<img src="/assets/images/avatar/user-5.png" alt="" class="size-40 rounded-md" />
			</div>
			<div class="grow">
				<h6 class="text-16 mb-1">Alice Johnson</h6>
				<div class="overflow-x-auto">
					<div class="item-center flex flex-wrap gap-3 *:flex *:items-center">
						<p>
							<i class="ri-user-3-line ltr:mr-1 rtl:ml-1"></i>
							<span class="dark:text-dark-500 text-gray-500">Female</span>
						</p>
						<p>
							<i class="ri-briefcase-line ltr:mr-1 rtl:ml-1"></i>
							<span class="dark:text-dark-500 text-gray-500">Accountant</span>
						</p>
						<p>
							<i class="ri-map-pin-2-line ltr:mr-1 rtl:ml-1"></i>
							<span class="dark:text-dark-500 text-gray-500">California</span>
						</p>
						<p>
							<i class="ri-calendar-event-line ltr:mr-1 rtl:ml-1"></i>
							<span class="dark:text-dark-500 text-gray-500">13 Dec, 1998 (25 Years)</span>
						</p>
					</div>
				</div>
				<div>
					<div class="gap-space mt-5 flex flex-wrap items-center">
						<div
							class="dark:border-dark-800 w-36 shrink-0 rounded-md border border-dashed border-gray-200 p-4 text-center"
						>
							<h4 class="mb-1">
								26 <small class="dark:text-dark-500 text-sm font-normal text-gray-500"
									>May, 2024</small
								>
							</h4>
							<p class="dark:text-dark-500 text-gray-500">Appo. Date</p>
						</div>
						<div
							class="dark:border-dark-800 w-36 shrink-0 rounded-md border border-dashed border-gray-200 p-4 text-center"
						>
							<h4 class="mb-1">115/50</h4>
							<p class="dark:text-dark-500 text-gray-500">Blood Pressure</p>
						</div>
						<div
							class="dark:border-dark-800 w-36 shrink-0 rounded-md border border-dashed border-gray-200 p-4 text-center"
						>
							<h4 class="mb-1">B+</h4>
							<p class="dark:text-dark-500 text-gray-500">Blood Group</p>
						</div>
						<div
							class="dark:border-dark-800 w-36 shrink-0 rounded-md border border-dashed border-gray-200 p-4 text-center"
						>
							<h4 class="mb-1">
								86 <small class="dark:text-dark-500 text-sm font-normal text-gray-500">kg</small>
							</h4>
							<p class="dark:text-dark-500 text-gray-500">Weight</p>
						</div>
						<div
							class="dark:border-dark-800 w-36 shrink-0 rounded-md border border-dashed border-gray-200 p-4 text-center"
						>
							<h4 class="mb-1">
								178 <small class="dark:text-dark-500 text-sm font-normal text-gray-500">cm</small>
							</h4>
							<p class="dark:text-dark-500 text-gray-500">Height</p>
						</div>
					</div>
				</div>
			</div>
			<div class="shrink-0">
				<div class="flex items-center gap-2">
					<button class="btn btn-sub-green btn-icon" title="phone"
						><LucideIcon name="Phone" class="size-4" /></button
					>
					<button class="btn btn-sub-purple btn-icon" title="messages-square"
						><LucideIcon name="MessagesSquare" class="size-4" /></button
					>
					<button type="button" class="btn btn-primary" title="add"
						><LucideIcon name="Pencil" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Edit</button
					>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<div class="grid grid-cols-12 gap-6">
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<p class="dark:text-dark-500 mb-1 text-gray-500">Family Doctor</p>
					<h6>Dr. Vernon Locklin</h6>
				</div>
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<p class="dark:text-dark-500 mb-1 text-gray-500">Assigned Doctor</p>
					<h6>Dr. Ellie Maggie</h6>
				</div>
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<p class="dark:text-dark-500 mb-1 text-gray-500">Referring Doctor</p>
					<h6>Dr. Jasper Liewald</h6>
				</div>
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<p class="dark:text-dark-500 mb-1 text-gray-500">Pharmacy Name</p>
					<h6>ABC Pharmacy</h6>
				</div>
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<div class="whitespace-normal">
						<p class="dark:text-dark-500 mb-1 text-gray-500">Full Address</p>
						<h6>Apt. 757 866 Truman Ridge, Bashirianside, OH 34623-2200</h6>
					</div>
				</div>
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<p class="dark:text-dark-500 mb-1 text-gray-500">Phone Number</p>
					<h6>+33 1 42 68 53 00</h6>
				</div>
				<div class="col-span-12 lg:col-span-6 xl:col-span-3">
					<p class="dark:text-dark-500 mb-1 text-gray-500">Emergency Number</p>
					<h6>+34 91 123 45 67</h6>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }} class="card row-span-2">
	<CardHeader>
		<CardTitle>Timeline</CardTitle>
	</CardHeader>
	<CardBody>
		<Simplebar class="-mx-space px-space h-[20.8rem]">
			<ul class="timeline">
				<li class="timeline-primary">
					<span class="badge badge-gray">19 June, 2024 - 11:15 AM</span>
					<h6 class="mt-3 mb-1">Follow Up</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">
						Follow-up for rash, prescribed antihistamine
					</p>
				</li>
				<li class="timeline-primary">
					<span class="badge badge-gray">25 May, 2024 - 09:00 AM</span>
					<h6 class="mt-3 mb-1">Appointment</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">Annual physical check-up</p>
				</li>
				<li class="timeline-primary">
					<span class="badge badge-gray">21 May, 2024 - 03:30 PM</span>
					<h6 class="mt-3 mb-1">Lab Test</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">
						Blood test: Complete Blood Count (CBC)
					</p>
				</li>
				<li class="timeline-primary">
					<span class="badge badge-gray">05 May, 2024 - 10:00 AM</span>
					<h6 class="mt-3 mb-1">Medication Start</h6>
					<p class="dark:text-dark-500 text-sm text-gray-500">
						Prescribed Atorvastatin 20mg for high cholesterol
					</p>
				</li>
			</ul>
		</Simplebar>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 3 }}>
	<Card>
		<CardHeader>
			<CardTitle>Insurance Overview</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex items-center gap-3">
				<div
					class="text-primary-500 bg-primary-500/10 flex size-12 items-center justify-center rounded-full"
				>
					<LucideIcon name="HeartHandshake" class="size-5" />
				</div>
				<div class="grow">
					<h6 class="mb-1">HealthCare Insurance</h6>
					<p class="dark:text-dark-500 text-gray-500">#157-PE9871-541</p>
				</div>
			</div>
		</CardBody>
	</Card>
	<div class="card border-green-500/20 bg-green-500/10">
		<CardBody class="card-body">
			<div class="flex items-center gap-3">
				<div class="grow">
					<img src="/assets/images/others/insurance.png" alt="" class="size-14" />
					<h6 class="mt-5 mb-1">Get peace of mind with the right insurance coverage.</h6>
					<p class="dark:text-dark-500 mb-3 text-gray-500">
						Receive your personalized quote in just a few clicks!
					</p>
					<button type="button" class="btn btn-green">Buy Insurance</button>
				</div>
			</div>
		</CardBody>
	</div>
</Col>

<Col cols={{ span: 12 }} xl={{ span: 6 }} class="card overflow-hidden xl:row-span-2">
	<div class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Reports</h6>
		<ModalTrigger
			modalId="add-report"
			icon="Plus"
			text="Add Reports"
			color=""
			iconCss="inline-block mb-1 align-middle size-4"
			textCss=""
			class="text-primary-500 hover:text-primary-600 shrink-0 !gap-1 font-medium"
		/>
	</div>
	<CardBody class="pt-0">
		<div>
			<Simplebar class="table-box">
				<table class="flush even-striped table whitespace-nowrap">
					<tbody>
						{#each displayedReports as report, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{report.name}</td>
								<td>{report.age}</td>
								<td>{report.date}</td>
								<td>{report.doctor}</td>
								<td>
									<span
										class="badge"
										class:badge-green={report.status === 'Completed'}
										class:badge-purple={report.status === 'In Progress'}
										class:badge-yellow={report.status === 'Pending'}
									>
										{report.status}
									</span>
								</td>
								<td>
									<div class="flex items-center gap-2">
										<button
											title="Download"
											class="btn btn-sub-purple btn-icon !size-8 rounded-full"
											aria-label="download"
										>
											<i class="ri-download-2-line"></i>
										</button>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn btn-sub-red btn-icon !size-8 rounded-full"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Simplebar>
			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{reports.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button
							on:click={prevPageReport}
							disabled={currentPageReport === 1}
							class="pagination-pre"
						>
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, page (page)}
							<button
								on:click={() => gotoPageReport(page + 1)}
								class:active={currentPageReport === page + 1}
								class="pagination-item"
							>
								<span>{page + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPageReport}
							disabled={currentPageReport === totalPages}
							class="pagination-pre"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card overflow-hidden">
	<div class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Medicine History</h6>
		<ModalTrigger
			modalId="add-medicine-modal"
			icon="Plus"
			text="Add Medicine"
			color=""
			class="text-primary-500 hover:text-primary-600 shrink-0 !gap-1 font-medium"
			onClick={() => openAddForm()}
		/>
	</div>
	<CardBody class="pt-0 ">
		<div>
			<Simplebar class="table-box whitespace-nowrap">
				<table class="flush table whitespace-nowrap">
					<tbody>
						<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
							<th on:click={() => sort('date')} class="cursor-pointer !font-medium">
								Date <span>{sortBy === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th on:click={() => sort('time')} class="cursor-pointer !font-medium">
								Time <span>{sortBy === 'time' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th on:click={() => sort('medicineName')} class="cursor-pointer !font-medium">
								Medicine Name <span
									>{sortBy === 'medicineName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('dosage')} class="cursor-pointer !font-medium">
								Dosage <span
									>{sortBy === 'dosage' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('frequency')} class="cursor-pointer !font-medium">
								Frequency <span
									>{sortBy === 'frequency' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('startDate')} class="cursor-pointer !font-medium">
								Start Date <span
									>{sortBy === 'startDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('endDate')} class="cursor-pointer !font-medium">
								End Date <span
									>{sortBy === 'endDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('prescribingDoctor')} class="cursor-pointer !font-medium">
								Prescribing Doctor <span
									>{sortBy === 'prescribingDoctor'
										? sortDirection === 'asc'
											? '↑'
											: '↓'
										: ''}</span
								>
							</th>
							<th on:click={() => sort('reasonCondition')} class="cursor-pointer !font-medium">
								Reason/Condition <span
									>{sortBy === 'reasonCondition' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
								>
							</th>
							<th on:click={() => sort('notes')} class="cursor-pointer !font-medium">
								Notes <span>{sortBy === 'notes' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
							</th>
							<th class="!font-medium">Action</th>
						</tr>

						{#each displayedMedicine as medicine, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{medicine.date}</td>
								<td>{medicine.time}</td>
								<td>{medicine.medicineName}</td>
								<td>{medicine.dosage}</td>
								<td>{medicine.frequency}</td>
								<td>{medicine.startDate}</td>
								<td>{medicine.endDate}</td>
								<td>{medicine.prescribingDoctor}</td>
								<td>{medicine.reasonCondition}</td>
								<td>{medicine.notes}</td>
								<td>
									<div class="flex items-center gap-2">
										<ModalTrigger
											modalId="add-medicine-modal"
											color=""
											icon="Pencil"
											iconCss="!size-3"
											class="btn btn-sub-purple btn-icon !size-8 rounded-full"
											onClick={() => openEditForm(medicine)}
										/>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn btn-sub-red btn-icon !size-8 rounded-full"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Simplebar>

			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{medicines.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 items-center md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button
							on:click={prevPageMedicine}
							disabled={currentPageMedicine === 1}
							class="pagination-pre"
						>
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, page (page)}
							<button
								on:click={() => gotoPageMedicine(page + 1)}
								class:active={currentPageMedicine === page + 1}
								class="pagination-item"
							>
								<span>{page + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPageMedicine}
							disabled={currentPageMedicine === totalPages}
							class="pagination-pre"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<Col cols={{ span: 12 }} class="card overflow-hidden">
	<div class="card-header flex items-center gap-3">
		<h6 class="card-title grow">Appointments History</h6>
		<a href="#!" class="text-primary-500 hover:text-primary-600 shrink-0 font-medium">
			<LucideIcon name="Plus" class="mb-1 inline-block size-4 align-middle" /> New Appointment
		</a>
	</div>
	<CardBody class="pt-0 ">
		<div>
			<Simplebar class="table-box">
				<table class="table whitespace-nowrap">
					<tbody>
						{#each displayedAppointment as appointment, index}
							<tr class="*:px-3 *:py-2.5">
								<td>{appointment.date}</td>
								<td>{appointment.treatmentType}</td>
								<td>{appointment.time}</td>
								<td>{appointment.reasonCondition}</td>
								<td>{appointment.notes}</td>
								<td>{appointment.doctor}</td>
								<td
									><span
										class="
                    badge
                    {appointment.status === 'Completed' ? 'badge-green' : ''}
                    {appointment.status === 'Expired' ? 'badge-red' : ''}
                    {appointment.status === 'New' ? 'badge-sky' : ''}
                    {appointment.status === 'Confirmed' ? 'badge-purple' : ''}
                    {appointment.status === 'Pending' ? 'badge-yellow' : ''}
                  "
									>
										{appointment.status}
									</span></td
								>
								<td>
									<div class="flex items-center gap-2">
										<button
											class="btn btn-sub-gray btn-icon !size-8"
											title="overview"
											aria-label="overview"><i class="ri-eye-line"></i></button
										>
										<button class="btn btn-sub-gray btn-icon !size-8" title="edit" aria-label="edit"
											><i class="ri-pencil-line"></i></button
										>
										<ModalTrigger
											modalId="delete-file-modal"
											icon="Trash2"
											color=""
											iconCss="!size-3.5"
											class="btn btn-sub-red btn-icon !size-8 rounded-md"
										></ModalTrigger>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Simplebar>

			<div class="mt-5 grid grid-cols-12 items-center gap-5">
				<div class="col-span-12 flex flex-wrap justify-center md:col-span-6 md:justify-start">
					<p class="dark:text-dark-500 text-gray-500">
						Showing <b>{showingStart}</b> - <b>{showingEnd}</b> of <b>{appointments.length}</b> Results
					</p>
				</div>
				<div class="col-span-12 md:col-span-6">
					<div class="pagination pagination-primary flex justify-center md:justify-end">
						<button
							on:click={prevPageAppointment}
							disabled={currentPageAppointment === 1}
							class="pagination-pre"
						>
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
							Prev
						</button>
						{#each Array(totalPages) as _, page (page)}
							<button
								on:click={() => gotoPageAppointment(page + 1)}
								class:active={currentPageAppointment === page + 1}
								class="pagination-item"
							>
								<span>{page + 1}</span>
							</button>
						{/each}
						<button
							on:click={nextPageAppointment}
							disabled={currentPageAppointment === totalPages}
							class="pagination-pre"
						>
							Next
							<LucideIcon name="ChevronRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
							<LucideIcon name="ChevronLeft" class="mr-1 size-4 ltr:hidden rtl:inline-block" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</CardBody>
</Col>

<!-- Reports form component -->
<Modal modalId="add-report" size="md" let:modalId>
	<ModalHeader {modalId}>
		<h6 class="modal-title">Add Report</h6>
	</ModalHeader>
	<ModalBody>
		<form>
			<div class="gap-space grid grid-cols-12">
				<div class="col-span-12">
					<label for="reportTypeSelect" class="form-label"
						>Report Type <span class="text-red-500">*</span></label
					>
					<select
						id="reportTypeSelect"
						class="form-input"
						bind:value={reportForm.reportType}
						on:change={() =>
							validateField('reportType', reportForm.reportType, 'Report type is required.')}
					>
						<option value="" disabled>Select Report Type</option>
						<option value="Type1">Type 1</option>
						<option value="Type2">Type 2</option>
						<!-- Add more options here -->
					</select>
					{#if errors.reportType}
						<span class="text-red-500">{errors.reportType}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="dateInput" class="form-label">Date <span class="text-red-500">*</span></label>
					<FlatePicker
						bind:value={reportForm.date}
						dateFormat="Y-m-d"
						on:input={() => validateField('date', reportForm.date, 'Date is required.')}
					/>
					{#if errors.date}
						<span class="text-red-500">{errors.date}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="doctorNameInput" class="form-label"
						>Doctor <span class="text-red-500">*</span></label
					>
					<input
						type="text"
						id="doctorNameInput"
						class="form-input"
						placeholder="Enter doctor name"
						bind:value={reportForm.doctor}
						on:input={() => validateField('doctor', reportForm.doctor, 'Doctor name is required.')}
					/>
					{#if errors.doctor}
						<span class="text-red-500">{errors.doctor}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="textareaInput2" class="form-label">Clinical Details</label>
					<textarea
						id="textareaInput2"
						rows="3"
						class="form-input h-auto"
						placeholder="Enter your description"
						bind:value={reportForm.clientDetails}
						on:input={() =>
							validateField(
								'clientDetails',
								reportForm.clientDetails,
								'Client details are required.'
							)}
					></textarea>
					{#if errors.clientDetails}
						<span class="text-red-500">{errors.clientDetails}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="impressionsInput" class="form-label">Impressions</label>
					<input
						type="text"
						id="impressionsInput"
						class="form-input"
						placeholder="Impressions"
						bind:value={reportForm.impressions}
						on:input={() =>
							validateField('impressions', reportForm.impressions, 'Impressions are required.')}
					/>
					{#if errors.impressions}
						<span class="text-red-500">{errors.impressions}</span>
					{/if}
				</div>

				<div class="col-span-6">
					<label for="recommendationsSelect" class="form-label">Recommendations</label>
					<select
						id="recommendationsSelect"
						class="form-input"
						bind:value={reportForm.recommendations}
						on:change={() =>
							validateField(
								'recommendations',
								reportForm.recommendations,
								'Recommendations are required.'
							)}
					>
						<option value="" disabled>Select Recommendations</option>
						<option value="Rec1">Recommendation 1</option>
						<option value="Rec2">Recommendation 2</option>
						<!-- Add more options here -->
					</select>
					{#if errors.recommendations}
						<span class="text-red-500">{errors.recommendations}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<label for="statusSelect" class="form-label"
						>Status <span class="text-red-500">*</span></label
					>
					<select
						id="statusSelect"
						class="form-input"
						bind:value={reportForm.status}
						on:change={() => validateField('status', reportForm.status, 'Status is required.')}
					>
						<option value="" disabled>Select Status</option>
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
						<!-- Add more options here -->
					</select>
					{#if errors.status}
						<span class="text-red-500">{errors.status}</span>
					{/if}
				</div>

				<div class="col-span-12">
					<div class="flex items-center justify-end gap-2">
						<button type="button" class="btn btn-active-red" data-modal-close="addReportsModal">
							<LucideIcon name="X" class="inline-block size-4" />
							<span class="align-baseline">Close</span>
						</button>
						<button type="button" class="btn btn-primary" on:click={submitReport}>
							<LucideIcon name="Plus" class="mr-1 inline-block size-4" /> Add Report
						</button>
					</div>
				</div>
			</div>
		</form>
	</ModalBody>
</Modal>

<!-- Medicine form component -->
<Modal modalId="add-medicine-modal" let:modalId>
	<ModalHeader {modalId}>
		<h6>Add Medicine</h6>
	</ModalHeader>
	<ModalBody>
		<MedicineFormComponent {addForm} {editMode} selectedCustomer={selectedCustomerDetails} />
	</ModalBody>
</Modal>

<DeleteComponent />
