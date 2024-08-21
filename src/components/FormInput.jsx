import { forwardRef } from "react";

const FormInput = forwardRef(
    ({ name, onBlur, onChange, type, placeholder, children }, ref) => {
  return (
    <> 
    <input 
            type={type} 
            name={name}
            onBlur={onBlur} 
            onChange={onChange} 
            ref={ref} 
            placeholder={placeholder}
    />
        {children}
    </>
  );
});

export default FormInput;
