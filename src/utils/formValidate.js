export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: 'Campo obligatorio',
    },
    patternEmail: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/,
      message: 'Formato de email incorrecto',
    },
    minLength: {
      value: 6,
      message: 'Mínimo ingresar 6 caracteres',
    },
    validateTrim: {
      validate: (value) => {
        if (!value.trim()) {
          return 'No puede estar vacío';
        }
        return true;
      },
    },
    validateEquals: (value) => {
      return {
        validate: (v) => v === value || 'Las contraseñas no coinciden',
      };
    },
  };
};
