// TODO: Need to add validation for Account Type + Restaurant name. Also need to add address details fields!
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'
import * as yup from 'yup'
import { FormControl, FormLabel, TextField, Button, Box, styled } from '@mui/material'
import MobileNumberValidator from '../../Validators/MobileNumberValidator'
import EmailAddressValidator from '../../Validators/EmailAddressValidator'
import FirstNameValidator from '../../Validators/FirstNameValidator'
import LastNameValidator from '../../Validators/LastNameValidator'
import RadioButton from '../../UI/RadioButton/RadioButton'
import { useRouter } from 'next/navigation'
import { useRiderStore } from '../../Stores/Rider/useRiderStore'

interface RegisterFormProps {
  existingAnswers: any
  errors?: { [key: string]: boolean }
  userType: string
}

const Form = styled('form')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  span: {
    marginBottom: 0
  }
}))

const fieldValues = {
  // accountType: '',
  firstName: '',
  lastName: '',
  contactNumber: '',
  emailAddress: ''
}

type FieldKey = keyof typeof fieldValues
type ValidationSchemaKey = 'firstName' | 'lastName' | 'contactNumber' | 'emailAddress'

const validationSchemas: {
  [key in ValidationSchemaKey]: yup.BaseSchema
} = {
  firstName: FirstNameValidator().getValidator() as yup.BaseSchema,
  lastName: LastNameValidator().getValidator() as yup.BaseSchema,
  contactNumber: MobileNumberValidator().getValidator() as yup.BaseSchema,
  emailAddress: EmailAddressValidator().getValidator() as yup.BaseSchema
}

const validate = (key: ValidationSchemaKey, value: string): string => {
  try {
    validationSchemas[key].validateSync({ [key]: value })
  } catch (untypedError: unknown) {
    const errorObject = untypedError as yup.ValidationError

    return errorObject.message
  }

  return ''
}

