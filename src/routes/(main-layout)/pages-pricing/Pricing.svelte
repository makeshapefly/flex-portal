<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';
  import Grid from '$lib/components/ui/grid/Grid.svelte';
  import Modal from '$lib/components/ui/modal/Modal.svelte';
  import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
  import ModalClose from '$lib/components/ui/modal/ModalClose.svelte';
  import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
</script>

<h6 class="mb-5 underline">Step 1:</h6>
<Grid cols={12} gapX={5}>
  <Col cols={{ span: 12 }} xl={{ span: 10 }} class="xl:col-start-2">
    <Grid cols={1} gapX={5} class="sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <Card class="relative">
          <CardBody>
            <div class="relative">
              <div class="absolute top-0 z-0 size-11 blur-md bg-sky-500/20"></div>
              <LucideIcon
                name="Fan"
                class="relative stroke-1 size-10 fill-sky-500/20 text-sky-500"
              />
            </div>
            <h6 class="mt-5">Basic Plan</h6>
            <p class="mb-3 text-sm text-gray-500 dark:text-dark-500">Forever</p>
            <h2 class="font-semibold">$29.99</h2>
            <div class="pt-5 my-5 border-t border-gray-200 dark:border-dark-800">
              <ul class="space-y-3 *:flex *:items-center *:gap-2">
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> 1 Products &
                  Projects
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Custom Permissions
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Some Basic Integration
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Up to 5 Team
                  Members
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> 24/7 Support
                </li>
              </ul>
            </div>
            <ModalTrigger modalId="plan-modal" text="Choose Plan" class="w-full btn" />
            <Modal modalId="plan-modal" let:modalId size="sm">
              <ModalBody>
                <h5 class="mb-2">Upgraded Plan</h5>
                <p class="mb-5 text-gray-500 dark:text-dark-500">
                  Please confirm your upgrade by selecting the 'Upgrade Plan' option below.
                </p>
                <div class="flex items-center justify-end gap-2">
                  <button class="btn btn-yellow">Confirm</button>
                  <ModalClose {modalId}
                    ><button class="btn btn-active-red">Cancel</button></ModalClose
                  >
                </div>
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </div>

      <div>
        <div class="relative card">
          <div class="card-body">
            <div class="absolute badge badge-sub-pink ltr:right-5 rtl:left-5 top-5">Popular</div>
            <div class="relative">
              <div class="absolute top-0 z-0 bg-green-500/20 size-11 blur-md"></div>
              <LucideIcon
                name="Pyramid"
                class="relative text-green-500 stroke-1 size-10 fill-green-500/20"
              />
            </div>
            <h6 class="mt-5">Professional Plan</h6>
            <p class="mb-3 text-sm text-gray-500 dark:text-dark-500">Saving $24.99 a year</p>
            <h2 class="font-semibold">$49.99</h2>
            <div class="pt-5 my-5 border-t border-gray-200 dark:border-dark-800">
              <ul class="space-y-3 *:flex *:items-center *:gap-2">
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> 10 Products
                  & Projects
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Custom Permissions
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Some Basic Integration
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Up to 10 Team
                  Members
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Advanced Security
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> 24/7 Support
                </li>
              </ul>
            </div>
            <button data-modal-target="confirmModal" class="w-full btn btn-primary"
              >Choose Plan</button
            >
          </div>
        </div>
      </div>

      <div>
        <div class="relative card">
          <div class="card-body">
            <div class="relative">
              <div class="absolute top-0 z-0 bg-red-500/20 size-11 blur-md"></div>
              <LucideIcon
                name="Zap"
                class="relative text-red-500 stroke-1 size-10 fill-red-500/20"
              />
            </div>
            <h6 class="mt-5">Enterprise Plan</h6>
            <p class="mb-3 text-sm text-gray-500 dark:text-dark-500">Saving $24.99 a year</p>
            <h2 class="font-semibold">$59.99</h2>
            <div class="pt-5 my-5 border-t border-gray-200 dark:border-dark-800">
              <ul class="space-y-3 *:flex *:items-center *:gap-2">
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> 30 Products
                  & Projects
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Custom Permissions
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Some Basic Integration
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Up to 50 Team
                  Members
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Advanced Security
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> Permissions
                  & Workflows
                </li>
                <li>
                  <LucideIcon name="Redo2" class="inline-block text-green-500 size-4" /> 24/7 Support
                </li>
              </ul>
            </div>
            <button data-modal-target="confirmModal" class="w-full btn btn-primary"
              >Choose Plan</button
            >
          </div>
        </div>
      </div>
    </Grid>
  </Col>
