<script>
	export let title = 'Title';
	export let sub_title = 'SubTitle';
</script>

<div class="page-heading flex-col items-start gap-1 sm:flex-row sm:items-center">
	<h6 class="grow group-data-[nav-type=pattern]:text-white">{title}</h6>
	<ul class="breadcrumb *:before:content-['\EA6E']">
		<li class="breadcrumb-item"><a href="#!">{sub_title}</a></li>
		<li class="breadcrumb-item active">{title}</li>
	</ul>
</div>
