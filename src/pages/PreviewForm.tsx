import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import FormRenderer from '../components/FormRenderer';
import { FormField } from '../types';

interface SavedForm {
  id: string;
  name: string;
  fields: FormField[];
}

const LOCAL_STORAGE_KEY = 'savedForms';

const PreviewForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<SavedForm | null>(null);

  useEffect(() => {
    const formId = searchParams.get('id');
    if (!formId) return;

    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const found = savedForms.find(f => f.id === formId) || null;
    setForm(found);
  }, [searchParams]);

  if (!form) {
    return (
      <Box padding={2}>
        <Typography variant="h6">Form not found.</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth={700} margin="auto" padding={2}>
      <Typography variant="h4" gutterBottom>{form.name}</Typography>
      <FormRenderer fields={form.fields} />
    </Box>
  );
};

export default PreviewForm;