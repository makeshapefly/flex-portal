<script lang="ts">
  export let calculatePageData = (category: string) => {
    console.log(`Fetching data for: ${category}`);
  };
  export let medicines: any = '';
  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  interface Medicine {
    date: string;
    time: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    prescribingDoctor: string;
    reasonCondition: string;
    notes: string;
  }

  let medicineForm: any = {
    date: '',
    time: '',
    medicineName: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    prescribingDoctor: '',
    reasonCondition: '',
    notes: ''
  };
  let errors: any = {};

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    medicineForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const validateField = (fieldName: string, fieldValue: string, errorMessage: string) => {
    if (!fieldValue) {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  };

  const submitForm = (event: Event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateMedicineForm()) {
      const newMedicine: Medicine = { ...medicineForm }; // Create new medicine object

      // Add the new medicine to the list of medicines
      medicines = [newMedicine, ...medicines];

      // Reset the form
      medicineForm = {
        date: '',
        time: '',
        medicineName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        prescribingDoctor: '',
        reasonCondition: '',
        notes: ''
      };

      // Optionally, show a success message or feedback to the user
      console.log('Form submitted:', newMedicine);

      // Recalculate the page data to include the newly added medicine
      calculatePageData('medicine');
    }
  };

  const validateMedicineForm = () => {
    errors = {}; // Clear previous errors

    validateField('date', medicineForm.date, 'Date is required.');
    validateField('medicineName', medicineForm.medicineName, 'Medicine name is required.');
    validateField('dosage', medicineForm.dosage, 'Dosage is required.');
    validateField('frequency', medicineForm.frequency, 'Frequency is required.');
    validateField('startDate', medicineForm.startDate, 'Start date is required.');
    validateField('endDate', medicineForm.endDate, 'End date is required.');
    validateField(
      'prescribingDoctor',
      medicineForm.prescribingDoctor,
      'Prescribing doctor is required.'
    );
    validateField('reasonCondition', medicineForm.reasonCondition, 'Reason/Condition is required.');
    validateField('notes', medicineForm.notes, 'Notes are required.');

    return Object.keys(errors).length === 0;
  };

  // Validate individual fields
  const validateMedicineField = (fieldName: string, fieldValue: string, errorMessage: string) => {
    if (!fieldValue) {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }

    // Additional validation for 'dosage' field to match a specific format
    if (
      fieldName === 'dosage' &&
      fieldValue &&
      !/^(1000|[1-9][0-9]{0,2}|[1-9])mg$/.test(fieldValue)
    ) {
      errors[fieldName] = 'Dosage must be a number (0-1000) followed by "mg".';
    }
  };

  const resetForm = (): void => {
    Object.keys(medicineForm).forEach((key) => {
      const typedKey = key as keyof any; // Type assertion
      if (typeof medicineForm[typedKey] === 'number') {
        medicineForm[typedKey] = 0 as any; // Assigning number
      } else {
        medicineForm[typedKey] = '' as any; // Assigning string
      }
    });
  };
</script>

<form>
  <div class="grid grid-cols-12 gap-space">
    <div class="col-span-12">
      <label for="medicineNameInput" class="form-label"
        >Medicine Name <span class="text-red-500">*</span></label
      >
      <input
        type="text"
        id="medicineNameInput"
        class="form-input"
        placeholder="Enter medicine name"
        bind:value={medicineForm.medicineName}
        on:input={() =>
          validateField('medicineName', medicineForm.medicineName, 'Medicine name is required.')}
      />
      {#if errors.medicineName}
        <span class="text-red-500">{errors.medicineName}</span>
      {/if}
    </div>

    <div class="col-span-6">
      <label for="dosageInput" class="form-label">Dosage <span class="text-red-500">*</span></label>
      <input
        type="text"
        id="dosageInput"
        class="form-input"
        placeholder="0mg"
        bind:value={medicineForm.dosage}
        on:input={() => validateField('dosage', medicineForm.dosage, 'Dosage is required.')}
      />
      {#if errors.dosage}
        <span class="text-red-500">{errors.dosage}</span>
      {/if}
    </div>

    <div class="col-span-6">
      <label for="frequencyInput" class="form-label"
        >Frequency <span class="text-red-500">*</span></label
      >
      <input
        type="text"
        id="frequencyInput"
        class="form-input"
        placeholder="Enter frequency"
        bind:value={medicineForm.frequency}
        on:input={() =>
          validateField('frequency', medicineForm.frequency, 'Frequency is required.')}
      />
      {#if errors.frequency}
        <span class="text-red-500">{errors.frequency}</span>
      {/if}
    </div>

    <div class="col-span-6">
      <label for="medicineStartDateInput" class="form-label"
        >Start Date <span class="text-red-500">*</span></label
      >
      <input
        type="date"
        id="medicineStartDateInput"
        class="form-input"
        bind:value={medicineForm.startDate}
        on:input={() =>
          validateField('startDate', medicineForm.startDate, 'Start date is required.')}
      />
      {#if errors.startDate}
        <span class="text-red-500">{errors.startDate}</span>
      {/if}
    </div>

    <div class="col-span-6">
      <label for="medicineEndDateInput" class="form-label"
        >End Date <span class="text-red-500">*</span></label
      >
      <input
        type="date"
        id="medicineEndDateInput"
        class="form-input"
        bind:value={medicineForm.endDate}
        on:input={() => validateField('endDate', medicineForm.endDate, 'End date is required.')}
      />
      {#if errors.endDate}
        <span class="text-red-500">{errors.endDate}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <label for="prescribingDoctorNameInput" class="form-label"
        >Prescribing Doctor <span class="text-red-500">*</span></label
      >
      <input
        type="text"
        id="prescribingDoctorNameInput"
        class="form-input"
        placeholder="Enter prescribing doctor"
        bind:value={medicineForm.prescribingDoctor}
        on:input={() =>
          validateField(
            'prescribingDoctor',
            medicineForm.prescribingDoctor,
            'Prescribing doctor is required.'
          )}
      />
      {#if errors.prescribingDoctor}
        <span class="text-red-500">{errors.prescribingDoctor}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <label for="reasonConditionInput" class="form-label"
        >Reason/Condition <span class="text-red-500">*</span></label
      >
      <input
        type="text"
        id="reasonConditionInput"
        class="form-input"
        placeholder="Reason/Condition"
        bind:value={medicineForm.reasonCondition}
        on:input={() =>
          validateField(
            'reasonCondition',
            medicineForm.reasonCondition,
            'Reason/Condition is required.'
          )}
      />
      {#if errors.reasonCondition}
        <span class="text-red-500">{errors.reasonCondition}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <label for="textareaInput2" class="form-label">Notes</label>
      <textarea
        id="textareaInput2"
        rows="2"
        class="h-auto form-input"
        placeholder="Enter notes"
        bind:value={medicineForm.notes}
        on:input={() => validateField('notes', medicineForm.notes, 'Notes are required.')}
      ></textarea>
      {#if errors.notes}
        <span class="text-red-500">{errors.notes}</span>
      {/if}
    </div>

    <div class="col-span-12">
      <div class="flex items-center justify-end gap-2">
        <button type="button" class="btn btn-active-red">Close</button>
        <button type="submit" class="btn btn-primary" on:submit={submitForm}>Add Medicine</button>
      </div>
    </div>
  </div>
</form>
