<script lang="ts">
	import LucideIcon from '$lib/components/common/LucideIcon.svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/AccordionItem.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Col from '$lib/components/ui/grid/Col.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';

	const faqItems = [
		{
			title: 'Why do we use Tailwind CSS?',
			content: `Tailwind CSS is used to design and style web pages fast and Responsive. 
      <strong>Rapid Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support</strong> are the main reasons for using Tailwind CSS.`
		},
		{
			title: 'Can we change the base font-family in Tailwind config?',
			content: `Yes, we can change the base <code class='text-pink-500'>font-family</code> in 
      Tailwind <code class='text-pink-500'>config.</code> To adjust the main font style in Tailwind CSS, 
      you can modify it by making changes in the <strong>“theme”</strong> part of your configuration file 
      (<code class='text-pink-500'>tailwind.config.js</code>). Just open that file, find the theme section, 
      and add or update the fontFamily setting.`
		},
		{
			title: 'How to create a form with Tailwind CSS?',
			content: `Tailwind CSS offers Tailwind forms as plugins that provide a foundational reset for form styles. 
      <strong>Install TailwindCSS</strong> by writing the following command. We can also use utility classes 
      to make a form with Tailwind CSS, using the easy-to-apply classes for backgrounds, borders, shadows, etc.`
		},
		{
			title: 'What is Tailwind CSS, and what is Utility-First CSS?',
			content: `Tailwind CSS is a <strong>utility-first CSS framework</strong> designed for rapid UI development. 
      Instead of providing pre-built components, it offers low-level utility classes that let you build custom designs without ever leaving your HTML.`
		},

		{
			title: 'Why do we use Tailwind CSS?',
			content: `Tailwind CSS is used to design and style web pages fast and Responsive. 
      <strong>Rapid Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support</strong> are the main reasons for using Tailwind CSS.`
		},
		{
			title: 'Why do we use Tailwind CSS?',
			content: `Tailwind CSS is used to design and style web pages fast and Responsive. 
      <strong>Rapid Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support</strong> are the main reasons for using Tailwind CSS.`
		},
		{
			title: 'Is Tailwind CSS open-source (FREE to use)?',
			content: `Tailwind CSS is an <strong>open-source project</strong>, available for free usage and a utility-first CSS framework that provides responsiveness.`
		},
		{
			title: 'How to integrate Tailwind CSS into the HTML file?',
			content: `We can easily integrate Tailwind CSS to the project via <strong>CDN links</strong> and by installing it from npm or yarn.`
		},
		{
			title: 'Do Tailwind CSS 3 Classes Override Previous Classes?',
			content: `Tailwind CSS is designed to be a low-level utility-first framework, which means 
      that classes are not automatically overridden by default.`
		},
		{
			title: 'How to make text bold in Tailwind CSS?',
			content: `For achieving bold text, we can easily add the utility class <code class='text-pink-500'>font-bold</code>.`
		},
		{
			title: 'How to center both horizontally and vertically?',
			content: `We can easily add the utility class <code class='text-pink-500'>self-center</code>.`
		},
		{
			title: 'What are the Empty elements in HTML?',
			content: `The empty elements in HTML are the elements that don’t require a closing tag. 
      These elements are also known as <strong>self-closing elements</strong>. 
      Example: <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code> etc.`
		}
	];

	const videos = [
		{
			src: 'https://www.youtube.com/embed/DxcJbrs6rKk?si=r9xt6eHRj0kayf8d',
			title: 'YouTube video player 1',
			frameborder: '0'
		},
		{
			src: 'https://www.youtube.com/embed/eSzNNYk7nVU?si=EHJjJ8BjAsp6yMgx',
			title: 'YouTube video player 2',
			frameborder: '0'
		},
		{
			src: 'https://www.youtube.com/embed/MAtaT8BZEAo?si=iyOi2lREUWB35ct6',
			title: 'YouTube video player 3',
			frameborder: '0'
		}
	];
</script>

<Grid cols={12} gapX="gap-x-space">
	<Col cols={{ span: 12 }}>
		<Card>
			<CardHeader>
				<h6>Frequently asked questions (FAQ)</h6>
			</CardHeader>
			<CardBody>
				<p class="dark:text-dark-500 mb-4 text-gray-500">
					They serve as a self-service tool for customers to easily find the information they need
					without contacting customer support.
				</p>
				<div class="grid grid-cols-1 items-center gap-3 xl:grid-cols-2">
					<div class="xl:hidden">
						<div class="text-center">
							<img src="/assets/images/auth/faq.png" alt="" class="mx-auto" />

							<h5 class="mt-5 mb-1">Frequently asked questions (FAQ)</h5>
							<p class="dark:text-dark-500 mb-5 text-gray-500">
								Cleaning up common queries about domiex.
							</p>
							<div class="flex flex-wrap items-center justify-center gap-3">
								<button class="btn btn-purple"
									><LucideIcon name="Phone" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Contact
									US</button
								>
								<button class="btn btn-gray"
									><LucideIcon name="Headset" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Help Center</button
								>
							</div>
						</div>
					</div>
					<div class="space-y-3">
						<div>
							<Accordion color="primary" varient="boxed">
								{#each faqItems as item, index}
									<AccordionItem {index} title={item.title}>
										<p>{@html item.content}</p>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					</div>

					<div class="hidden xl:block">
						<div class="text-center">
							<img src="/assets/images/auth/faq.png" alt="" class="mx-auto" />
							<h5 class="mt-5 mb-1">Frequently asked questions (FAQ)</h5>
							<p class="dark:text-dark-500 mb-5 text-gray-500">
								Cleaning up common queries about domiex.
							</p>
							<div class="flex items-center justify-center gap-3">
								<a href="/pages-contact-us" class="btn btn-purple"
									><LucideIcon name="Phone" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Contact
									US</a
								>
								<a href="/pages-help-center" class="btn btn-sub-gray"
									><LucideIcon name="Headset" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Help Center</a
								>
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	</Col>

	<Col cols={{ span: 12 }}>
		<Card>
			<CardHeader>
				<h6>Video Tutorial by Domiex</h6>
			</CardHeader>
			<CardBody>
				<div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
					{#each videos as { src, title, frameborder }}
						<iframe
							class="aspect-video w-full rounded-xl"
							{src}
							{title}
							{frameborder}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
					{/each}
				</div>
			</CardBody>
		</Card>
	</Col>
</Grid>
