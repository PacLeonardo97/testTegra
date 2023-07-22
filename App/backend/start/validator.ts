import { validator } from '@ioc:Adonis/Core/Validator';

validator.rule('strongPassword', (value, _, options) => {
  if (typeof value !== 'string') {
    return;
  }
  const errors = [] as string[];

  if (/^(?=.*\s)/.test(value)) {
    errors.push('Password must not contain Whitespaces.');
  }
  // {field} precisa ter uma letra maiúscula, uma letra minúscula e um caracter especial
  if (!/^(?=.*[A-Z])/.test(value)) {
    errors.push('Password must have at least one Uppercase Character.');
  }

  if (!/^(?=.*[a-z])/.test(value)) {
    errors.push('Password must have at least one Lowercase Character.');
  }

  if (!/^(?=.*[0-9])/.test(value)) {
    errors.push('Password must contain at least one Digit.');
  }

  if (!/^(?=.*[~`!@#$%^&*()--+={}\\[\]|\\:;"'<>,.?/_₹])/.test(value)) {
    errors.push('Password must contain at least one Special Symbol.');
  }

  if (errors.length) {
    options.errorReporter.report(
      options.pointer,
      'strongPassword',
      errors as unknown as string,
      options.arrayExpressionPointer
    );
  }
});
