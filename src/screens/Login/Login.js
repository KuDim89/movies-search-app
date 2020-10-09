import React, {useEffect, useState} from "react";
import styles from "./Login.module.scss"
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {createControl} from "../../utils/formFunctions/createFormControl";
import {validateForm} from "../../utils/formFunctions/validateForm";
import ButtonMain from "../../components/ButtonMain/ButtonMain";
import LogoImg from "../../components/LogoImg/LogoImg";
import CustomForm from "../../components/CustomForm/CustomForm";
import {hideLoader, login, showLoader, showLoginPage} from "../../redux/actions";

const Login = ({isAuthentication, isLogin, users, loginPageData, showLoginPage, hideLoader, login}) => {
  const initialState = {
    isFormValid: false,
    formControls: createFormControls()
  }

  const [loginState, setLoginState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    isAuthentication && history.push("/movies")
    if (isLogin === false) {
      showLoginPage()
    }
    hideLoader()
  }, [])

  function createFormControls() {
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

  const onChangeHandler = (event, formControlName) => {
    const loginFormControls = {...loginState.formControls};
    const loginControl = loginFormControls[formControlName];

    loginControl.value = event
    loginControl.touched = true

    loginControl.valid = validateControl(loginControl.value, loginControl.validation)

    loginControl[formControlName] = loginControl

    const isFormValid = validateForm(loginFormControls);

    setLoginState({formControls: loginFormControls, isFormValid})
  }

  const checkUser = (event) => {
    event.preventDefault()
    const allUsers = [...users];
    const phone = loginState.formControls.phone.value;
    const password = loginState.formControls.password.value;
    const credentials = allUsers.find(user => user.phone === phone && user.password === password)

    if (credentials) {
      history.push("/movies")
      login()
    } else {
      const LoginStateClone = {...loginState}
      const controls = {...LoginStateClone.formControls}
      Object.keys(controls).map(controlName => {
        controls[controlName].valid = false;
        controls[controlName].value = "";
        loginState.isFormValid = false;
      })
      const newLoginState = {
        ...loginState,
        formControls: {
          ...controls
        }
      }
      setLoginState(newLoginState)
    }
  }

  const toRegister = () => {
    history.push("/register")
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
                    pageState={loginState}
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
                    <ButtonMain
                        additionalClasses={"ml-2 py-2 px-3"}
                        onClick={toRegister}
                    >
                      Create new</ButtonMain>
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

const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication,
    isLogin: state.isLogin,
    users: state.app.users,
    loginPageData: state.app.loginData
  }
}

const mapDispatchToProps = {
  showLoginPage,
  showLoader,
  hideLoader,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);