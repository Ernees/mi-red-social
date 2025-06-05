// src/app/validators/password-match.validator.ts
import {
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

/**
 * Validador personalizado para asegurar que los campos 'password' y 'confirmPassword' de un FormGroup coincidan.
 * Si no coinciden, añade un error 'mismatch' al control 'confirmPassword'.
 */

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const group = formGroup as FormGroup;
    const password = group.get('password');
    const confirmPassword = group.get('passwordRepetida');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  };
}
