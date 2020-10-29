import {createControl} from "../../utils/formFunctions/createFormControl";

export function createFormControls() {
  return {
    phone: createControl(
        {
          type: "text",
          label: "phone",
          placeholder: "+385619086171",
          value: ''
        },
        {
          phone: true
        }),
    email: createControl(
        {
          type: "email",
          label: "email",
          value: ''
        },
        {
          email: true
        })
  }
}

