export function passwordForm() {
    return {
      password: '',
      confirmPassword: '',
      errors: {} as { [key: string]: string },
  
      validateForm() {
        this.errors = {}; // Reset errors on each validation
  
        // Validate password
        if (!this.password) this.errors.password = 'Password is required.';
        else if (this.password.length < 6)
          this.errors.password = 'Password must be at least 6 characters long.';
  
        // Validate confirm password
        if (!this.confirmPassword) this.errors.confirmPassword = 'Confirm Password is required.';
        else if (this.confirmPassword !== this.password)
          this.errors.confirmPassword = 'Passwords do not match.';
  
        // If there are errors, don't proceed further
        if (Object.keys(this.errors).length === 0) {
          this.submitForm();
        }
      },
  
      submitForm() {
        if (Object.keys(this.errors).length === 0) {
          const currentLocation = window.location.href;
          if (currentLocation.includes('/auth-reset-password-basic'))
            window.location.href = '/auth-successful-password-basic';
          else if (currentLocation.includes('/auth-reset-password-modern'))
            window.location.href = '/auth-successful-password-modern';
          else if (currentLocation.includes('/auth-reset-password-creative'))
            window.location.href = '/auth-successful-password-creative';
        }
      }
    };
  }
  