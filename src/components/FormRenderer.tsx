import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Checkbox, FormControlLabel, Select, MenuItem, Typography
} from '@mui/material';
import { FormField } from '../types';

interface Props {
  fields: FormField[];
}

const FormRenderer: React.FC<Props> = ({ fields }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize default values
    const initialValues: Record<string, any> = {};
    fields.forEach(f => {
      initialValues[f.id] = f.defaultValue || '';
    });
    setValues(initialValues);
  }, [fields]);

  const validateField = (field: FormField, value: any): string => {
    if (!field.validations) return '';
    const { required, minLength, maxLength, emailFormat, passwordRule } = field.validations;

    if (required && !value) return 'This field is required.';
    if (minLength && value.length < minLength) return `Min length is ${minLength}`;
    if (maxLength && value.length > maxLength) return `Max length is ${maxLength}`;
    if (emailFormat && !/\S+@\S+\.\S+/.test(value)) return 'Invalid email.';
    if (passwordRule && !/^(?=.*\d).{8,}$/.test(value)) return 'Password must be at least 8 characters and contain a number.';

    return '';
  };

  const handleChange = (id: string, value: any) => {
    setValues(prev => ({ ...prev, [id]: value }));

    const field = fields.find(f => f.id === id);
    if (field) {
      const err = validateField(field, value);
      setErrors(prev => ({ ...prev, [id]: err }));
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map(field => {
        const error = errors[field.id];
        const value = values[field.id] || '';

        switch (field.type) {
          case 'text':
          case 'number':
          case 'date':
          case 'textarea':
            return (
              <TextField
                key={field.id}
                label={field.label}
                type={field.type === 'textarea' ? 'text' : field.type}
                value={value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                multiline={field.type === 'textarea'}
                error={Boolean(error)}
                helperText={error}
              />
            );

          case 'select':
            return (
              <Select
                key={field.id}
                value={value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select {field.label}</MenuItem>
                {field.options?.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            );

          case 'radio':
            return (
              <Box key={field.id}>
                <Typography>{field.label}</Typography>
                {field.options?.map(opt => (
                  <FormControlLabel
                    key={opt}
                    control={
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={value === opt}
                        onChange={() => handleChange(field.id, opt)}
                      />
                    }
                    label={opt}
                  />
                ))}
              </Box>
            );

          case 'checkbox':
            return (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    checked={!!value}
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                  />
                }
                label={field.label}
              />
            );

          default:
            return null;
        }
      })}
    </Box>
  );
};

export default FormRenderer;