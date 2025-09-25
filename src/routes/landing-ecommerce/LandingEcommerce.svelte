<script lang="ts">
	import { onMount } from 'svelte';
	import DarkMode from '$lib/components/common/DarkMode.svelte';
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
	import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import { productsData } from './landing-product';
	import 'img-comparison-slider';
	// import BeforeAfter from 'before-after';

	let isSticky = false;
	let isMenuOpen = false;
	let activeTab = 0;
	let activeTab1 = 'Brand';
	let activeLayout = 'columns-4';
	let year = new Date().getFullYear();

	// Filtered products based on active tab (category)
	let filteredProducts = productsData;

	// Method to filter products based on category
	const filterProducts = (category: string) => {
		activeTab1 = category;
		filteredProducts =
			category === 'Brand'
				? productsData
				: productsData.filter((product) => product.category === category);
	};

	const handleScroll = () => {
		isSticky = window.scrollY > 0;
	};

	// Adding event listener for scroll to change the sticky state
	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};

		// new BeforeAfter('#beforeAfter');
	});
</script>

<!----------Start Menu------------>
<div>
	<header
		class="landing-navbar dark:bg-dark-950 dark:shadow-dark-850 container top-0 mx-auto h-20 rounded-b-lg bg-white px-4 shadow-lg shadow-gray-200/50 lg:max-w-[1300px] [&.scroll-sticky]:max-w-full [&.scroll-sticky]:rounded-none"
		class:scroll-sticky={isSticky}
	>
		<div class="flex w-full items-center gap-5">
			<a href="/index" title="Logo">
				<img src="/assets/images/main-logo.png" alt="" class="inline-block h-7 dark:hidden" />
				<img src="/assets/images/logo-white.png" alt="" class="hidden h-7 dark:inline-block" />
			</a>
			<div class={`navbar-collapase mx-auto ${!isMenuOpen ? 'hidden xl:flex' : ''}`}>
				<div
					class="*:text-16 flex flex-col *:inline-block *:py-3 *:font-medium *:tracking-wide xl:flex-row xl:items-center xl:py-0 xl:*:px-3"
				>
					<a
						href="#products"
						title="products"
						on:click={() => (activeTab = 1)}
						class:active={activeTab === 1}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Products</a
					>
					<a
						href="#new-arrivals"
						title="new-arrivals"
						on:click={() => (activeTab = 2)}
						class:active={activeTab === 2}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>New Arrivals</a
					>
					<a
						href="#service"
						title="service"
						on:click={() => (activeTab = 3)}
						class:active={activeTab === 3}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>Service</a
					>
					<a
						href="#cta"
						title="cta"
						on:click={() => (activeTab = 4)}
						class:active={activeTab === 4}
						class="[&.active]:text-primary-500 hover:text-primary-500 leading-normal transition duration-300 ease-linear"
						>CTA</a
					>
				</div>
			</div>
			<div class="flex items-center gap-2 ltr:ml-auto xl:ltr:ml-0 rtl:mr-auto xl:rtl:mr-0">
				<button
					title="menu toggle"
					on:click={() => (isMenuOpen = !isMenuOpen)}
					type="button"
					class="navbar-toggle btn btn-sub-sky btn-icon rounded-full xl:!hidden ltr:ml-auto xl:ltr:ml-0 rtl:mr-auto xl:rtl:mr-0"
					aria-label="menuToggle"
				>
					<i class={isMenuOpen ? 'ri-close-line' : 'ri-menu-2-line'}></i>
				</button>
				<button type="button" title="search" class="btn btn-icon btn-active-gray rounded-full">
					<LucideIcon name="Search" class="size-4" />
				</button>
				<a
					href="/apps-ecommerce-shop-cart"
					title="shopping-cart"
					class="btn btn-icon btn-active-gray rounded-full"
				>
					<LucideIcon name="ShoppingCart" class="size-4" />
				</a>
				<Dropdown class="dropdown" alignTo="right-bottom">
					<DropdownButton isChevron={true} class="btn btn-icon btn-active-gray rounded-full">
						<img src="/assets/images/avatar/user-17.png" alt="Profile" class="rounded-full" />
					</DropdownButton>

					<DropdownMenu class="dropdown-menu !fixed !w-72" isPrintable={true}>
						<div class="p-4">
							<div class="mb-4 flex items-center gap-3">
								<img src="/assets/images/avatar/user-17.png" alt="" class="size-11 rounded-md" />
								<div>
									<h6 class="mb-0.5">Shopia Mia</h6>
									<p class="dark:text-dark-500 flex items-center gap-2 text-gray-500">
										<span class="inline-block size-2 rounded-full bg-green-500 align-baseline"
										></span> Active
									</p>
								</div>
							</div>
							<a
								href="/pages-user"
								class="dark:hover:bg-dark-850 flex w-full items-center gap-2 px-4 py-2.5 text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-50"
							>
								<i class="ri-user-line align-baseline ltr:mr-1 rtl:ml-1"></i> Profile
							</a>
							<a
								href="/apps-ecommerce-shop-cart"
								class="dark:hover:bg-dark-850 flex w-full items-center gap-2 px-4 py-2.5 text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-50"
							>
								<i class="ri-shopping-cart-2-line align-baseline ltr:mr-1 rtl:ml-1"></i> Shopping Cart
							</a>
							<a
								href="/apps-ecommerce-wishlist"
								class="dark:hover:bg-dark-850 flex w-full items-center gap-2 px-4 py-2.5 text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-50"
							>
								<i class="ri-bookmark-line align-baseline ltr:mr-1 rtl:ml-1"></i> Wish List
							</a>
							<a
								href="/pages-help-center"
								class="dark:hover:bg-dark-850 flex w-full items-center gap-2 px-4 py-2.5 text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-50"
							>
								<i class="ri-customer-service-2-line align-baseline ltr:mr-1 rtl:ml-1"></i> Help Center
							</a>
							<a
								href="/pages-account-settings"
								class="dark:hover:bg-dark-850 flex w-full items-center gap-2 px-4 py-2.5 text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-50"
							>
								<i class="ri-settings-3-line align-baseline ltr:mr-1 rtl:ml-1"></i> Account Settings
							</a>
						</div>
						<div class="flex items-center gap-2 border-y border-purple-500/20 bg-purple-500/10 p-4">
							<img src="/assets/images/ecommerce/landing/gift.png" alt="" class="size-8 shrink-0" />
							<div class="grow">
								<h6 class="mb-0.5">Refer a friend</h6>
								<p class="dark:text-dark-500 text-gray-500">7 invitation remaining</p>
							</div>
						</div>
						<div class="p-4">
							<a
								href="/auth-signin-basic"
								class="dark:hover:bg-dark-850 flex w-full items-center gap-2 px-4 py-2.5 text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-50"
							>
								<i class="ri-logout-circle-r-line align-baseline ltr:mr-1 rtl:ml-1"></i> Sign Out
							</a>
						</div>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	</header>
