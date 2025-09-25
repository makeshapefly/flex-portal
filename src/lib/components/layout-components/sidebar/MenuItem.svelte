<script lang="ts">
  import MenuItem from './MenuItem.svelte';
  import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
  import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
  import { Menu, MenuLink, Seperator } from '$lib/data/menu';
  import { layoutStore } from '$lib/stores/layout';
  import LucidIcon from '$lib/components/common/LucideIcon.svelte';
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { DropdownState } from '$lib/stores/dropdown';
  export let item: UI.IMenu | UI.ISeperator | UI.IMenuLink;
  // group-data-[sidebar=small]:hidden
</script>

{#if item instanceof Seperator}
  <li class="menu-title">
    <span class="group-data-[sidebar=small]:hidden"
      >{$layoutStore.languageData[item.lang] ?? item.title}</span
    > <i data-lucide="ellipsis" class="hidden group-data-[sidebar=small]:block mx-auto size-4"></i>
  </li>
{/if}
{#if item instanceof MenuLink}
  <li class="relative">
    <a href={item.link} class="nav-link">
      {#if item.icon}
        <span class="w-6 group-data-[sidebar=small]:mx-auto shrink-0">
          {#if item.icon}
            <LucidIcon
              name={item.icon}
              class="size-4 group-data-[sidebar=small]:size-5 group-data-[sidebar=medium]:size-5"
            ></LucidIcon>
          {/if}
        </span>
      {/if}
      <span
        class={`${$layoutStore.sidebarSize === 'small' && item?.level === 'main' ? 'group-data-[sidebar=small]:hidden' : ''}`}
        >{$layoutStore.languageData[item.lang] ?? item.title}</span
      >
    </a>
  </li>
{/if}
{#if item instanceof Menu && item.level === 'main'}
  <Dropdown
    containerTag="li"
    class="relative"
    alignTo={`${$layoutStore.layoutMode === 'horizontal' ? 'left' : $layoutStore.sidebarSize === 'small' ? 'right-top' : 'left'}`}
  >
    <DropdownButton let:isOpen type="button" class="nav-link">
      <span class="w-6 group-data-[sidebar=small]:mx-auto shrink-0">
        {#if item.icon}
          <LucidIcon
            name={item.icon}
            class="size-4 group-data-[sidebar=small]:size-5 group-data-[sidebar=medium]:size-5"
          ></LucidIcon>
        {/if}
      </span>
      <span class="content">{$layoutStore.languageData[item.lang] ?? item.title}</span>
      <svg
        class={`arrow ${isOpen ? 'transform rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </DropdownButton>
    <!-- :dropdown-position="($data.layout === 'horizontal') ? 'left' : 'right-top'" -->
    <!-- data-parent-yes -->
    <DropdownMenu isLoading={false}>
      <ul class="dropdown-wrapper">
        {#each item.children as child, index2 (child.id)}
          <MenuItem item={child} />
        {/each}
      </ul>
    </DropdownMenu>
    <!-- mega menu -->
    <!-- {#if item.children.length && item.megaMenu}
            <Dropdown data-parent-yes class="mega-menu" :dropdown-position="($data.layout === 'horizontal') ? 'left' : 'right-top'">
                <div class="dropdown-wrapper">
                    <div class="group-data-[layout=horizontal]:md:grid group-data-[layout=horizontal]:md:grid-cols-2">
                        <template x-for="(chunk, index2) in chunkArray(item.children, Math.ceil(item.children.length / 2))" :key="`${index2}--mega`">
                            <ul>
                                <template x-for="(item5, index4) in chunk" :key="`${item5.name}--chunk${index4}`">
                                    <li><a :href="item5.link" x-text="$data.languageData[item5.lang] ?? item5.name"></a></li>
                                </template>
                            </ul>
                        </template>
                    </div>
                </div>
            </Dropdown>-->
  </Dropdown>
{/if}
{#if item instanceof Menu && item.level === 'sub'}
  <!-- @open-parent-dropdown.window="open = false; calculatePosition();"  -->
  <Dropdown
    alignTo={`${$layoutStore.sidebarSize === 'small' || $layoutStore.layoutMode === 'horizontal' ? 'right-top' : 'left'}`}
  >
    {#if item.children.length}
      <div>
        <DropdownButton let:isOpen class="nav-link">
          <span>{$layoutStore.languageData[item.lang] ?? item.title}</span>
          <svg
            class={`arrow ${isOpen ? 'transform rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </DropdownButton>
        <DropdownMenu isLoading={false}>
          <!-- right-top -->
          <ul class="dropdown-wrapper">
            {#each item.children as innerChild, index (innerChild.id)}
              <MenuItem item={innerChild} />
            {/each}
          </ul>
        </DropdownMenu>
      </div>
    {/if}
  </Dropdown>
{/if}
