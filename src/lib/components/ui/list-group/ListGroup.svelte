<script lang="ts">
  export let type: 'default' | 'disc' | 'square' | 'circle' | 'roman' | 'decimal' = 'default'; // Default to 'default'
  export let listStyle: 'default' | 'marker:text-primary-500' | 'marker:text-purple-500' | 'marker:text-green-500' = 'default'; // Default to 'default'
  
  // List of possible types and their corresponding Tailwind classes
  const listTypes = [
    { type: 'default', class: 'list-none' },
    { type: 'disc', class: 'list-disc', defaultStyle: 'marker:text-primary-500' },
    { type: 'square', class: 'list-square',},
    { type: 'circle', class: 'list-circle',},
    { type: 'roman', class: 'list-roman', },
    { type: 'decimal', class: 'list-decimal',}
  ];
  
  // Get the class and style for the selected type
  const currentListType = listTypes.find(item => item.type === type);
  const currentListClass = currentListType?.class || '';
  const currentMarkerStyle = listStyle !== 'default' ? listStyle : currentListType?.defaultStyle || '';
</script>

<ul class={`flex flex-col gap-2 list-inside ${currentListClass} ${currentMarkerStyle}`}>
  <slot></slot>
</ul>
