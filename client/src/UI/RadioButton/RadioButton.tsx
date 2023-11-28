import React from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'

interface Option {
  value: string
  label: string
}

interface RadioButtonProps {
  options: Option[]
  defaultValue: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ options, defaultValue, onChange }) => {
  return (
    <RadioGroup
      aria-labelledby="options-radio-buttons-group-label"
      value={defaultValue}
      onChange={onChange}
      name="options-radio-buttons-group"
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  )
}

export default RadioButton
