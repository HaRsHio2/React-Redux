import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FieldEditor from '../components/FieldEditor';
import { RootState } from '../redux/store';
import { setFormName, clearForm, deleteField } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface SavedForm {
  id: string;
  name: string;
  fields: any[];
}

const LOCAL_STORAGE_KEY = 'savedForms';

const CreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formName, fields } = useSelector((state: RootState) => state.formBuilder);

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormName(e.target.value));
  };

  const handleDeleteField = (id: string) => {
    dispatch(deleteField(id));
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      alert('Please enter a form name.');
      return;
    }
    if (fields.length === 0) {
      alert('Please add at least one field.');
      return;
    }

    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

    // Create a new form id
    const newForm = {
      id: Date.now().toString(),
      name: formName,
      fields,
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedForms, newForm]));

    alert('Form saved successfully!');
    dispatch(clearForm());
    navigate('/myforms');
  };

  return (
    <Box maxWidth={800} margin="auto" padding={2} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">Create Form</Typography>
      <TextField
        label="Form Name"
        value={formName}
        onChange={handleFormNameChange}
        fullWidth
      />
      <FieldEditor />
      <Box>
        <Typography variant="h6">Fields</Typography>
        {fields.length === 0 && <Typography>No fields added yet.</Typography>}
        <List>
          {fields.map(field => (
            <ListItem
              key={field.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteField(field.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              {field.label} ({field.type})
            </ListItem>
          ))}
        </List>
      </Box>
      <Button variant="contained" onClick={handleSaveForm}>Save Form</Button>
    </Box>
  );
};

export default CreateForm;