<script lang="ts">
	import { onMount } from 'svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import IMask from 'imask';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let phoneNumber: string = '';
	let phoneInput: HTMLInputElement;
	let inputRef: HTMLInputElement | null = null;
	let inputRef2: HTMLInputElement | null = null;
	let inputRef3: HTMLInputElement | null = null;
	let inputRef4: HTMLInputElement | null = null;
	let inputRef5: HTMLInputElement | null = null;
	let inputRef6: HTMLInputElement | null = null;

	onMount(() => {
		// Phone number mask
		IMask(phoneInput, {
			mask: '+{91} 00000 00000'
		});

		if (inputRef) {
			IMask(inputRef, {
				mask: '000000' // 6-digit pincode mask
			});
		}
		if (inputRef2) {
			IMask(inputRef2, {
				mask: '0000 0000 0000 0000'
			});
		}
		if (inputRef3) {
			IMask(inputRef3, {
				mask: '00/00/0000' // Date format mask (MM/DD/YYYY)
			});
		}
		if (inputRef4) {
			IMask(inputRef4, {
				mask: '₹ num', // Currency format for Indian Rupees
				blocks: {
					num: {
						mask: IMask.MaskedNumber,
						thousandsSeparator: ',', // Thousands separator for Indian format (1,00,000)
						radix: '.', // Decimal point
						max: 999999999999999999999999, // Maximum value
						scale: 2, // Two decimal places
						signed: false, // Prevent negative values
						padFractionalZeros: true // Add trailing zeros for decimals
					}
				}
			});
		}
		if (inputRef5) {
			IMask(inputRef5, {
				mask: ' num', // Currency format for Indian Rupees
				blocks: {
					num: {
						mask: IMask.MaskedNumber,
						thousandsSeparator: '.', // Thousands separator for Indian format (1,00,000)
						radix: '.', // Decimal point
						max: 999999999999999999999999, // Maximum value
						scale: 3, // Two decimal places
						signed: false, // Prevent negative values
						padFractionalZeros: true // Add trailing zeros for decimals
					}
				}
			});
		}
		if (inputRef6) {
			IMask(inputRef6, {
				mask: '0000 0000 0000 0000 . 0000 000'
			});
		}
	});
</script>

<PageHeading title="Mask Input" sub_title="UI Advanced" />
<Grid cols={12} gapX="space">
	<Col col={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Date Mask</CardTitle>
		</CardHeader>
		<CardBody>
			<input bind:this={inputRef3} type="text" placeholder="MM/DD/YYYY" class="form-input" />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Dynamic Mask</CardTitle>
		</CardHeader>
		<CardBody>
			<input
				class="form-input"
				bind:this={inputRef2}
				type="text"
				placeholder="0000 0000 0000 0000"
			/>
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Pin Code Mask</CardTitle>
		</CardHeader>
		<CardBody>
			<input class="form-input" bind:this={inputRef} type="text" placeholder="Enter pincode" />
		</CardBody>
	</Col>

	<Col col={{ span: 12 }} lg={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Phone Number Mask</CardTitle>
		</CardHeader>
		<CardBody>
			<input
				class="form-input"
				id="phone"
				bind:value={phoneNumber}
				type="text"
				placeholder="Enter your phone number"
				bind:this={phoneInput}
			/>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Money Inputs</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="gap-space grid grid-cols-1 xl:grid-cols-2">
				<div>
					<label for="moneyInput1" class="form-label"
						>Here is a fully functioning money input mask:</label
					>
					<input
						id="moneyInput1"
						bind:this={inputRef4}
						class="form-input"
						value="99999"
						placeholder="0"
					/>
				</div>
				<div>
					<label for="moneyInput2" class="form-label"
						>If you wish to swap the periods for commas and vice versa (as is required in certain
						currencies), you can do so using the second optional parameter:</label
					>
					<input
						class="form-input"
						bind:this={inputRef5}
						id="moneyInput2"
						value="12000.69"
						placeholder="0.0000.00"
					/>
				</div>
				<div>
					<label for="moneyInput3" class="form-label"
						>You may also choose to override the thousands separator by supplying a third optional
						argument:</label
					>
					<input
						class="form-input"
						bind:this={inputRef6}
						id="moneyInput3"
						value="99999.69"
						placeholder="0.00"
					/>
				</div>
				<div>
					<label for="moneyInput4" class="form-label"
						>You can also override the default precision of 2 digits by using any desired number of
						digits as the fourth optional argument:</label
					>
					<input
						id="moneyInput1"
						bind:this={inputRef4}
						class="form-input"
						value="99999"
						placeholder="0"
					/>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
