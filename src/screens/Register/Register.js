import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import styles from "./Register.module.scss";
import {setData} from "../../utils/firebaseFunctions/setData";
import Input from "../../components/Input/Input";
import Checkbox from "./Checkbox/Checkbox";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import LogoImg from "../../components/LogoImg/LogoImg";
import {hideLoginPage} from "../../redux/actions";
import {useAuth} from "../../hooks/use-auth";
import {useLoginData} from "../hooks/use-loginData";
import {useLoginPage} from "../../hooks/use-loginPage";
import {createFormControls} from "./service";


export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthentication = useAuth();
  const loginData = useLoginData();
  const isLogin = useLoginPage();

  const initialFormState = {
    isFormValid: false,
    formControls: createFormControls()
  }
  const [registerFormState, setRegisterFormState] = useState(initialFormState);

  useEffect(() => {
    isAuthentication && history.push("/movies")
    if(isLogin === true) {
      dispatch(hideLoginPage());
    }
  })

  const onChangeHandler = (event, formControlName) => {
    const registerFormControls = {...registerFormState.formControls};
    const registerControl = registerFormControls[formControlName];

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
                  <LogoImg
                      width={15}
                      borderRadius={30}
                  />
                </div>
                <h3 className="mb-5 text-center">{loginData.name}</h3>

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
                      checked={registerFormState.formControls.policy.checked}
                      onChange={e => onChangeHandler(e.target.checked, 'policy')}
                  />
                  <ButtonMain
                      additionalClasses="btn-block py-2 my-4"
                      onClick={handleSubmit}
                      disabled={!registerFormState.isFormValid}
                  >
                    Create Account
                  </ButtonMain>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}