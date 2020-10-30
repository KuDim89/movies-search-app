import React, {useEffect, useState} from "react";
import styles from "./Login.module.scss"
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {validateForm} from "../../utils/formFunctions/validateForm";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import LogoImg from "../../components/LogoImg/LogoImg";
import CustomForm from "../../components/CustomForm/CustomForm";
import {login, showLoginPage} from "../../redux/actions";
import {useAuth} from "../../hooks/use-auth";
import {useLoginPage} from "../../hooks/use-loginPage";
import {useUsers} from "../hooks/use-users";
import {useLoginData} from "../hooks/use-loginData";
import {createFormControls} from "./service";

export default function Login() {

  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthentication = useAuth()
  const isLogin = useLoginPage()
  const users = useUsers()
  const loginPageData = useLoginData()

  const initialFormState = {
    isFormValid: false,
    formControls: createFormControls()
  }

  const [loginFormState, setLoginFormState] = useState(initialFormState);

  useEffect(() => {
    isAuthentication && history.push("/movies")
    if (isLogin === false) {
      dispatch(showLoginPage())
    }
  }, [])


  const onChangeHandler = (event, formControlName) => {
    const loginFormControls = {...loginFormState.formControls};
    const loginControl = loginFormControls[formControlName];

    loginControl.value = event
    loginControl.touched = true

    loginControl.valid = validateControl(loginControl.value, loginControl.validation)

    loginControl[formControlName] = loginControl

    const isFormValid = validateForm(loginFormControls);

    setLoginFormState({formControls: loginFormControls, isFormValid})
  }

  const checkUser = (event) => {
    event.preventDefault()
    const allUsers = [...users];
    const phone = loginFormState.formControls.phone.value;
    const password = loginFormState.formControls.password.value;
    const credentials = allUsers.find(user => user.phone === phone && user.password === password)

    if (credentials) {
      history.push("/movies")
      dispatch(login())
    } else {
      const LoginStateClone = {...loginFormState}
      const controls = {...LoginStateClone.formControls}
      Object.keys(controls).map(controlName => {
        controls[controlName].valid = false;
        controls[controlName].value = "";
        loginFormState.isFormValid = false;
      })
      const newLoginState = {
        ...loginFormState,
        formControls: {
          ...controls
        }
      }
      setLoginFormState(newLoginState)
    }
  }

  return (
      <div className="container px-4 py-5 mx-auto">
            <div className="d-flex flex-lg-row">
              <div className={styles.card_left}>
                <div className="row justify-content-center my-auto">
                  <div className="col-md-8 col-10 my-5">
                    <div className="row justify-content-center px-3 mb-3">
                      <LogoImg
                          width={17}
                          borderRadius={30}
                      />
                    </div>
                    <h3 className="mb-5 text-center">{loginPageData.name}</h3>
                    <h6>Please login to your account</h6>
                    <CustomForm
                        pageState={loginFormState}
                        formFunction={{onClick: checkUser, onChangeHandler}}
                        buttonName={'Login to JustWatch'}
                    />
                    <div className="row justify-content-center my-2">
                      <Link to='/forgotPass'>
                        <small className="text-muted">Forgot Password?</small>
                      </Link>
                    </div>
                    <div className="row bottom text-center">
                      <p className="sm-text mx-auto m-3">Don't have an account?
                        <Link to={'/register'}>
                          <ButtonMain
                              additionalClasses={"ml-2 py-2 px-3"}
                          >
                            Create new</ButtonMain>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`card ${styles.card_right}`}>
                <div className="my-auto mx-md-5 px-md-5 right">
                  <h3>{loginPageData.title}</h3> <small>{loginPageData.text}</small>
                </div>
              </div>
            </div>
          </div>

  )
}