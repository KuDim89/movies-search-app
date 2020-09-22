import React, {useContext, useEffect, useState} from "react";
import styles from "./Register.module.scss";
import logo from "../../assets/movie-logo.jpg";
import {setData} from "../../utils/firebaseFunctions/setData";
import {useHistory} from "react-router-dom";
import {createControl} from "../../utils/formFunctions/createFormControl";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import AppContext from "../../context";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";


const Register = (props) => {
  const initialState = {
    isFormValid: false,
    formControls: createFormControls()
  }

  const {appData, setAppData} = useContext(AppContext)
  const [registerFormState, setRegisterFormState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    appData.active && history.push("/movies")
    if (appData.loginPage === true) {
      const newAppData = {
        ...appData,
        loginPage: false
      }
      setAppData(newAppData)
    }
  })

  function createFormControls() {
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

  const onChangeHandler = (event, formControlName) => {
    const registerFormControls = {...registerFormState.formControls};
    const registerControl = {...registerFormControls[formControlName]};

    registerControl.value = event;
    registerControl.touched = true;

    registerControl.checked = !registerControl.checked;


    registerControl.valid = validateControl(registerControl.value, registerControl.validation);

    registerFormControls[formControlName] = registerControl;

    const isFormValid = validateForm(registerFormControls);

    setRegisterFormState({formControls: registerFormControls, isFormValid})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const registerFormControls = {...registerFormState.formControls};
    const newUser = {};

    Object.keys(registerFormControls).map(name => {
      newUser[name] = registerFormControls[name].value;
    })

    setData('users', newUser)
    history.push("/")
  }

  return (
      <div className="container px-4 py-5 mx-auto">
        <div className="d-flex flex-lg-row">
          <div className={styles.register}>
            <div className="row justify-content-center my-auto">
              <div className="col-12">
                <div className="row justify-content-center px-3 mb-3">
                  <img id="logo" src={logo} alt="logo"/>
                </div>
                <h3 className="mb-5 text-center">{props.siteData.name}</h3>

                <form>
                  <div className="row">
                    {Object.keys(registerFormState.formControls).map((formControlName, index) => {
                      const control = registerFormState.formControls[formControlName];
                      if (index > 1) {
                        return
                      }
                      return (
                          <div className="col-6" key={index}>
                            <Input
                                type={control.type}
                                value={control.value}
                                valid={control.valid}
                                touched={control.touched}
                                label={control.label}
                                placeholder={control.placeholder}
                                shouldValidate={!!control.validation}
                                onChange={e => onChangeHandler(e.target.value, formControlName)}
                            />
                          </div>
                      )
                    })}
                  </div>
                  {Object.keys(registerFormState.formControls).map((formControlName, index) => {
                    const control = registerFormState.formControls[formControlName];
                    const objectLength = Object.keys(registerFormState.formControls).length
                    if (index > 1 && index < objectLength - 1) {
                      return (
                          <Input
                              key={index}
                              type={control.type}
                              value={control.value}
                              valid={control.valid}
                              touched={control.touched}
                              label={control.label}
                              placeholder={control.placeholder}
                              shouldValidate={!!control.validation}
                              onChange={e => onChangeHandler(e.target.value, formControlName)}
                          />
                      )
                    }
                    return null
                  })}

                  <Checkbox
                      type={registerFormState.formControls.policy.type}
                      valid={registerFormState.formControls.policy.valid}
                      touched={registerFormState.formControls.policy.touched}
                      label={registerFormState.formControls.policy.label}
                      shouldValidate={!!registerFormState.formControls.policy.validation}
                      checked={registerFormState.formControls.policy.checked}
                      onChange={e => onChangeHandler(e.target.checked, 'policy')}
                  />
                  <Button
                      type="secondary-block"
                      classes="py-2 my-4"
                      onClick={handleSubmit}
                      disabled={!registerFormState.isFormValid}
                  >
                    Create Account
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register;