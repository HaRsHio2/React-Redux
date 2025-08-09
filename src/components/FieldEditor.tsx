import React, { useState } from 'react';
import {
  Box, TextField, Select, MenuItem, Button, Checkbox,
  FormControlLabel, InputLabel, FormControl
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addField } from '../redux/formSlice';
import { FieldType, FormField } from '../types';

const fieldTypes: FieldType[] = ['text', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date'];

const FieldEditor: React.FC = () => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState('');
  const [type, setType] = useState<FieldType>('text');
  const [required, setRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');
  const [options, setOptions] = useState<string>('');
  const [minLength, setMinLength] = useState<number>();
  const [maxLength, setMaxLength] = useState<number>();
  const [emailFormat, setEmailFormat] = useState(false);
  const [passwordRule, setPasswordRule] = useState(false);

  const handleAdd = () => {
    const newField: FormField = {
      id: uuidv4(),
      label,
      type,
      defaultValue,
      validations: {
        required,
        minLength,
        maxLength,
        emailFormat,
        passwordRule,
      },
      ...(type === 'select' || type === 'radio' ? {
        options: options.split(',').map(opt => opt.trim())
      } : {}),
    };

    dispatch(addField(newField));

    // Reset form
    setLabel('');
    setType('text');
    setRequired(false);
    setDefaultValue('');
    setOptions('');
    setMinLength(undefined);
    setMaxLength(undefined);
    setEmailFormat(false);
    setPasswordRule(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Field Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as FieldType)} label="Field Type">
          {fieldTypes.map(ft => (
            <MenuItem key={ft} value={ft}>{ft}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Default Value"
        value={defaultValue}
        onChange={(e) => setDefaultValue(e.target.value)}
        fullWidth
      />
      {(type === 'select' || type === 'radio') && (
        <TextField
          label="Options (comma separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          fullWidth
        />
      )}
      <FormControlLabel
        control={<Checkbox checked={required} onChange={() => setRequired(!required)} />}
        label="Required"
      />
      <TextField
        label="Min Length"
        type="number"
        value={minLength || ''}
        onChange={(e) => setMinLength(Number(e.target.value))}
      />
      <TextField
        label="Max Length"
        type="number"
        value={maxLength || ''}
        onChange={(e) => setMaxLength(Number(e.target.value))}
      />
      <FormControlLabel
        control={<Checkbox checked={emailFormat} onChange={() => setEmailFormat(!emailFormat)} />}
        label="Email Format"
      />
      <FormControlLabel
        control={<Checkbox checked={passwordRule} onChange={() => setPasswordRule(!passwordRule)} />}
        label="Password Rule"
      />
      <Button variant="contained" onClick={handleAdd}>
        Add Field
      </Button>
    </Box>
  );
};

export default FieldEditor;