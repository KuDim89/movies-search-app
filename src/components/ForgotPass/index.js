import React, {useContext, useEffect, useState} from "react";
import styles from "../Login/Login.module.scss";
import logo from "../../assets/movie-logo.jpg";
import {useHistory} from "react-router-dom";
import AppContext from "../../context";
import Button from "../UI/Button";
import {createControl} from "../../utils/formFunctions/createFormControl";
import Input from "../UI/Input";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";

const ForgotPass = (props) => {
  const initialState = {
    isFormValid: false,
    credentials: false,
    isSendPassword: false,
    formControls: createFormControls()
  }

  const {appData,setAppData} = useContext(AppContext)
  const [forgotPassState, setForgotPassState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    appData.active && history.push("/movies")
    if(appData.loginPage === true) {
      const newAppData = {
        ...appData,
        loginPage: false
      }
      setAppData(newAppData)
    }
  }, [])

  function createFormControls() {
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

  const onChangeHandler = (event, formControlName) => {
    const forgotPassFormControls = {...forgotPassState.formControls};
    const forgotPassControl = forgotPassFormControls[formControlName]

    forgotPassControl.value = event
    forgotPassControl.touched = true

    forgotPassControl.valid = validateControl(forgotPassControl.value, forgotPassControl.validation)

    forgotPassFormControls[formControlName] = forgotPassControl

    const isFormValid = validateForm(forgotPassFormControls);

    setForgotPassState({formControls: forgotPassFormControls, isFormValid})
  }

  const toLogin = () => {
    history.push("/")
  }

  const toRegister = () => {
    history.push("/register")
  }

  const sendPassword = (event) => {
    event.preventDefault()
    const pageStateForgotPass = {...forgotPassState}
    const forgotPassControls = {...pageStateForgotPass.formControls}
    const matchCredentials = props.users.slice(0).find(user => user.phone === forgotPassControls.phone.value && user.email === forgotPassControls.email.value)

    pageStateForgotPass.credentials = matchCredentials;
    pageStateForgotPass.isSendPassword = true;
    forgotPassControls.phone.touched = false;
    forgotPassControls.email.touched = false;
    forgotPassControls.phone.value = "";
    forgotPassControls.email.value = "";

    matchCredentials
        ? pageStateForgotPass.isCredentials = true
        : pageStateForgotPass.isCredentials = false

    setForgotPassState(pageStateForgotPass);
  }

  return (
      <div className="container px-4 py-5 mx-auto">
        <div className={`d-flex flex-lg-row ${styles.flex_direction_column}`}>
          <div className={styles.card_left}>
            <div className="row justify-content-center my-auto">
              <div className="col-md-8 col-10 my-5">
                <div className="row justify-content-center px-3 mb-3">
                  <img className={styles.logo} id="logo" src={logo} alt="logo"/>
                </div>
                <h3 className="mb-5 text-center">{props.siteData.name}</h3>
                <h6>Please enter your phone and email</h6>
                <form>
                  {Object.keys(forgotPassState.formControls).map((formControlName, index) => {
                    const control = forgotPassState.formControls[formControlName];
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
                  })}
                  <Button
                      type={'secondary-block'}
                      classes={'py-2 my-4'}
                      onClick={sendPassword}
                      disabled={!forgotPassState.isFormValid}
                  >
                    Send me password
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="card py-5 px-5">
            <div className="my-auto mx-md-5 px-md-5">
              <h3>{props.siteData.title}</h3>
              <small>{props.siteData.text}</small>
              <> {forgotPassState.credentials && forgotPassState.isSendPassword && (
                  <div>
                    <div className="alert alert-success my-3">
                      {forgotPassState.credentials.name.charAt(0).toUpperCase()
                      + forgotPassState.credentials.name.slice(1)}
                      &nbsp;
                      {forgotPassState.credentials.surname.charAt(0).toUpperCase()
                      + forgotPassState.credentials.surname.slice(1)}
                      &nbsp;your password:&nbsp;
                      <b>{forgotPassState.credentials.password}</b>
                    </div>
                    <button
                        className="btn-secondary btn-block btn-color py-2"
                        onClick={toLogin}
                    >Go to Login page
                    </button>
                  </div>
              )}
              </>
              <> {!forgotPassState.credentials && forgotPassState.isSendPassword && (
                  <div>
                    <div className="alert alert-danger my-3">
                      We don't know your phone number or mail. Please fill form correct.
                    </div>
                    <button
                        className="btn-secondary btn-block btn-color py-2"
                        onClick={toRegister}
                    >Go to Register page
                    </button>
                  </div>
              )}
              </>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ForgotPass;