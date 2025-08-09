import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField } from '../types';

interface FormState {
  fields: FormField[];
  formName: string;
}

const initialState: FormState = {
  fields: [],
  formName: '',
};

const formSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addField(state, action: PayloadAction<FormField>) {
      state.fields.push(action.payload);
    },
    updateField(state, action: PayloadAction<FormField>) {
      const index = state.fields.findIndex(f => f.id === action.payload.id);
      if (index !== -1) state.fields[index] = action.payload;
    },
    deleteField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    setFormName(state, action: PayloadAction<string>) {
      state.formName = action.payload;
    },
    clearForm(state) {
      state.fields = [];
      state.formName = '';
    },
  },
});

export const { addField, updateField, deleteField, setFormName, clearForm } = formSlice.actions;
export default formSlice.reducer;
