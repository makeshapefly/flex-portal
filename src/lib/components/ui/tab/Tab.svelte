<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import TabItem from './TabItem.svelte';
  import { tabColors } from './tab-css';

  export let varient: UI.TabVarient = 'default';
  export let color: UI.Colors = 'primary';
  export let setClass = '';
  export let tabStyle = '';
  export let tabs: Array<{
    title: string;
    content: string | ConstructorOfATypedSvelteComponent;
    props?: any;
    icon?: string;
    slot?: string;
  }>;

  let activeTab = 0;
  let activeClasses = 'active';

  function setActiveTab(index: number) {
    activeTab = index;
  }

  $: tabConfig = tabColors[`${varient}-${color}`];
</script>

<ul class={tabConfig.tabClasses + setClass}>
  {#each tabs as tab, index}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li on:click={() => setActiveTab(index)} class={`${varient === 'animation' ? 'w-32' : ''}`}>
      <a
        href="#!"
        class={`nav-item ${tabConfig.tabItemClasses} ${index === activeTab ? activeClasses : tabConfig.inactiveClasses} ${tabStyle}`}
      >
        {#if varient === 'icon'}
          <LucideIcon
            name={tab.icon}
            class="transition duration-200 ease-linear size-4 group-hover/item:animate-pulse"
          />
        {:else if varient === 'icon-text'}
          <LucideIcon name={tab.icon} class="inline-block size-4 ltr:mr-1 rtl:ml-1" />
          <span class="align-middle">{tab.title}</span>
        {:else if varient === 'animation'}
          <LucideIcon name={tab.icon} class="icon group-hover/item:translate-y-11" />
          <span class="content group-hover/item:visible group-hover/item:-translate-y-3"
            >{tab.title}</span
          >
        {:else}
          {tab.title}
        {/if}
      </a>
    </li>
  {/each}
</ul>
<div class="mt-4">
  {#each tabs as tab, index}
    {#if index === activeTab}
      {#if typeof tab.content === 'function'}
        {#if typeof tab.content === 'function'}
          <svelte:component this={tab.content} {...tab.props}>
            {#if tab.slot}
              {@html tab.slot}
            {/if}
          </svelte:component>
        {/if}
      {:else if typeof tab.content === 'string'}
        <TabItem content={tab.content} />
      {/if}
    {/if}
  {/each}
</div>
