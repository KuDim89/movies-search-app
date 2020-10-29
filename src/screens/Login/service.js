import {createControl} from "../../utils/formFunctions/createFormControl";

export function createFormControls() {
  return {
    phone: createControl(
        {
          type: 'text',
          label: 'phone',
          placeholder: '+385619086171',
          value: ''
        },
        {
          phone: true,
        }),
    password: createControl(
        {
          type: 'password',
          label: 'password',
          placeholder: 'password',
          value: ''
        },
        {
          minLength: 6
        })
  }
}
