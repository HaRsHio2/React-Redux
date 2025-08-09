import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface SavedForm {
  id: string;
  name: string;
  fields: any[];
}

const LOCAL_STORAGE_KEY = 'savedForms';

const MyForms: React.FC = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<SavedForm[]>([]);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    setForms(savedForms);
  }, []);

  const handleDelete = (id: string) => {
    const filtered = forms.filter(f => f.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    setForms(filtered);
  };

  const handlePreview = (id: string) => {
    navigate(`/preview?id=${id}`);
  };

  return (
    <Box maxWidth={600} margin="auto" padding={2}>
      <Typography variant="h4" gutterBottom>My Forms</Typography>
      {forms.length === 0 ? (
        <Typography>No forms saved yet.</Typography>
      ) : (
        <List>
          {forms.map(form => (
            <ListItem
              key={form.id}
              secondaryAction={
                <>
                  <Button variant="outlined" onClick={() => handlePreview(form.id)} sx={{ mr: 1 }}>
                    Preview
                  </Button>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(form.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              {form.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyForms;