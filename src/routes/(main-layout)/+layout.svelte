<script lang="ts">
	import Footer from '$lib/components/common/Footer.svelte';
	import LayoutBreadcrumb from '$lib/components/layout-components/LayoutBreadcrumb.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
	import Topbar from '$lib/components/layout-components/Topbar.svelte';
	import Sidebar from '$lib/components/layout-components/sidebar/Sidebar.svelte';
	import DemoSidebar from '$lib/components/layout-components/sidebar/SidebarNew.svelte';
	import NotificationContainer from '$lib/components/ui/notification/NotificationContainer.svelte';
	import { NotificationState } from '$lib/stores/notification';
	import { setContext } from 'svelte';

	let searchTerm = '';
	setContext('notification-state', new NotificationState(2000));
</script>

<Topbar {searchTerm} />
<Sidebar {searchTerm} />
<!-- <DemoSidebar /> -->
<div
	class="relative min-h-screen group-data-[layout=boxed]:rounded-md group-data-[layout=boxed]:bg-white"
>
	<div class="page-wrapper">
		<slot />
	</div>
	<Footer />
</div>
<NotificationContainer />
