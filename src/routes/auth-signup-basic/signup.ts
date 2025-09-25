import { writable } from 'svelte/store';

// Reactive stores for form data and errors
export const formDetails = writable({
	firstName: '',
	lastName: '',
	userName: '',
	email: '',
	password: '',
	confirmPassword: '',
	terms: false
});

export const errors = writable({
	firstName: null as string | null,
	lastName: null as string | null,
	userName: null as string | null,
	email: null as string | null,
	password: null as string | null,
	confirmPassword: null as string | null,
	terms: null as boolean | null
});

// Validate the form fields
export function validateForm() {
	// Subscribe to form and errors
	formDetails.subscribe(($form) => {
		errors.set({
			firstName: null,
			lastName: null,
			userName: null,
			email: null,
			password: null,
			confirmPassword: null,
			terms: null
		});

		// Now we can access form data directly as `$form`
		validateField('firstName', $form.firstName, 'First name is required.');
		validateField('lastName', $form.lastName, 'Last name is required.');
		validateField('userName', $form.userName, 'Username is required.');
		validateEmailField($form.email);
		validateField('password', $form.password, 'Password is required.');
		validateConfirmPasswordField($form.password, $form.confirmPassword);
		validateField('terms', $form.terms, 'You must agree to the terms and conditions.');

		// Reset form if validation passes
		if (Object.values(errors).every((error) => error === null)) {
			resetForm();
		}
	});
}

function validateField(fieldName: string, fieldValue: string | boolean, errorMessage: string) {
	errors.update((e) => ({ ...e, [fieldName]: fieldValue ? null : errorMessage }));
}

function validateEmailField(email: string) {
	if (!email) {
		errors.update((e) => ({ ...e, email: 'Email is required' }));
	} else if (!validEmail(email)) {
		errors.update((e) => ({ ...e, email: 'Email is invalid' }));
	} else {
		errors.update((e) => ({ ...e, email: null }));
	}
}

function validateConfirmPasswordField(password: string, confirmPassword: string) {
	if (!confirmPassword) {
		errors.update((e) => ({ ...e, confirmPassword: 'Confirm password is required' }));
	} else if (password !== confirmPassword) {
		errors.update((e) => ({ ...e, confirmPassword: 'Passwords do not match' }));
	} else {
		errors.update((e) => ({ ...e, confirmPassword: null }));
	}
}

function validEmail(email: string) {
	const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return re.test(email);
}

function resetForm() {
	formDetails.set({
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		terms: false
	});
	errors.set({
		firstName: null,
		lastName: null,
		userName: null,
		email: null,
		password: null,
		confirmPassword: null,
		terms: null
	});
}
