<script>
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import WhishList from './WhishList.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Wishlist" sub_title="Ecommerce" />
<Card>
	<CardHeader>
		<CardTitle>💖 Wishlist</CardTitle>
	</CardHeader>
	<CardBody class="pt-0">
		<WhishList />
	</CardBody>
</Card>
