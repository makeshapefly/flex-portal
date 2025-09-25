<script lang="ts">
  import FlatePicker from '$lib/components/forms/form-picker/FlatePicker.svelte';
  import { teachersData, type Teacher } from './teacher';

  export let addForm: boolean;
  export let editMode = false;
  export let selectedCustomer: any | null = null;
  export let generateAvatarText = (name: string): string => name;

  let teacherForm: any = {
    title: '',
    teacherName: '',
    email: '',
    phone: '',
    salary: '',
    experience: '',
    lastSchool: '',
    date: ''
  };
  // Error messages
  let errors: any = {
    title: '',
    teacherName: '',
    email: '',
    phone: '',
    salary: '',
    experience: '',
    lastSchool: '',
    date: ''
  };

  // If in edit mode, prefill the form
  $: if (editMode && selectedCustomer) {
    teacherForm = {
      ...(selectedCustomer as any)
    };
  }
  $: if (addForm && !editMode) {
    resetForm();
  }

  const resetForm = (): void => {
    Object.keys(teacherForm).forEach((key) => {
      const typedKey = key as keyof any; // Type assertion
      if (typeof teacherForm[typedKey] === 'number') {
        teacherForm[typedKey] = 0 as any; // Assigning number
      } else {
        teacherForm[typedKey] = '' as any; // Assigning string
      }
    });
  };

  // Validation functions
  const validateField = (fieldName: string, fieldValue: string, errorMessage: string) => {
    if (!fieldValue) {
      errors.update((err: any) => ({ ...err, [fieldName]: errorMessage }));
    } else {
      errors.update((err: { [x: string]: any }) => {
        const { [fieldName]: omit, ...rest } = err;
        return rest;
      });
    }
  };

  const validatePhone = () => {
    const phonePattern = /^[0-9]{10}$/; // 10 digits only
    errors.update((err: any) => ({
      ...err,
      phone: !phonePattern.test(teacherForm.phone)
        ? 'Phone number must be 10 digits and numeric'
        : ''
    }));
  };

  const validateForm = () => {
    errors.set({}); // Reset errors before validating
    validateField('teacherName', teacherForm.teacherName, 'Teacher name is required.');
    validateField('email', teacherForm.email, 'Email is required.');
    validatePhone();
    validateField('phone', teacherForm.phone, 'Phone is required.');
    validateField('experience', teacherForm.experience, 'Experience is required.');
    validateField('lastSchool', teacherForm.lastSchool, 'Last school is required.');
    validateField('date', teacherForm.date, 'Date is required.');
    validateField('salary', teacherForm.salary, 'Salary is required.');
    validateField('title', teacherForm.title, 'Title is required.');

    return Object.keys(errors).length === 0; // If there are no errors, return true
  };

  // Submit form function
  const submitForm = () => {
    if (validateForm()) {
      // Create a new teacher object based on the form data
      const newTeacher: Teacher = {
        teacherID: 'PET-' + (teachersData.length + 1595).toString(), // Generate a new teacher ID
        teacherName: teacherForm.teacherName,
        email: teacherForm.email,
        phone: teacherForm.phone,
        salary: teacherForm.salary,
        experience: teacherForm.experience,
        title: teacherForm.title,
        date: teacherForm.date,
        lastSchool: teacherForm.lastSchool,
        image: '', // You can set a default image or handle image uploads if needed
        avatarText: generateAvatarText(teacherForm.teacherName) // Generate avatar text from the name
      };

      // Add the new teacher to the teachers array
      teachersData.unshift(newTeacher);

      // Recalculate the pagination
      //   paginate();

      // Reset the form and errors
      teacherForm.set({
        title: '',
        teacherName: '',
        email: '',
        phone: '',
        salary: '',
        experience: '',
        lastSchool: '',
        date: ''
      });
      errors.set({
        title: '',
        teacherName: '',
        email: '',
        phone: '',
        salary: '',
        experience: '',
        lastSchool: '',
        date: ''
      });
      //   showAddTeacherForm.set(true);
      //   teacherToEdit.set(null);
    } else {
      console.log('Form has errors');
    }
  };
