<script lang="ts">
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import ChatList from './ChatList.svelte';
	import SidebarChat from './SidebarChat.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Default Chat" sub_title="Chats" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card 2xl:col-span-1">
		<SidebarChat />
	</Col>
	<ChatList />
</Grid>
