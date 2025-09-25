<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';
  import Grid from '$lib/components/ui/grid/Grid.svelte';
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  const totalAttendance = writable(0);
  const absentAttendance = writable(0);
  const lateAttendance = writable(0);
  const totalHours = writable(0);

  // Function to animate the counter
  function animateCounter(
    store: Writable<number>,
    startValue: number,
    targetValue: number,
    duration: number
  ) {
    let current = startValue;
    const increment = (targetValue - startValue) / (duration / 10);

    // Update the store with the new counter value
    const updateCounter = () => {
      if (current < targetValue) {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
        }
        store.set(Math.round(current));
        setTimeout(updateCounter, 10);
      }
    };

    updateCounter(); // Start the counter animation
  }

  onMount(() => {
    // Start the animations for each counter
    animateCounter(totalAttendance, 0, 21, 500);
    animateCounter(absentAttendance, 0, 3, 500);
    animateCounter(lateAttendance, 0, 5, 500);
    animateCounter(totalHours, 0, 178, 500);
  });
</script>

<Grid cols={12} gapX="space">
  <Col cols={{ span: 12 }} md={{ span: 7 }}>
    <h6 class="mb-1">Attendance History</h6>
    <p class="mb-5 text-gray-500 dark:text-dark-500">
      <LucideIcon name="SunMedium" class="inline-block size-4 ltr:mr-1 rtl:ml-1" /> Today Mon, July 8,
      2024
    </p>
    <div class="flex items-center mb-space">
      <button class="border-gray-200 rounded-r-none dark:border-dark-800 btn">
        <LucideIcon name="Dot" class="inline-block ltr:mr-0.5 rtl:ml-0.5 text-green-500 size-6" />
        <strong class="whitespace-nowrap">On Time</strong>
        <span class="text-gray-500 dark:text-dark-500">80%</span>
      </button>
      <button class="border-gray-200 rounded-none dark:border-dark-800 border-x-0 btn">
        <LucideIcon name="Dot" class="inline-block ltr:mr-0.5 rtl:ml-0.5 text-orange-500 size-6" />
        <strong>Late</strong>
        <span class="text-gray-500 dark:text-dark-500">10%</span>
      </button>
      <button class="border-gray-200 rounded-l-none dark:border-dark-800 btn">
        <LucideIcon name="Dot" class="inline-block ltr:mr-0.5 rtl:ml-0.5 text-red-500 size-6" />
        <strong>Absent</strong>
        <span class="text-gray-500 dark:text-dark-500">10%</span>
      </button>
    </div>
  </Col>

  <Col cols={{ span: 12 }} md={{ span: 5 }}>
    <div class="flex justify-end gap-3 mb-space">
      <img src="/assets/images/avatar/user-14.png" alt="" class="rounded-full size-10" />
      <div>
        <h6>Michael Johnson</h6>
        <p class="text-sm text-gray-500 dark:text-dark-500">Class: 12 (A)</p>
      </div>
    </div>
  </Col>

  <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }} class="card">
    <CardBody>
      <p class="mb-2 text-gray-500 dark:text-dark-500">Total Attendance</p>
      <h5>
        <span>{Math.round($totalAttendance)}</span>
      </h5>
    </CardBody>
  </Col>
  <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }} class="card">
    <CardBody>
      <p class="mb-2 text-gray-500 dark:text-dark-500">Absent Attendance</p>
      <h5>
        <span>{Math.round($absentAttendance)}</span>
      </h5>
    </CardBody>
  </Col>
  <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }} class="card">
    <CardBody>
      <p class="mb-2 text-gray-500 dark:text-dark-500">Late Attendance</p>
      <h5>
        <span>{Math.round($lateAttendance)}</span>
      </h5>
    </CardBody>
  </Col>
  <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }} class="card">
    <CardBody>
      <p class="mb-2 text-gray-500 dark:text-dark-500">Total Hours</p>
      <h5>
        <span>{Math.round($totalHours)}</span>
      </h5>
    </CardBody>
  </Col>
</Grid>

<h6 class="mb-3">Attendance List</h6>
<Grid cols={12} gapX="space">
  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Thu, July 04, 2024</h6>
        <span class="badge shrink-0 badge-green">On Time</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:00 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>6:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>9hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Wed, July 03, 2024</h6>
        <span class="badge shrink-0 badge-green">On Time</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:15 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>5:45 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>7:30hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-orange-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Tue, July 02, 2024</h6>
        <span class="badge shrink-0 badge-orange">Late</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:00 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>5:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>8hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Traffic Issue</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Mon, July 01, 2024</h6>
        <span class="badge shrink-0 badge-green">On Time</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>8:45 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>6:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>9:15hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Sun, Jun 30, 2024</h6>
        <span class="badge shrink-0 badge-gray">Holiday</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:00 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>5:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>8hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Sat, Jun 29, 2024</h6>
        <span class="badge shrink-0 badge-green">On Time</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:00 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>6:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>9hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-orange-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Fri, Jun 28, 2024</h6>
        <span class="badge shrink-0 badge-orange">Late</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:30 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>6:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>8:30hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Traffic Issue</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Thu, Jun 27, 2024</h6>
        <span class="badge shrink-0 badge-green">On Time</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:00 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>5:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>8hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>

  <Col
    cols={{ span: 12 }}
    md={{ span: 6 }}
    lg={{ span: 4 }}
    class=" border-t-2 card border-t-green-300"
  >
    <CardBody>
      <div class="flex items-center gap-3">
        <h6 class="grow">Wed, Jun 26, 2024</h6>
        <span class="badge shrink-0 badge-green">On Time</span>
      </div>
      <Grid cols={3} class="my-4">
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check In</p>
          <h6>9:00 AM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Check Out</p>
          <h6>6:00 PM</h6>
        </div>
        <div>
          <p class="mb-1 text-gray-500 dark:text-dark-500">Total</p>
          <h6>9hr</h6>
        </div>
      </Grid>
      <div class="flex items-center gap-3">
        <p class="grow">Notes:</p>
        <p class="text-gray-500 dark:text-dark-500 shrink-0">Well Done</p>
      </div>
    </CardBody>
  </Col>
</Grid>
