<script lang="ts">
	import Account from '$lib/components/common/Account.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
	import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
	import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
	import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';

	let showCurrentPassword = false;
	let showNewPassword = false;
	let showConfirmPassword = false;
	let formData = {
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	};
	let googleAuth1ModalVisible: boolean = false;
	let googleAuth2ModalVisible: boolean = false;

	// OTP state variables
	let otp1: string[] = ['', '', '', '', '', ''];
	let otp2: string[] = ['', '', '', ''];

	// Functions to toggle modals visibility
	const openGoogleAuth1Modal = (): void => {
		googleAuth1ModalVisible = true;
	};

	const closeGoogleAuth1Modal = (): void => {
		googleAuth1ModalVisible = false;
	};

	const openGoogleAuth2Modal = (): void => {
		googleAuth2ModalVisible = true;
	};

	const closeGoogleAuth2Modal = (): void => {
		googleAuth2ModalVisible = false;
	};

	// Handling OTP input for Google Auth 1
	const handleOtp1Input = (e: Event, index: number): void => {
		const target = e.target as HTMLInputElement;
		otp1[index] = target.value;
		// Focus on the next input field after entering a value
		if (target.value && index < 5) {
			const nextInput = document.getElementById(`otp1-${index + 1}`) as HTMLInputElement;
			nextInput?.focus();
		}
	};

	// Handling OTP input for Google Auth 2
	const handleOtp2Input = (e: Event, index: number): void => {
		const target = e.target as HTMLInputElement;
		otp2[index] = target.value;
		// Focus on the next input field after entering a value
		if (target.value && index < 3) {
			const nextInput = document.getElementById(`otp2-${index + 1}`) as HTMLInputElement;
			nextInput?.focus();
		}
	};

	// Verify OTP 1 and open OTP 2 modal
	const verifyOtp1 = (): void => {
		openGoogleAuth2Modal();
		closeGoogleAuth1Modal();
	};

	// Handle OTP 2 form submission (verify or cancel)
	const verifyOtp2 = (e: Event): void => {
		e.preventDefault();
		alert('Account verified');
		closeGoogleAuth2Modal();
	};

	// Cancel OTP 2 verification
	const cancelOtp2 = (e: Event): void => {
		e.preventDefault();
		closeGoogleAuth2Modal();
	};
</script>

<Account variant="security" />

<h6 class="text-16 mt-5 mb-1">Security</h6>
<p class="dark:text-dark-500 mb-5 text-gray-500">
	<a
		href="#!"
		class="text-primary-500 hover:text-primary-600 underline transition duration-300 ease-linear"
		>Learn More</a
	> about securing your account from external and unknown intrusion.
</p>

<Card>
	<Grid cols={12} class="card-body">
		<Col cols={{ span: 12 }} md={{ span: 9 }}>
			<h6 class="mb-1">Account Security</h6>
			<p class="dark:text-dark-500 mb-2 text-gray-500">
				Secured Account means any account for which the related obligor has pledged assets or made a
				cash collateral deposit as security for payment of receivables that arise in such an
				account.
			</p>
			<a
				href="#!"
				class="link text-primary-500 dark:text-primary-500 hover:text-primary-600 underline"
			>
				Learn More
				<LucideIcon name="MoveRight" class="ml-1 size-4 ltr:inline-block rtl:hidden" />
				<LucideIcon name="MoveLeft" class="ml-1 size-4 ltr:hidden rtl:inline-block" />
			</a>
		</Col>
		<Col cols={{ span: 12 }} md={{ span: 3 }}>
			<img
				src="/assets/images/others/security.png"
				alt=""
				class="mx-auto mt-5 block h-24 md:mt-0 ltr:md:ml-auto rtl:md:mr-auto"
			/>
		</Col>
	</Grid>
</Card>

