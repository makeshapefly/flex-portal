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
					<div class="mb-5 text-center">
						<a href="/index"
							><img src="/assets/images/logo-white.png" alt="" class="mx-auto h-8" /></a
						>
					</div>
					<h4 class="mb-2 text-center leading-relaxed text-white">Account Deactivation</h4>
					<p class="mb-5 text-center text-white/75">Domiex Security and Privacy</p>
					<div class="mb-3 flex gap-3">
						<div class="shrink-0 text-white">
							<LucideIcon name="EyeOff" />
						</div>
						<div class="grow">
							<h6 class="mb-1 text-white">Temporary Disable</h6>
							<p class="text-white/60">
								The customer is very important and will be followed up with care. Everyone's needs
								are expected to be met. It is not just about the process, but about benefiting
								everyone, with an emphasis on ecological mindfulness.
							</p>
						</div>
					</div>
					<div class="flex gap-3">
						<div class="shrink-0 text-white">
							<LucideIcon name="Trash2" />
						</div>
						<div class="grow">
							<h6 class="mb-1 text-white">Permanent Delete</h6>
							<p class="text-white/60">
								The customer is very important and will receive dedicated attention. Everyone's
								needs and expectations are considered. This process is undertaken for the benefit of
								all, with a focus on ecological responsibility.
							</p>
						</div>
					</div>
					<div class="mt-6 justify-center gap-2 sm:flex">
						<a href="#!" class="btn btn-primary">Temporary Disable</a>
						<a href="#!" class="btn btn-red mt-2.5 sm:mt-0">Permanent Delete</a>
					</div>
				</div>
			</Col>
		</Grid>
	</div>
</div>
