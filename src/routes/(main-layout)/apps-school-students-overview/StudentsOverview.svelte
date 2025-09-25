<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardBody from '$lib/components/ui/card/CardBody.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';
  import Grid from '$lib/components/ui/grid/Grid.svelte';
  import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
  import ApexChart from '$lib/components/common/ApexChart.svelte';
  import Swiper from 'swiper';
  import 'swiper/css';
  import { options as marks } from './marks';

  let swiper: any;
  let exams = [
    { subject: 'Vector Algebra (Mathematics)', date: '15 July, 2024' },
    { subject: 'Biomolecules (Chemistry)', date: '20 August, 2024' },
    { subject: 'Human Reproduction (Biology)', date: '10 September, 2024' }
  ];

  let currentExamIndex = 0;
  let show = true;

  // Get the current exam based on the currentExamIndex
  $: currentExam = exams[currentExamIndex];

  // Function to switch to the next exam
  function nextExam() {
    show = false; 
    setTimeout(() => {
      currentExamIndex = (currentExamIndex + 1) % exams.length; 
      show = true; 
    }, 500); 
  }

  function circleProgress(initialPercent: any) {
    return {
      percent: initialPercent,
      circumference: 2 * Math.PI * 16,
      get progress() {
        return this.circumference - (this.percent / 100) * this.circumference;
      },
      animateProgress() {
        setTimeout(() => {
          this.percent = this.percent;
        }, 100);
      }
    };
  }

  let progress1 = circleProgress(32);
  let progress2 = circleProgress(52);
  let progress3 = circleProgress(10);
  let progress4 = circleProgress(95);

  onMount(() => {
    swiper = new Swiper('.mySwiper', {
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });

    const interval = setInterval(() => {
      nextExam();
    }, 5000); // Change exam every 5 seconds

    // Clean up interval when the component is destroyed
    return () => clearInterval(interval);
  });
</script>

