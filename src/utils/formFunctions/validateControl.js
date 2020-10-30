export function validateControl(value, validation= null) {

  if (!validation) {
    return true;
  }

  let isValid = true;

  if(validation.checked) {
    return isValid = value
  }

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.phone) {
    isValid = value.match(/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{5,7}$/) && isValid
  }

  if (validation.email) {
    isValid = value.match(/.+@.+..+/i) && isValid
  }

  if (validation.minLength) {
    isValid = value.length > validation.minLength && isValid
  }

  return isValid
}