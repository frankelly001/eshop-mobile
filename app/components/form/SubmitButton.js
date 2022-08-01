import {useFormikContext} from 'formik';
import React from 'react';
import AppGradientBtn from '../AppGradientBtn';

const SubmitButton = ({onSaveValues, ...otherProps}) => {
  const {handleSubmit} = useFormikContext();

  return <AppGradientBtn {...otherProps} onPress={handleSubmit} />;
};

export default SubmitButton;

// export interface FormikHelpers<Values> {
//   /** Manually set top level status. */
//   setStatus: (status?: any) => void;
//   /** Manually set errors object */
//   setErrors: (errors: FormikErrors<Values>) => void;
//   /** Manually set isSubmitting */
//   setSubmitting: (isSubmitting: boolean) => void;
//   /** Manually set touched object */
//   setTouched: (touched: FormikTouched<Values>, shouldValidate?: boolean) => void;
//   /** Manually set values object  */
//   setValues: (values: React.SetStateAction<Values>, shouldValidate?: boolean) => void;
//   /** Set value of form field directly */
//   setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
//   /** Set error message of a form field directly */
//   setFieldError: (field: string, message: string | undefined) => void;
//   /** Set whether field has been touched directly */
//   setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
//   /** Validate form values */
//   validateForm: (values?: any) => Promise<FormikErrors<Values>>;
//   /** Validate field value */
//   validateField: (field: string) => void;
//   /** Reset form */
//   resetForm: (nextState?: Partial<FormikState<Values>>) => void;
//   /** Submit the form imperatively */
//   submitForm: () => Promise<void>;
//   /** Set Formik state, careful! */
//   setFormikState: (f: FormikState<Values> | ((prevState: FormikState<Values>) => FormikState<Values>), cb?: () => void) => void;
// }
