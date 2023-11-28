import LastNameValidator from './LastNameValidator';

describe('LastNameValidator', () => {
  describe('validateState', () => {
    it('should return false when no last name has been provided', () => {
      expect(LastNameValidator().validateState({})).toEqual(false)
    })

    it('should return false when last name is empty', () => {
      expect(LastNameValidator().validateState({
        lastName: ''
      })).toEqual(false)
    })

    it('should return false when last name exceeds the maximum length', () => {
      expect(LastNameValidator().validateState({
        lastName: 'StringOfTextWhichIsGreaterThan50CharactersInLengthfewfewfwefwefewfwefewfewfewfgg4'
      })).toEqual(false)
    })

    it('should return true when a valid last name has been provided', () => {
      expect(LastNameValidator().validateState({
        lastName: 'Charlton'
      })).toEqual(true)
    })
  })
})
