<script lang="ts">
  let bgColors = [
    { class: 'bg-primary-50', text: 'text-primary-500' },
    { class: 'bg-primary-100', text: 'text-primary-500' },
    { class: 'bg-primary-200', text: 'text-primary-500' },
    { class: 'bg-primary-300', text: 'text-primary-500' },
    { class: 'bg-primary-400', text: 'text-primary-700' },
    { class: 'bg-primary-500', text: 'text-primary-100' },
    { class: 'bg-primary-600', text: 'text-primary-100' },
    { class: 'bg-primary-700', text: 'text-primary-200' },
    { class: 'bg-primary-800', text: 'text-primary-200' },
    { class: 'bg-primary-900', text: 'text-primary-200' },
    { class: 'bg-primary-950', text: 'text-primary-200' }
  ];

  let purpleShades = [
    { class: 'bg-purple-50', text: 'text-purple-500' },
    { class: 'bg-purple-100', text: 'text-purple-500' },
    { class: 'bg-purple-200', text: 'text-purple-500' },
    { class: 'bg-purple-300', text: 'text-purple-500' },
    { class: 'bg-purple-400', text: 'text-purple-700' },
    { class: 'bg-purple-500', text: 'text-purple-100' },
    { class: 'bg-purple-600', text: 'text-purple-100' },
    { class: 'bg-purple-700', text: 'text-purple-200' },
    { class: 'bg-purple-800', text: 'text-purple-200' },
    { class: 'bg-purple-900', text: 'text-purple-200' },
    { class: 'bg-purple-950', text: 'text-purple-200' }
  ];
  let greenShades = [
    { class: 'bg-green-50', text: 'text-green-500' },
    { class: 'bg-green-100', text: 'text-green-500' },
    { class: 'bg-green-200', text: 'text-green-500' },
    { class: 'bg-green-300', text: 'text-green-500' },
    { class: 'bg-green-400', text: 'text-green-700' },
    { class: 'bg-green-500', text: 'text-green-100' },
    { class: 'bg-green-600', text: 'text-green-100' },
    { class: 'bg-green-700', text: 'text-green-200' },
    { class: 'bg-green-800', text: 'text-green-200' },
    { class: 'bg-green-900', text: 'text-green-200' },
    { class: 'bg-green-950', text: 'text-green-200' }
  ];
</script>

