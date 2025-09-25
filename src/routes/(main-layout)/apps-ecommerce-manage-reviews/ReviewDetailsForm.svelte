<script lang="ts">
  import { reviewsData, type UserReview } from './reviews';

  export let addForm;
  export let editMode = false;
  export let selectedCustomer: any | null = null;

  let reviewForm: UserReview = {
    star: 0,
    userName: '',
    date: '',
    location: '',
    title: '',
    content: ''
  };

  let errors: any = {
    star: 0,
    userName: '',
    date: '',
    location: '',
    title: '',
    content: ''
  };
  let hovering = 0;

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    reviewForm = {
      ...selectedCustomer
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  // Validate fields
  const validateField = (field: string, value: string | number, errorMessage: string) => {
    if (!value) {
      errors[field] = errorMessage;
    } else {
      delete errors[field];
    }
  };

  const validateForm = () => {
    Object.keys(reviewForm).forEach((field) => {
      errors[field] = !reviewForm[field as keyof UserReview] ? `${field} is required` : '';
    });

    return Object.values(errors).every((error) => !error);
  };

  const submitFormHandler = () => {
    if (validateForm()) {
      if (addForm) {
        addReviewData();
      } else {
        updateCustomerDetails();
      }
    }
  };
  // Add Review functionality

  const addReviewData = () => {
    const reviewId = $reviewsData.length + 1;
    const image = '/assets/images/avatar/user-1.png';
    // $reviewsData.unshift({ ...reviewForm, reviewId, image });
    reviewsData.update((reviews) => [{ ...reviewForm, reviewId, image }, ...reviews]);
  };

  const updateCustomerDetails = () => {
    console.log('update data');
  };

  const resetForm = () => {
    Object.keys(reviewForm).forEach((key) => {
      reviewForm[key as keyof UserReview] = '';
    });
  };
</script>

<form>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12">
      <div class="flex flex-col justify-center gap-5">
        <h6 class="text-center">Your Rating?</h6>
        <div class="relative flex justify-center gap-3">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          {#each [1, 2, 3, 4, 5] as i}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="flex justify-center w-10 h-2 transition-all duration-200 rounded-md cursor-pointer"
              class:bg-yellow-500={Number(reviewForm.star) >= i}
              class:bg-gray-200={Number(reviewForm.star) < i}
              class:dark:bg-dark-800={Number(reviewForm.star) < i}
              on:click={() => (reviewForm.star = i)}
              on:mouseover={() => (hovering = i)}
              on:mouseleave={() => (hovering = 0)}
            >
              <p
                class="mt-4 text-2xl pointer-events-none select-none"
                class:invisible={reviewForm.star !== i && hovering !== i}
              >
                {i === 1 ? '😒' : i === 2 ? '🤨' : i === 3 ? '🫡' : i === 4 ? '😚' : '🥰'}
              </p>
            </div>
          {/each}
        </div>
        <div class="mt-5">
          <label for="rating" class="form-label">Rating Input:</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            bind:value={reviewForm.star}
            class="form-input"
            on:input={() =>
              validateField('star', reviewForm.star, 'Rating must be between 1 and 5.')}
          />
          {#if errors.star}
            <span class="text-sm text-red-500">{errors.star}</span>
          {/if}
        </div>
      </div>
    </div>

    <div class="col-span-6">
      <label for="userNameInput" class="form-label">User Name</label>
      <input
        type="text"
        id="userNameInput"
        class="form-input"
        placeholder="User name"
        bind:value={reviewForm.userName}
        on:input={() => validateField('userName', reviewForm.userName, 'User name is required.')}
      />
      {#if errors.userName}
        <span class="text-sm text-red-500">{errors.userName}</span>
      {/if}
    </div>

    <div class="col-span-6">
      <label for="createDateInput" class="form-label">Create Date</label>
      <input
        type="text"
        id="createDateInput"
        class="form-input"
        placeholder="DD-MM-YYYY"
        bind:value={reviewForm.date}
        on:input={() => validateField('date', reviewForm.date, 'Date is required.')}
      />
      {#if errors.date}
        <span class="text-sm text-red-500">{errors.date}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <label for="locationInput" class="form-label">Location</label>
      <input
        type="text"
        id="locationInput"
        class="form-input"
        placeholder="Location"
        bind:value={reviewForm.location}
        on:input={() => validateField('location', reviewForm.location, 'Location is required.')}
      />
      {#if errors.location}
        <span class="text-sm text-red-500">{errors.location}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <label for="titleInput" class="form-label">Title</label>
      <input
        type="text"
        id="titleInput"
        class="form-input"
        placeholder="Review title"
        bind:value={reviewForm.title}
        on:input={() => validateField('title', reviewForm.title, 'Title is required.')}
      />
      {#if errors.title}
        <span class="text-sm text-red-500">{errors.title}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <label for="writeReviewInput" class="form-label">Write your Content</label>
      <textarea
        id="writeReviewInput"
        rows="3"
        class="h-auto form-input"
        bind:value={reviewForm.content}
        placeholder="Enter your description"
        on:change={() => validateField('content', reviewForm.content, 'Content is required.')}
      ></textarea>
      {#if errors.content}
        <span class="text-sm text-red-500">{errors.content}</span>
      {/if}
    </div>
  </div>

  <div class="flex justify-end gap-2 mt-5">
    <button type="button" class="btn btn-active-red"> Cancel </button>
    <button type="button" class="btn btn-primary" on:click={submitFormHandler}>
      {editMode ? 'Update review' : 'Add review'}
    </button>
  </div>
</form>
