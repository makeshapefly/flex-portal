<script>
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/AccordionItem.svelte';
	import CollapseButton from '$lib/components/ui/buttons/CollapseButton.svelte';
	import Card from '$lib/components/ui/card/Card.svelte';
	import CardBody from '$lib/components/ui/card/CardBody.svelte';
	import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
	import Grid from '$lib/components/ui/grid/Grid.svelte';
	import PageHeading from '$lib/components/common/PageHeading.svelte';
</script>

<PageHeading title="Accordion & Collapse" sub_title="UI" />
<Grid cols={1} md={2} gapX="space">
	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Basic Accordion</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="grid grid-cols-12 gap-5">
				<Accordion class="col-span-12 md:col-span-6" color="primary">
					<AccordionItem index={0} title="Why do we use Tailwind CSS?">
						<p>
							Tailwind CSS is used to design and style web pages fast and Responsive. Rapid
							Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and
							Community Support are the main reasons for using Tailwind CSS.
						</p>
					</AccordionItem>
					<AccordionItem index={1} title="Can we change the base font-family in Tailwind config?">
						<p>
							Yes, we can change the base <code class="text-pink-500">font-family</code> in Tailwind
							<code class="text-pink-500">config.</code>
							To adjust the main font style in Tailwind CSS, you can modify it by making changes in
							the “theme” part of your configuration file (<code class="text-pink-500"
								>tailwind.config.js</code
							>). Just open that file, find the theme section, and add or update the fontFamily
							setting. We can also Change the font-family in the Tailwind config with different
							techniques Changing base font-family, Adding a new font family, Removing font family.
						</p>
					</AccordionItem>
					<AccordionItem index={2} title="How to create a form with Tailwind CSS?">
						<p>
							Tailwind CSS, offers Tailwind forms as plugins that provide a foundational reset for
							form styles. Install TailwindCSS by writing the following command. We can also use
							utility classes to make a form with Tailwind CSS, use the easy-to-apply classes for
							backgrounds, borders, shadows, etc. Start by creating the form element and use the
							space-y- class to add vertical spacing between the form controls.”
						</p>
					</AccordionItem>
				</Accordion>

				<Accordion class="col-span-12 md:col-span-6" color="green">
					<AccordionItem index={0} title="Why do we use Tailwind CSS?">
						<p>
							Tailwind CSS is used to design and style web pages fast and Responsive. Rapid
							Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and
							Community Support are the main reasons for using Tailwind CSS.
						</p>
					</AccordionItem>
					<AccordionItem index={1} title="Can we change the base font-family in Tailwind config?">
						<p>
							Yes, we can change the base <code class="text-pink-500">font-family</code> in Tailwind
							<code class="text-pink-500">config.</code>
							To adjust the main font style in Tailwind CSS, you can modify it by making changes in
							the “theme” part of your configuration file (<code class="text-pink-500"
								>tailwind.config.js</code
							>). Just open that file, find the theme section, and add or update the fontFamily
							setting. We can also Change the font-family in the Tailwind config with different
							techniques Changing base font-family, Adding a new font family, Removing font family.
						</p>
					</AccordionItem>
					<AccordionItem index={2} title="How to create a form with Tailwind CSS?">
						<p>
							Tailwind CSS, offers Tailwind forms as plugins that provide a foundational reset for
							form styles. Install TailwindCSS by writing the following command. We can also use
							utility classes to make a form with Tailwind CSS, use the easy-to-apply classes for
							backgrounds, borders, shadows, etc. Start by creating the form element and use the
							space-y- class to add vertical spacing between the form controls.”
						</p>
					</AccordionItem>
				</Accordion>
			</div>
		</CardBody>
	</Card>

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Boxed Accordion</CardTitle>
		</CardHeader>
		<CardBody>
			<Grid cols={12} gap={5}>
				<Accordion class="col-span-12 md:col-span-6" color="green" varient="boxed">
					<AccordionItem index={0} title="Why do we use Tailwind CSS?">
						<p>
							Tailwind CSS is used to design and style web pages fast and Responsive. Rapid
							Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and
							Community Support are the main reasons for using Tailwind CSS.
						</p>
					</AccordionItem>
					<AccordionItem index={1} title="Can we change the base font-family in Tailwind config?">
						<p>
							Yes, we can change the base <code class="text-pink-500">font-family</code> in Tailwind
							<code class="text-pink-500">config.</code>
							To adjust the main font style in Tailwind CSS, you can modify it by making changes in
							the “theme” part of your configuration file (<code class="text-pink-500"
								>tailwind.config.js</code
							>). Just open that file, find the theme section, and add or update the fontFamily
							setting. We can also Change the font-family in the Tailwind config with different
							techniques Changing base font-family, Adding a new font family, Removing font family.
						</p>
					</AccordionItem>
					<AccordionItem index={2} title="How to create a form with Tailwind CSS?">
						<p>
							Tailwind CSS, offers Tailwind forms as plugins that provide a foundational reset for
							form styles. Install TailwindCSS by writing the following command. We can also use
							utility classes to make a form with Tailwind CSS, use the easy-to-apply classes for
							backgrounds, borders, shadows, etc. Start by creating the form element and use the
							space-y- class to add vertical spacing between the form controls.”
						</p>
					</AccordionItem>
				</Accordion>

				<Accordion class="col-span-12 md:col-span-6" color="purple" varient="solid-boxed">
					<AccordionItem index={0} title="Why do we use Tailwind CSS?">
						<p>
							Tailwind CSS is used to design and style web pages fast and Responsive. Rapid
							Development, Highly Customizable, Reduced CSS File Size, Great Documentation, and
							Community Support are the main reasons for using Tailwind CSS.
						</p>
					</AccordionItem>
					<AccordionItem index={1} title="Can we change the base font-family in Tailwind config?">
						<p>
							Yes, we can change the base <code class="text-pink-500">font-family</code> in Tailwind
							<code class="text-pink-500">config.</code>
							To adjust the main font style in Tailwind CSS, you can modify it by making changes in
							the “theme” part of your configuration file (<code class="text-pink-500"
								>tailwind.config.js</code
							>). Just open that file, find the theme section, and add or update the fontFamily
							setting. We can also Change the font-family in the Tailwind config with different
							techniques Changing base font-family, Adding a new font family, Removing font family.
						</p>
					</AccordionItem>
					<AccordionItem index={2} title="How to create a form with Tailwind CSS?">
						<p>
							Tailwind CSS, offers Tailwind forms as plugins that provide a foundational reset for
							form styles. Install TailwindCSS by writing the following command. We can also use
							utility classes to make a form with Tailwind CSS, use the easy-to-apply classes for
							backgrounds, borders, shadows, etc. Start by creating the form element and use the
							space-y- class to add vertical spacing between the form controls.”
						</p>
					</AccordionItem>
				</Accordion>
			</Grid><!--end grid-->
		</CardBody>
	</Card>

	<Card class="col-span-12">
		<CardHeader>
			<CardTitle>Collapse</CardTitle>
		</CardHeader>
		<CardBody>
			<CollapseButton color="primary" text="Why do we use Tailwind CSS?" varient="outline">
				<p>
					Tailwind CSS is used to design and style web pages fast and Responsive. Rapid Development,
					Highly Customizable, Reduced CSS File Size, Great Documentation, and Community Support are
					the main reasons for using Tailwind CSS.
				</p>
			</CollapseButton>
		</CardBody>
	</Card>
</Grid>
