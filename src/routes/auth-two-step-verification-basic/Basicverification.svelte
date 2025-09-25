<script lang="ts">
	import { onMount } from 'svelte';
	import OTPForm from './verification'; // Import the OTPForm class
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';

	let formId = 'otp-form1'; // The form ID to initialize the OTPForm class
	let otpForm: OTPForm;

	// Initialize the OTPForm when the component is mounted
	onMount(() => {
		otpForm = new OTPForm(formId); // Create a new OTPForm instance
	});
</script>

<div
	class="relative flex min-h-screen items-center justify-center from-sky-100 via-green-50 to-pink-50 py-12 ltr:bg-gradient-to-l rtl:bg-gradient-to-r dark:from-sky-500/15 dark:via-green-500/10 dark:to-pink-500/10"
>
	<div class="container">
		<div class="grid grid-cols-12">
			<div
				class="card col-span-12 mb-0 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4 2xl:col-span-4 2xl:col-start-5"
			>
				<div class="card-body md:p-10">
					<div class="mb-4 text-center">
						<div class="mx-auto flex size-14 items-center justify-center">
							<LucideIcon
								name="MailOpen"
								class="dark:text-dark-500 dark:fill-dark-850 size-10 fill-gray-100 stroke-1 text-gray-500"
							/>
						</div>
					</div>
					<h4
						class="from-primary-500 vie-purple-500 mb-2 to-pink-500 bg-clip-text text-center leading-relaxed font-bold text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
					>
						OTP Verification
					</h4>
					<p class="dark:text-dark-500 mb-5 text-center text-gray-500">
						We're sent a code to <b>sophiamia@example.com</b>
					</p>
					<form id={formId} action="/auth-reset-password-basic">
						<div class="flex flex-wrap items-center justify-center gap-3">
							<input
								type="text"
								class="dark:text-dark-50 dark:bg-dark-850 dark:hover:border-dark-800 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-500/15 size-9 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:bg-white focus:ring-2 sm:size-12 md:size-14"
								pattern="\d*"
								maxlength="1"
							/>
							<input
								type="text"
								class="dark:text-dark-50 dark:bg-dark-850 dark:hover:border-dark-800 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-500/15 size-9 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:bg-white focus:ring-2 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="dark:text-dark-50 dark:bg-dark-850 dark:hover:border-dark-800 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-500/15 size-9 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:bg-white focus:ring-2 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="dark:text-dark-50 dark:bg-dark-850 dark:hover:border-dark-800 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-500/15 size-9 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:bg-white focus:ring-2 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="dark:text-dark-50 dark:bg-dark-850 dark:hover:border-dark-800 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-500/15 size-9 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:bg-white focus:ring-2 sm:size-12 md:size-14"
								maxlength="1"
							/>
							<input
								type="text"
								class="dark:text-dark-50 dark:bg-dark-850 dark:hover:border-dark-800 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-primary-500/15 size-9 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:bg-white focus:ring-2 sm:size-12 md:size-14"
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
