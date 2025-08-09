export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'derived';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  emailFormat?: boolean;
  passwordRule?: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  defaultValue?: any;
  options?: string[];
  validations?: ValidationRules;
  isDerived?: boolean;
  parentFields?: string[];
  formula?: string;
}