</div>
<!----------End Menu------------>

<!----------Start Home------------>
<section
	class="relative min-h-screen overflow-hidden bg-[url('/assets/images/ecommerce/landing/home.jpg')] bg-cover bg-center pb-48 pt-80"
>
	<div class="container lg:max-w-[1350px] lg:px-20">
		<h1
			class="absolute inset-x-0 bottom-10 text-center font-bold text-white/60 md:text-[80px] xl:text-[140px] 2xl:text-[11rem]"
		>
			DOMIEX FASHION
		</h1>
	</div>
</section>
<!----------End Home------------>

<!-- Category wise products -->
<section class="relative -mt-10 pb-14 md:pb-24">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<!-- Search Bar Section -->
		<Grid cols={12}>
			<Col cols={{ span: 12 }} lg={{ span: 8 }} class="lg:col-start-3">
				<div class="dark:bg-dark-950 rounded-lg bg-white p-5">
					<form action="#!" class="group/form relative block">
						<input
							type="text"
							class="form-input ltr:pl-9 rtl:pr-9 dark:bg-transparent"
							placeholder="Search for product, brand etc..."
						/>
						<button
							title="search"
							type="submit"
							class="dark:text-dark-500 absolute inset-y-0 flex items-center text-gray-500 focus:outline-none ltr:left-3 rtl:right-3"
						>
							<LucideIcon name="Search" class="size-4" />
						</button>
					</form>
					<div class="mt-2 flex flex-wrap items-center justify-center gap-2 whitespace-nowrap">
						<h6>Popular Search:</h6>
						<a href="#!" title="link" class="link link-primary">Fashion,</a>
						<a href="#!" title="link" class="link link-primary">Girl Top,</a>
						<a href="#!" title="link" class="link link-primary">Boys Fashion,</a>
						<a href="#!" title="link" class="link link-primary">Watch</a>
					</div>
				</div>
			</Col>
		</Grid>

		<!-- Product Tabs -->
		<div class="mt-5 flex items-center gap-5" id="products">
			<ul class="flex grow items-center gap-6 overflow-x-auto">
				<li>
					<a
						href="#!"
						title="tabs link"
						on:click={() => filterProducts('Men')}
						class:active={activeTab1 === 'Men'}
						class="link link-primary relative block py-2 text-center"
					>
						Men
					</a>
				</li>
				<li>
					<a
						href="#!"
						title="tabs link"
						on:click={() => filterProducts('Women')}
						class:active={activeTab1 === 'Women'}
						class="link link-primary relative block py-2 text-center"
					>
						Women
					</a>
				</li>
				<li>
					<a
						href="#!"
						title="tabs link"
						on:click={() => filterProducts('Children')}
						class:active={activeTab1 === 'Children'}
						class="link link-primary relative block py-2 text-center"
					>
						Children
					</a>
				</li>
				<li>
					<a
						href="#!"
						title="tabs link"
						on:click={() => filterProducts('Brand')}
						class:active={activeTab1 === 'Brand'}
						class="link link-primary relative block py-2 text-center"
					>
						Brand
					</a>
				</li>
			</ul>
			<div class="hidden shrink-0 items-center gap-3 lg:flex">
				<a
					href="#!"
					title="Columns link"
					class="link link-primary"
					class:active={activeLayout === 'columns-4'}
					on:click={() => (activeLayout = 'columns-4')}
				>
					<LucideIcon name="Columns4" class="size-5" />
				</a>
				<a
					href="#!"
					title="Columns link"
					class="link link-primary"
					class:active={activeLayout === 'columns-3'}
					on:click={() => (activeLayout = 'columns-3')}
				>
					<LucideIcon name="Columns3" class="size-5" />
				</a>
			</div>
		</div>

		<!-- Product Grid Layout -->
		<div
			class={`mt-5 grid gap-8 ${activeLayout === 'columns-4' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}`}
		>
			{#each filteredProducts as product}
				<div class="relative">
					<div
						class="dark:bg-dark-900/40 group/item relative overflow-hidden rounded-md bg-gray-100"
					>
						<img src={product.image} alt={product.name} />
						<div
							class="absolute top-2 flex opacity-0 transition-all duration-300 ease-linear group-hover/item:top-5 group-hover/item:opacity-100 ltr:right-5 rtl:left-5"
						>
							<button
								title="Rating Star Icon"
								type="button"
								class="link link-red btn btn-icon rounded-full bg-white/90 text-lg"
								aria-label="Rating Star Icon"><i class="ri-star-fill"></i></button
							>
						</div>
					</div>
					<div class="mt-3">
						<h6 class="mb-1 truncate">
							<a
								href="/apps-ecommerce-product-overview"
								class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
								>{product.name}</a
							>
						</h6>
						<p class="dark:text-dark-500 text-gray-500">{product.price}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Loading Button -->
		<div class="mt-6 flex items-center justify-center">
			<a
				href="/apps-ecommerce-products-grid"
				title="Loading btn"
				class="btn btn-primary flex items-center gap-2"
			>
				Loading ...
				<svg
					class="size-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</a>
		</div>
	</div>
</section>
<!-- Category wise products -->

<!-- Sliding banner -->
<div class="relative flex h-40 max-w-full items-center overflow-x-hidden">
	<div class="animate-marquee absolute whitespace-nowrap will-change-transform">
		<h1 class="dark:text-dark-500/20 text-8xl font-bold uppercase text-gray-500/10">
			&nbsp;Mens Fashion Winter Deal || Girls Fashion || Brand Clothes Fashion || Up to 50% Discount
			in Domiex Fashion
		</h1>
	</div>
</div>
<!-- End -->

<!-- New Arrivals -->
<section class="relative py-8 md:py-24" id="new-arrivals">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<Grid cols={12} class="mb-8 items-center gap-5">
			<Col cols={{ span: 12 }} class="2xl:col-span-5">
				<h1
					class="before:bg-primary-500 relative capitalize leading-normal drop-shadow-lg before:absolute before:h-1/2 before:w-1 before:rounded-full ltr:pl-5 ltr:before:left-0 rtl:pr-5 rtl:before:right-0"
				>
					New Arrivals this Spring Season
				</h1>
			</Col>
			<Col cols={{ span: 12 }} class="2xl:col-span-5 2xl:col-start-8">
				<p class="dark:text-dark-500 mb-3 text-gray-500">
					Spring is the time when nature blossoms, so look for pieces of clothing that feature
					flowers, leaves, and pale colors. Additionally, opt for light-weight fabrics like cotton
					or linen, since the weather is warming up.
				</p>
				<a
					href="/apps-ecommerce-products-list"
					title="All Collection"
					class="dark:border-dark-800 btn btn-outline-gray border-gray-200 font-medium"
				>
					Show All Collection
					<i class="ri-arrow-right-line ml-1 align-baseline ltr:inline-block rtl:hidden"></i>
					<i class="ri-arrow-left-line mr-1 align-baseline ltr:hidden rtl:inline-block"></i>
				</a>
			</Col>
		</Grid>
		<Grid class="gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<div class="relative">
				<div class="group/item dark:bg-dark-900/40 relative overflow-hidden bg-gray-100">
					<img src="/assets/images/ecommerce/landing/products/img-09.png" alt="" />
					<div
						class="absolute top-2 flex opacity-0 transition-all duration-300 ease-linear group-hover/item:top-5 group-hover/item:opacity-100 ltr:right-5 rtl:left-5"
					>
						<button
							title="Rating Star Icon"
							type="button"
							class="link link-red btn btn-icon rounded-full bg-white/90 text-lg"
							aria-label="Rating Star Icon"><i class="ri-star-fill"></i></button
						>
					</div>
					<div
						class="absolute top-2 bg-red-500 px-4 py-1 text-red-100 before:absolute before:-bottom-2 before:size-2 before:border-4 before:border-red-500 before:border-b-transparent ltr:left-0 ltr:before:right-0 ltr:before:border-l-transparent rtl:right-0 rtl:before:left-0 rtl:before:border-r-transparent"
					>
						50% OFF
					</div>
				</div>
				<div class="mt-4">
					<h6 class="mb-1 truncate">
						<a
							href="/apps-ecommerce-product-overview"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>Fashion Hub Women Peach Net Dress</a
						>
					</h6>
					<p class="dark:text-dark-500 text-gray-500">
						$74.99 <span class="line-through">$149.99</span>
					</p>
				</div>
			</div>
			<!--end col-->
			<div class="relative">
				<div class="group/item dark:bg-dark-900/40 relative overflow-hidden bg-gray-100">
					<img src="/assets/images/ecommerce/landing/products/img-10.png" alt="" />
					<div
						class="absolute top-2 flex opacity-0 transition-all duration-300 ease-linear group-hover/item:top-5 group-hover/item:opacity-100 ltr:right-5 rtl:left-5"
					>
						<button
							title="Rating Star Icon"
							type="button"
							class="link link-red btn bt-icon rounded-full bg-white/90 text-lg"
							aria-label="Rating Star Icon"><i class="ri-star-fill"></i></button
						>
					</div>
				</div>
				<div class="mt-4">
					<h6 class="mb-1 truncate">
						<a
							href="/apps-ecommerce-product-overview"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>Fashion portrait of young elegant woman</a
						>
					</h6>
					<p class="dark:text-dark-500 text-gray-500">$187.00</p>
				</div>
			</div>
			<!--end col-->
			<div class="relative">
				<div class="group/item dark:bg-dark-900/40 relative overflow-hidden bg-gray-100">
					<img src="/assets/images/ecommerce/landing/products/img-11.png" alt="" />
					<div
						class="absolute top-2 flex opacity-0 transition-all duration-300 ease-linear group-hover/item:top-5 group-hover/item:opacity-100 ltr:right-5 rtl:left-5"
					>
						<button
							type="button"
							title="Rating Star Icon"
							class="link link-red btn btn-icon rounded-full bg-white/90 text-lg"
							aria-label="Rating Star Icon"><i class="ri-star-fill"></i></button
						>
					</div>
					<div
						class="absolute top-2 bg-red-500 px-4 py-1 text-red-100 before:absolute before:-bottom-2 before:size-2 before:border-4 before:border-red-500 before:border-b-transparent ltr:left-0 ltr:before:right-0 ltr:before:border-l-transparent rtl:right-0 rtl:before:left-0 rtl:before:border-r-transparent"
					>
						25% OFF
					</div>
				</div>
				<div class="mt-4">
					<h6 class="mb-1 truncate">
						<a
							href="/apps-ecommerce-product-overview"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>Demonstrating winter Clothes</a
						>
					</h6>
					<p class="dark:text-dark-500 text-gray-500">
						$59.99 <span class="line-through">$79.99</span>
					</p>
				</div>
			</div>
			<!--end col-->
			<div class="relative">
				<div class="group/item dark:bg-dark-900/40 relative overflow-hidden bg-gray-100">
					<img src="/assets/images/ecommerce/landing/products/img-12.png" alt="" />
					<div
						class="absolute top-2 flex opacity-0 transition-all duration-300 ease-linear group-hover/item:top-5 group-hover/item:opacity-100 ltr:right-5 rtl:left-5"
					>
						<button
							type="button"
							title="Rating Star Icon"
							class="link link-red btn btn-icon rounded-full bg-white/90 text-lg"
							aria-label="Rating Star Icon"><i class="ri-star-fill"></i></button
						>
					</div>
				</div>
				<div class="mt-4">
					<h6 class="mb-1 truncate">
						<a
							href="/apps-ecommerce-product-overview"
							class="link hover:text-primary-500 dark:hover:text-primary-500 text-current dark:text-current"
							>Y2K Trending Korean Fashion Aesthetic Shirt</a
						>
					</h6>
					<p class="dark:text-dark-500 text-gray-500">$79.99</p>
				</div>
			</div>
			<!--end col-->
		</Grid>
	</div>
</section>
<!----------End Arrivals------------>

<a
	href="#!"
	title="Banner"
	class="relative block overflow-hidden bg-[url('/assets/images/ecommerce/landing/cta-01.jpg')] bg-center py-60"
>
	<div class="container relative mx-auto px-4 lg:max-w-[1350px]">
		<h2 class="absolute left-4 hidden font-bold uppercase text-white/70 md:flex lg:text-8xl">
			Summer
		</h2>
		<h2 class="absolute left-1/2 font-bold uppercase text-white/70 lg:right-4 lg:text-8xl">
			Fashion
		</h2>
	</div>
</a>

<section class="relative py-14 md:py-24">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<Grid cols={12} class="mb-10 items-center">
			<Col cols={{ span: 12 }} lg={{ span: 6 }} class="text-center lg:col-start-4">
				<h1 class="mb-2 capitalize leading-normal">The Coastal Edition</h1>
				<p class="dark:text-dark-500 text-gray-500">
					Clothing is practical and preppy, with plenty of coverage—it's perfect for moms and
					grandmothers who aren't interested in baring it all in a bikini at the beach.
				</p>
			</Col>
		</Grid>
		<Grid cols={12}>
			<Col cols={{ span: 6 }}>
				<div class="relative">
					<img src="/assets/images/ecommerce/landing/img-01.jpg" alt="" />
					<Dropdown class="absolute left-[38%] top-[20%]">
						<DropdownButton type="button" class="flex">
							<div
								class="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 animate-ping rounded-full bg-white"
							></div>
							<div class="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 rounded-full bg-white"></div>
						</DropdownButton>
						<DropdownMenu
							isPrintable={true}
							class="dark:bg-dark-900 dropdown-menu dropdown-right p-2 z-10 mt-1 w-48 rounded-md bg-white p-3 shadow-md"
						>
							<img
								src="/assets/images/ecommerce/landing/img-03.jpg"
								alt="Images 03"
								class="w-full object-cover"
							/>
							<h6 class="mb-1 mt-3 font-medium"><a href="#!">Faded Effect Top</a></h6>
							<p class="dark:text-dark-500 text-gray-500">$34.65</p>
						</DropdownMenu>
					</Dropdown>
				</div>
			</Col>

			<Col cols={{ span: 6 }}>
				<div class="relative">
					<img src="/assets/images/ecommerce/landing/img-02.jpg" alt="" />
					<Dropdown class="absolute bottom-[25%] left-[33%]">
						<DropdownButton type="button" class="flex">
							<div
								class="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 animate-ping rounded-full bg-white"
							></div>
							<div class="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 rounded-full bg-white"></div>
						</DropdownButton>
						<DropdownMenu
							isPrintable={true}
							class="dark:bg-dark-900 left-0 right-0 z-10 mt-1 w-48 rounded-md bg-white p-3 shadow-md"
						>
							<img
								src="/assets/images/ecommerce/landing/img-04.jpg"
								alt="Images 03"
								class="w-full object-cover"
							/>
							<h6 class="mb-1 mt-3 font-medium"><a href="#!">Short sleeve white</a></h6>
							<p class="dark:text-dark-500 text-gray-500">$49.99</p>
						</DropdownMenu>
					</Dropdown>
					<Dropdown class="absolute bottom-[38%] left-[45%]">
						<DropdownButton type="button" class="flex">
							<div
								class="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 animate-ping rounded-full bg-white"
							></div>
							<div class="absolute right-0 top-0 -mr-1 -mt-1 h-3 w-3 rounded-full bg-white"></div>
						</DropdownButton>
						<DropdownMenu
							isPrintable={true}
							class="dark:bg-dark-900 left-0 right-0 z-10 mt-1 w-48 rounded-md bg-white p-3 shadow-md"
						>
							<img
								src="/assets/images/ecommerce/landing/img-05.jpg"
								alt="Images 03"
								class="w-full object-cover"
							/>
							<h6 class="mb-1 mt-3 font-medium"><a href="#!">Luxury handbag</a></h6>
							<p class="dark:text-dark-500 text-gray-500">$79.99</p>
						</DropdownMenu>
					</Dropdown>
				</div>
			</Col>
		</Grid>
	</div>
</section>

<!-- Service -->
<section class="relative pb-10 pt-10 md:pb-24" id="service">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<Grid cols={12} gap={5} class="items-center gap-5 lg:gap-8">
			<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 3 }} class="lg:row-span-2">
				<div class="flex flex-col gap-3 md:p-5 lg:flex-row lg:items-center">
					<div class="flex size-12 shrink-0 items-center justify-center">
						<LucideIcon name="Truck" class="dark:text-dark-500 size-8 stroke-1 text-gray-500" />
					</div>
					<div class="grow overflow-hidden">
						<h6 class="mb-1">Free Shipping</h6>
						<p class="dark:text-dark-500 truncate text-gray-500">
							Enjoy free shipping on orders over $149.
						</p>
					</div>
				</div>
			</Col>
			<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 3 }}>
				<div class="flex flex-col gap-3 md:p-5 lg:flex-row lg:items-center">
					<div class="flex size-12 shrink-0 items-center justify-center">
						<LucideIcon name="Handshake" class="dark:text-dark-500 size-8 stroke-1 text-gray-500" />
					</div>
					<div class="grow overflow-hidden">
						<h6 class="mb-1">Money Guarantee</h6>
						<p class="dark:text-dark-500 truncate text-gray-500">Exchange within 30 days</p>
					</div>
				</div>
			</Col>
			<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 3 }}>
				<div class="flex flex-col gap-3 md:p-5 lg:flex-row lg:items-center">
					<div class="flex size-12 shrink-0 items-center justify-center">
						<LucideIcon name="Headset" class="dark:text-dark-500 size-8 stroke-1 text-gray-500" />
					</div>
					<div class="grow overflow-hidden">
						<h6 class="mb-1">Online Help Center</h6>
						<p class="dark:text-dark-500 truncate text-gray-500">24 hours a day, 7 days a week</p>
					</div>
				</div>
			</Col>
			<Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 3 }} class="lg:row-span-2">
				<div class="flex flex-col gap-3 md:p-5 lg:flex-row lg:items-center">
					<div class="flex size-12 shrink-0 items-center justify-center">
						<LucideIcon
							name="CreditCard"
							class="dark:text-dark-500 size-8 stroke-1 text-gray-500"
						/>
					</div>
					<div class="grow overflow-hidden">
						<h6 class="mb-1">Flexible Payment Options</h6>
						<p class="dark:text-dark-500 truncate text-gray-500">Pay Using Multiple Credit Cards</p>
					</div>
				</div>
			</Col>
			<Col cols={{ span: 12 }} lg={{ span: 6 }} class="text-center">
				<h1
					class="lg:before:bg-primary-500 relative capitalize leading-normal drop-shadow-lg lg:before:absolute lg:before:h-1/2 lg:before:w-1 lg:before:rounded-full lg:ltr:pl-5 lg:ltr:before:left-0 lg:rtl:pr-5 lg:rtl:before:right-0"
				>
					Benefits You Get When Using Our Service
				</h1>
			</Col>
		</Grid>
	</div>
