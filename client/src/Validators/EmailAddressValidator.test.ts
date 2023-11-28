import EmailAddressValidator from './EmailAddressValidator'

describe('EmailAddressValidator', () => {
  describe('validateState', () => {
    it('should return false when no email address has been provided', () => {
      expect(EmailAddressValidator().validateState({})).toEqual(false)
    })

    it('should return false when email address is not in correct format', () => {
      expect(EmailAddressValidator().validateState({
        emailAddress: 'htthb'
      })).toEqual(false)
      expect(EmailAddressValidator().validateState({
        emailAddress: 'dhda@ddd.'
      })).toEqual(false)
    })

    it('should return true when email address has been provided and is in correct format', () => {
      expect(EmailAddressValidator().validateState({
        emailAddress: 'test@testing.com'
      })).toEqual(true)
    })
  })
})
