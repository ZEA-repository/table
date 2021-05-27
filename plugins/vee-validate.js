
import { extend } from 'vee-validate';
import { required, alpha_spaces, email} from 'vee-validate/dist/rules';


extend('alpha_spaces', {
  ...alpha_spaces,
  message: "The field may contain alphabetic characters or spaces."
});

extend('email', {
  ...email,
  message: "The field must have a valid email."
});

extend('required', {
  ...required,
  message: "The field is required."
});
