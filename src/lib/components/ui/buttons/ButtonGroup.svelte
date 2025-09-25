<script lang="ts">
    type ButtonGroupVarient = 'horizontal' | 'vertical';
    export let varient:ButtonGroupVarient= 'horizontal'; 
</script>

<div class="{varient === 'vertical' ? 'btn-group-vertical' : 'btn-group'}">
    <slot></slot>
</div>