<Card>
	<CardBody class="gap-3 md:flex">
		<div class="flex-shrink-0">
			<div class="flex items-center gap-2">
				<img src="assets/images/others/google.png" alt="" class="size-5" />
				<h6>Google Authentication</h6>
			</div>
		</div>
		<div class="my-3 flex-grow md:my-0">
			<p class="dark:text-dark-500 mb-3 text-gray-500">
				If you set up 2-Step Verification, you can use the Google Authenticator app to generate
				codes. You can still generate codes without internet connection or mobile service. Learn
				more about <a
					href="#!"
					class="text-primary-500 hover:text-primary-600 transition duration-300 ease-linear"
					>2-Step Verification</a
				>.
			</p>
			<span class="badge badge-green"
				><LucideIcon name="CircleCheckBig" class="inline-block size-3 ltr:mr-1 rtl:ml-1" />
				<span class="align-middle">Connected</span></span
			>
		</div>
		<div class="flex-shrink-0">
			<ModalTrigger modalId="googleAuth1Modal" text="Enable" color="" class="btn btn-sub-gray" />
		</div>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Update Password</CardTitle>
	</CardHeader>
	<CardBody>
		<p class="dark:text-dark-500 mb-3 text-gray-500">
			To change your password, please enter your current password.
		</p>
		<form action="#!">
			<!-- Current Password Field -->
			<div class="mb-5">
				<label for="currentPasswordInput" class="form-label">Current Password</label>
				<div class="relative">
					{#if showCurrentPassword}
						<input
							type="text"
							id="currentPasswordInput"
							bind:value={formData.currentPassword}
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="Enter current password"
						/>
					{:else}
						<input
							type="password"
							id="currentPasswordInput"
							bind:value={formData.currentPassword}
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="Enter current password"
						/>
					{/if}
					<button
						type="button"
						on:click={() => (showCurrentPassword = !showCurrentPassword)}
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
					>
						{#if showCurrentPassword}
							<LucideIcon name="Eye" class="size-5" />
						{:else}
							<LucideIcon name="EyeOff" class="size-5" />
						{/if}
					</button>
				</div>
			</div>

			<!-- New Password Field -->
			<div class="mb-5">
				<label for="newPasswordInput" class="form-label">New Password</label>
				<div class="relative">
					{#if showNewPassword}
						<input
							type="text"
							id="newPasswordInput"
							bind:value={formData.newPassword}
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="New password"
						/>
					{:else}
						<input
							type="password"
							id="newPasswordInput"
							bind:value={formData.newPassword}
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="New password"
						/>
					{/if}
					<button
						type="button"
						on:click={() => (showNewPassword = !showNewPassword)}
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
					>
						{#if showNewPassword}
							<LucideIcon name="Eye" class="size-5" />
						{:else}
							<LucideIcon name="EyeOff" class="size-5" />
						{/if}
					</button>
				</div>
			</div>

			<!-- Confirm Password Field -->
			<div class="mb-5">
				<label for="confirmPasswordInput" class="form-label">Confirm New Password</label>
				<div class="relative">
					{#if showConfirmPassword}
						<input
							type="text"
							id="confirmPasswordInput"
							bind:value={formData.confirmPassword}
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="Confirm password"
						/>
					{:else}
						<input
							type="password"
							id="confirmPasswordInput"
							bind:value={formData.confirmPassword}
							class="form-input ltr:pr-8 rtl:pl-8"
							placeholder="Confirm password"
						/>
					{/if}
					<button
						type="button"
						on:click={() => (showConfirmPassword = !showConfirmPassword)}
						class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:right-3 rtl:left-3"
					>
						{#if showConfirmPassword}
							<LucideIcon name="Eye" class="size-5" />
						{:else}
							<LucideIcon name="EyeOff" class="size-5" />
						{/if}
					</button>
				</div>
			</div>

			<!-- Update Button -->
			<div class="flex items-center justify-end gap-2">
				<a href="#!" class="btn btn-primary">Update Password</a>
			</div>
		</form>
	</CardBody>
</Card>

<Modal modalId="googleAuth1Modal" let:modalId>
	<div class="modal-wrap modal-center">
		<ModalHeader {modalId}>
			<h6>Set up two-factor authentication</h6>
			<!-- <button data-modal-close="googleAuth1Modal" class="link link-red"
        ><LucideIcon name="X" class="size-5"></LucideIcon></button
      > -->
		</ModalHeader>
		<ModalBody>
			<div class="modal-content">
				<p class="dark:text-dark-500 mb-2 text-gray-500">
					To authorize transactions, kindly scan this QR code with your Google Authenticator App and
					then enter the verification code provided below.
				</p>
				<div class="mb-3 p-4">
					<img src="/assets/images/others/qr.png" alt="" class="mx-auto size-28" />
				</div>
				<form id="otp-form1">
					<div class="flex items-center justify-center gap-3">
						<input
							type="text"
							class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
							pattern="\d*"
							maxlength="1"
						/>
						<input
							type="text"
							class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
							maxlength="1"
						/>
						<input
							type="text"
							class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
							maxlength="1"
						/>
						<input
							type="text"
							class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
							maxlength="1"
						/>
						<input
							type="text"
							class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
							maxlength="1"
						/>
						<input
							type="text"
							class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
							maxlength="1"
						/>
					</div>
					<div class="mt-5">
						<ModalTrigger
							modalId="googleAuth2Modal"
							class="btn btn-primary w-full"
							text="Verify Account"
						/>
					</div>
				</form>
			</div>
		</ModalBody>
	</div>
</Modal>

<!--end-->

<Modal modalId="googleAuth2Modal" let:modalId size="sm" position="center">
	<ModalBody>
		<div class="modal-content">
			<div class="mb-5 text-center">
				<h6 class="text-16 mb-2">Please check your email</h6>
				<p class="dark:text-dark-500 mb-2 text-gray-500">
					We're sent a code to <b>sophiamia@srbthemes.com</b>
				</p>
			</div>
			<form id="otp-form2">
				<div class="flex items-center justify-center gap-3">
					<input
						type="text"
						class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
						pattern="\d*"
						maxlength="1"
					/>
					<input
						type="text"
						class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
						maxlength="1"
					/>
					<input
						type="text"
						class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
						maxlength="1"
					/>
					<input
						type="text"
						class="dark:text-dark-50 dark:hover:border-dark-800 dark:bg-dark-850 dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-500/10 size-14 appearance-none rounded border border-transparent bg-gray-100 text-center text-2xl font-extrabold text-gray-900 outline-none hover:border-gray-200 focus:bg-white focus:ring-2"
						maxlength="1"
					/>
				</div>
				<div class="mt-5 flex items-center gap-2">
					<ModalClose {modalId} class="btn btn-active-red w-full">Cancel</ModalClose>
					<button type="submit" class="btn btn-primary w-full">Verify</button>
				</div>
			</form>
		</div>
	</ModalBody>
</Modal>
<!--end-->
