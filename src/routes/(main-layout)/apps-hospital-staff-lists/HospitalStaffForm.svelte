<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
  import { staffData } from './staff';
  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  export let updatePagination = () => {};

  let staffForm = {
    staffID: '',
    image: '',
    department: '',
    email: '',
    name: '',
    phone: '',
    role: '',
    date: ''
  };

  let errors: any = {};
  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    staffForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  function fileChosen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        staffForm.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Form validation
  function validateForm() {
    errors = {};
    validateField('name', staffForm.name, 'Full name is required.');
    formatPhoneNumber();
    validateField('phone', staffForm.phone, 'Phone number is required.');
    validateField('role', staffForm.role, 'Role is required.');
    validateEmailField();
    validateField('date', staffForm.date, 'Date is required.');
    validateField('department', staffForm.department, 'Department is required.');
    return Object.keys(errors).length === 0;
  }

  function validateField(fieldName: string, fieldValue: string, errorMessage: string) {
    if (!fieldValue) {
      errors[fieldName] = errorMessage;
    } else {
      delete errors[fieldName];
    }
  }

  function validateEmailField() {
    if (!staffForm.email) {
      errors.email = 'Email is required.';
    } else if (!validateEmail(staffForm.email)) {
      errors.email = 'Invalid email format.';
    } else {
      delete errors.email;
    }
  }

  const submitForm = () => {
    if (validateForm()) {
      let startID = 1595;
      if (addForm) {
        // Add new staff to the staff list
        staffData.unshift(staffForm);
        startID++;
      } else {
        // Update existing staff information if it's an update
        const index = staffData.findIndex((s) => s.staffID === staffForm.staffID);
        if (index !== -1) {
          staffData[index] = staffForm;
        }
      }

      // Reset the form and errors after submission
      resetForm();
      addForm = true;
      updatePagination();
    }
  };

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function formatPhoneNumber() {
    let rawNumber = staffForm.phone.replace(/[^\d+]/g, '');
    if (rawNumber.startsWith('+')) {
      rawNumber = rawNumber.substring(1);
    }
    const formattedNumber = rawNumber.replace(/^(\d{3})(\d{0,4})(\d{0,5})$/, '+$1 $2 $3').trim();
    const phonePattern = /^\+\d{3} \d{4} \d{5}$/;
    if (!phonePattern.test(formattedNumber)) {
      errors.phone = 'Phone number must be in the format +XXX XXXX XXXXX';
    } else {
      errors.phone = '';
    }
    staffForm.phone = formattedNumber;
  }

  function resetForm() {
    staffForm = {
      staffID: '',
      image: '',
      department: '',
      email: '',
      name: '',
      phone: '',
      role: '',
      date: ''
    };
    errors = {};
  }
</script>

<div class="">
  <div
    class="h-24 p-5 rounded-t bg-gradient-to-r from-primary-500/20 via-pink-500/20 to-green-500/20"
  ></div>
  <div class="p-4">
    <div class="-mt-16">
      <label for="logo">
        <div
          class="inline-flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-white border-solid rounded-full cursor-pointer dark:border-dark-900 dark:bg-dark-850 size-24"
        >
          {#if staffForm.image}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src={staffForm.image} class="object-cover w-full h-full rounded-full" />
          {:else}
            <div class="flex flex-col items-center text-gray-500 dark:text-dark-500">
              <LucideIcon name="Upload"></LucideIcon>
            </div>
          {/if}
        </div>
      </label>
      <div class="hidden mt-4">
        <label class="block">
          <span class="sr-only">Choose profile photo</span>
          <input
            type="file"
            id="logo"
            on:change={fileChosen}
            class="block w-full text-sm file:rounded-md focus:outline-0 text-slate-500 dark:text-dark-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-4 mt-4">
      <div class="col-span-12">
        <label for="fullNameInput" class="form-label">Full Name</label>
        <input
          type="text"
          id="fullNameInput"
          class="form-input"
          placeholder="Full name"
          bind:value={staffForm.name}
          on:input={() => validateField('name', staffForm.name, 'Full name is required.')}
        />
        {#if errors.name}
          <span class="text-red-500">{errors.name}</span>
        {/if}
      </div>
      <div class="col-span-12">
        <label for="roleInput" class="form-label">Role</label>
        <input
          type="text"
          id="roleInput"
          class="form-input"
          placeholder="Role"
          bind:value={staffForm.role}
          on:input={() => validateField('role', staffForm.role, 'Role is required.')}
        />
        {#if errors.role}
          <span class="text-red-500">{errors.role}</span>
        {/if}
      </div>
      <div class="col-span-12">
        <label for="departmentSelect" class="form-label">Department</label>
        <select
          id="departmentSelect"
          class="form-input"
          bind:value={staffForm.department}
          on:change={() =>
            validateField('department', staffForm.department, 'Department is required.')}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Radiology">Radiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Sales">Sales</option>
        </select>
        {#if errors.department}
          <span class="text-red-500">{errors.department}</span>
        {/if}
      </div>
      <div class="col-span-12">
        <label for="emailInput" class="form-label">Email</label>
        <input
          type="email"
          id="emailInput"
          class="form-input"
          placeholder="support@srbthemes.com"
          bind:value={staffForm.email}
          on:input={validateEmailField}
        />
        {#if errors.email}
          <span class="text-red-500">{errors.email}</span>
        {/if}
      </div>
      <div class="col-span-12">
        <label for="phoneNumberInput" class="form-label">Phone Number</label>
        <input
          type="text"
          id="phoneNumberInput"
          class="form-input"
          placeholder="+(00) 0000 000"
          bind:value={staffForm.phone}
          on:input={formatPhoneNumber}
        />
        {#if errors.phone}
          <span class="text-red-500">{errors.phone}</span>
        {/if}
      </div>
      <div class="col-span-12">
        <label for="joiningDateInput" class="form-label">Joining Date</label>
        <FlatePicker
          bind:value={staffForm.date}
          dateFormat="Y-m-d"
          on:input={() => validateField('date', staffForm.date, 'Date is required.')}
        />
        {#if errors.date}
          <span class="text-red-500">{errors.date}</span>
        {/if}
      </div>
    </div>

    <div class="flex items-center justify-end gap-2 mt-5">
      <button type="button" class="btn btn-active-red" on:click={resetForm}>
        <LucideIcon name="X" class="inline-block size-4" />
        <span class="align-baseline">Close</span>
      </button>
      <button type="button" class="btn btn-primary" on:click={submitForm}>
        <LucideIcon name="Plus" class="inline-block ltr:mr-1 rtl:ml-1 size-4" />
        {addForm ? 'Add Staff' : 'Update Staff'}
      </button>
    </div>
  </div>
</div>
