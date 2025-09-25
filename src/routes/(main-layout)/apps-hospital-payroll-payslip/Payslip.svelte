<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<Grid cols={12} class="mb-space">
	<Col
		cols={{ span: 12 }}
		xl={{ span: 8 }}
		class="card relative xl:col-start-3 print:col-span-12 print:border-0 print:shadow-none"
	>
		<img
			src="/assets/images/favicon.ico"
			alt=""
			class="absolute top-1/2 left-1/2 flex size-64 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-15"
		/>
		<CardBody>
			<Grid cols={12} class="dark:border-dark-800 mb-4 border-b border-gray-200 pb-4">
				<Col cols={{ span: 12 }} md={{ span: 5 }}>
					<div class="mb-5">
						<img src="/assets/images/main-logo.png" alt="" class="inline-block h-8 dark:hidden" />
						<img src="/assets/images/logo-white.png" alt="" class="hidden h-8 dark:inline-block" />
					</div>
					<h6 class="mb-1">Domiex - Multispeciality Hospital</h6>
					<p class="dark:text-dark-500 mb-1 text-gray-500">
						1960 Squaw Valley Rd, Olympic Valley, California, United States - 96146
					</p>
					<p class="dark:text-dark-500 text-gray-500">
						<a href="mailto:domiex@example.com">domiex@example.com</a>
					</p>
				</Col>
			</Grid>

			<h6 class="mb-3">Employee Information:</h6>
			<Grid cols={12} class="gap-2">
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Employee ID:</span> PE-A14E0112
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Employee Name:</span> Sophia Mia
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Designation:</span> Accounts Specialist
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Pay Period:</span> February
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Department:</span> Finance
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Month:</span> Nov - Dec, 2024
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<span class="dark:text-dark-500 text-gray-500">Worked Days:</span> 24 Days
				</Col>
			</Grid>

			<Grid cols={12} gap="space">
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<div class="mt-5 overflow-x-auto">
						<table class="bordered table">
							<tbody>
								<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
									<th>Earnings</th>
									<th>Amount</th>
								</tr>
								<tr>
									<td>Basic Salary</td>
									<td>$17,500</td>
								</tr>
								<tr>
									<td>Incentive Pay</td>
									<td>$900</td>
								</tr>
								<tr>
									<td>Other Allowance</td>
									<td>$450</td>
								</tr>
								<tr>
									<td>Total Earnings</td>
									<td>$18,850</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Col>
				<Col cols={{ span: 12 }} md={{ span: 6 }}>
					<div class="mt-5 overflow-x-auto">
						<table class="bordered table">
							<tbody>
								<tr class="dark:bg-dark-850 dark:text-dark-500 bg-gray-100 text-gray-500">
									<th>Deduction</th>
									<th>Amount</th>
								</tr>
								<tr>
									<td>Tax</td>
									<td>$700</td>
								</tr>
								<tr>
									<td>Health Insurance</td>
									<td>$1,100</td>
								</tr>
								<tr>
									<td>Absences (3)</td>
									<td>$1,245.22</td>
								</tr>
								<tr>
									<td>Total Deduction</td>
									<td>$3,045.22</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="dark:border-dark-800 mt-3 rounded-md border border-gray-200 p-3 text-center">
						<h6>Net Pay: $15,804.78</h6>
					</div>
				</Col>
			</Grid>

			<Grid cols={12} gap={2} class="mt-10">
				<Col cols={{ span: 12 }}>
					<p class="dark:text-dark-500 mb-2 text-gray-500">
						For any Queries, Please mail us at <span class="font-medium">domiex@example.com</span>
					</p>
					<p class="dark:text-dark-500 mb-1 text-gray-500">Regards</p>
					<p>SRBThemes</p>
				</Col>
			</Grid>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} xl={{ span: 8 }} class="text-right xl:col-start-3 print:hidden">
		<button type="button" on:click={() => window.print()} class="btn btn-primary">Print Now</button>
	</Col>
</Grid>
