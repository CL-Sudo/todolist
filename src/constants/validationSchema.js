import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'This Field Cannot Be Empty')
    .max(255, 'Must not longer thatn 255 characters')
    .required('Must not be empty'),
  description: Yup.string()
    .max(255, 'Must not longer thatn 255 characters')
    .required('Must not be empty')
});
