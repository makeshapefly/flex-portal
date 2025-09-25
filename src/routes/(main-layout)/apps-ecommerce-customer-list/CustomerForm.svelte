<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import { customers, type CustomerList } from './customer-list';

  export let addForm;
  export let editMode = false;
  export let selectedCustomer: CustomerList | null = null;

  interface CustomerForm {
    customerId?: string;
    image: string | null;
    firstName: string;
    lastName: string;
    customersName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    subscriber: string;
    location: string;
    status: string;
  }

  let customerForm: CustomerForm = {
    customerId: '',
    image: null,
    firstName: '',
    customersName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    subscriber: '',
    location: '',
    status: ''
  };

  let errors: Record<string, string> = {};
  const fileChosen = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        customerForm.image = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    const [firstName, ...lastNameParts] = selectedCustomer.customersName.split(' ');
    customerForm = {
      ...(selectedCustomer as CustomerForm),
      firstName: firstName || '',
      lastName: lastNameParts.join(' ') || ''
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const validateField = (field: string, value: string, errorMessage: string) => {
    if (!value) {
      errors[field] = errorMessage;
    } else {
      delete errors[field];
    }
  };

  const validateEmailField = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(customerForm.email)) {
      errors.email = 'Invalid email address.';
    } else {
      delete errors.email;
    }
  };
  const validatePhone = () => {
    const phonePattern = /^[0-9]{3} [0-9]{3} [0-9]{4}$/;
    if (!phonePattern.test(customerForm.phoneNumber)) {
      errors.phone = 'Invalid phone number format.';
    } else {
      delete errors.phone;
    }
  };

  const validateForm = () => {
    Object.keys(customerForm).forEach((field) => {
      errors[field] = !customerForm[field as keyof CustomerForm] ? `${field} is required` : '';
    });

    return Object.values(errors).every((error) => !error);
  };

  const submitForm = () => {
    // Handle form submission
    if (validateForm()) {
      if (addForm) {
        addCustomerDetails();
      } else {
        updateCustomerDetails();
      }
      resetForm();
    } else {
      console.log(errors);
    }
  };

  const addCustomerDetails = () => {
    const customerId = `PEC-${24151 + customers.length}`;
    const customersName = `${customerForm.firstName} ${customerForm.lastName}`;
    customers.push({ ...customerForm, customerId, customersName });
  };

  const updateCustomerDetails = () => {
    const findIndex = customers.findIndex(
      (customer) => customer.customerId === customerForm.customerId
    );
    customers[findIndex] = {
      ...customerForm,
      customersName: `${customerForm.firstName} ${customerForm.lastName}`
    };
  };
  const resetForm = () => {
    Object.keys(customerForm).forEach((key) => {
      customerForm[key as keyof CustomerForm] = '';
    });
  };
</script>

