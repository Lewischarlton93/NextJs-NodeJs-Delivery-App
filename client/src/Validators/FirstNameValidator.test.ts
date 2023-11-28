import FirstNameValidator from './FirstNameValidator'

describe('FirstNameValidator', () => {
  describe('validateState', () => {
    it('should return false when no first name has been provided', () => {
      expect(FirstNameValidator().validateState({})).toEqual(false)
    })

    it('should return false when first name is empty', () => {
      expect(FirstNameValidator().validateState({
        firstName: ''
      })).toEqual(false)
    })

    it('should return false when first name exceeds the maximum length', () => {
      expect(FirstNameValidator().validateState({
        firstName: 'StringOfTextWhichIsGreaterThan50CharactersInLengthfewfewfwefwefewfwefewfewfewfgg4'
      })).toEqual(false)
    })

    it('should return true when a valid first name has been provided', () => {
      expect(FirstNameValidator().validateState({
        firstName: 'Lewis'
      })).toEqual(true)
    })
  })
})
