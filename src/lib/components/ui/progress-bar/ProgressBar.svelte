<script lang="ts">
	import { getCompletedClass } from './progress-bar';
	import { progressColors } from './progress-bar-css';
	export let percent: number;
	export let color: UI.ThemeColors = 'primary';
	export let varient: UI.ProgressVariant = 'default';
	export let progressCss = '';
	export let text = '';

	$: completed = getCompletedClass(percent);
	$: progressColor = progressColors[`${varient}-${color}`];
</script>

<div class="progress-bar">
	<div class="{completed} {progressColor}-500 {progressCss} progress-bar-wrap">{text}</div>
</div>
