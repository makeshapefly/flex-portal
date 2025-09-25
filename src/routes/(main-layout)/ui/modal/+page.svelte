<script>
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalFooter from '$lib/components/ui/modal/ModalFooter.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Modal" sub_title="UI" />
<Grid cols={1} gapX="space">
	<Card>
		<CardHeader>
			<CardTitle>Basic</CardTitle>
		</CardHeader>
		<CardBody>
			<ModalTrigger modalId="m-1" color="primary" text="Default Modal" class="btn" />
			<Modal modalId="m-1" let:modalId>
				<ModalHeader {modalId}>
					<h6>Modal Heading</h6>
				</ModalHeader>
				<ModalBody>
					<h6 class="mb-3">Modal Content</h6>
					<p class="dark:text-dark-500 text-gray-500">
						They all have something to say beyond the words on the page. They can come across as
						casual or neutral, exotic or graphic.
					</p>
				</ModalBody>
				<ModalFooter>
					<h6>Modal Footer</h6>
				</ModalFooter>
			</Modal>
		</CardBody>
	</Card><!--end -->

	<Card>
		<CardHeader>
			<CardTitle>Modal Position</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-2">
				<ModalTrigger
					modalId={'modal-position'}
					text="Center Modal"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId={'modal-position'} let:modalId position="center">
					<ModalHeader {modalId}>
						<h6>Center Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="top-right-demo"
					text="Top Right Modal"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="top-right-demo" let:modalId position="top-left">
					<ModalHeader {modalId}>
						<h6>Top Left Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="top-left-demo"
					text="Top Left Modal"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="top-left-demo" let:modalId position="top-right">
					<ModalHeader {modalId}>
						<h6>Top Left Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="bottom-right-demo"
					text="Bottom Right Modal"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="bottom-right-demo" let:modalId position="bottom-right">
					<ModalHeader {modalId}>
						<h6>Bottom Right Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="bottom-left-demo"
					text="Bottom Left Modal"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="bottom-left-demo" let:modalId position="bottom-left">
					<ModalHeader {modalId}>
						<h6>Bottom Left Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>
			</div>
		</CardBody>
	</Card><!-- end -->

	<Card>
		<CardHeader>
			<CardTitle>Size Modal</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-2">
				<ModalTrigger
					modalId="ex-small-demo"
					text="Extra Small"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="ex-small-demo" let:modalId position="center" size="xs">
					<ModalHeader {modalId}>
						<h6>Extra Small Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="small-demo"
					text="Small"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="small-demo" let:modalId position="center" size="sm">
					<ModalHeader {modalId}>
						<h6>Small Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="large-demo"
					text="Large"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal position="center" size="lg" modalId="large-demo" let:modalId>
					<ModalHeader {modalId}>
						<h6>Large Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="ex-large-demo"
					text="Extra Large"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal position="center" size="xl" modalId="ex-large-demo" let:modalId>
					<ModalHeader {modalId}>
						<h6>Extra Large Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>

				<ModalTrigger
					modalId="ex-ex-large-demo"
					text="Extra Extra Large"
					color="dark"
					varient="soft"
					class="btn btn-sub-gray"
				/>
				<Modal modalId="ex-ex-large-demo" let:modalId position="center" size="2xl">
					<ModalHeader {modalId}>
						<h6>Extra Extra Large Modal</h6>
					</ModalHeader>
					<ModalBody>
						<h6 class="mb-3">Modal Content</h6>
						<p class="dark:text-dark-500 text-gray-500">
							They all have something to say beyond the words on the page. They can come across as
							casual or neutral, exotic or graphic.
						</p>
					</ModalBody>
					<ModalFooter>
						<h6>Modal Footer</h6>
					</ModalFooter>
				</Modal>
			</div>
		</CardBody>
	</Card><!-- end -->
</Grid>