<Col cols={{ span: 12 }} xl={{ span: 8 }} class="2xl:col-span-9 xl:row-span-3">
  <Card>
    <CardBody>
      <div class="relative gap-4 mb-5 md:flex">
        <img src="/assets/images/avatar/user-14.png" alt="" class="rounded-md size-36 shrink-0" />
        <div class="mt-5 grow md:mt-0">
          <h6 class="mb-2">Michael Johnson</h6>
          <div class="flex flex-wrap gap-3 mb-2 whitespace-nowrap item-center">
            <p class="text-gray-500 dark:text-dark-500">
              <LucideIcon name="Box" class="inline-block size-4 fill-gray-100 dark:fill-dark-850" />
              <span class="align-bottom">Class: 12 (A)</span>
            </p>
            <p class="text-gray-500 dark:text-dark-500">
              <LucideIcon
                name="MapPin"
                class="inline-block size-4 fill-gray-100 dark:fill-dark-850"
              /> <span class="align-bottom">California</span>
            </p>
            <p class="text-gray-500 dark:text-dark-500">
              <LucideIcon
                name="CalendarCheck"
                class="inline-block size-4 fill-gray-100 dark:fill-dark-850"
              /> <span class="align-bottom">05 Mar, 2007</span>
            </p>
          </div>
          <p class="mb-2 text-gray-500 dark:text-dark-500">
            <LucideIcon name="Phone" class="inline-block size-4 fill-gray-100 dark:fill-dark-850" />
            <span class="align-bottom">+1 712 25 1525</span>
          </p>
          <p class="mb-3 text-gray-500 dark:text-dark-500">
            <LucideIcon name="Mail" class="inline-block size-4 fill-gray-100 dark:fill-dark-850" />
            <span class="align-bottom">michael@gmail.com</span>
          </p>
          <div class="flex flex-wrap gap-2 item-center">
            <span class="badge badge-yellow">Learner (5)</span>
            <span class="badge badge-green">Teacher (6)</span>
            <span class="badge badge-purple">Skills (12)</span>
          </div>
        </div>
        <div class="absolute top-0 shrink-0 ltr:right-0 rtl:left-0">
          <a href="/apps-school-students-admission" class="btn btn-sub-gray btn-icon"
            ><LucideIcon name="Pencil" class="size-4" /></a
          >
        </div>
      </div>
      <div class="my-5">
        <Grid cols={12} gap="space">
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Gender</p>
            <h6>Male</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Religion</p>
            <h6>Islam</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Father Occupation</p>
            <h6>Web Developer</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Admission Date</p>
            <h6>15 Jun 2024</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Roll No</p>
            <h6>8</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Father Name</p>
            <h6>Mitchell Martin</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Mother Name</p>
            <h6>Theresa Martin</h6>
          </Col>
          <Col cols={{ span: 12 }} sm={{ span: 6 }} md={{ span: 3 }}>
            <p class="mb-1 text-gray-500 dark:text-dark-500">Parents Number</p>
            <h6>+1 147 20 1478</h6>
          </Col>
          <Col cols={{ span: 12 }} md={{ span: 6 }}>
            <div class="whitespace-normal">
              <p class="mb-1 text-gray-500 dark:text-dark-500">Address</p>
              <h6>1816 Angus Ave, Simi Valley, California</h6>
            </div>
          </Col>
        </Grid>
      </div>
      <p class="mb-4 text-gray-500 dark:text-dark-500">
        To achieve academic excellence and personal growth in Class 12 (A) by mastering the
        curriculum, developing critical thinking skills, and preparing for higher education and
        future career opportunities.
      </p>
      <h6 class="mb-3">Curriculum Mastery</h6>
      <ul class="space-y-2 list-inside list-circle">
        <li class="text-gray-500 dark:text-dark-500">
          Thoroughly understand and excel in all subjects including Mathematics, Science (Physics,
          Chemistry, Biology), English, and Electives (such as Computer Science, Economics, History,
          etc.).
        </li>
        <li class="text-gray-500 dark:text-dark-500">
          Regularly complete assignments, projects, and laboratory work to apply theoretical
          knowledge.
        </li>
        <li class="text-gray-500 dark:text-dark-500">
          Engage in activities that enhance critical thinking, such as debates, discussions, and
          problem-solving exercises.
        </li>
        <li class="text-gray-500 dark:text-dark-500">
          Apply logic and reasoning to solve complex problems in subjects like Mathematics and
          Science.
        </li>
      </ul>
    </CardBody>
  </Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-3">
  <Card>
    <CardBody class="flex items-center gap-4">
      <div class="grow">
        <div class="flex items-center gap-3 mb-2.5">
          <h6 class="grow">Complete Your Profile</h6>
          <h6 class="text-xs font-semibold text-red-500">67.98%</h6>
        </div>
        <div class="bg-green-100 progress-bar progress-1">
          <div class="w-[67.98%] text-white bg-green-500 progress-bar-wrap"></div>
        </div>
      </div>
    </CardBody>
  </Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-3">
  <Card>
    <CardBody>
      <h6 class="mb-6">My Achievements and Milestones</h6>
      <div class="swiper mySwiper group/swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="py-3 text-center">
              <div
                class="flex items-center justify-center p-2 mx-auto rounded-full bg-gradient-to-t from-yellow-500/10 ring-offset-2 dark:ring-offset-dark-900 size-28 ring-2 ring-yellow-500/10"
              >
                <img src="/assets/images/school/trophy.png" alt="" class="size-20" />
              </div>
              <h6 class="mt-6">Academic Excellence Awards</h6>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="py-3 text-center">
              <div
                class="flex items-center justify-center p-2 mx-auto rounded-full bg-gradient-to-t from-green-500/10 ring-offset-2 dark:ring-offset-dark-900 size-28 ring-2 ring-green-500/10"
              >
                <img src="/assets/images/school/medal.png" alt="" class="size-20" />
              </div>
              <h6 class="mt-6">Special Recognition Awards</h6>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="py-3 text-center">
              <div
                class="flex items-center justify-center p-2 mx-auto rounded-full bg-gradient-to-t from-yellow-500/10 ring-offset-2 dark:ring-offset-dark-900 size-28 ring-2 ring-yellow-500/10"
              >
                <img src="/assets/images/school/winner.png" alt="" class="size-20" />
              </div>
              <h6 class="mt-6">Arts and Sports Awards</h6>
            </div>
          </div>
        </div>
        <div
          class="swiper-button-next after:font-remix after:text-2xl after:text-gray-800 dark:after:text-dark-100 opacity-0 group-hover/swiper:opacity-100 transition ease-linear duration-300 after:content-['\ea6e']"
        ></div>
        <div
          class="swiper-button-prev after:font-remix after:text-2xl after:text-gray-800 dark:after:text-dark-100 opacity-0 group-hover/swiper:opacity-100 transition ease-linear duration-300 after:content-['\ea64']"
        ></div>
      </div>
    </CardBody>
  </Card>
</Col>

