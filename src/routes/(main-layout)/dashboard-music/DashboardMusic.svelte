<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Simplebar from '$lib/components/common/Simplebar.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Tooltip from '$lib/components/ui/tooltip/Tooltip.svelte';
	import TippyTooltip from '$lib/components/ui/tooltip/TippyTooltip.svelte';
	import { onMount } from 'svelte';
	import { featuredSongs, musicItems, artists } from './featured-song';
	import { popularSingers } from './popular-song';

	let currentTime = 0;
	let duration = 0;
	let isPlaying = false;
	let isMuted = false;
	let volume = 50;
	let previousVolume = 50;

	let currentSong = {
		id: 1,
		title: 'Love Me Like You Do',
		artist: 'Ellie Goulding',
		duration: '4:12 min',
		image: '/assets/images/dashboards/music/square/img-01.jpg'
	};

	let audioElement: HTMLAudioElement;

	onMount(() => {
		// Set initial audio source and controls
		audioElement.currentTime = currentTime;
		updateDuration();
	});

	// Toggle between play and pause
	function togglePlay() {
		if (isPlaying) {
			audioElement.pause();
		} else {
			audioElement.play();
		}
		isPlaying = !isPlaying;
	}

	// Skip forward or backward in the song
	function skip(seconds: number) {
		audioElement.currentTime = Math.min(duration, Math.max(0, audioElement.currentTime + seconds));
		currentTime = audioElement.currentTime;
	}

	// Seek to a specific point in the song
	function seek(event: MouseEvent) {
		const rect = (event.target as HTMLElement).getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const newTime = (offsetX / rect.width) * duration;
		audioElement.currentTime = Math.min(duration, Math.max(0, newTime));
		currentTime = audioElement.currentTime;
	}

	// Mute or unmute the song
	function toggleMute() {
		isMuted = !isMuted;
		audioElement.muted = isMuted;
		if (isMuted) {
			previousVolume = volume;
			volume = 0;
		} else {
			volume = previousVolume;
		}
	}

	// Update the volume of the audio element
	function updateVolume() {
		audioElement.volume = volume / 100;
		if (volume === 0) {
			isMuted = true;
		} else {
			isMuted = false;
		}
	}

	// Update the current time of the audio
	function updateTime() {
		currentTime = audioElement.currentTime;
	}

	// Update the duration of the audio
	function updateDuration() {
		duration = audioElement.duration;
	}

	// Format time as minutes and seconds
	function formatTime(time: number): string {
		if (isNaN(time)) return '00:00';
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	// Set the current song and start it automatically
	function setCurrentSong(song: {
		id: number;
		title: string;
		artist: string;
		image: string;
		duration: string;
	}) {
		// Only reset the time and update the song if it's a new song
		if (currentSong.id !== song.id) {
			audioElement.currentTime = 0;
			updateDuration();
			currentSong = song;
			isPlaying = true;
			audioElement.play();
		}
	}

	// Toggle play or pause based on the current song
	function togglePlaySongs(song: {
		id: any;
		title?: string;
		artist?: string;
		image?: string;
		duration?: string;
	}) {
		const updatedSong = {
			id: song.id,
			title: song.title || 'Unknown Title',
			artist: song.artist || 'Unknown Artist',
			image: song.image || '/assets/images/dashboards/music/square/img-01.jpg',
			duration: song.duration || '0:00'
		};

		if (currentSong.id !== updatedSong.id) {
			setCurrentSong(updatedSong);
		} else {
			togglePlay();
		}
	}
</script>

<div
	class="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-yellow-500/15 to-green-500/15"
></div>

<div class="relative">
	<Grid cols={12} gapX="space">
		<Col
			cols={{ span: 12 }}
			class="card border-0 from-sky-400 via-purple-300 to-pink-400 ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
		>
			<Grid cols={12} class="items-center px-10">
				<Col cols={{ span: 12 }} md={{ span: 8 }} lg={{ span: 7 }} xl={{ span: 9 }}>
					<div class="py-10 lg:max-w-[400px] xl:max-w-[500px]">
						<h1 class="mb-3 text-white">Dream Top <span class="text-pink-400">10</span> Tracks</h1>
						<p class="text-primary-50 mb-6">
							On March 24, 2025, Dream released his second song, entitled "Mask", which garnered
							over 24.7 million views on YouTube.
						</p>
						<button
							type="button"
							class="btn rounded-lg rounded-tl-3xl rounded-br-3xl bg-white/20 py-2.5 -tracking-tighter text-white backdrop-blur-xl hover:-translate-y-1.5"
							><LucideIcon name="Play" class="me-1 inline-block size-4" /> Play All</button
						>
					</div>
				</Col>
				<Col
					cols={{ span: 12 }}
					md={{ span: 4 }}
					lg={{ span: 5 }}
					xl={{ span: 3 }}
					class="col-span-12 md:col-span-4 lg:col-span-5 xl:col-span-3"
				>
					<div class="mt-6 lg:-mt-8">
						<img src="/assets/images/dashboards/music/main.png" loading="lazy" alt="" />
					</div>
				</Col>
			</Grid>
		</Col>
		<Col cols={{ span: 12 }}>
			<div class="mb-space">
				<div class="mb-5 flex items-center">
					<h6 class="text-15 grow">Weekly Top Tracks</h6>
					<a href="#!" class="btn btn-primary"
						><i class="ri-add-circle-line ltr:mr-1 rtl:ml-1"></i> Add Track</a
					>
				</div>

				<Grid cols={3} gap="space" class="lg:grid-cols-6 2xl:grid-cols-9">
					{#each musicItems as item}
						<div class="relative">
							<img src={item.image} loading="lazy" alt={item.title} class="rounded-xl" />
							<div class="mt-3 text-center">
								<h6 class="mb-1">
									<a href="#!" class="before:absolute before:inset-0">{item.title}</a>
								</h6>
								<p class="dark:text-dark-500 text-gray-500">{item.category}</p>
							</div>
						</div>
					{/each}
				</Grid>
			</div>
		</Col>
		<Col cols={{ span: 12 }} md={{ span: 6 }} class="row-span-2 2xl:col-span-4">
			<div class="mb-space">
				<h6 class="text-15 mb-4">Featured Songs</h6>
				<div class="space-y-3">
					{#each featuredSongs as song (song.id)}
						<div class="flex items-center gap-3">
							<div class="group/items relative">
								<img
									src={song.image}
									alt={song.title}
									class="size-12 rounded-md"
									loading="lazy"
									title="Song Banner"
								/>
								<a
									href="#!"
									title="Song Play"
									class="absolute inset-0 flex items-center justify-center rounded-md bg-gray-950/30 text-white opacity-0 transition duration-300 ease-linear group-hover/items:opacity-100"
									on:click={() => setCurrentSong(song)}
								>
									<LucideIcon name="Play" class="size-5" />
								</a>
							</div>
							<div class="grow">
								<h6 class="mb-1.5">
									<a href="#!" title={song.title}>{song.title}</a>
								</h6>
								<div class="flex">
									<a href="#!" class="link link-purple px-2 hover:underline">{song.artist}</a>
									<i class="ri-time-line ml-1"></i>
									<p class="dark:text-dark-500 px-1 text-gray-500">{song.duration}</p>
								</div>
							</div>
							<div class="shrink-0">
								<a
									href="#!"
									title="Song Play"
									class="dark:text-dark-500 dark:hover:bg-dark-900 btn dark:hover:shadow-dark-850 btn-icon text-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-200"
									aria-label="Song Play"
									on:click={() =>
										togglePlaySongs({
											id: song.id,
											title: song.title || 'Unknown Title',
											artist: song.artist || 'Unknown Artist',
											image: song.image || '/assets/images/dashboards/music/square/img-01.jpg',
											duration: song.duration || '0:00'
										})}
								>
									<i
										class={isPlaying && currentSong?.id === song.id
											? 'ri-pause-large-line'
											: 'ri-play-large-line'}
										style="font-size: 21px;"
									></i>
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</Col>
		<Col cols={{ span: 12 }} md={{ span: 6 }} class="row-span-2 2xl:col-span-4">
			<div class="mb-space">
				<h6 class="text-15 mb-4">Popular Singers</h6>
				<div class="space-y-3">
					{#each popularSingers as singer (singer.id)}
						<div class="flex items-center gap-3">
							<div class="group/items relative shrink-0">
								<img
									src={singer.image}
									alt={singer.name}
									loading="lazy"
									class="size-11 rounded-md"
									title="Singer Images"
								/>
								<a
									href="#!"
									title="Play button"
									class="absolute inset-0 flex items-center justify-center rounded-md bg-gray-950/30 text-white opacity-0 transition duration-300 ease-linear group-hover/items:opacity-100"
								>
									<LucideIcon name="Play" class="size-5" />
								</a>
							</div>
							<div class="grow">
								<h6 class="mb-1"><a href="#!" title={singer.name}>{singer.name}</a></h6>
								<p class="dark:text-dark-500 line-clamp-1 text-gray-500">{singer.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</Col>
		<Col cols={{ span: 12 }} xl={{ span: 6 }} class="mb-space 2xl:col-span-4">
			<h6 class="text-15 mb-4">Monthly Top Artists</h6>
			<Simplebar class="pb-3">
				<div class="flex gap-3 *:shrink-0">
					{#each artists as artist}
						<TippyTooltip
							content={artist.name}
							img={artist.image}
							position="top"
							color="border-blue-500 dark:shadow-dark-850 relative inline-block size-14 rounded-full border-4 border-white/10 shadow-lg shadow-gray-200"
						></TippyTooltip>
					{/each}
				</div>
			</Simplebar>
		</Col>

		<Col
			cols={{ span: 12 }}
			xl={{ span: 6 }}
			class="card to-primary-500/15 relative from-sky-500/15 via-purple-500/15 2xl:col-span-4 ltr:bg-gradient-to-tr rtl:bg-gradient-to-tl"
		>
			<img
				src="/assets/images/dashboards/music/upgrade.png"
				loading="lazy"
				alt=""
				class="absolute top-0 opacity-75 ltr:right-5 rtl:left-5"
			/>
			<CardBody class="relative">
				<div class="max-w-52">
					<h5 class="mb-2 capitalize">Check the power Of Domiex</h5>
					<p class="dark:text-dark-500 mb-3 text-gray-500">
						Immerse yourself in a world where music comes alive.
					</p>
				</div>
				<button type="button" class="btn btn-primary">Upgrade Now</button>
			</CardBody>
		</Col>
	</Grid>
	<div
		class="ltr:left-sidebar rtl:right-sidebar group-data-[sidebar=small]:ltr:left-sidebar-small group-data-[sidebar=small]:rtl:right-sidebar-small group-data-[sidebar=medium]:ltr:left-sidebar-medium group-data-[sidebar=medium]:rtl:right-sidebar-medium dark:bg-dark-900/50 dark:border-dark-800 fixed bottom-0 z-[1020] border-t border-gray-200 bg-white/30 p-3 backdrop-blur-lg ltr:right-0 rtl:left-0"
	>
		<div class="flex items-center gap-3">
			<img src={currentSong.image} loading="lazy" alt="Music" class="size-10 shrink-0 rounded-md" />
			<div class="w-64 shrink-0">
				<h6 class="mb-1">{currentSong.title}</h6>
				<p class="dark:text-dark-300 text-gray-500">{currentSong.artist}</p>
			</div>
			<div class="mx-auto flex grow items-center gap-2">
				<audio
					bind:this={audioElement}
					src="/assets/images/dashboards/music/music.mp3"
					on:timeupdate={updateTime}
					on:loadedmetadata={updateDuration}
					preload="metadata"
					controls
					class="hidden"
				></audio>
				<a
					href="#!"
					title="Skip Icon"
					on:click={() => skip(-10)}
					class="link dark:hover:text-dark-50 flex size-10 items-center justify-center text-xl hover:text-gray-800"
					aria-label="Skip"
				>
					<i class="ri-skip-back-line"></i>
				</a>
				<a
					href="#!"
					title="Play Icon"
					on:click={togglePlay}
					class="link dark:hover:text-dark-50 flex size-10 items-center justify-center text-xl hover:text-gray-800"
					aria-label="Skip"
				>
					<i class={isPlaying ? 'ri-pause-line' : 'ri-play-line'}></i>
				</a>
				<a
					href="#!"
					title="Skip Forward Icon"
					on:click={() => skip(10)}
					class="link dark:hover:text-dark-50 flex size-10 items-center justify-center text-xl hover:text-gray-800"
					aria-label="Skip"
				>
					<i class="ri-skip-forward-line"></i>
				</a>
				<div class="grow">
					<div class="relative flex items-center gap-3">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="dark:bg-dark-800 h-2 w-full cursor-pointer overflow-hidden rounded-full bg-gray-200"
							on:click={seek}
						>
							<div
								class="bg-primary-500 h-full"
								style="width: {(currentTime / duration) * 100}%"
							></div>
						</div>
						<div class="flex justify-end text-sm">
							<span>{formatTime(currentTime)}</span>
							<span class="mx-1">/</span>
							<span>{formatTime(duration)}</span>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<a
						href="#!"
						title="Muted Icon"
						on:click={toggleMute}
						class="link dark:hover:text-dark-50 flex size-10 items-center justify-center text-xl hover:text-gray-800"
						aria-label="Skip"
					>
						<i class={isMuted ? 'ri-volume-mute-line text-red-500' : 'ri-volume-up-line'}></i>
					</a>
					<input
						type="range"
						aria-label="volume Range Input"
						class="dark:bg-dark-700 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
						min="0"
						max="100"
						step="1"
						bind:value={volume}
						on:input={updateVolume}
					/>
				</div>
			</div>
			<div class="shrink-0">
				<a href="#!" title="shuffle Icon"><LucideIcon name="Shuffle" class="size-5" /></a>
			</div>
		</div>
	</div>
</div>
