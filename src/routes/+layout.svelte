<script lang="ts">
	import '$lib/css/plugins.css';
	import '$lib/css/icons.css';
	import '$lib/css/tailwind.css';
	import 'swiper/swiper-bundle.css';
	import '../i18n';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase.js';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { updateAttributes } from '$lib/stores/layout';
	import BackdropOverlay from '$lib/components/ui/modalv2/BackdropOverlay.svelte';
	import type { WebUser } from '../types/webUser';
	import { getUser } from '$lib/api/user.api';

	let searchTerm = '';

	let user = $state({
		token: '',
		id: '',
		name: '',
		customer: {}
	});

	function setToken(token: string) {
		user.token = token;
	}
	function setUser(webUser: WebUser) {
		user.id = webUser.id;
		user.name = webUser.name;
		user.customer = webUser.customer;
	}

	setContext('user', { user, setToken, setUser });

	let { children } = $props();

	onMount(async () => {
		updateAttributes();
		await auth.authStateReady();
		const firebaseUser = auth.currentUser;
		if (firebaseUser) {
			const accessToken = await firebaseUser.getIdToken();
			const uid = firebaseUser.uid;
			const retrievedUser: WebUser = await getUser(uid, accessToken);
			console.log(JSON.stringify(retrievedUser));
			user.id = retrievedUser.id;
			user.name = retrievedUser.name;
			user.customer = retrievedUser.customer;
		} else {
			goto('/auth-signin-basic');
		}
	});
</script>

{@render children()}
<BackdropOverlay />
