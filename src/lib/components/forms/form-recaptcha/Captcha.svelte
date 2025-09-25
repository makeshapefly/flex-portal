<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	let formData = {
		name: '',
		email: '',
		message: ''
	};

	let submitted = false;

	// Load reCAPTCHA script
	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://www.google.com/recaptcha/api.js';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
	});

	const submitForm = async (event) => {
		event.preventDefault();
		const recaptchaResponse = grecaptcha.getResponse();

		if (!recaptchaResponse) {
			alert('Please complete the reCAPTCHA verification.');
			return false;
		}

		// Assuming form submission succeeds
		submitted = true;

		// Simulate form reset after 2 seconds
		setTimeout(() => {
			formData = { name: '', email: '', message: '' };
			submitted = false;
			grecaptcha.reset();
		}, 2000);
	};
</script>

<p class="mb-4 text-gray-500 dark:text-dark-500">
	reCAPTCHA protects your website from fraud and abuse without creating friction.
</p>

<div class="max-w-md p-6 mx-auto rounded-md shadow-md shadow-gray-200 dark:shadow-dark-800">
	<form on:submit={submitForm}>
		<div class="mb-4">
			<label for="name" class="form-label">Name:</label>
			<input
				type="text"
				id="name"
				bind:value={formData.name}
				name="name"
				placeholder="Your Name"
				class="form-input"
			/>
		</div>
		<div class="mb-4">
			<label for="email" class="form-label">Email:</label>
			<input
				type="email"
				id="email"
				bind:value={formData.email}
				name="email"
				placeholder="Your Email"
				class="form-input"
			/>
		</div>
		<div class="mb-4">
			<label for="message" class="form-label">Message:</label>
			<textarea
				id="message"
				bind:value={formData.message}
				name="message"
				rows="4"
				placeholder="Your Message"
				class="h-auto form-input"
			></textarea>
		</div>

		<!-- reCAPTCHA -->
		{#if !submitted}
			<div class="mb-4">
				<div class="g-recaptcha" data-sitekey="6LeSW08qAAAAABXVMqQWldnm7_C2z2nxGmnKb06H"></div>
			</div>
		{/if}

		{#if submitted}
			<div class="mb-4">
				<p class="font-bold text-green-600">Form submitted successfully!</p>
			</div>
		{/if}

		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</div>