<Col cols={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-3 card">
  <CardBody>
    <div
      class="flex items-center justify-center mb-5 text-gray-500 bg-gray-100 rounded-md dark:text-dark-500 dark:bg-dark-850 size-14"
    >
      <LucideIcon name="GraduationCap" />
    </div>
    <h6 class="mb-1">Upcoming Test</h6>

    {#if show}
      <div transition:fade={{ duration: 500 }}>
        <p class="text-gray-500 dark:text-dark-500">
          Your <span class="font-semibold">{currentExam.subject}</span> Test will be on
          <span class="font-semibold">{currentExam.date}</span>
        </p>
      </div>
    {/if}

    <div class="flex items-center gap-2 mt-4">
      <button type="button" class="w-full btn btn-sub-gray">Learn More</button>
      <button type="button" class="w-full btn btn-primary" on:click={nextExam}>Next Exam</button>
    </div>
  </CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-6 card">
  <CardHeader>
    <CardTitle>Test Marks (Subject)</CardTitle>
  </CardHeader>
  <CardBody>
    <div dir="ltr">
      <ApexChart
        class="!min-h-full -ml-4"
        colors={[
          'bg-primary-300',
          'bg-purple-300',
          'bg-sky-300',
          'bg-green-300',
          'bg-red-200',
          'bg-orange-200'
        ]}
        options={marks}
      />
    </div>
  </CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-3 card">
  <CardHeader>
    <CardTitle>Pending Quiz</CardTitle>
  </CardHeader>
  <CardBody>
    <div class="space-y-4">
      <!-- First Progress Circle -->
      <div class="flex items-center gap-3">
        <div class="relative size-12 shrink-0" dir="ltr">
          <svg
            class="size-full"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              class="stroke-current text-sky-500/15"
              stroke-width="3"
            ></circle>
            <g class="origin-center transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-sky-500"
                stroke-width="3"
                stroke-dasharray="100"
                style="stroke-dashoffset: {progress1.progress}px; transition: stroke-dashoffset 1s ease-out;"
              ></circle>
            </g>
          </svg>
          <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 start-1/2">
            <span class="text-xs font-bold text-center text-gray-800 dark:text-white"
              >{progress1.percent}%</span
            >
          </div>
        </div>
        <div class="overflow-hidden grow">
          <h6 class="mb-1 truncate"><a href="#!">Trivia Time: Fun Facts and Figures</a></h6>
          <div class="flex items-center gap-3">
            <p class="text-gray-500 grow dark:text-dark-500">
              Expert: <i class="text-yellow-500 ri-star-s-fill"></i>
              <i class="text-yellow-500 ri-star-s-fill"></i>
              <i class="text-yellow-500 ri-star-s-fill"></i>
            </p>
            <button type="button" class="btn btn-green px-2 py-0.5 text-11"
              ><i class="ri-play-line"></i> Start</button
            >
          </div>
        </div>
      </div>

      <!-- Second Progress Circle -->
      <div class="flex items-center gap-3">
        <div class="relative size-12 shrink-0" dir="ltr">
          <svg
            class="size-full"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              class="stroke-current text-sky-500/15"
              stroke-width="3"
            ></circle>
            <g class="origin-center transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-sky-500"
                stroke-width="3"
                stroke-dasharray="100"
                style="stroke-dashoffset: {progress2.progress}px; transition: stroke-dashoffset 1s ease-out;"
              ></circle>
            </g>
          </svg>
          <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 start-1/2">
            <span class="text-xs font-bold text-center text-gray-800 dark:text-white"
              >{progress2.percent}%</span
            >
          </div>
        </div>
        <div class="overflow-hidden grow">
          <h6 class="mb-1 truncate"><a href="#!">Chemistry Conundrums: Elemental Quiz</a></h6>
          <div class="flex items-center gap-3">
            <p class="text-gray-500 grow dark:text-dark-500">
              Expert: <i class="text-yellow-500 ri-star-s-fill"></i> <i class="ri-star-s-fill"></i>
              <i class="ri-star-s-fill"></i>
            </p>
            <button type="button" class="btn btn-green px-2 py-0.5 text-11"
              ><i class="ri-play-line"></i> Start</button
            >
          </div>
        </div>
      </div>

      <!-- Third Progress Circle -->
      <div class="flex items-center gap-3">
        <div class="relative size-12 shrink-0" dir="ltr">
          <svg
            class="size-full"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              class="stroke-current text-sky-500/15"
              stroke-width="3"
            ></circle>
            <g class="origin-center transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-sky-500"
                stroke-width="3"
                stroke-dasharray="100"
                style="stroke-dashoffset: {progress3.progress}px; transition: stroke-dashoffset 1s ease-out;"
              ></circle>
            </g>
          </svg>
          <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 start-1/2">
            <span class="text-xs font-bold text-center text-gray-800 dark:text-white"
              >{progress3.percent}%</span
            >
          </div>
        </div>
        <div class="overflow-hidden grow">
          <h6 class="mb-1 truncate"><a href="#!">A Mathematics Challenge</a></h6>
          <div class="flex items-center gap-3">
            <p class="text-gray-500 grow dark:text-dark-500">
              Expert: <i class="text-yellow-500 ri-star-s-fill"></i>
              <i class="text-yellow-500 ri-star-s-fill"></i> <i class="ri-star-s-fill"></i>
            </p>
            <button type="button" class="btn btn-green px-2 py-0.5 text-11"
              ><i class="ri-play-line"></i> Start</button
            >
          </div>
        </div>
      </div>

      <!-- Fourth Progress Circle -->
      <div class="flex items-center gap-3">
        <div class="relative size-12 shrink-0" dir="ltr">
          <svg
            class="size-full"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              class="stroke-current text-sky-500/15"
              stroke-width="3"
            ></circle>
            <g class="origin-center transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-sky-500"
                stroke-width="3"
                stroke-dasharray="100"
                style="stroke-dashoffset: {progress4.progress}px; transition: stroke-dashoffset 1s ease-out;"
              ></circle>
            </g>
          </svg>
          <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 start-1/2">
            <span class="text-xs font-bold text-center text-gray-800 dark:text-white"
              >{progress4.percent}%</span
            >
          </div>
        </div>
        <div class="overflow-hidden grow">
          <h6 class="mb-1 truncate"><a href="#!">The Digital World Quiz</a></h6>
          <div class="flex items-center gap-3">
            <p class="text-gray-500 grow dark:text-dark-500">
              Expert: <i class="text-yellow-500 ri-star-s-fill"></i>
              <i class="text-yellow-500 ri-star-s-fill"></i>
              <i class="text-yellow-500 ri-star-s-fill"></i>
            </p>
            <button type="button" class="btn btn-green px-2 py-0.5 text-11"
              ><i class="ri-play-line"></i> Start</button
            >
          </div>
        </div>
      </div>
    </div>
  </CardBody>
</Col>

<Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} class="2xl:col-span-3 card">
  <CardHeader>
    <CardTitle>Upcoming Lecture</CardTitle>
  </CardHeader>
  <CardBody>
    <div class="space-y-3">
      <div class="flex gap-3 item-center">
        <div
          class="flex items-center justify-center rounded-md shrink-0 text-sky-500 bg-sky-500/10 size-10"
        >
          <LucideIcon name="FlaskConical" class="size-5" />
        </div>
        <div class="grow">
          <h6>Chemistry</h6>
          <p class="text-gray-500 dark:text-dark-500">09:00AM - 10:15AM</p>
        </div>
        <div class="shrink-0">
          <a href="#!" class="btn btn-red btn-xs"><i class="ri-eye-line"></i> Live</a>
        </div>
      </div>
      <div class="flex gap-3 item-center">
        <div
          class="flex items-center justify-center text-purple-500 rounded-md bg-purple-500/10 shrink-0 size-10"
        >
          <LucideIcon name="Scale" class="size-5" />
        </div>
        <div class="grow">
          <h6>Physics</h6>
          <p class="text-gray-500 dark:text-dark-500">10:15AM - 11:30AM</p>
        </div>
        <div class="shrink-0">
          <a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
        </div>
      </div>
      <div class="flex gap-3 item-center">
        <div
          class="flex items-center justify-center text-orange-500 rounded-md bg-orange-500/10 shrink-0 size-10"
        >
          <LucideIcon name="Atom" class="size-5" />
        </div>
        <div class="grow">
          <h6>English</h6>
          <p class="text-gray-500 dark:text-dark-500">11:30AM - 12:45PM</p>
        </div>
        <div class="shrink-0">
          <a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
        </div>
      </div>
      <div class="flex gap-3 item-center">
        <div
          class="flex items-center justify-center text-green-500 rounded-md bg-green-500/10 shrink-0 size-10"
        >
          <LucideIcon name="HeartPulse" class="size-5" />
        </div>
        <div class="grow">
          <h6>Biology</h6>
          <p class="text-gray-500 dark:text-dark-500">02:00PM - 03:15PM</p>
        </div>
        <div class="shrink-0">
          <a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
        </div>
      </div>
      <div class="flex gap-3 item-center">
        <div
          class="flex items-center justify-center rounded-md shrink-0 text-primary-500 bg-primary-500/10 size-10"
        >
          <LucideIcon name="JapaneseYen" class="size-5" />
        </div>
        <div class="grow">
          <h6>Mathematics</h6>
          <p class="text-gray-500 dark:text-dark-500">03:15PM - 05:00PM</p>
        </div>
        <div class="shrink-0">
          <a href="#!" class="btn btn-sub-gray btn-xs"><i class="ri-eye-line"></i> Live</a>
        </div>
      </div>
    </div>
  </CardBody>
</Col>
