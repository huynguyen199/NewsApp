export const emailContraints = {
  required: {
    value: true,
    message: "Please fill in the required",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid Email",
  },
}

export const passwordContraints = {
  required: {
    value: true,
    message: "Pleasse fill in the required",
  },
  minLength: {
    value: 6,
    message: "Please enter at least 6 characters",
  },
}
