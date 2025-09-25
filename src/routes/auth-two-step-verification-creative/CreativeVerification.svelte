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

<div class="relative">
	<div class="grid grid-cols-12">
		<div
			class="dark:bg-dark-850 relative col-span-12 overflow-hidden bg-gray-100 py-8 md:p-9 lg:col-span-6 lg:min-h-screen xl:p-12"
		>
			<div
				class="dark:bg-dark-800/20 absolute -top-64 -right-8 bottom-0 w-32 -rotate-45 bg-gray-200/20"
			></div>
			<div class="p-4">
				<a href="/index">
					<img src="/assets/images/main-logo.png" alt="" class="h-8 dark:hidden" />
					<img src="/assets/images/logo-white.png" alt="" class="hidden h-8 dark:inline-block" />
				</a>
				<h1
					class="mt-8 max-w-lg text-2xl leading-tight font-normal capitalize md:text-4xl md:leading-tight"
				>
					The most straightforward way to manage your projects
				</h1>

				<img
					src="/assets/images/others/auth-creative.png"
					alt=""
					class="relative mt-9 rounded-lg shadow-lg xl:absolute xl:top-[315px] xl:mt-0 xl:scale-110 ltr:xl:left-[115px] rtl:xl:right-[115px]"
				/>
			</div>
		</div>
		<div class="col-span-12 flex items-center py-9 md:py-122 lg:col-span-6 lg:min-h-screen">
			<div class="grid w-full grid-cols-12">
				<div class="card col-span-12 mx-4 mb-0 md:mx-12 2xl:col-span-8 2xl:col-start-3">
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
</div>
