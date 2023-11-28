import * as yup from 'yup'
import BaseValidator from './BaseValidator'

const EmailAddressValidator = (): BaseValidator => {
  const schema = yup.object().shape({
    emailAddress: yup.string()
      .required('Please enter your email address')
      .email('Please enter a valid email address')
      .label('Email address')
      .max(100)
  })

  return {
    getValidator: () => schema,
    validateState: (state: any) => schema.isValidSync({
      emailAddress: state.emailAddress
    })
  }
}

export default EmailAddressValidator