<div class="modal-content">
  <div class="h-20 bg-gray-100 rounded-t-md dark:bg-dark-850"></div>

  <div class="modal-content">
    <div class="-mt-16">
      <label for="logo">
        <div
          class="inline-flex items-center justify-center overflow-hidden bg-gray-100 border border-gray-200 rounded-full cursor-pointer dark:bg-dark-850 dark:border-dark-800 size-24"
        >
          {#if customerForm.image}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src={customerForm.image} class="object-cover w-full h-full rounded-full" />
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
            name="logo"
            id="logo"
            on:change={fileChosen}
            class="block w-full text-sm file:rounded-md focus:outline-0 text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>
      </div>
      {#if errors.image}
        <span class="text-red-500">{errors.image}</span>
      {/if}
    </div>

    <div class="mt-5">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-6">
          <label for="firstNameInput" class="form-label"
            >First Name <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="firstNameInput"
            class="form-input"
            placeholder="Enter your first name"
            bind:value={customerForm.firstName}
            on:input={() =>
              validateField('firstName', customerForm.firstName, 'First name is required.')}
          />
          {#if errors.firstName}
            <span class="text-red-500">{errors.firstName}</span>
          {/if}
        </div>

        <div class="col-span-6">
          <label for="lastNameInput" class="form-label"
            >Last Name <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="lastNameInput"
            class="form-input"
            placeholder="Enter your last name"
            bind:value={customerForm.lastName}
            on:input={() =>
              validateField('lastName', customerForm.lastName, 'Last name is required.')}
          />
          {#if errors.lastName}
            <span class="text-red-500">{errors.lastName}</span>
          {/if}
        </div>

        <div class="col-span-12">
          <label for="emailInput" class="form-label"
            >Email <span class="text-red-500">*</span></label
          >
          <input
            type="email"
            id="emailInput"
            class="form-input"
            placeholder="Enter your email"
            bind:value={customerForm.email}
            on:input={validateEmailField}
          />
          {#if errors.email}
            <span class="text-red-500">{errors.email}</span>
          {/if}
        </div>

        <div class="col-span-12">
          <label for="phoneNumberInput" class="form-label"
            >Phone Number <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="phoneNumberInput"
            class="form-input"
            placeholder="000 000 0000"
            bind:value={customerForm.phoneNumber}
            on:input={validatePhone}
          />
          {#if errors.phone}
            <span class="text-red-500">{errors.phone}</span>
          {/if}
        </div>

        <div class="col-span-6">
          <label for="genderInput" class="form-label"
            >Gender <span class="text-red-500">*</span></label
          >
          <div class="flex items-center gap-3">
            <div class="input-radio-group">
              <input
                id="maleRadio"
                name="gender"
                class="input-radio input-radio-primary"
                type="radio"
                value="Male"
                bind:group={customerForm.gender}
                on:change={() =>
                  validateField('gender', customerForm.gender, 'Gender is required.')}
              />
              <label for="maleRadio" class="input-radio-label">Male</label>
            </div>
            <div class="input-radio-group">
              <input
                id="femaleRadio"
                name="gender"
                class="input-radio input-radio-primary"
                type="radio"
                value="Female"
                bind:group={customerForm.gender}
                on:change={() =>
                  validateField('gender', customerForm.gender, 'Gender is required.')}
              />
              <label for="femaleRadio" class="input-radio-label">Female</label>
            </div>
          </div>
          {#if errors.gender}
            <span class="text-red-500">{errors.gender}</span>
          {/if}
        </div>

        <!-- Subscriber and Status Fields here, assuming they are select options -->
        <div class="col-span-6">
          <label for="subscriberSelect" class="form-label"
            >Subscriber <span class="text-red-500">*</span></label
          >
          <select
            id="subscriberSelect"
            bind:value={customerForm.subscriber}
            on:change={() =>
              validateField('subscriber', customerForm.subscriber, 'Subscriber is required.')}
            class="form-input"
          >
            <option value="">Select Subscriber</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {#if errors.subscriber}
            <span class="text-red-500">{errors.subscriber}</span>
          {/if}
        </div>

        <div class="col-span-6">
          <label for="locationInput" class="form-label"
            >Location <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="locationInput"
            class="form-input"
            placeholder="Location"
            bind:value={customerForm.location}
            on:input={() =>
              validateField('location', customerForm.location, 'Location is required.')}
          />
          {#if errors.location}
            <span class="text-red-500">{errors.location}</span>
          {/if}
        </div>

        <div class="col-span-6">
          <label for="statusSelect" class="form-label"
            >Status <span class="text-red-500">*</span></label
          >
          <select
            id="statusSelect"
            bind:value={customerForm.status}
            class="form-input"
            on:change={() => validateField('status', customerForm.status, 'Status is required.')}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {#if errors.status}
            <span class="text-red-500">{errors.status}</span>
          {/if}
        </div>

        <div class="col-span-12">
          <div class="flex justify-end gap-2">
            <button type="button" class="btn btn-sub-gray">Cancel</button>
            <button class="btn btn-primary" on:click={submitForm}>
              {editMode ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