</Grid>

<h6 class="mt-2 mb-5 underline">Step 2:</h6>
<Grid cols={12} gapX={5}>
  <Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} class="card">
    <CardBody>
      <div class="flex items-start">
        <div
          class="flex items-center justify-center ltr:mr-auto rtl:ml-auto size-16 bg-gradient-to-b from-yellow-500/20 rounded-modern"
        >
          <LucideIcon
            name="ArrowDownFromLine"
            class="relative text-yellow-500 stroke-1 size-10 fill-yellow-500/20"
          />
        </div>
        <label for="addOns1" class="switch-group switch-soft shrink-0">
          <div class="relative">
            <input type="checkbox" id="addOns1" class="hidden sr-only peer" />
            <div class="switch-wrapper peer-checked:!bg-green-500/15"></div>
            <div
              class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full peer-checked:!bg-green-500"
            ></div>
          </div>
        </label>
      </div>
      <div class="flex items-center mt-4">
        <h6 class="grow">Comodo Media Downloader</h6>
        <h6>$3.99/month</h6>
      </div>
      <p class="text-gray-500 truncate dark:text-dark-500">Comodo Media Downloader Service</p>
    </CardBody>
  </Col>

  <Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} class="card">
    <CardBody>
      <div class="flex items-start">
        <div
          class="flex items-center justify-center ltr:mr-auto rtl:ml-auto size-16 bg-gradient-to-r from-purple-500/20 rounded-modern"
        >
          <LucideIcon
            name="Droplet"
            class="relative text-purple-500 stroke-1 size-10 fill-purple-500/20"
          />
        </div>
        <label for="addOns2" class="switch-group switch-soft shrink-0">
          <div class="relative">
            <input type="checkbox" id="addOns2" class="hidden sr-only peer" />
            <div class="switch-wrapper peer-checked:!bg-green-500/15"></div>
            <div
              class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full peer-checked:!bg-green-500"
            ></div>
          </div>
        </label>
      </div>
      <div class="flex items-center mt-4">
        <h6 class="grow">Https Enforcement</h6>
        <h6>$6.99/month</h6>
      </div>
      <p class="text-gray-500 truncate dark:text-dark-500">Automatic Security</p>
    </CardBody>
  </Col>

  <Col cols={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} class="card">
    <CardBody>
      <div class="flex items-start">
        <div
          class="flex items-center justify-center ltr:mr-auto rtl:ml-auto size-16 bg-gradient-to-r from-red-500/20 rounded-modern"
        >
          <LucideIcon name="Gem" class="relative text-red-500 stroke-1 size-10 fill-red-500/20" />
        </div>
        <label for="addOns3" class="switch-group switch-soft shrink-0">
          <div class="relative">
            <input type="checkbox" id="addOns2" class="hidden sr-only peer" />
            <div class="switch-wrapper peer-checked:!bg-green-500/15"></div>
            <div
              class="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full peer-checked:!bg-green-500"
            ></div>
          </div>
        </label>
      </div>
      <div class="flex items-center mt-4">
        <h6 class="grow">Online Security Pro</h6>
        <h6>$6.99/month</h6>
      </div>
      <p class="text-gray-500 truncate dark:text-dark-500">
        Online Security Pro protects you against malware, phishing and malicious websites.
      </p>
    </CardBody>
  </Col>
</Grid>
