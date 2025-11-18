export interface TextAreaProps {
  name: string;
  value: string;
  onChange: (obj: {
    name: string;
    value: string;
    event?: React.SyntheticEvent<HTMLTextAreaElement>;
  }) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  rows?: number;
  onFocus?: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
