<script>
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Group Input" sub_title="Forms" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group flex">
						<label for="basicInput1" class="input-label-group">@</label>
						<input
							type="text"
							id="basicInput1"
							class="form-input ltr:rounded-l-none rtl:rounded-r-none"
						/>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group right flex">
						<input
							type="text"
							id="basicInput2"
							class="form-input ltr:rounded-r-none rtl:rounded-l-none"
						/>
						<label for="basicInput2" class="input-label-group">@</label>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group flex">
						<label for="basicInput3" class="input-label-group">$</label>
						<input
							type="number"
							id="basicInput3"
							class="form-input ltr:rounded-l-none rtl:rounded-r-none"
						/>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group right flex">
						<input
							type="number"
							id="basicInput4"
							class="form-input ltr:rounded-r-none rtl:rounded-l-none"
						/>
						<label for="basicInput4" class="input-label-group">$</label>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group flex">
						<label for="basicInput5" class="input-label-group">Label</label>
						<input
							type="text"
							id="basicInput5"
							class="form-input ltr:rounded-l-none rtl:rounded-r-none"
						/>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group right flex">
						<input
							type="text"
							id="basicInput6"
							class="form-input ltr:rounded-r-none rtl:rounded-l-none"
						/>
						<label for="basicInput6" class="input-label-group">Label</label>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group flex">
						<label for="basicInput7" class="input-label-group ltr:rounded-r-none rtl:rounded-l-none"
							>https://</label
						>
						<input
							type="text"
							id="basicInput7"
							class="form-input ltr:rounded-l-none ltr:rounded-r-none rtl:rounded-l-none rtl:rounded-r-none"
						/>
						<label
							for="basicInput7"
							class="input-label-group ltr:rounded-l-none ltr:rounded-r-md ltr:border-r ltr:border-l-0 rtl:rounded-l-md rtl:rounded-r-none rtl:border-r-0 rtl:border-l"
							>.com</label
						>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group right flex">
						<input
							type="text"
							id="basicInput8"
							class="form-input ltr:rounded-r-none rtl:rounded-l-none"
						/>
						<label for="basicInput8" class="input-label-group">@gmail.com</label>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="group flex">
						<label for="basicInput9" class="input-label-group">
							<img src="/assets/images/payment/mastercard.png" alt="" class="h-[23px]" />
						</label>
						<input
							type="number"
							id="basicInput9"
							class="form-input ltr:rounded-l-none rtl:rounded-r-none"
							placeholder="0000 0000 0000 0000"
						/>
					</div>
				</Col>
			</Grid>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Button with Input Group</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="flex">
						<button type="button" class="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none"
							>Button</button
						>
						<input
							type="text"
							id="basicInput1"
							class="form-input ltr:rounded-l-none rtl:rounded-r-none"
						/>
					</div>
				</Col>
				<Col col={{ span: 12 }} md={{ span: 6 }}>
					<div class="flex">
						<input
							type="text"
							id="basicInput1"
							class="form-input ltr:rounded-r-none rtl:rounded-l-none"
						/>
						<button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"
							>Button</button
						>
					</div>
				</Col>
				<Col cols={{ span: 12 }}>
					<div class="flex">
						<button type="button" class="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none"
							>Button</button
						>
						<input
							type="text"
							id="basicInput1"
							class="form-input ltr:rounded-l-none ltr:rounded-r-none rtl:rounded-l-none rtl:rounded-r-none"
						/>
						<button type="button" class="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none"
							>Button</button
						>
					</div>
				</Col>
				<Col cols={{ span: 12 }}>
					<div class="flex">
						<button type="button" class="btn btn-primary ltr:rounded-r-none rtl:rounded-l-none"
							>Button</button
						>
						<input
							type="text"
							id="basicInput1"
							class="form-input ltr:rounded-l-none ltr:rounded-r-none rtl:rounded-l-none rtl:rounded-r-none"
						/>
						<button
							type="button"
							class="btn btn-primary ltr:rounded-l-none ltr:rounded-r-none rtl:rounded-l-none rtl:rounded-r-none"
							>Button</button
						>
						<input
							type="text"
							id="basicInput1"
							class="form-input ltr:rounded-l-none rtl:rounded-r-none"
						/>
					</div>
				</Col>
			</Grid>
		</CardBody>
	</Col>
</Grid>