</section>
<!--service end-->

<!----------Start CTA------------>
<section class="relative pb-14 pt-8 md:pb-24" id="cta">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<div class="grid grid-cols-12 items-center gap-5">
			<div class="col-span-12 md:col-span-6">
				<div id="beforeAfterImages" class="relative">
					<img-comparison-slider class="w-full">
						<img
							slot="first"
							src="/assets/images/ecommerce/landing/cta-02.jpg"
							alt="Before"
							class="w-full"
						/>
						<img
							slot="second"
							src="/assets/images/ecommerce/landing/cta-03.jpg"
							alt="After"
							class="w-full"
						/>
					</img-comparison-slider>
					<div class="absolute left-5 top-5">
						<span class="badge text-13 border-transparent bg-white text-gray-500">After</span>
					</div>
					<div class="absolute bottom-5 right-5">
						<span class="badge text-13 border-transparent bg-white text-gray-500">Before</span>
					</div>
				</div>
			</div>
			<div class="col-span-12 text-center md:col-span-6 2xl:col-span-4 2xl:col-start-8">
				<h1
					class="before:bg-primary-500 relative mb-3 capitalize leading-normal drop-shadow-lg before:absolute before:h-1/2 before:w-1 before:rounded-full ltr:pl-5 ltr:before:left-0 rtl:pr-5 rtl:before:right-0"
				>
					Layer Up with Expertly Designed Pieces
				</h1>
				<p class="mb-5 text-gray-500">
					Discover our collection of meticulously crafted pieces that are perfect for layering. Each
					item is designed to complement your style and keep you comfortable, no matter the season.
				</p>
				<a
					href="/apps-ecommerce-products-grid"
					title="shop now"
					class="dark:border-dark-800 btn btn-outline-gray border-gray-200 font-medium"
				>
					Shop Now
					<i class="ri-arrow-right-line ml-1 align-baseline ltr:inline-block rtl:hidden"></i>
					<i class="ri-arrow-left-line mr-1 align-baseline ltr:hidden rtl:inline-block"></i>
				</a>
			</div>
		</div>
	</div>
