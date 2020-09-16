export function validateForm (formControls) {
  let isFormValid = true;

  for(let control in formControls){
    if(formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}