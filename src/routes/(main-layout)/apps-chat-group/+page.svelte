<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import GroupList from './GroupList.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Group Chat" sub_title="Chats" />
<Grid cols={12} gapX="space">
	<GroupList />
</Grid>
