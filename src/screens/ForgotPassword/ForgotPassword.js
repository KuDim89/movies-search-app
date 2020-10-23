import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import {createControl} from "../../utils/formFunctions/createFormControl";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";
import LogoImg from "../../components/LogoImg/LogoImg";
import CustomForm from "../../components/CustomForm/CustomForm";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import {hideLoginPage} from "../../redux/actions";
import {useAuth} from "../../hooks/use-auth";
import {useLoginPage} from "../../hooks/use-loginPage";
import {useUsers} from "../hooks/use-users";
import {useForgotPassData} from "./hooks/use-forgotPassData";

export default function ForgotPassword () {

  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthentication = useAuth()
  const isLogin = useLoginPage()
  const users = useUsers()
  const forgotPassData = useForgotPassData()

  const initialFormState = {
    isFormValid: false,
    formControls: createFormControls()
  }

  const [forgotPassFormState, setForgotPassFormState] = useState(initialFormState);
  const [isCredentials, setCredentials] = useState(false)
  const [isSendPassword, setSendPassword] = useState(false)

  useEffect(() => {
    isAuthentication && history.push("/movies")
    if(isLogin === true) {
      dispatch(hideLoginPage())
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
    const forgotPassFormControls = {...forgotPassFormState.formControls};
    const forgotPassControl = forgotPassFormControls[formControlName]

    forgotPassControl.value = event
    forgotPassControl.touched = true

    forgotPassControl.valid = validateControl(forgotPassControl.value, forgotPassControl.validation)

    forgotPassFormControls[formControlName] = forgotPassControl

    const isFormValid = validateForm(forgotPassFormControls);

    setForgotPassFormState({formControls: forgotPassFormControls, isFormValid})
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
    const pageStateForgotPass = {...forgotPassFormState}
    const forgotPassControls = {...pageStateForgotPass.formControls}
    const matchCredentials = allUsers.slice(0).find(user => user.phone === forgotPassControls.phone.value && user.email === forgotPassControls.email.value)

    forgotPassControls.phone.touched = false;
    forgotPassControls.email.touched = false;
    forgotPassControls.phone.value = "";
    forgotPassControls.email.value = "";

    setForgotPassFormState(pageStateForgotPass);
    setCredentials(matchCredentials);
    setSendPassword(true);
  }

  return (
        <div className="container px-4 py-5 mx-auto">
          <div className={`d-flex flex-lg-row`}>
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
                      pageState={forgotPassFormState}
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
                <> {isCredentials && isSendPassword && (
                    <>
                      <div className="alert alert-success my-3">
                        {isCredentials.name.charAt(0).toUpperCase()
                        + isCredentials.name.slice(1)}
                        &nbsp;
                        {isCredentials.surname.charAt(0).toUpperCase()
                        + isCredentials.surname.slice(1)}
                        &nbsp;your password:&nbsp;
                        <b>{isCredentials.password}</b>
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
                <> {!isCredentials && isSendPassword && (
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