const Register: React.FC<RegisterFormProps> = ({
  existingAnswers,
  errors: existingErrors,
  userType
}) => {
  const [restaurantName, setRestaurantName] = useState('')
  const [accountUserType, setAccountUserType] = useState(userType ?? '')
  const [focus, setFocus] = useState<FieldKey | null>(null)
  const { riderFirstName, updateRiderInfo } = useRiderStore()
  const router = useRouter()

  const [values, setValues] = useState<{ [key in FieldKey]: string }>(
    existingAnswers ?? {
      accountType: userType ?? '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      emailAddress: ''
    }
  )

  const accountTypeOptions = [
    { value: 'Rider', label: 'Rider' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Customer', label: 'Customer' }
  ]

  const [showErrors, setShowErrors] = useState<{ [key in FieldKey]: boolean }>({
    // accountType: false,
    firstName: false,
    lastName: false,
    contactNumber: false,
    emailAddress: false
  })

  const [dirtyFields, setDirtyFields] = useState<{ [key in FieldKey]: boolean }>({
    // accountType: !!existingAnswers?.accountType,
    firstName: !!existingAnswers?.firstName,
    lastName: !!existingAnswers?.lastName,
    contactNumber: !!existingAnswers?.contactNumber,
    emailAddress: !!existingAnswers?.emailAddress
  })

  // const hasUserTypedValue = Object.entries(values)
  //   .filter(([key]) => key !== 'accountType')
  //   .some(([, value]) => !!value)

  // const accountTypeError = useMemo(() => {
  //   const isCurrentError = !values.accountType && !!focus && focus !== 'accountType'
  //   const isExistingError =
  //     !values.accountType && hasUserTypedValue && !!existingErrors?.accountType

  //   return isCurrentError || isExistingError ? 'Please select an accountType' : ''
  // }, [values.accountType, focus, hasUserTypedValue])

  const firstNameError = useMemo(() => validate('firstName', values.firstName), [values.firstName])

  const lastNameError = useMemo(() => validate('lastName', values.lastName), [values.lastName])

  const contactNumberError = useMemo(
    () => validate('contactNumber', values.contactNumber),
    [values.contactNumber]
  )
  const emailAddressError = useMemo(
    () => validate('emailAddress', values.emailAddress),
    [values.emailAddress]
  )

  const errors = [
    // accountTypeError,
    firstNameError,
    lastNameError,
    contactNumberError,
    emailAddressError
  ]

  const displayRegisterButton: boolean = useMemo(
    () => Object.values(dirtyFields).every((isDirty) => isDirty) && errors.every((error) => !error),
    [dirtyFields, errors]
  )

  const debouncedSetShowError = (key: FieldKey) => {
    setShowErrors((previous) => ({ ...previous, [key]: true }))
  }

  const debounceMap: Record<FieldKey, () => void> = useMemo(
    () => ({
      // accountType: debounce(() => debouncedSetShowError('accountType'), 1500),
      firstName: debounce(() => debouncedSetShowError('firstName'), 1500),
      lastName: debounce(() => debouncedSetShowError('lastName'), 1500),
      contactNumber: debounce(() => debouncedSetShowError('contactNumber'), 1500),
      emailAddress: debounce(() => debouncedSetShowError('emailAddress'), 1500)
    }),
    []
  )

  const setShouldShowError = useCallback(
    (key: FieldKey, errorMessage: string, isDirty: boolean, showError: boolean): void => {
      if (isDirty && errorMessage) {
        if (showError) {
          setShowErrors((previous) => ({ ...previous, [key]: true }))
        } else {
          // We'll only debounce if no error is currently displayed.
          debounceMap[key]()
        }
      } else {
        setShowErrors((previous) => ({ ...previous, [key]: false }))
      }
    },
    []
  )

  // useEffect(
  //   () =>
  //     setShouldShowError(
  //       'accountType',
  //       accountTypeError,
  //       true, // We'll pass `isDirty` always as true because the validation of the accountType field only applies when the field is clean.
  //       showErrors.accountType || (!!existingErrors?.accountType && hasUserTypedValue)
  //     ),
  //   // We're passing `focus` to the dependency list so that this side effect will run every time the user changes the focussed field.
  //   [accountTypeError, dirtyFields.accountType, showErrors.accountType, focus]
  // )
  useEffect(
    () =>
      setShouldShowError('firstName', firstNameError, dirtyFields.firstName, showErrors.firstName),
    [values.firstName, firstNameError, dirtyFields.firstName, showErrors.firstName]
  )
  useEffect(
    () => setShouldShowError('lastName', lastNameError, dirtyFields.lastName, showErrors.lastName),
    [values.lastName, lastNameError, dirtyFields.lastName, showErrors.lastName]
  )
  useEffect(
    () =>
      setShouldShowError(
        'contactNumber',
        contactNumberError,
        dirtyFields.contactNumber,
        showErrors.contactNumber ||
          (!!existingErrors?.contactNumber && !!existingAnswers.contactNumber)
      ),
    [values.contactNumber, contactNumberError, dirtyFields.contactNumber, showErrors.contactNumber]
  )
  useEffect(
    () =>
      setShouldShowError(
        'emailAddress',
        emailAddressError,
        dirtyFields.emailAddress,
        showErrors.emailAddress ||
          (!!existingErrors?.emailAddress && !!existingAnswers?.emailAddress)
      ),
    [values.emailAddress, emailAddressError, dirtyFields.emailAddress, showErrors.emailAddress]
  )

  const onChange = useCallback((key: FieldKey, value: string) => {
    if (!dirtyFields[key]) setDirtyFields((previous) => ({ ...previous, [key]: true }))

    setValues((previous) => ({ ...previous, [key]: value }))
  }, [])

  const handleUserTypeChange = (event) => {
    setAccountUserType(event.target.value)
  }

  const handleRegistration = () => {
    // TODO: POST LOGIC TO ENDPOINT FOR REGISTER.
    if (displayRegisterButton) {
      console.log('Registed!')
      if (accountUserType === 'Rider') {
        console.log('LEWIS IT IS')
        // TODO: Update Rider store with other values.
        updateRiderInfo({
          riderId: 1, // This will be auto incremented in DB
          riderFirstName: values.firstName,
          riderLastName: values.lastName,
          riderContactNumber: values.contactNumber,
          riderEmailAddress: values.emailAddress
        })
        // TODO: (Will most likely do POST req with info, and then GET req when on the page below (then update state on that?))
        router.replace('/rider/start-delivering')
      }
    }
  }

  console.log(riderFirstName)

  const handleEnterPress = (event: React.KeyboardEvent): void => {
    if (event.code === 'Enter' || event.key === 'Enter') {
      handleRegistration()
    }
  }

  // const formattedAccountTypeError = <ErrorMessage error={accountTypeError} />

  return (
    <Form>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel className="sub-heading" sx={{ mb: (theme) => theme.spacing(2) }}>
          Account Type
        </FormLabel>
        <RadioButton
          options={accountTypeOptions}
          defaultValue={accountUserType}
          onChange={handleUserTypeChange}
        />
      </FormControl>

      {accountUserType === 'Restaurant' && (
        <TextField
          label="Restaurant Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      )}

      <FormLabel className="sub-heading" sx={{ mt: (theme) => theme.spacing(4) }}>
        {accountUserType === 'Restaurant' ? 'Store Manager Details' : 'Personal Details'}
      </FormLabel>

      <TextField
        onFocus={() => setFocus('firstName')}
        autoComplete="given-name"
        defaultValue={existingAnswers?.firstName}
        helperText={showErrors.firstName ? firstNameError : undefined}
        id="firstName"
        variant="outlined"
        label="First name"
        name="firstName"
        onChange={(event) => onChange('firstName', event.currentTarget.value)}
        inputProps={{
          'data-testid': 'firstName',
          maxLength: 50,
          type: 'text'
        }}
      />
      <TextField
        onFocus={() => setFocus('lastName')}
        autoComplete="family-name"
        defaultValue={existingAnswers?.lastName}
        helperText={showErrors.lastName ? lastNameError : undefined}
        id="lastName"
        variant="outlined"
        label="Last name"
        name="lastName"
        onChange={(event) => onChange('lastName', event.currentTarget.value)}
        inputProps={{
          'data-testid': 'lastName',
          maxLength: 50,
          type: 'text'
        }}
      />
      <TextField
        onFocus={() => setFocus('contactNumber')}
        autoComplete="tel"
        defaultValue={existingAnswers?.contactNumber}
        helperText={showErrors.contactNumber ? contactNumberError : undefined}
        id="contactNumber"
        variant="outlined"
        label="Mobile number"
        name="contactNumber"
        onChange={(event) => onChange('contactNumber', event.currentTarget.value)}
        inputProps={{
          'data-testid': 'contactNumber',
          maxLength: 20,
          type: 'tel'
        }}
      />
      <TextField
        onFocus={() => setFocus('emailAddress')}
        autoComplete="email"
        defaultValue={existingAnswers?.emailAddress}
        helperText={showErrors.emailAddress ? emailAddressError : undefined}
        id="emailAddress"
        variant="outlined"
        label="Email address"
        name="emailAddress"
        onChange={(event) => onChange('emailAddress', event.currentTarget.value)}
        onKeyPress={handleEnterPress}
        inputProps={{
          'data-testid': 'emailInput',
          maxLength: 100,
          type: 'email'
        }}
      />

      <FormLabel className="sub-heading">Address Details</FormLabel>

      {/* Be nice to add in some external APIs here. Google Places API for Restaurant info. Loqate or similar for address. Once we then have the address, we need to
       do something with it in order to store the Lat/Long values into the DB. 
       
       Do I make this a multistep form?? */}

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!displayRegisterButton}
          onClick={handleRegistration}
        >
          Register as {accountUserType}
        </Button>
      </Box>
    </Form>
  )
}

export default Register
