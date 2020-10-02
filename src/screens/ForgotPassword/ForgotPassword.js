import React, {useContext, useEffect, useState} from "react";
import styles from "./ForgotPassword.module.scss";
import {useHistory} from "react-router-dom";
import AppContext from "../../context";
import {createControl} from "../../utils/formFunctions/createFormControl";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";
import LogoImg from "../../components/LogoImg/LogoImg";
import CustomForm from "../../components/CustomForm/CustomForm";
import ButtonMain from "../../components/ButtonMain/ButtonMain";

const ForgotPassword = (props) => {
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
            <div className={styles.authorizationCard}>
              <div className="row justify-content-center my-auto">
                <div className="col-md-8 col-10 my-5">
                  <div className="row justify-content-center px-3 mb-3">
                    <LogoImg
                        width={15}
                        borderRadius={30}
                    />
                  </div>
                  <h3 className="mb-5 text-center">{props.siteData.name}</h3>
                  <h6>Please enter your phone and email</h6>
                  <CustomForm
                      pageState={forgotPassState}
                      formFunction={{onClick: sendPassword, onChangeHandler}}
                      buttonName={'Send me password'}
                  />
                </div>
              </div>
            </div>

            <div className="card py-5 px-5">
              <div className="my-auto mx-md-5 px-md-5">
                <h3>{props.siteData.title}</h3>
                <small>{props.siteData.text}</small>
                <> {forgotPassState.credentials && forgotPassState.isSendPassword && (
                    <>
                      <div className="alert alert-success my-3">
                        {forgotPassState.credentials.name.charAt(0).toUpperCase()
                        + forgotPassState.credentials.name.slice(1)}
                        &nbsp;
                        {forgotPassState.credentials.surname.charAt(0).toUpperCase()
                        + forgotPassState.credentials.surname.slice(1)}
                        &nbsp;your password:&nbsp;
                        <b>{forgotPassState.credentials.password}</b>
                      </div>
                      <ButtonMain
                          additionalClasses={'btn-block py-2'}
                          onClick={toLogin}
                      >
                        Go to Login page
                      </ButtonMain>
                    </>
                )}
                </>
                <> {!forgotPassState.credentials && forgotPassState.isSendPassword && (
                    <>
                      <div className="alert alert-danger my-3">
                        We don't know your phone number or mail. Please fill form correct.
                      </div>
                      <ButtonMain
                          additionalClasses={'btn-block py-2'}
                          onClick={toRegister}
                      >
                        Go to Register page
                      </ButtonMain>
                    </>
                )}
                </>
              </div>
            </div>
          </div>
      </div>
  )
}

export default ForgotPassword;