import MobileNumberValidator from './MobileNumberValidator'

describe('MobileNumberValidator', () => {
  describe('validateState', () => {
    it('should return false when no contact number has been provided', () => {
      expect(MobileNumberValidator().validateState({})).toEqual(false)
    })

    it('should return false when contact number is not in correct format', () => {
      expect(MobileNumberValidator().validateState({
        contactNumber: '02226662'
      })).toEqual(false)
      expect(MobileNumberValidator().validateState({
        // Too many digits
        contactNumber: '074444333444'
      })).toEqual(false)
      expect(MobileNumberValidator().validateState({
        // Too many digits
        contactNumber: '4474444333444'
      })).toEqual(false)
      expect(MobileNumberValidator().validateState({
        // Too many digits
        contactNumber: '+4474444333444'
      })).toEqual(false)
      expect(MobileNumberValidator().validateState({
        contactNumber: 'dsgjsdgajda'
      })).toEqual(false)
    })

    it('should return true when contact number has been provided and is in correct format', () => {
      expect(MobileNumberValidator().validateState({
        contactNumber: '07888112332'
      })).toEqual(true)
      expect(MobileNumberValidator().validateState({
        contactNumber: '447888112332'
      })).toEqual(true)
      expect(MobileNumberValidator().validateState({
        contactNumber: '+447888112332'
      })).toEqual(true)
    })

    it('should throw error message if invalid mobile number', () => {
      const test = () => {
        const schema = MobileNumberValidator().getValidator()
        schema.validateSync({ contactNumber: '074444333444' })
      }

      expect(test).toThrow('Please enter a valid mobile number')
    })

    it('should throw error message if empty', () => {
      const test = () => {
        const schema = MobileNumberValidator().getValidator()
        schema.validateSync({ contactNumber: '' })
      }

      expect(test).toThrow('Please enter your mobile number')
    })
  })
})
