<script lang="ts">
    import { loaderColors} from './loader-css';
    export let color:UI.ThemeColors = 'primary';
    export let animation:UI.LoaderAnimations = 'spin';
    export let size:UI.Tailwind.Size | '' = '';
    $: loaderClass = loaderColors[`${animation}-${color}`];
</script>

<span class="spin {loaderClass} {size}"></span>