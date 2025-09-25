<script lang="ts">
	import { writable } from 'svelte/store';

	// Store for managing notes
	const notes = writable([
		{
			id: Date.now(),
			x: 20,
			y: 40,
			visible: true,
			comments: [{ text: 'Beautiful Fabulous!' }, { text: 'Nice Awesome Photo!' }]
		}
	]);

	let newComment = '';
	let selectedNoteId: number | null = null;
	let showAllNotes = true; // State to track global visibility of notes

	// Add a new note at specified coordinates
	function addNote(x: number, y: number) {
		notes.update((currentNotes) => {
			const hasVisibleNote = currentNotes.some((note) => note.visible);
			if (hasVisibleNote) {
				toggleNoteVisibility(null); // Hide all notes if any note is visible
				return currentNotes;
			}
			return [...currentNotes, { id: Date.now(), x, y, visible: true, comments: [] }];
		});
	}

	// Add a comment to a specific note
	function addComment(noteId: number) {
		if (!newComment.trim()) return;
		notes.update((currentNotes) =>
			currentNotes.map((note) =>
				note.id === noteId ? { ...note, comments: [...note.comments, { text: newComment }] } : note
			)
		);
		newComment = '';
	}

	// Toggle visibility of a specific note
	function toggleNoteVisibility(noteId: number | null) {
		notes.update((currentNotes) =>
			currentNotes.map((note) => ({
				...note,
				visible: note.id === noteId ? !note.visible : note.visible
			}))
		);
		selectedNoteId = noteId;
	}

	// Toggle visibility of all notes
	function toggleAnnotations(event: Event) {
		event.stopPropagation(); // Prevent event from propagating to the image click
		showAllNotes = !showAllNotes;

		// Immediately update all notes visibility based on showAllNotes state
		notes.update((currentNotes) =>
			currentNotes.map((note) => ({
				...note,
				visible: showAllNotes
			}))
		);
	}

	// Generate inline styles for marker positioning
	function markerStyle(note: { x: number; y: number }) {
		return `top:${note.y - 13}px;left:${note.x - 13}px;`;
	}

	// Hide all notes when the image area (outside markers) is clicked
	function hideNotes(event: Event) {
		event.stopPropagation(); // Prevent the image click from triggering unnecessary actions
		if (showAllNotes) {
			// Only hide if we're showing all notes
			notes.update((currentNotes) => currentNotes.map((note) => ({ ...note, visible: false })));
			showAllNotes = false; // Keep track of visibility state
		}
	}
</script>

<div>
	<div class="relative">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<img
			src="/assets/images/gallery/img-02.jpg"
			class="w-full rounded"
			alt="error"
			on:click={hideNotes}
		/>
		<div class="absolute top-8 z-20 ltr:left-1/3 rtl:right-1/3">
			<div
				class="absolute top-0 z-0 size-5 animate-ping rounded-full bg-red-500 ltr:right-0 rtl:left-0"
			></div>
			<button
				aria-label="Add Marker"
				class="relative z-10 size-5 rounded-full border border-red-200 bg-red-500 shadow"
				on:click={toggleAnnotations}
			></button>

			{#each $notes as note (note.id)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="absolute max-h-52"
					style={markerStyle(note)}
					on:click={(event) => {
						event.stopPropagation();
						toggleNoteVisibility(note.id);
					}}
				>
					{#if note.visible}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="relative z-10 flex w-48 flex-col gap-2 divide-y divide-gray-200 overflow-hidden rounded bg-white"
							on:click|stopPropagation
						>
							{#each note.comments as comment}
								<p class="px-4 pt-2">{comment.text}</p>
							{/each}
							<input
								bind:value={newComment}
								placeholder="Type comment"
								class="form-input"
								on:keydown={(event) => event.key === 'Enter' && addComment(note.id)}
							/>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<p class="dark:text-dark-500 mt-2 text-sm italic text-gray-500">
	Add comments to the existing marker or click anywhere on the image to add new markers.
</p>
