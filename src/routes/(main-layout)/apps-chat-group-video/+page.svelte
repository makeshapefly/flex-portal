<script>
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import VideoChat from './VideoChat.svelte';
	import VideoList from './VideoList.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Group Video" sub_title="Chats" />
<VideoList />
<Grid cols={12} gapX="space">
	<VideoChat />
</Grid>
