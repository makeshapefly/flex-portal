<script lang="ts">
    import {
        colSpanMap,
        colSpanSMMap,
        colSpanMDMap,
        colSpanLGMap,
        colSpanXLMap,
        colSpan2XLMap,
        colStartMap,
        colStartSMMap,
        colStartMDMap,
        colStartLGMap,
        colStartXLMap,
        colStart2XLMap,
        colEndMap,
        colEndSMMap,
        colEndMDMap,
        colEndLGMap,
        colEndXLMap,
        colEnd2XLMap
    } from './col';

    export let cols:{
        span?:UI.Tailwind.GridColSpan,
        start?:UI.Tailwind.GridColStartEnd,
        end?:UI.Tailwind.GridColStartEnd
    } = { };

    export let sm: {
        span?:UI.Tailwind.GridColSpan,
        start?:UI.Tailwind.GridColStartEnd,
        end?:UI.Tailwind.GridColStartEnd
    } ={};

    export let md: {
        span?:UI.Tailwind.GridColSpan,
        start?:UI.Tailwind.GridColStartEnd,
        end?:UI.Tailwind.GridColStartEnd
    } ={};

    export let lg: {
        span?:UI.Tailwind.GridColSpan,
        start?:UI.Tailwind.GridColStartEnd,
        end?:UI.Tailwind.GridColStartEnd
    } ={};

    export let xl: {
        span?:UI.Tailwind.GridColSpan,
        start?:UI.Tailwind.GridColStartEnd,
        end?:UI.Tailwind.GridColStartEnd
    } ={};

    export let xxl: {
        span?:UI.Tailwind.GridColSpan,
        start?:UI.Tailwind.GridColStartEnd,
        end?:UI.Tailwind.GridColStartEnd
    } ={};

    $: span = cols?.span ? colSpanMap[cols.span] : '';
    $: start = cols?.start ? colStartMap[cols.start] : '';
    $: end = cols?.end ? colEndMap[cols.end] : '';

    $: smSpan = sm?.span ? colSpanSMMap[sm.span] : '';
    $: smStart = sm?.start ? colStartSMMap[sm.start] : '';
    $: smEnd = sm?.end ? colEndSMMap[sm.end] : '';

    $: mdSpan = md?.span ? colSpanMDMap[md.span] : '';
    $: mdStart = md?.start ? colStartMDMap[md.start] : '';
    $: mdEnd = md?.end ? colEndMDMap[md.end] : '';

    $: lgSpan = lg?.span ? colSpanLGMap[lg.span] : '';
    $: lgStart = lg?.start ? colStartLGMap[lg.start] : '';
    $: lgEnd = lg?.end ? colEndLGMap[lg.end] : '';

    $: xlSpan = xl?.span ? colSpanXLMap[xl.span] : '';
    $: xlStart = xl?.start ? colStartXLMap[xl.start] : '';
    $: xlEnd = xl?.end ? colEndXLMap[xl.end] : '';

    $: xxlSpan = xxl?.span ? colSpan2XLMap[xxl.span] : '';
    $: xxlStart = xxl?.start ? colStart2XLMap[xxl.start] : '';
    $: xxlEnd = xxl?.end ? colEnd2XLMap[xxl.end] : '';
    let props = {};

    $: {
        const {
            cols: _cols,
            sm: _sm,
            md: _md,
            lg: _lg,
            xl: _xl,
            xxl: _xxl,
            class: _class,
            ...rest
        } = $$props;
        props = rest;
    }
</script>

<div
    class={`col${span}${start}${end}${smSpan}${smStart}${smEnd}${mdSpan}${mdStart}${mdEnd}${lgSpan}${lgStart}${lgEnd}${xlSpan}${xlStart}${xlEnd}${xxlSpan}${xxlStart}${xxlEnd}${$$props.class ? ' ' + $$props.class : ''}`}
    {...props}
>
    <slot></slot>
</div>