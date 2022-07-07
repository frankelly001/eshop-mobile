import * as Yup from 'yup';

const validationSchema = {
  firstname: Yup.string().required().min(1).label('Firstname'),
  lastname: Yup.string().required().min(1).label('Lastname'),
  username: Yup.string().required().min(1).label('Username'),
  state: Yup.string().required().min(1).label('State'),
  city: Yup.string().required().min(1).label('City'),
  address: Yup.string().required().min(5).label('Address'),
  phone: Yup.string()
    .required()
    .min(11)
    .max(11)
    .label('Phone')
    .matches(/^[0-9]+$/, 'Phone must be only digits'),
  additional_phone: Yup.string()
    .min(11)
    .max(11)
    .label('Additional phone')
    .matches(/^[0-9]+$/, 'Additional phone must be only digits'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
    .required()
    .label('Confirm password'),
  images: Yup.array().min(1, 'Please select at least one image'),
  title: Yup.string().required().min(3).label('Firstname'),
  price: Yup.number().required().min(1).label('Street no'),
  category: Yup.string().required().min(1).label('Firstname'),
  description: Yup.string().required().min(20).label('Firstname'),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
  //   .required('Confirm password is required')
  // category: Yup.object().required().nullable().label('Category'),
  // images: Yup.array().min(1, 'Please select at least one image'),
  // description: Yup.string().label('Description'),
};
export default validationSchema;
