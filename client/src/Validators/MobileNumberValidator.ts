import * as yup from 'yup'
import BaseValidator from './BaseValidator'
import { mobileNumberRegex } from '../constants'

const MobileNumberValidator = (): BaseValidator => {
  const schema = yup.object().shape({
    contactNumber: yup.string().matches(mobileNumberRegex, {
      message: 'Please enter a valid mobile number',
      excludeEmptyString: true
    })
      .typeError('Please enter a valid mobile number')
      .required('Please enter your mobile number')
  })

  return {
    getValidator: () => schema,
    validateState: (state: any) => schema.isValidSync({
      contactNumber: state.contactNumber
    })
  }
}

export default MobileNumberValidator