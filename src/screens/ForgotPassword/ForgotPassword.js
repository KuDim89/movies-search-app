import React, {useEffect, useState} from "react";
import styles from "./ForgotPassword.module.scss";
import {useHistory} from "react-router-dom";
import {createControl} from "../../utils/formFunctions/createFormControl";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";
import LogoImg from "../../components/LogoImg/LogoImg";
import CustomForm from "../../components/CustomForm/CustomForm";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import {connect} from "react-redux";
import {hideLoginPage} from "../../redux/actions";

const ForgotPassword = ({isAuthentication, isLogin, forgotPassData, users, hideLoginPage}) => {

  const initialState = {
    isFormValid: false,
    credentials: false,
    isSendPassword: false,
    formControls: createFormControls()
  }

  const [forgotPassState, setForgotPassState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    isAuthentication && history.push("/movies")
    if(isLogin === true) {
      hideLoginPage()
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
    const allUsers = [...users];
    const pageStateForgotPass = {...forgotPassState}
    const forgotPassControls = {...pageStateForgotPass.formControls}
    const matchCredentials = allUsers.slice(0).find(user => user.phone === forgotPassControls.phone.value && user.email === forgotPassControls.email.value)

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
                  <h3 className="mb-5 text-center">{forgotPassData.name}</h3>
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
                <h3>{forgotPassData.title}</h3>
                <small>{forgotPassData.text}</small>
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

const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication,
    isLogin: state.isLogin,
    forgotPassData: state.app.forgotPassData,
    users: state.app.users
  }
}

const mapDispatchToProps = {
  hideLoginPage
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);