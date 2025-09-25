<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';
  import Grid from '$lib/components/ui/grid/Grid.svelte';
</script>

<Grid cols={12} gapX="space">
  <Col cols={{ span: 12 }}>
    <Card>
      <CardHeader>
        <h6>Standard Licenses</h6>
      </CardHeader>
      <CardBody>
        <p class="mb-5 text-gray-500 dark:text-dark-500">
          The majority of our items (themes, code, graphics, 3D and flash) are covered by our <b
            >Standard Licenses</b
          >. If your end product including the item is going to be free to the end user then a
          <b>Regular License</b>
          is what you need. An <b>Extended License</b> is required if the end user must pay to use the
          end product.
        </p>
        <div class="overflow-x-auto">
          <table class="table even-striped">
            <tbody>
              <tr>
                <th></th>
                <th>
                  <div>
                    <h6>Regular</h6>
                    <a
                      href="#!"
                      class="text-sm font-normal text-gray-500 underline transition duration-300 ease-linear dark:text-dark-500 hover:text-primary-500 dark:hover:text-primary-500"
                      >view full license</a
                    >
                  </div>
                </th>
                <th>
                  <div>
                    <h6>Extended</h6>
                    <a
                      href="#!"
                      class="text-sm font-normal text-gray-500 underline transition duration-300 ease-linear dark:text-dark-500 hover:text-primary-500 dark:hover:text-primary-500"
                      >view full license</a
                    >
                  </div>
                </th>
              </tr>
              <tr>
                <td class="whitespace-nowrap">Number of end products</td>
                <td class="text-center whitespace-nowrap">1</td>
                <td class="text-center whitespace-nowrap">1</td>
              </tr>
              <tr>
                <td class="whitespace-nowrap">Use in a single end product</td>
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="Check" class="mx-auto text-green-500 size-4" /></td
                >
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="Check" class="mx-auto text-green-500 size-4" /></td
                >
              </tr>
              <tr>
                <td class="whitespace-nowrap">Use in a free end product</td>
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="Check" class="mx-auto text-green-500 size-4" /></td
                >
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="Check" class="mx-auto text-green-500 size-4" /></td
                >
              </tr>
              <tr>
                <td class="whitespace-nowrap">Use in an end product that's sold</td>
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="X" class="mx-auto text-red-500 size-4" /></td
                >
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="Check" class="mx-auto text-green-500 size-4" /></td
                >
              </tr>
              <tr>
                <td class="whitespace-nowrap">On-demand products/services</td>
                <td class="text-center whitespace-nowrap"
                  >One license per each customized end produc</td
                >
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="X" class="mx-auto text-red-500 size-4" /></td
                >
              </tr>
              <tr>
                <td class="whitespace-nowrap">Use in stock items/templates</td>
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="X" class="mx-auto text-red-500 size-4" /></td
                >
                <td class="text-center whitespace-nowrap"
                  ><LucideIcon name="X" class="mx-auto text-red-500 size-4" /></td
                >
              </tr>
            </tbody>
          </table>
        </div>

        <h6 class="mt-4 mb-2">Note to freelancers and creative agencies:</h6>
        <p class="mb-4 text-gray-500 dark:text-dark-500">
          You may charge your client for your services to create an end product, even under the
          Regular License. But you can’t use one of our Standard Licenses on multiple clients or
          jobs.
        </p>

        <Grid cols={1} gap={5} class="md:grid-cols-2">
          <Card class="mb-0">
            <CardBody>
              <div
                class="flex items-center justify-center size-16 bg-gradient-to-b from-sky-500/10 rounded-modern"
              >
                <LucideIcon
                  name="MessageCircleQuestion"
                  class="relative stroke-1 text-sky-500 size-10 fill-sky-500/20"
                />
              </div>
              <div class="mt-3">
                <h6 class="mb-1">FAQ</h6>
                <p class="mb-2 text-gray-500 dark:text-dark-500">
                  Did you know that the FAQs form part of the licenses?
                </p>
                <a href="https://themeforest.net/licenses/faq" class="underline text-primary-500"
                  >Read on for more details</a
                >
              </div>
            </CardBody>
          </Card>

          <Card class="mb-0">
            <CardBody>
              <div
                class="flex items-center justify-center size-16 bg-gradient-to-b from-red-500/10 rounded-modern"
              >
                <LucideIcon
                  name="Headset"
                  class="relative stroke-1 text-red-500 size-10 fill-red-500/20"
                />
              </div>
              <div class="mt-3">
                <h6 class="mb-1">Support</h6>
                <p class="mb-2 text-gray-500 dark:text-dark-500">Still have a burning question?</p>
                <a href="https://help.market.envato.com/hc/en-us" class="underline text-primary-500"
                  >Have a chat with our friendly Help Team</a
                >
              </div>
            </CardBody>
          </Card>
        </Grid>
      </CardBody>
    </Card>
  </Col>
</Grid>
