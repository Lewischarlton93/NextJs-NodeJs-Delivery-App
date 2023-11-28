import * as yup from 'yup'
import BaseValidator from './BaseValidator'

const FirstNameValidator = (): BaseValidator => {
  const schema = yup.object().shape({
    firstName: yup.string().required('Please enter your first name').max(50).label('First name')
  })

  return {
    getValidator: () => schema,
    validateState: (state: any) => schema.isValidSync({
      firstName: state.firstName
    })
  }
}

export default FirstNameValidator
