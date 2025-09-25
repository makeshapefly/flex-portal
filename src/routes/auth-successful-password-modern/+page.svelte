<script>
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<div
	class="relative flex min-h-screen items-center justify-center bg-[url('../images/others/auth.jpg')] bg-cover bg-center py-12"
>
	<div class="absolute inset-0 bg-gray-950/50"></div>
	<div class="relative container">
		<Grid cols={12}>
			<Col
				cols={{ span: 12 }}
				md={{ span: 10 }}
				lg={{ span: 6 }}
				xl={{ span: 4 }}
				class="card mb-0 border-none bg-white/10 shadow-none backdrop-blur-md md:col-start-2 lg:col-start-4 xl:col-start-5"
			>
				<div class="card-body md:p-10">
					<div class="mb-4 text-center">
						<div class="mx-auto flex size-14 items-center justify-center">
							<LucideIcon
								name="CircleCheckBig"
								class="size-10 fill-green-100/20 stroke-1 text-green-500"
							/>
						</div>
					</div>
					<h4 class="mb-2 text-center leading-relaxed text-white">Password Reset!</h4>
					<p class="mb-5 text-center text-white/75">
						Your password has been successfully reset. Click below to continue accessing your
						account.
					</p>
					<div class="text-center">
						<a href="/auth-signin-modern" class="btn btn-primary"
							><span class="align-middle">Return to SignIn</span>
							<LucideIcon name="MoveRight" class="ml-0.5 inline-block size-4" /></a
						>
					</div>
				</div>
			</Col>
		</Grid>
	</div>
</div>
