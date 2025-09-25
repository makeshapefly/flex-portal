<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
  import { holidayData } from './holidays';

  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  export let updatePagination = () => {};
  // Holiday Form and Validation
  let holidayForm: any = {
    name: '',
    date: '',
    day: ''
  };

  let errors: any = {};
  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    holidayForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const resetForm = (): void => {
    Object.keys(holidayForm).forEach((key) => {
      const typedKey = key as keyof any; // Type assertion
      if (typeof holidayForm[typedKey] === 'number') {
        holidayForm[typedKey] = 0 as any; // Assigning number
      } else {
        holidayForm[typedKey] = '' as any; // Assigning string
      }
    });
  };

  function validateField(fieldName: string, fieldValue: string, errorMessage: string) {
    if (!fieldValue) {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  }

  function validateForm() {
    errors = {}; // Reset errors
    validateField('name', holidayForm.name, 'Holiday name is required.');
    validateField('date', holidayForm.date, 'Date is required.');
    validateField('day', holidayForm.day, 'Day is required.');

    return Object.keys(errors).length === 0;
  }
  // Handle form submission
  function submitForm() {
    if (validateForm()) {
      // Form is valid, proceed with submission logic
      const newHoliday = {
        holidayID: 'PEH-' + (holidayData.length + 1595).toString(),
        name: holidayForm.name,
        date: holidayForm.date,
        day: holidayForm.day
      };

      //   holidayData = [newHoliday, ...holidayData];

      updatePagination();

      holidayForm.name = '';
      holidayForm.date = '';
      holidayForm.day = '';
    }
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <div class="grid grid-cols-12 gap-space">
    <!-- Holiday Name Input -->
    <div class="col-span-12">
      <label for="holidayInput" class="form-label">
        Holiday <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="holidayInput"
        class="form-input"
        placeholder="Enter holiday name"
        bind:value={holidayForm.name}
        on:input={() => validateField('name', holidayForm.name, 'Holiday name is required.')}
      />
      {#if errors.name}
        <span class="text-red-500">{errors.name}</span>
      {/if}
    </div>

    <!-- Date Input -->
    <div class="col-span-12">
      <label for="dateInput" class="form-label">
        Date <span class="text-red-500">*</span>
      </label>

      <FlatePicker
        bind:value={holidayForm.date}
        dateFormat="Y-m-d"
        on:input={() => validateField('date', holidayForm.date, 'Date is required.')}
      />
      {#if errors.date}
        <span class="text-red-500">{errors.date}</span>
      {/if}
    </div>

    <!-- Day Name Input -->
    <div class="col-span-12">
      <label for="daysInput" class="form-label">
        Day Name <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="daysInput"
        class="form-input"
        placeholder="Enter date name"
        bind:value={holidayForm.day}
        on:input={() => validateField('day', holidayForm.day, 'Day is required.')}
      />
      {#if errors.day}
        <span class="text-red-500">{errors.day}</span>
      {/if}
    </div>

    <!-- Form Buttons -->
    <div class="col-span-12">
      <div class="flex items-center justify-end gap-2">
        <button type="button" class="btn btn-active-red">
          <LucideIcon name="X" class="inline-block size-4 me-1" /><span class="align-baseline"
            >Close</span
          >
        </button>
        <button type="submit" class="btn btn-primary">
          {addForm ? 'Add Holiday' : 'Edit Holiday'}
        </button>
      </div>
    </div>
  </div>
</form>
