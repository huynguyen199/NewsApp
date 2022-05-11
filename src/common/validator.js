export const nameContraints = {
  required: {
    value: true,
    message: "Please fill in the required",
  },
}

export const aboutContraints = {
  required: {
    value: true,
    message: "Please fill in the required",
  },
}

export const websiteContraints = {
  required: {
    value: true,
    message: "Please fill in the required",
  },
}

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

export const phoneContraints = {
  required: {
    value: true,
    message: "Pleasse fill in the required",
  },
  pattern: {
    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    message: "Invalid phone number",
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
