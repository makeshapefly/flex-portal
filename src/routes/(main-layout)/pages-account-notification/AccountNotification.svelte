<script lang="ts">
  import Account from '$lib/components/common/Account.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
</script>

<Account variant="notification" />

<div class="items-center gap-3 mt-5 md:flex">
  <div class="grow">
    <h6 class="mb-1 text-16 grow">Notifications</h6>
    <p class="text-gray-500 dark:text-dark-500">Where would you like to receive notifications?</p>
  </div>
  <div class="shrink-0">
    <a href="#!" class="font-medium underline link link-primary">Reset to Default Settings</a>
  </div>
</div>

<Card class="mt-5">
  <CardHeader>
    <CardTitle>Receive notifications about new activities in projects you're involved in</CardTitle>
  </CardHeader>
  <CardBody class="space-y-4">
    <div class="flex items-center gap-2">
      <label for="notification1" class="mb-0 cursor-pointer form-label grow"
        >New comments by others comments</label
      >
      <label for="notification1" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification1" class="sr-only peer" checked />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
    <div class="flex items-center gap-2">
      <label for="notification2" class="mb-0 cursor-pointer form-label grow"
        >Comments fro you tasks</label
      >
      <label for="notification2" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification2" class="sr-only peer" />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
    <div class="flex items-center gap-2">
      <label for="notification3" class="mb-0 cursor-pointer form-label grow"
        >New tasks assigned to you</label
      >
      <label for="notification3" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification3" class="sr-only peer" />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
    <div class="flex items-center gap-2">
      <label for="notification4" class="mb-0 cursor-pointer form-label grow"
        >Tasks completed (For tasks you created or assigned to)</label
      >
      <label for="notification4" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification4" class="sr-only peer" />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
    <div class="flex items-center gap-2">
      <label for="notification5" class="mb-0 cursor-pointer form-label grow"
        >You are mentioned in a projects, task, etc,.</label
      >
      <label for="notification5" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification5" class="sr-only peer" />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
    <div class="flex items-center gap-2">
      <label for="notification6" class="mb-0 cursor-pointer form-label grow"
        >Change in status of a task you're</label
      >
      <label for="notification6" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification6" class="sr-only peer" />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
    <div class="flex items-center gap-2">
      <label for="notification7" class="mb-0 cursor-pointer form-label grow"
        >Added new projects</label
      >
      <label for="notification7" class="switch-group">
        <div class="relative">
          <input type="checkbox" id="notification7" class="sr-only peer" />
          <div class="switch-wrapper"></div>
          <div
            class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"
          ></div>
        </div>
      </label>
    </div>
  </CardBody>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Get notified wherever you are</CardTitle>
  </CardHeader>
  <CardBody class="space-y-4">
    <div class="flex items-center gap-2">
        <label for="notification11" class="mb-0 cursor-pointer form-label grow">Email notifications</label>
        <label for="notification11" class="switch-group">
            <div class="relative">
                <input type="checkbox" id="notification11" class="sr-only peer" checked />
                <div class="switch-wrapper"></div>
                <div class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"></div>
            </div>
        </label>
    </div>
    <div class="flex items-center gap-2">
        <label for="notification12" class="mb-0 cursor-pointer form-label grow">Notifications via domiex</label>
        <label for="notification12" class="switch-group">
            <div class="relative">
                <input type="checkbox" id="notification12" class="sr-only peer" checked />
                <div class="switch-wrapper"></div>
                <div class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"></div>
            </div>
        </label>
    </div>
    <div class="flex items-center gap-2">
        <label for="notification13" class="mb-0 cursor-pointer form-label grow">Browser push notifications</label>
        <label for="notification13" class="switch-group">
            <div class="relative">
                <input type="checkbox" id="notification13" class="sr-only peer" checked />
                <div class="switch-wrapper"></div>
                <div class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full switch-primary"></div>
            </div>
        </label>
    </div>
  </CardBody>
</Card>
