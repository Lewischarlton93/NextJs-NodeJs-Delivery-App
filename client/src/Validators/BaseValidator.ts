import * as yup from 'yup'

export default interface BaseValidator {
  getValidator: () => yup.AnySchema
  // TODO: Fix this any type
  validateState: (state: any) => boolean
}
