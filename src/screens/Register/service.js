import {createControl} from "../../utils/formFunctions/createFormControl";

export function createFormControls() {
  return {
    name: createControl(
        {
          type: 'text',
          label: 'name',
          value: ''
        },
        {
          minLength: 2
        }),
    surname: createControl(
        {
          type: 'text',
          label: 'surname',
          value: ''
        },
        {
          minLength: 2
        }),
    email: createControl(
        {
          type: "email",
          label: "email",
          value: ''
        },
        {
          email: true
        }),
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
    password: createControl(
        {
          type: "password",
          label: "password",
          placeholder: "6+ characters",
          autoComplete: "off",
          value: ''
        },
        {
          minLength: 6
        }),
    policy: createControl(
        {
          type: "checkbox",
          label: "policy",
          checked: false,
        },
        {
          checked: true
        })
  }
}