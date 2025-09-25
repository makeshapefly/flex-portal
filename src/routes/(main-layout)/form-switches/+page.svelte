<script>
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Switches" sub_title="Forms" />
<Grid cols={12} gapX="space">
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Default</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<label for="togglePrimary" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="togglePrimary" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-primary peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="togglePurple" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="togglePurple" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-purple peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleGreen" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleGreen" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-green peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleRed" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleRed" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-red peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleYellow" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleYellow" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-yellow peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleSky" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleSky" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-sky peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="togglePink" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="togglePink" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-pink peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleGray" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleGray" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-gray peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Soft Switches</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<label for="togglePrimary1" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="togglePrimary1" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-primary peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="togglePurple2" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="togglePurple2" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-purple peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleGreen3" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleGreen3" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-green peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleRed4" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleRed4" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-red peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleYellow5" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleYellow5" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-yellow peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleSky6" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleSky6" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-sky peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="togglePink7" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="togglePink7" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-pink peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleGray8" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleGray8" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-gray peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
			</div>
		</CardBody>
	</Col>
	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Soft Colored Switches</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<label for="togglePrimary11" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="togglePrimary11" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-primary-500/15"></div>
						<div
							class="switch-dot peer-checked:!bg-primary-500 peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="togglePurple12" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="togglePurple12" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-purple-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-purple-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleGreen13" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleGreen13" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-green-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-green-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleRed14" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleRed14" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-red-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-red-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleYellow15" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleYellow15" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-yellow-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-yellow-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleSky16" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleSky16" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-sky-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-sky-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="togglePink17" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="togglePink17" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-pink-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-pink-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleOarnge17" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleOarnge17" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-orange-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-orange-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleIndigo17" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleIndigo17" class="peer sr-only" />
						<div class="switch-wrapper peer-checked:!bg-indigo-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-indigo-500 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Text or Icon with Switches Examples</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<label for="toggleYesNo1" class="switch-group switch-soft switch-text">
					<div class="relative">
						<input type="checkbox" id="toggleYesNo1" class="peer sr-only" checked />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot peer-checked:bg-primary-500 peer-checked:after:text-primary-50 peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleYesNo2" class="switch-group switch-soft switch-text">
					<div class="relative">
						<input type="checkbox" id="toggleYesNo2" class="peer sr-only" checked />
						<div class="switch-wrapper peer-checked:!bg-purple-500/15"></div>
						<div
							class="switch-dot peer-checked:translate-x-full peer-checked:!bg-purple-500 peer-checked:after:text-purple-50 rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleIcons" class="switch-group switch-soft switch-text">
					<div class="relative">
						<input type="checkbox" id="toggleIcons" class="peer sr-only" checked />
						<div class="switch-wrapper peer-checked:!bg-purple-500/15"></div>
						<div
							class="switch-dot after:font-remix peer-checked:translate-x-full peer-checked:!bg-purple-500 after:!content-['\ea64'] peer-checked:after:text-purple-50 peer-checked:after:!content-['\ea6e'] rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} md={{ span: 6 }} class="card">
		<CardHeader>
			<CardTitle>Square Examples</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<label for="toggleSquare" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleSquare" class="peer sr-only" checked />
						<div class="switch-wrapper !rounded-md"></div>
						<div
							class="switch-dot switch-primary !rounded-md peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleSquare2" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleSquare2" class="peer sr-only" checked />
						<div class="switch-wrapper !rounded-md"></div>
						<div
							class="switch-dot peer-checked:!bg-primary-500 !rounded-md peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleSquare3" class="switch-group switch-soft">
					<div class="relative">
						<input type="checkbox" id="toggleSquare3" class="peer sr-only" checked />
						<div class="switch-wrapper peer-checked:bg-primary-500/15 !rounded-md"></div>
						<div
							class="switch-dot peer-checked:!bg-primary-500 !rounded-md peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggleSquare4" class="switch-group">
					<div class="relative">
						<input type="checkbox" id="toggleSquare4" class="peer sr-only" checked />
						<div
							class="switch-wrapper peer-checked:bg-primary-500 peer-checked:border-primary-500 !rounded-md"
						></div>
						<div
							class="switch-dot peer-checked:bg-primary-50 !rounded-md peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
			</div>
		</CardBody>
	</Col>

	<Col cols={{ span: 12 }} class="card">
		<CardHeader>
			<CardTitle>Square Examples</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap items-center gap-3">
				<label for="toggle3D1" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D1" class="peer sr-only" checked />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-primary peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D2" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D2" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-purple peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D3" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D3" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-green peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D4" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D4" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-red peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D5" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D5" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-yellow peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D6" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D6" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-sky peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D7" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D7" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-pink peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D8" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D8" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-orange peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
				<label for="toggle3D9" class="switch-group switch-3d">
					<div class="relative">
						<input type="checkbox" id="toggle3D9" class="peer sr-only" />
						<div class="switch-wrapper"></div>
						<div
							class="switch-dot switch-indigo peer-checked:translate-x-full rtl:peer-checked:-translate-x-full"
						></div>
					</div>
				</label>
			</div>
		</CardBody>
	</Col>
</Grid>
