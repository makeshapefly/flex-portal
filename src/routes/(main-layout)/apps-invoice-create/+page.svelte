<script>
	import Card from '$lib/components/ui/card/Card.svelte';
	import InvoiceCreate from './InvoiceCreate.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Create Invoice" sub_title="Invoices" />
<Card>
	<InvoiceCreate />
</Card>
