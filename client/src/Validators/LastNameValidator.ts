import * as yup from 'yup'
import BaseValidator from './BaseValidator'

const LastNameValidator = (): BaseValidator => {
  const schema = yup.object().shape({
    lastName: yup.string().required('Please enter your last name').max(50).label('Last name')
  })

  return {
    getValidator: () => schema,
    validateState: (state: any) => schema.isValidSync({
      lastName: state.lastName
    })
  }
}

export default LastNameValidator
