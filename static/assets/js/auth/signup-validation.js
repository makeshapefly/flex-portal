function formValidation() {
    return {
        form: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false
        },
        errors: {
            firstName: null,
            lastName: null,
            userName: null,
            email: null,
            password: null,
            confirmPassword: null,
            terms: null
        },
        validateForm() {
            this.errors = {};

            this.validateField('firstName', this.form.firstName, "First name is required.");
            this.validateField('lastName', this.form.lastName, "Last name is required.");
            this.validateField('userName', this.form.userName, "Username is required.");
            this.validateEmailField();
            this.validateField('password', this.form.password, "Password is required.");
            this.validateConfirmPasswordField();
            this.validateField('terms', this.form.terms, "You must agree to the terms and conditions.");

            if (Object.keys(this.errors).length === 0) {
                this.resetForm();
            }
        },
        validateField(fieldName, fieldValue, errorMessage) {
            if (!fieldValue) {
                this.errors[fieldName] = errorMessage;
            } else {
                delete this.errors[fieldName];
            }
        },
        validateEmailField() {
            const email = this.form.email;
            if (!email)
                this.errors.email = 'Email is required';
            else if (!this.validEmail(email))
                this.errors.email = 'Email is invalid';
            else
                delete this.errors.email;
        },
        validateConfirmPasswordField() {
            const password = this.form.password;
            const confirmPassword = this.form.confirmPassword;
            if (!confirmPassword)
                this.errors.confirmPassword = 'Confirm password is required';
            else if (password !== confirmPassword)
                this.errors.confirmPassword = 'Passwords do not match';
            else
                delete this.errors.confirmPassword;
        },
        validEmail(email) {
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return re.test(email);
        },
        resetForm() {
            this.form.firstName = '';
            this.form.lastName = '';
            this.form.userName = '';
            this.form.email = '';
            this.form.password = '';
            this.form.confirmPassword = '';
            this.form.terms = false;
            this.errors = {};
        }
    }
}