<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';

  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  export let updatePagination = () => {};

  interface ParentForm {
    image: string;
    parentsName: string;
    studentName: string;
    relation: string;
    gender: string;
    occupation: string;
    email: string;
    phone: string;
    address?: string;
  }
  // Store for the form data
  let parentsForm: any = {
    parentsName: '',
    studentName: '',
    relation: '',
    gender: '',
    occupation: '',
    email: '',
    phone: '',
    image: '', // Initially no image
    address: ''
  };
  let errors: any = {};
  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    parentsForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const resetForm = (): void => {
    Object.keys(parentsForm).forEach((key) => {
      const typedKey = key as keyof any; // Type assertion
      if (typeof parentsForm[typedKey] === 'number') {
        parentsForm[typedKey] = 0 as any; // Assigning number
      } else {
        parentsForm[typedKey] = '' as any; // Assigning string
      }
    });
  };

  const fileChosen = (event: { target: any }) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
      if (file) {
        parentsForm.image = URL.createObjectURL(file);
      }
    }
  };

  // Validation function
  function validateForm(): boolean {
    let valid = true;
    let formErrors: { [key: string]: string } = {};

    // Validate each field
    if (!parentsForm.parentsName) {
      formErrors.parentsName = 'Full name is required.';
      valid = false;
    }

    if (!parentsForm.studentName) {
      formErrors.studentName = 'Student name is required.';
      valid = false;
    }

    if (!parentsForm.relation) {
      formErrors.relation = 'Relation is required.';
      valid = false;
    }

    if (!parentsForm.occupation) {
      formErrors.occupation = 'Occupation is required.';
      valid = false;
    }

    if (!parentsForm.phone || !validatePhone(parentsForm.phone)) {
      formErrors.phone = 'Phone number must be 10 digits and numeric';
      valid = false;
    }

    if (!parentsForm.email || !validateEmail(parentsForm.email)) {
      formErrors.email = 'Invalid email format.';
      valid = false;
    }

    if (!parentsForm.gender) {
      formErrors.gender = 'Gender is required.';
      valid = false;
    }
    if (!parentsForm.address) {
      formErrors.address = 'Address is required.';
      valid = false;
    }

    // Phone validation
    function validatePhone(phone: string): boolean {
      const phonePattern = /^[0-9]{10}$/;
      return phonePattern.test(phone);
    }

    // Email validation
    function validateEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
    errors.set(formErrors);
    return valid;
  }

  function submitForm() {
    if (validateForm()) {
      // Create the new parent data
      const newParent = {
        image: parentsForm.image,
        parentsName: parentsForm.parentsName,
        studentName: parentsForm.studentName,
        relation: parentsForm.relation,
        gender: parentsForm.gender,
        occupation: parentsForm.occupation,
        email: parentsForm.email,
        phone: parentsForm.phone,
        address: parentsForm.address || ''
      };

      //@ts-ignore
      parentsData.update((currentData: any) => {
        return [...currentData, newParent];
      });

      updatePagination();
      resetForm();
    }
  }

  function fileToDataUrl(file: File, callback: (src: string) => void) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        callback(e.target.result as string); // Callback with the data URL
      }
    };
  }

</script>

<div class="">
  <div
    class="h-24 p-5 rounded-t ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-200 via-pink-500/20 to-green-500/20"
  ></div>
  <div class="p-4">
    <div class="-mt-16">
      <label for="logo">
        <div
          class="inline-flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-white rounded-full cursor-pointer dark:border-dark-900 dark:bg-dark-850 size-24"
        >
          {#if parentsForm.image}
            <img
              src={parentsForm.image}
              class="object-cover w-full h-full rounded-full"
              alt="Avatar"
            />
          {:else}
            <div class="flex flex-col items-center text-gray-500 dark:text-dark-500">
              <LucideIcon name="Upload"></LucideIcon>
            </div>
          {/if}
        </div>
      </label>
      <input type="file" id="logo" class="hidden" accept="image/*" on:change={fileChosen} />
    </div>

    <div class="grid grid-cols-12 gap-4 mt-space">
      <div class="col-span-12">
        <label for="parentsInput" class="form-label">Parents Name</label>
        <input
          type="text"
          id="parentsInput"
          class="form-input"
          placeholder="Parents Name"
          bind:value={parentsForm.parentsName}
        />
        <span class="text-red-500" hidden={!errors.parentsName}>{errors.parentsName}</span>
      </div>

      <div class="col-span-12">
        <label for="studentNameInput" class="form-label">Student Name</label>
        <input
          type="text"
          id="studentNameInput"
          class="form-input"
          placeholder="Student Name"
          bind:value={parentsForm.studentName}
        />
        <span class="text-red-500" hidden={!errors.studentName}>{errors.studentName}</span>
      </div>

      <div class="col-span-6">
        <label for="relationInput" class="form-label">Relation</label>
        <input
          type="text"
          id="relationInput"
          class="form-input"
          placeholder="Relation"
          bind:value={parentsForm.relation}
        />
        <span class="text-red-500" hidden={!errors.relation}>{errors.relation}</span>
      </div>

      <div class="col-span-6">
        <label for="genderSelect" class="form-label">Gender</label>
        <select id="genderSelect" class="form-input" bind:value={parentsForm.gender}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <span class="text-red-500" hidden={!errors.gender}>{errors.gender}</span>
      </div>

      <div class="col-span-12">
        <label for="occupationInput" class="form-label">Occupation</label>
        <input
          type="text"
          id="occupationInput"
          class="form-input"
          placeholder="Occupation"
          bind:value={parentsForm.occupation}
        />
        <span class="text-red-500" hidden={!errors.occupation}>{errors.occupation}</span>
      </div>

      <div class="col-span-6">
        <label for="emailInput" class="form-label">Email</label>
        <input
          type="email"
          id="emailInput"
          class="form-input"
          placeholder="Enter your email"
          bind:value={parentsForm.email}
        />
        <span class="text-red-500" hidden={!errors.email}>{errors.email}</span>
      </div>

      <div class="col-span-6">
        <label for="phonenumberInput" class="form-label">Phone Number</label>
        <input
          type="tel"
          id="phonenumberInput"
          class="form-input"
          placeholder="Enter your phone number"
          bind:value={parentsForm.phone}
        />
        <span class="text-red-500" hidden={!errors.phone}>{errors.phone}</span>
      </div>

      <div class="flex items-center justify-end col-span-12 gap-2">
        <button type="button" class="btn btn-active-red" on:click={resetForm}>
          <i data-lucide="x" class="inline-block size-4"></i>
          <span class="align-baseline">Close</span>
        </button>
        <button type="button" class="btn btn-primary" on:click={submitForm}>
          {editMode ? 'Update Parents' : 'Add Parents'}
        </button>
      </div>
    </div>
  </div>
</div>
