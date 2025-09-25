<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';

  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;

  interface QuestionWithShowAll {
    id: number;
    question: string;
    options: string[];
    type: string;
    difficulty: string;
    status: string;
    showAll?: boolean;
  }

  // Form data and validation errors
  let form = {
    question: '',
    options: ['', '', '', ''],
    checkbox: false,
    type: '',
    difficulty: '',
    status: ''
  };

  let errors: any = {};

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    form = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetData();
  }

  // Validate individual field
  function validateField(fieldName: string, fieldValue: string, errorMessage: string) {
    if (!fieldValue) {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  }

  // Validate the entire form
  function validateForm() {
    errors = {};
    validateField('question', form.question, 'Question is required.');
    validateField('type', form.type, 'Item Type is required.');
    validateField('difficulty', form.difficulty, 'Difficulty Level is required.');
    validateField('status', form.status, 'Status is required.');

    if (form.type === 'MCQ') {
      validateField('option1', form.options[0], 'Option 1 is required.');
      validateField('option2', form.options[1], 'Option 2 is required.');
      validateField('option3', form.options[2], 'Option 3 is required.');
      validateField('option4', form.options[3], 'Option 4 is required.');
    }

    return Object.keys(errors).length === 0;
  }

  // Function to handle form submission
  function submitForm() {
    if (validateForm()) {
    } else {
      console.log('Form validation failed.');
    }
  }

  function resetData() {
    form = {
      question: '',
      options: ['', '', '', ''],
      checkbox: false,
      type: '',
      difficulty: '',
      status: ''
    };
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <div class="grid grid-cols-12 gap-4">
    <!-- Question -->
    <div class="col-span-12">
      <label for="questionInput" class="form-label">Question</label>
      <input
        type="text"
        id="questionInput"
        class="form-input"
        placeholder="Enter question"
        bind:value={form.question}
        on:input={() => validateField('question', form.question, 'Question is required')}
      />
      {#if errors.question}
        <span class="text-red-500">{errors.question}</span>
      {/if}
    </div>

    <!-- Option 1 -->
    <div class="col-span-6">
      <label for="option1Input" class="form-label">Option 1</label>
      <input
        type="text"
        id="option1Input"
        class="form-input"
        placeholder="Option one"
        bind:value={form.options[0]}
        disabled={form.checkbox || form.type === 'Q & A'}
        on:input={() => validateField('option1', form.options[0], 'Option 1 is required')}
      />
      {#if errors.option1}
        <span class="text-red-500">{errors.option1}</span>
      {/if}
    </div>

    <!-- Option 2 -->
    <div class="col-span-6">
      <label for="option2Input" class="form-label">Option 2</label>
      <input
        type="text"
        id="option2Input"
        class="form-input"
        placeholder="Option two"
        bind:value={form.options[1]}
        disabled={form.checkbox || form.type === 'Q & A'}
        on:input={() => validateField('option2', form.options[1], 'Option 2 is required')}
      />
      {#if errors.option2}
        <span class="text-red-500">{errors.option2}</span>
      {/if}
    </div>

    <!-- Option 3 -->
    <div class="col-span-6">
      <label for="option3Input" class="form-label">Option 3</label>
      <input
        type="text"
        id="option3Input"
        class="form-input"
        placeholder="Option three"
        bind:value={form.options[2]}
        disabled={form.checkbox || form.type === 'Q & A'}
        on:input={() => validateField('option3', form.options[2], 'Option 3 is required')}
      />
      {#if errors.option3}
        <span class="text-red-500">{errors.option3}</span>
      {/if}
    </div>

    <!-- Option 4 -->
    <div class="col-span-6">
      <label for="option4Input" class="form-label">Option 4</label>
      <input
        type="text"
        id="option4Input"
        class="form-input"
        placeholder="Option four"
        bind:value={form.options[3]}
        disabled={form.checkbox || form.type === 'Q & A'}
        on:input={() => validateField('option4', form.options[3], 'Option 4 is required')}
      />
      {#if errors.option4}
        <span class="text-red-500">{errors.option4}</span>
      {/if}
    </div>

    <!-- Not a MCQ Checkbox -->
    <div class="col-span-12">
      <div class="input-check-group">
        <input
          id="optionOffInput"
          class="input-check input-check-primary"
          type="checkbox"
          bind:checked={form.checkbox}
        />
        <label for="optionOffInput" class="input-check-label">Not a MCQ</label>
      </div>
    </div>

    <!-- Item Type -->
    <div class="col-span-6">
      <label for="itemTypeSelect" class="form-label">Item Type</label>
      <select
        id="itemTypeSelect"
        class="form-input"
        bind:value={form.type}
        on:change={() => validateField('type', form.type, 'Item Type is required')}
      >
        <option value="">Select Item Type</option>
        <option value="MCQ">MCQ</option>
        <option value="Q & A">Q & A</option>
      </select>
      {#if errors.type}
        <span class="text-red-500">{errors.type}</span>
      {/if}
    </div>

    <!-- Difficulty Level -->
    <div class="col-span-6">
      <label for="difficultLevelSelect" class="form-label">Difficulty Level</label>
      <select
        id="difficultLevelSelect"
        class="form-input"
        bind:value={form.difficulty}
        on:change={() =>
          validateField('difficulty', form.difficulty, 'Difficulty Level is required')}
      >
        <option value="">Select Difficulty Level</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      {#if errors.difficulty}
        <span class="text-red-500">{errors.difficulty}</span>
      {/if}
    </div>

    <!-- Status -->
    <div class="col-span-12">
      <label for="statusSelect" class="form-label">Status</label>
      <select
        id="statusSelect"
        class="form-input"
        bind:value={form.status}
        on:change={() => validateField('status', form.status, 'Status is required')}
      >
        <option value="">Select Status</option>
        <option value="Old">Old</option>
        <option value="New">New</option>
      </select>
      {#if errors.status}
        <span class="text-red-500">{errors.status}</span>
      {/if}
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex items-center justify-end gap-2 mt-5">
    <button type="button" class="btn btn-active-red" data-modal-close="addQuestionModal">
      <LucideIcon name="X" class="inline-block size-4"></LucideIcon>
      <span class="align-baseline">Close</span>
    </button>
    <button type="button" class="btn btn-primary" on:click={submitForm}> Add question </button>
  </div>
</form>
