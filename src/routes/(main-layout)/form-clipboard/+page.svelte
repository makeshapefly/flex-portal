<script>
	// @ts-nocheck
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { onMount } from 'svelte';
	import ClipboardJS from 'clipboard';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';

	let clipboardBtn, cutBtn;

	onMount(() => {
		// Initialize ClipboardJS when the component is mounted
		const clipboard = new ClipboardJS(clipboardBtn);
		const cutClipboard = new ClipboardJS(cutBtn);

		// Cleanup ClipboardJS when component is destroyed
		return () => {
			clipboard.destroy();
			cutClipboard.destroy();
		};
	});
</script>

<PageHeading title="Clipboard" sub_title="Forms & Tables" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Input with Clipboard</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="relative">
				<input
					type="text"
					id="basicClipboard"
					class="form-input ltr:pr-8 rtl:pl-8"
					value="https://github.com/zenorocha/clipboard.js.git"
				/>
				<button
					bind:this={clipboardBtn}
					data-clipboard-target="#basicClipboard"
					class="dark:text-dark-500 dark:hover:text-primary-500 hover:text-primary-500 focus:text-primary-500 dark:focus:text-primary-500 btn absolute inset-y-0 flex items-center p-0 text-gray-500 focus:outline-0 focus:outline-none ltr:right-3 rtl:left-3"
				>
					<LucideIcon name="Clipboard" class="size-5" />
				</button>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Input with Clipboard</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="relative">
				<textarea id="bar" class="form-input h-auto">Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.</textarea>
				<div class="ltr:text-right rtl:text-left">
					<button
						bind:this={cutBtn}
						class="btn btn-primary mt-4"
						data-clipboard-action="cut"
						data-clipboard-target="#bar"
					>
						Cut to clipboard
					</button>
				</div>
			</div>
		</CardBody>
	</Col>
</Grid>
