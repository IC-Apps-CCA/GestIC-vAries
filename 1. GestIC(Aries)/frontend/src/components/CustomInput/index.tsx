import { Input, FormControl, FormErrorMessage, FormLabel, FormHelperText } from '@chakra-ui/react';
import * as React from 'react';

type Props = {
  type: 'email' | 'password' | 'text';
  name: string;
  placeholder: string;
  ref?: any;
  errorMessage?: string;
  helperText?: string;
};

const CustomInput = ({ type, name, placeholder, ref, errorMessage, helperText, ...other }: Props) => {
  return (
    <FormControl isInvalid={!!errorMessage} errortext={errorMessage}>
      <FormLabel htmlFor={name}>{placeholder}</FormLabel>
      <Input type={type} name={name} placeholder={placeholder} ref={ref} {...other} />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export { CustomInput };