</script>

<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12">
    <label for="titleSelect" class="form-label">Title</label>
    <select
      id="titleSelect"
      class="form-input"
      bind:value={teacherForm.title}
      on:change={() => validateField('title', teacherForm.title, 'Title is required.')}
    >
      <option value="">Select Title</option>
      <option value="Teacher">Teacher</option>
      <option value="Professor">Professor</option>
      <option value="Instructor">Instructor</option>
      <option value="Lecturer">Lecturer</option>
    </select>
    {#if errors.title}
      <span class="text-red-500">{errors.title}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="teacherNameInput" class="form-label">Teacher Name</label>
    <input
      type="text"
      id="teacherNameInput"
      class="form-input"
      placeholder="Teacher name"
      bind:value={teacherForm.teacherName}
      on:input={() =>
        validateField('teacherName', teacherForm.teacherName, 'Teacher name is required.')}
    />
    {#if errors.teacherName}
      <span class="text-red-500">{errors.teacherName}</span>
    {/if}
  </div>

  <div class="col-span-6">
    <label for="emailInput" class="form-label">Email</label>
    <input
      type="email"
      id="emailInput"
      class="form-input"
      placeholder="name@srbthemes.com"
      bind:value={teacherForm.email}
      on:input={() => validateField('email', teacherForm.email, 'Email is required.')}
    />
    {#if errors.email}
      <span class="text-red-500">{errors.email}</span>
    {/if}
  </div>

  <div class="col-span-6">
    <label for="phoneInput" class="form-label">Phone</label>
    <input
      type="text"
      id="phoneInput"
      class="form-input"
      placeholder="+1012456789"
      bind:value={teacherForm.phone}
      on:input={validatePhone}
    />
    {#if errors.phone}
      <span class="text-red-500">{errors.phone}</span>
    {/if}
  </div>

  <div class="col-span-6">
    <label for="salaryInput" class="form-label">Salary ($)</label>
    <input
      type="text"
      id="salaryInput"
      class="form-input"
      placeholder="$0"
      bind:value={teacherForm.salary}
      on:input={() => validateField('salary', teacherForm.salary, 'Salary is required.')}
    />
    {#if errors.salary}
      <span class="text-red-500">{errors.salary}</span>
    {/if}
  </div>

  <div class="col-span-6">
    <label for="experienceInput" class="form-label">Experience (Years)</label>
    <input
      type="text"
      id="experienceInput"
      class="form-input"
      placeholder="0 Years"
      bind:value={teacherForm.experience}
      on:input={() =>
        validateField('experience', teacherForm.experience, 'Experience is required.')}
    />
    {#if errors.experience}
      <span class="text-red-500">{errors.experience}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="lastSchoolNameInput" class="form-label">Last School Name</label>
    <input
      type="text"
      id="lastSchoolNameInput"
      class="form-input"
      placeholder="School name"
      bind:value={teacherForm.lastSchool}
      on:input={() =>
        validateField('lastSchool', teacherForm.lastSchool, 'Last school is required.')}
    />
    {#if errors.lastSchool}
      <span class="text-red-500">{errors.lastSchool}</span>
    {/if}
  </div>

  <div class="col-span-12">
    <label for="dateInput" class="form-label">
      Joining Date <span class="text-red-500">*</span>
    </label>

    <FlatePicker
      bind:value={teacherForm.date}
      dateFormat="Y-m-d"
      on:input={() => validateField('date', teacherForm.date, 'Date is required.')}
    />
    {#if errors.date}
      <span class="text-red-500">{errors.date}</span>
    {/if}
  </div>
</div>

<div class="flex items-center justify-end gap-2 mt-5">
  <button type="button" class="btn btn-active-red">
    <i class="inline-block size-4">x</i>
    <span class="align-baseline">Close</span>
  </button>
  <button type="button" class="btn btn-primary" on:click={submitForm}>
    {addForm ? 'Add Teacher' : 'Update Teacher'}
  </button>
</div>