</section>
<!----------End CTA------------>

<section class="relative pt-8">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<div class="mb-8 text-center">
			<h1 class="relative capitalize leading-normal drop-shadow-lg">Follow us Instagram @domiex</h1>
		</div>
	</div>
	<Grid cols={2} class="items-center lg:grid-cols-3 2xl:grid-cols-5">
		<a href="#!" title="Instagram Post" class="group/item relative block">
			<img src="/assets/images/ecommerce/landing/instagram/img-01.jpg" alt="" />
			<div
				class="absolute inset-0 bg-gray-950/15 opacity-0 transition-all duration-300 group-hover/item:opacity-100"
			></div>
			<LucideIcon
				name="Instagram"
				class="absolute left-1/2 top-[45%] block size-8 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover/item:top-1/2 group-hover/item:opacity-100"
			/>
		</a>
		<a href="#!" title="Instagram Post" class="group/item relative block">
			<img src="/assets/images/ecommerce/landing/instagram/img-02.jpg" alt="" />
			<div
				class="absolute inset-0 bg-gray-950/15 opacity-0 transition-all duration-300 group-hover/item:opacity-100"
			></div>
			<LucideIcon
				name="Instagram"
				class="absolute left-1/2 top-[45%] block size-8 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover/item:top-1/2 group-hover/item:opacity-100"
			/>
		</a>
		<a href="#!" title="Instagram Post" class="group/item relative block">
			<img src="/assets/images/ecommerce/landing/instagram/img-03.jpg" alt="" />
			<div
				class="absolute inset-0 bg-gray-950/15 opacity-0 transition-all duration-300 group-hover/item:opacity-100"
			></div>
			<LucideIcon
				name="Instagram"
				class="absolute left-1/2 top-[45%] block size-8 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover/item:top-1/2 group-hover/item:opacity-100"
			/>
		</a>
		<a href="#!" title="Instagram Post" class="group/item relative block">
			<img src="/assets/images/ecommerce/landing/instagram/img-04.jpg" alt="" />
			<div
				class="absolute inset-0 bg-gray-950/15 opacity-0 transition-all duration-300 group-hover/item:opacity-100"
			></div>
			<LucideIcon
				name="Instagram"
				class="absolute left-1/2 top-[45%] block size-8 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover/item:top-1/2 group-hover/item:opacity-100"
			/>
		</a>
		<a href="#!" title="Instagram Post" class="group/item relative block">
			<img src="/assets/images/ecommerce/landing/instagram/img-05.jpg" alt="" />
			<div
				class="absolute inset-0 bg-gray-950/15 opacity-0 transition-all duration-300 group-hover/item:opacity-100"
			></div>
			<LucideIcon
				name="Instagram"
				class="absolute left-1/2 top-[45%] block size-8 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover/item:top-1/2 group-hover/item:opacity-100"
			/>
		</a>
	</Grid>
