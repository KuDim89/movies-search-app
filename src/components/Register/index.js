import React, {useEffect, useState} from "react";
import styles from "./Register.module.scss";
import logo from "../../assets/movie-logo.jpg";
import {setData} from "../../utils/set";
import {Redirect} from "react-router-dom";


const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [policy, setPolicy] = useState(false);
  const [validate, setValidate] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (name.length > 0
        && surname.length > 0
        && email.match(/.+@.+..+/i)
        && phone.match(/^((8|\+{0,9})[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/)
        && password.length > 6
        && policy === true)
    {
      setValidate(true)
    }
  },[name, surname, email, phone, password, policy])

  const handleSubmit = (event) => {
    event.preventDefault()

    if(validate){
      const newUser =
          {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password: password,
            policy: policy,
          }
      setData('users', newUser)
    }
    setRedirect(true);
  }

  return (
      <div className="container px-4 py-5 mx-auto">
        <div className="d-flex flex-lg-row">
          <div className={styles.register}>
            <div className="row justify-content-center my-auto">
              <div className="col-12">

                <div className="row justify-content-center px-3 mb-3">
                  <img className={styles.logo} id="logo" src={logo} alt="logo" />
                </div>
                <h3 className="mb-5 text-center">We are JustWatch</h3>
                <form>
                  <div className="form-group">
                    <div className="row justify-content-center my-auto">
                      <div className="col-6">
                        <label className="form-control-label text-muted">Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${name ? "is-valid" : "is-invalid"}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        {name
                            ? <div className="valid-feedback">Looks good</div>
                            : <div className="invalid-feedback">Name invalid</div>
                        }
                      </div>
                      <div className="col-6">
                        <label className="form-control-label text-muted">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            className={`form-control ${surname ? "is-valid" : "is-invalid"}`}
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                        {surname
                            ? <div className="valid-feedback">Looks good</div>
                            : <div className="invalid-feedback">Surname invalid</div>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${email.match(/.+@.+..+/i) ? "is-valid" : "is-invalid"}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {email.match(/.+@.+..+/i)
                            ? <div className="valid-feedback">Looks good</div>
                            : <div className="invalid-feedback">Email invalid</div>
                    }
                  </div>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="For example +385619086171"
                        className={`form-control ${phone.match(/^((8|\+{0,9})[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{12,13}$/) ? "is-valid" : "is-invalid"}`}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    {phone.match(/^((8|\+{0,9})[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/)
                        ? <div className="valid-feedback">Looks good</div>
                        : <div className="invalid-feedback">Phone invalid</div>
                    }
                  </div>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="6+ characters"
                        autoComplete="off"
                        className={`form-control ${password.length > 6 ? "is-valid" : "is-invalid"}`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {password > 6
                          ? <div className="valid-feedback">Looks good</div>
                          : <div className="invalid-feedback">Password invalid</div>
                    }
                  </div>

                  <div className="form-check">
                    <input
                        type="checkbox"
                        name="policy"
                        className={`form-check-input ${policy ? "is-valid" : "is-invalid"}`}

                        checked={policy}
                        onChange={e => setPolicy(e.target.checked)}
                    />
                    <label className="form-check-label">
                      Creating an account means you’re okay with our
                      <a href="#" className="text-muted"><b> Terms of Service</b></a>,
                      <a href="#" className="text-muted"><b> Privacy Policy</b></a>, and our default
                      <a href="#" className="text-muted"><b> Notification Settings</b></a>.
                    </label>
                  </div>

                  <div className="row justify-content-center my-3 px-3">
                    <button
                        type="submit"
                        className="btn-secondary btn-block btn-color py-2"
                        disabled={!validate}
                        onClick={handleSubmit}
                    >Create Account</button>
                  </div>
                </form>
                {redirect && (
                    <Redirect to='/'/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register;