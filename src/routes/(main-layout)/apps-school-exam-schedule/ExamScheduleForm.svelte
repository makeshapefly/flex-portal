<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
  import { examListData } from './exam-list';

  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  export let startID = 531;
  export let currentPage;
  export let updateDisplayedSchedules = () => {};

  let scheduleForm: any = {
    testName: '',
    testCategory: '',
    testType: '',
    class: '',
    startDate: '',
    endDate: '',
    status: ''
  };

  let errors: Record<string, string> = {};

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    scheduleForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const resetForm = (): void => {
    Object.keys(scheduleForm).forEach((key) => {
      const typedKey = key as keyof any; // Type assertion
      if (typeof scheduleForm[typedKey] === 'number') {
        scheduleForm[typedKey] = 0 as any; // Assigning number
      } else {
        scheduleForm[typedKey] = '' as any; // Assigning string
      }
    });
  };

  const validateField = (fieldName: string, fieldValue: string, errorMessage: string) => {
    if (!fieldValue) {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  };

  const validateForm = (): boolean => {
    errors = {};
    validateField('testName', scheduleForm.testName, 'Test name is required.');
    validateField('testCategory', scheduleForm.testCategory, 'Test Category is required.');
    validateField('testType', scheduleForm.testType, 'Test Type is required.');
    validateField('class', scheduleForm.class, 'Class is required.');
    validateField('startDate', scheduleForm.startDate, 'Start Date is required.');
    validateField('endDate', scheduleForm.endDate, 'End Date is required.');
    validateField('status', scheduleForm.status, 'Status is required.');
    return Object.keys(errors).length === 0;
  };

  // Submit the form
  const submitForm = () => {
    if (validateForm()) {
      if (scheduleForm.scheduleID) {
        // Update existing schedule
        const index = examListData.findIndex(
          (schedule) => schedule.scheduleID === scheduleForm.scheduleID
        );
        if (index !== -1) examListData[index] = scheduleForm;
      } else {
        // Add new schedule
        const newSchedule = {
          ...scheduleForm,
          scheduleID: 'PEE-' + (startID + examListData.length).toString()
        };
        // examListData = [newSchedule, ...examListData];
      }

      currentPage = 1;
      updateDisplayedSchedules();
    }
  };
</script>

<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12">
    <label for="testNameInput" class="form-label">Test Name</label>
    <input
      type="text"
      id="testNameInput"
      class="form-input"
      placeholder="Test name"
      bind:value={scheduleForm.testName}
      on:input={() => validateField('testName', scheduleForm.testName, 'Test Name is required')}
    />
    {#if errors.testName}
      <span class="text-red-500">{errors.testName}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="testCategorySelect" class="form-label">Test Category</label>
    <select
      id="testCategorySelect"
      class="form-input"
      bind:value={scheduleForm.testCategory}
      on:change={() =>
        validateField('testCategory', scheduleForm.testCategory, 'Test Category is required')}
    >
      <option value="" disabled>Select Category</option>
      <!-- Add your categories here -->
      <option value="Final Test">Final Test</option>
      <option value="Midterm">Midterm</option>
    </select>
    {#if errors.testCategory}
      <span class="text-red-500">{errors.testCategory}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="testTypeSelect" class="form-label">Test Type</label>
    <select
      id="testTypeSelect"
      class="form-input"
      bind:value={scheduleForm.testType}
      on:change={() => validateField('testType', scheduleForm.testType, 'Test Type is required')}
    >
      <option value="" disabled>Select Type</option>
      <option value="General">General</option>
      <option value="Practical">Practical</option>
    </select>
    {#if errors.testType}
      <span class="text-red-500">{errors.testType}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="classSelect" class="form-label">Class</label>
    <select
      id="classSelect"
      class="form-input"
      bind:value={scheduleForm.class}
      on:change={() => validateField('class', scheduleForm.class, 'Class is required')}
    >
      <option value="" disabled>Select Class</option>
      <option value="12">12</option>
      <option value="11">11</option>
    </select>
    {#if errors.class}
      <span class="text-red-500">{errors.class}</span>
    {/if}
  </div>

  <div class="col-span-6">
    <label for="startDateSelect" class="form-label">Start Date</label>
    <FlatePicker
      bind:value={scheduleForm.startDate}
      dateFormat="Y-m-d"
      on:input={() => validateField('date', scheduleForm.startDate, 'Date is required.')}
    />
    {#if errors.date}
      <span class="text-red-500">{errors.startDate}</span>
    {/if}
  </div>

  <div class="col-span-6">
    <label for="endDateSelect" class="form-label">End Date</label>
    <FlatePicker
      bind:value={scheduleForm.endDate}
      dateFormat="Y-m-d"
      on:input={() => validateField('date', scheduleForm.endDate, 'Date is required.')}
    />
    {#if errors.date}
      <span class="text-red-500">{errors.endDate}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="statusSelect" class="form-label">Status</label>
    <select
      id="statusSelect"
      class="form-input"
      bind:value={scheduleForm.status}
      on:change={() => validateField('status', scheduleForm.status, 'Status is required')}
    >
      <option value="" disabled>Select Status</option>
      <option value="New">New</option>
      <option value="Scheduled">Scheduled</option>
      <option value="Completed">Completed</option>
    </select>
    {#if errors.status}
      <span class="text-red-500">{errors.status}</span>
    {/if}
  </div>
</div>
<div class="flex items-center justify-end gap-2 mt-5">
  <button type="button" class="btn btn-active-red">
    <LucideIcon name="X" class="inline-block size-4" /><span class="align-baseline">Close</span>
  </button>
  <button type="button" class="btn btn-primary" on:click={submitForm}>
    {scheduleForm.scheduleID ? 'Update Exam Schedule' : 'Add Exam Schedule'}
  </button>
</div>