<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5">
  <div>
    <h6 class="mb-2">Primary</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      {#each bgColors as color}
        <li class={color.class}>
          <code class={'text-sm ' + color.text}>.{color.class}</code>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Purple</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      {#each purpleShades as shade}
        <li class={shade.class}>
          <code class={'text-sm ' + shade.text}>.{shade.class}</code>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Green</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      {#each greenShades as shade}
        <li class={shade.class}>
          <code class={'text-sm ' + shade.text}>.{shade.class}</code>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Red</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-red-50"><code class="text-sm text-red-500">.bg-red-50</code></li>
      <li class="bg-red-100"><code class="text-sm text-red-500">.bg-red-100</code></li>
      <li class="bg-red-200"><code class="text-sm text-red-500">.bg-red-200</code></li>
      <li class="bg-red-300"><code class="text-sm text-red-500">.bg-red-300</code></li>
      <li class="bg-red-400"><code class="text-sm text-red-700">.bg-red-400</code></li>
      <li class="bg-red-500"><code class="text-sm text-red-100">.bg-red-500</code></li>
      <li class="bg-red-600"><code class="text-sm text-red-100">.bg-red-600</code></li>
      <li class="bg-red-700"><code class="text-sm text-red-200">.bg-red-700</code></li>
      <li class="bg-red-800"><code class="text-sm text-red-200">.bg-red-800</code></li>
      <li class="bg-red-900"><code class="text-sm text-red-200">.bg-red-900</code></li>
      <li class="bg-red-950"><code class="text-sm text-red-200">.bg-red-950</code></li>
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Yellow</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-yellow-50"><code class="text-sm text-yellow-500">.bg-yellow-50</code></li>
      <li class="bg-yellow-100"><code class="text-sm text-yellow-500">.bg-yellow-100</code></li>
      <li class="bg-yellow-200"><code class="text-sm text-yellow-500">.bg-yellow-200</code></li>
      <li class="bg-yellow-300"><code class="text-sm text-yellow-500">.bg-yellow-300</code></li>
      <li class="bg-yellow-400"><code class="text-sm text-yellow-700">.bg-yellow-400</code></li>
      <li class="bg-yellow-500"><code class="text-sm text-yellow-100">.bg-yellow-500</code></li>
      <li class="bg-yellow-600"><code class="text-sm text-yellow-100">.bg-yellow-600</code></li>
      <li class="bg-yellow-700"><code class="text-sm text-yellow-200">.bg-yellow-700</code></li>
      <li class="bg-yellow-800"><code class="text-sm text-yellow-200">.bg-yellow-800</code></li>
      <li class="bg-yellow-900"><code class="text-sm text-yellow-200">.bg-yellow-900</code></li>
      <li class="bg-yellow-950"><code class="text-sm text-yellow-200">.bg-yellow-950</code></li>
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Sky</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-sky-50"><code class="text-sm text-sky-500">.bg-sky-50</code></li>
      <li class="bg-sky-100"><code class="text-sm text-sky-500">.bg-sky-100</code></li>
      <li class="bg-sky-200"><code class="text-sm text-sky-500">.bg-sky-200</code></li>
      <li class="bg-sky-300"><code class="text-sm text-sky-500">.bg-sky-300</code></li>
      <li class="bg-sky-400"><code class="text-sm text-sky-700">.bg-sky-400</code></li>
      <li class="bg-sky-500"><code class="text-sm text-sky-100">.bg-sky-500</code></li>
      <li class="bg-sky-600"><code class="text-sm text-sky-100">.bg-sky-600</code></li>
      <li class="bg-sky-700"><code class="text-sm text-sky-200">.bg-sky-700</code></li>
      <li class="bg-sky-800"><code class="text-sm text-sky-200">.bg-sky-800</code></li>
      <li class="bg-sky-900"><code class="text-sm text-sky-200">.bg-sky-900</code></li>
      <li class="bg-sky-950"><code class="text-sm text-sky-200">.bg-sky-950</code></li>
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Pink</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-pink-50"><code class="text-sm text-pink-500">.bg-pink-50</code></li>
      <li class="bg-pink-100"><code class="text-sm text-pink-500">.bg-pink-100</code></li>
      <li class="bg-pink-200"><code class="text-sm text-pink-500">.bg-pink-200</code></li>
      <li class="bg-pink-300"><code class="text-sm text-pink-500">.bg-pink-300</code></li>
      <li class="bg-pink-400"><code class="text-sm text-pink-700">.bg-pink-400</code></li>
      <li class="bg-pink-500"><code class="text-sm text-pink-100">.bg-pink-500</code></li>
      <li class="bg-pink-600"><code class="text-sm text-pink-100">.bg-pink-600</code></li>
      <li class="bg-pink-700"><code class="text-sm text-pink-200">.bg-pink-700</code></li>
      <li class="bg-pink-800"><code class="text-sm text-pink-200">.bg-pink-800</code></li>
      <li class="bg-pink-900"><code class="text-sm text-pink-200">.bg-pink-900</code></li>
      <li class="bg-pink-950"><code class="text-sm text-pink-200">.bg-pink-950</code></li>
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Indigo</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-indigo-50"><code class="text-sm text-indigo-500">.bg-indigo-50</code></li>
      <li class="bg-indigo-100"><code class="text-sm text-indigo-500">.bg-indigo-100</code></li>
      <li class="bg-indigo-200"><code class="text-sm text-indigo-500">.bg-indigo-200</code></li>
      <li class="bg-indigo-300"><code class="text-sm text-indigo-500">.bg-indigo-300</code></li>
      <li class="bg-indigo-400"><code class="text-sm text-indigo-700">.bg-indigo-400</code></li>
      <li class="bg-indigo-500"><code class="text-sm text-indigo-100">.bg-indigo-500</code></li>
      <li class="bg-indigo-600"><code class="text-sm text-indigo-100">.bg-indigo-600</code></li>
      <li class="bg-indigo-700"><code class="text-sm text-indigo-200">.bg-indigo-700</code></li>
      <li class="bg-indigo-800"><code class="text-sm text-indigo-200">.bg-indigo-800</code></li>
      <li class="bg-indigo-900"><code class="text-sm text-indigo-200">.bg-indigo-900</code></li>
      <li class="bg-indigo-950"><code class="text-sm text-indigo-200">.bg-indigo-950</code></li>
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Gary</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-gray-50"><code class="text-sm text-gray-500">.bg-gray-50</code></li>
      <li class="bg-gray-100"><code class="text-sm text-gray-500">.bg-gray-100</code></li>
      <li class="bg-gray-200"><code class="text-sm text-gray-500">.bg-gray-200</code></li>
      <li class="bg-gray-300"><code class="text-sm text-gray-500">.bg-gray-300</code></li>
      <li class="bg-gray-400"><code class="text-sm text-gray-700">.bg-gray-400</code></li>
      <li class="bg-gray-500"><code class="text-sm text-gray-100">.bg-gray-500</code></li>
      <li class="bg-gray-600"><code class="text-sm text-gray-100">.bg-gray-600</code></li>
      <li class="bg-gray-700"><code class="text-sm text-gray-200">.bg-gray-700</code></li>
      <li class="bg-gray-800"><code class="text-sm text-gray-200">.bg-gray-800</code></li>
      <li class="bg-gray-900"><code class="text-sm text-gray-200">.bg-gray-900</code></li>
      <li class="bg-gray-950"><code class="text-sm text-gray-200">.bg-gray-950</code></li>
    </ul>
  </div>
  <div>
    <h6 class="mb-2">Slate</h6>
    <ul class="*:h-9 text-center *:flex *:items-center *:justify-center">
      <li class="bg-slate-50"><code class="text-sm text-slate-500">.bg-slate-50</code></li>
      <li class="bg-slate-100"><code class="text-sm text-slate-500">.bg-slate-100</code></li>
      <li class="bg-slate-200"><code class="text-sm text-slate-500">.bg-slate-200</code></li>
      <li class="bg-slate-300"><code class="text-sm text-slate-500">.bg-slate-300</code></li>
      <li class="bg-slate-400"><code class="text-sm text-slate-700">.bg-slate-400</code></li>
      <li class="bg-slate-500"><code class="text-sm text-slate-100">.bg-slate-500</code></li>
      <li class="bg-slate-600"><code class="text-sm text-slate-100">.bg-slate-600</code></li>
      <li class="bg-slate-700"><code class="text-sm text-slate-200">.bg-slate-700</code></li>
      <li class="bg-slate-800"><code class="text-sm text-slate-200">.bg-slate-800</code></li>
      <li class="bg-slate-900"><code class="text-sm text-slate-200">.bg-slate-900</code></li>
      <li class="bg-slate-950"><code class="text-sm text-slate-200">.bg-slate-950</code></li>
    </ul>
  </div>
</div>
