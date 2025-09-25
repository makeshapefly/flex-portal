<script lang="ts">
	import { onMount } from 'svelte';
	import OTPForm from '../auth-two-step-verification-basic/verification'; // Import the OTPForm class
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';

	let formId = 'otp-form1'; // The form ID to initialize the OTPForm class
	let otpForm: OTPForm;

	// Initialize the OTPForm when the component is mounted
	onMount(() => {
		otpForm = new OTPForm(formId); // Create a new OTPForm instance
	});
</script>

<div
	class="relative flex min-h-screen items-center justify-center bg-[url('../images/others/auth.jpg')] bg-cover bg-center py-12"
>
	<div class="absolute inset-0 bg-gray-950/50"></div>
	<div class="relative container">
		<div class="grid grid-cols-12">
			<div
				class="card col-span-12 mb-0 border-none bg-white/10 shadow-none backdrop-blur-md md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5"
			>
				<div class="card-body md:p-10">
					<div class="mb-4 text-center">
						<div class="mx-auto flex size-14 items-center justify-center">
							<LucideIcon name="MailOpen" class="size-10 fill-white/20 stroke-1 text-white/75" />
						</div>
					</div>
					<h4 class="mb-2 text-center leading-relaxed text-white">OTP Verification</h4>
					<p class="mb-5 text-center text-white/75">
						We're sent a code to <b>sophiamia@example.com</b>
					</p>
					<form id={formId} action="/auth-reset-password-basic">
						<div class="flex flex-wrap items-center justify-center gap-3">
							<input
								type="text"
								class="size-9 appearance-none rounded border border-transparent bg-white/10 text-center text-2xl font-extrabold text-white outline-none focus:bg-white/10 sm:size-12 md:size-14"
								pattern="\d*"
								maxlength="1"
							/>
							<input
								type="text"
								class="size-9 appearance-none rounded border border-transparent bg-white/10 text-center text-2xl font-extrabold text-white outline-none focus:bg-white/10 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="size-9 appearance-none rounded border border-transparent bg-white/10 text-center text-2xl font-extrabold text-white outline-none focus:bg-white/10 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="size-9 appearance-none rounded border border-transparent bg-white/10 text-center text-2xl font-extrabold text-white outline-none focus:bg-white/10 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="size-9 appearance-none rounded border border-transparent bg-white/10 text-center text-2xl font-extrabold text-white outline-none focus:bg-white/10 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="size-9 appearance-none rounded border border-transparent bg-white/10 text-center text-2xl font-extrabold text-white outline-none focus:bg-white/10 sm:size-12 md:size-14"
								maxlength="1"
							/>
						</div>
						<div class="mt-5">
							<button type="submit" class="btn btn-primary w-full">Reset Password</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
