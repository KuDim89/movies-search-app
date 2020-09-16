import React, {useContext, useEffect, useState} from "react";
import styles from "./Login.module.scss"
import logo from "./../../assets/movie-logo.jpg"
import {Link, useHistory} from "react-router-dom";
import AppContext from "../../context";
import Input from "../UI/Input";
import {validateControl} from "../../utils/formFunctions/validateControl";
import {createControl} from "../../utils/formFunctions/createFormControl";
import Button from "../UI/Button";
import {validateForm} from "../../utils/formFunctions/validateForm";

const Login = (props) => {
  const initialState = {
    isFormValid: false,
    formControls: createFormControls()
  }

  const {appData, setAppData} = useContext(AppContext)
  const [loginFormState, setLoginFormState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    appData.active && history.push("/movies")
    if (appData.loginPage === false) {
      const newAppData = {
        ...appData,
        loginPage: true
      }
      setAppData(newAppData)
    }
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
    const loginFormControls = {...loginFormState.formControls};
    const loginControl = {...loginFormControls[formControlName]};

    loginControl.value = event
    loginControl.touched = true

    loginControl.valid = validateControl(loginControl.value, loginControl.validation)

    loginFormControls[formControlName] = loginControl

    const isFormValid = validateForm(loginFormControls);

    setLoginFormState({formControls: loginFormControls, isFormValid})
  }

  const checkUser = (event) => {
    event.preventDefault()
    const users = [...props.users];
    const phone = loginFormState.formControls.phone.value;
    const password = loginFormState.formControls.password.value;
    const credentials = users.find(user => user.phone === phone && user.password === password)

    if (credentials) {
      const newAppData = {
        ...appData,
        active: true,
      }
      history.push("/movies")
      setAppData(newAppData)
    } else {
      const loginState = {...loginFormState}
      const controls = {...loginState.formControls}
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
      setLoginFormState(newLoginState)
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
                  <img className={styles.logo} id="logo" src={logo} alt="logo"/>
                </div>
                <h3 className="mb-5 text-center">{props.siteData.name}</h3>
                <h6>Please login to your account</h6>
                <form>
                  {Object.keys(loginFormState.formControls).map((formControlName, index) => {
                    const control = loginFormState.formControls[formControlName];
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
                      onClick={checkUser}
                      disabled={!loginFormState.isFormValid}
                  >
                    Login to JustWatch
                  </Button>
                </form>
                <div className="row justify-content-center my-2">
                  <Link to='/forgotPass'>
                    <small className="text-muted">Forgot Password?</small>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bottom text-center mb-5">
              <p className="sm-text mx-auto mb-3">Don't have an account?
                <Button
                    type={'secondary-inline'}
                    classes={"ml-2 py-2 px-3"}
                    onClick={toRegister}
                >
                  Create new</Button>
              </p>
            </div>
          </div>
          <div className={`card ${styles.card_right}`}>
            <div className="my-auto mx-md-5 px-md-5 right">
              <h3>{props.siteData.title}</h3> <small>{props.siteData.text}</small>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login;