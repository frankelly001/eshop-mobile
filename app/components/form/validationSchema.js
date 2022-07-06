import * as Yup from 'yup';

const validationSchema = {
  firstname: Yup.string().required().min(1).label('Firstname'),
  lastname: Yup.string().required().min(1).label('Lastname'),
  username: Yup.string().required().min(1).label('Username'),
  state: Yup.string().required().min(1).label('State'),
  city: Yup.string().required().min(1).label('City'),
  address: Yup.string().required().min(1).label('Address'),
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

  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
  //   .required('Confirm password is required')
  // category: Yup.object().required().nullable().label('Category'),
  // images: Yup.array().min(1, 'Please select at least one image'),
  // description: Yup.string().label('Description'),
};
// const validationSchema = {
//   firstname: Yup.string().required().min(1).label('Firstname'),
//   lastname: Yup.string().required().min(1).label('Lastname'),
//   username: Yup.string().required().min(1).label('Username'),
//   city: Yup.string().required().min(1).label('City'),
//   number: Yup.number().required().min(1).label('Street no'),
//   street: Yup.string().required().min(1).label('Street Address'),
//   zipcode: Yup.number().required().min(1).label('Zipcode'),
//   email: Yup.string().required().email().label('Email'),
//   phone: Yup.string()
//     .required()
//     .min(11)
//     .max(11)
//     .label('Phone')
//     .matches(/^[0-9]+$/, 'Phone must be only digits'),
//   additionalPhone: Yup.string()
//     .min(11)
//     .max(11)
//     .label('Additional phone')
//     .matches(/^[0-9]+$/, 'Additional phone must be only digits'),
//   password: Yup.string().required().min(4).label('Password'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
//     .required()
//     .label('Confirm password'),

//   // confirmPassword: Yup.string()
//   //   .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
//   //   .required('Confirm password is required')
//   // category: Yup.object().required().nullable().label('Category'),
//   // images: Yup.array().min(1, 'Please select at least one image'),
//   // description: Yup.string().label('Description'),
// };

export default validationSchema;