</section>

<!-- Footer -->
<footer class="relative">
	<div class="container mx-auto px-4 lg:max-w-[1350px]">
		<Grid cols={12} gap={4} class="py-16 md:gap-x-8">
			<Col cols={{ span: 12 }} lg={{ span: 5 }} class="lg:pr-10">
				<h5 class="drop-shadow-lg">Stay Connected</h5>
				<div class="relative mt-5">
					<input
						type="text"
						class="form-input rounded-none border-0 border-b-2 ltr:pr-8 rtl:pl-8 dark:bg-transparent"
						placeholder="Enter your email"
					/>
					<button
						type="submit"
						title="submit"
						class="link link-primary absolute top-2 ltr:right-0 rtl:left-0"
					>
						<LucideIcon name="MoveRight" class="ltr:inline-block rtl:hidden" />
					</button>
				</div>
				<p class="dark:text-dark-500 mt-5 text-gray-500">
					Enjoy 15% off your first purchase as a thank you for staying in touch.
				</p>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 4 }} lg={{ span: 2 }}>
				<h5 class="mb-5 drop-shadow-lg">Quick Links</h5>
				<ul class="space-y-5">
					<li><a href="#!" class="link link-primary">My Account</a></li>
					<li><a href="#!" class="link link-primary">Cart</a></li>
					<li><a href="#!" class="link link-primary">Wishlist</a></li>
					<li><a href="#!" class="link link-primary">Product Overview</a></li>
					<li><a href="#!" class="link link-primary">Checkout</a></li>
				</ul>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 4 }} lg={{ span: 2 }}>
				<h5 class="mb-5 drop-shadow-lg">Services</h5>
				<ul class="space-y-5">
					<li><a href="#!" class="link link-primary">Privacy Policy</a></li>
					<li><a href="#!" class="link link-primary">Refund Policy</a></li>
					<li><a href="#!" class="link link-primary">Shipping & Return</a></li>
					<li><a href="#!" class="link link-primary">Term & Condition</a></li>
					<li><a href="#!" class="link link-primary">Help Center</a></li>
				</ul>
			</Col>
			<Col cols={{ span: 12 }} md={{ span: 4 }} lg={{ span: 3 }}>
				<h5 class="mb-5 drop-shadow-lg">Our Store</h5>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					Find the nearest location to you. <a
						href="#!"
						class="dark:text-dark-50 text-gray-900 underline">Visit our Stores</a
					>
				</p>
				<p class="mb-1"><a href="tel:241012345678">+241 01234 5678</a></p>
				<p><a href="mailto:support@example.com">support@example.com</a></p>
			</Col>
		</Grid><!--end grid-->
		<div
			class="dark:border-dark-800 grid grid-cols-1 flex-wrap justify-between gap-5 border-t border-dashed border-gray-200 py-6 text-center md:grid-cols-3"
		>
			<div class="flex justify-center gap-6 text-lg md:justify-start">
				<a href="#!" title="twitter" class="link link-sky" aria-label="social-link"
					><i class="ri-twitter-x-line"></i></a
				>
				<a href="#!" title="instagram" class="link link-pink" aria-label="social-link"
					><i class="ri-instagram-line"></i></a
				>
				<a href="#!" title="amazon" class="link link-green" aria-label="social-link"
					><i class="ri-amazon-line"></i></a
				>
				<a href="#!" title="chrome" class="link link-red" aria-label="social-link"
					><i class="ri-chrome-line"></i></a
				>
			</div>
			<div class="text-center">
				<p class="dark:text-dark-500 text-gray-500">
					&copy; {year} Domiex. Crafted by
					<a href="#!" title="SRBThemes" class="font-semibold">SRBThemes</a>
				</p>
			</div>
			<div class="flex justify-center gap-5 text-lg md:justify-end">
				<a href="#!" title="Payment"
					><img src="/assets/images/payment/american.png" alt="" class="h-6" /></a
				>
				<a href="#!" title="Payment"
					><img src="/assets/images/payment/mastercard.png" alt="" class="h-6" /></a
				>
				<a href="#!" title="Payment"
					><img src="/assets/images/payment/visa.png" alt="" class="h-6" /></a
				>
			</div>
		</div>
		<!--end grid-->
	</div>
</footer>
<!-- Footer End -->

<DarkMode />
