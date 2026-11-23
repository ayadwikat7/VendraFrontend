import {
  useEffect,
  useState
} from "react";

import {
  AnimatePresence,
  motion
} from "motion/react";

import {
  Link,
  useNavigate
} from "react-router-dom";


function Login() {

  const navigate =
    useNavigate();


  // =========================================================
  // STATE
  // =========================================================

  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [rememberMe, setRememberMe] =
    useState(false);


  const [showPassword, setShowPassword] =
    useState(false);


  const [emailError, setEmailError] =
    useState("");


  const [passwordError, setPasswordError] =
    useState("");


  const [toast, setToast] =
    useState("");


  // =========================================================
  // START
  // =========================================================

  useEffect(
    () => {

      document.title =
        "Sign In — Vendra";


      const rememberedEmail =
        localStorage.getItem(
          "vendraRememberedEmail"
        );


      if (
        rememberedEmail
      ) {

        setEmail(
          rememberedEmail
        );

        setRememberMe(
          true
        );

      }

    },
    []
  );


  // =========================================================
  // TOAST
  // =========================================================

  const showToastMessage =
    message => {

      setToast(
        message
      );


      setTimeout(
        () => {

          setToast("");

        },
        1800
      );

    };


  // =========================================================
  // EMAIL VALIDATION
  // =========================================================

  const validateEmail = () => {

    const value =
      email.trim();


    if (
      !value
    ) {

      setEmailError(
        "Please enter your email address."
      );

      return false;

    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailPattern.test(
        value
      )
    ) {

      setEmailError(
        "Please enter a valid email address."
      );

      return false;

    }


    setEmailError("");

    return true;

  };


  // =========================================================
  // PASSWORD VALIDATION
  // =========================================================

  const validatePassword = () => {

    if (
      !password
    ) {

      setPasswordError(
        "Please enter your password."
      );

      return false;

    }


    if (
      password.length < 6
    ) {

      setPasswordError(
        "Password must contain at least 6 characters."
      );

      return false;

    }


    setPasswordError("");

    return true;

  };


  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit =
    event => {

      event.preventDefault();


      const emailValid =
        validateEmail();


      const passwordValid =
        validatePassword();


      if (
        !emailValid
        ||
        !passwordValid
      ) {

        return;

      }


      // Remember email

      if (
        rememberMe
      ) {

        localStorage.setItem(
          "vendraRememberedEmail",
          email.trim()
        );

      } else {

        localStorage.removeItem(
          "vendraRememberedEmail"
        );

      }


      // Demo frontend login

      const user = {

        email:
          email.trim(),

        name:
          email
            .split("@")[0],

        loggedIn:
          true

      };


      localStorage.setItem(
        "vendraUser",
        JSON.stringify(
          user
        )
      );


      window.dispatchEvent(
        new Event(
          "vendra-user-updated"
        )
      );


      showToastMessage(
        "Signed in successfully"
      );


      setTimeout(
        () => {

          navigate(
            "/"
          );

        },
        500
      );

    };


  // =========================================================
  // DEMO LOGIN
  // =========================================================

  const fillDemoAccount = () => {

    setEmail(
      "demo@vendra.com"
    );

    setPassword(
      "123456"
    );

    setRememberMe(
      true
    );

    setEmailError("");

    setPasswordError("");


    showToastMessage(
      "Demo account filled in"
    );

  };


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  const forgotPassword = () => {

    showToastMessage(
      "Password recovery will be connected later"
    );

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      <section className="auth-page">


        <div className="container">


          <motion.div

            className="auth-layout"

            initial={{
              opacity: 0,
              y: 35,
              scale: 0.98
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            transition={{
              duration: 0.7,
              ease: [
                0.22,
                1,
                0.36,
                1
              ]
            }}

          >


            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="auth-visual">


              <motion.div

                className="auth-visual-content"

                initial="hidden"

                animate="visible"

                variants={{

                  hidden: {},

                  visible: {

                    transition: {
                      staggerChildren: 0.1
                    }

                  }

                }}

              >


                <motion.span

                  className="auth-badge"

                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20
                    },
                    visible: {
                      opacity: 1,
                      y: 0
                    }
                  }}

                >

                  <i className="bi bi-person-check"></i>

                  Welcome back

                </motion.span>



                <motion.h1

                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25
                    },
                    visible: {
                      opacity: 1,
                      y: 0
                    }
                  }}

                >

                  Everything you love,

                  <span>

                    all in one place

                  </span>

                </motion.h1>



                <motion.p

                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20
                    },
                    visible: {
                      opacity: 1,
                      y: 0
                    }
                  }}

                >

                  Sign in to manage your orders,
                  save your favorite products,
                  and continue shopping across
                  your favorite stores.

                </motion.p>



                <div className="auth-benefits">


                  {[
                    {
                      icon:
                        "bi-bag-check",

                      title:
                        "Track your orders",

                      text:
                        "Follow every order in one place."
                    },

                    {
                      icon:
                        "bi-heart",

                      title:
                        "Save your favorites",

                      text:
                        "Keep products you love for later."
                    },

                    {
                      icon:
                        "bi-lightning-charge",

                      title:
                        "Faster checkout",

                      text:
                        "Your account makes shopping easier."
                    }

                  ].map(
                    (
                      item,
                      index
                    ) => (

                      <motion.div

                        key={
                          item.title
                        }

                        initial={{
                          opacity: 0,
                          x: -20
                        }}

                        animate={{
                          opacity: 1,
                          x: 0
                        }}

                        transition={{
                          delay:
                            0.4
                            +
                            index *
                            0.1
                        }}

                      >


                        <span>

                          <i
                            className={
                              `bi ${item.icon}`
                            }
                          ></i>

                        </span>


                        <div>

                          <strong>

                            {item.title}

                          </strong>


                          <small>

                            {item.text}

                          </small>

                        </div>


                      </motion.div>

                    )
                  )}


                </div>


              </motion.div>



              <motion.div

                className="auth-decoration auth-decoration-one"

                animate={{
                  x: [
                    0,
                    25,
                    0
                  ],

                  y: [
                    0,
                    -20,
                    0
                  ]
                }}

                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}

              />


              <motion.div

                className="auth-decoration auth-decoration-two"

                animate={{
                  x: [
                    0,
                    -18,
                    0
                  ],

                  y: [
                    0,
                    20,
                    0
                  ]
                }}

                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}

              />


            </div>



            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="auth-form-side">


              <div className="auth-form-card">


                <motion.div

                  className="auth-form-heading"

                  initial={{
                    opacity: 0,
                    y: 20
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    delay: 0.2
                  }}

                >


                  <span className="section-label">

                    Your account

                  </span>


                  <h2>

                    Sign in

                  </h2>


                  <p>

                    Enter your details to continue.

                  </p>


                </motion.div>



                <form

                  onSubmit={
                    handleSubmit
                  }

                  noValidate

                >


                  {/* =========================================
                      EMAIL
                  ========================================= */}

                  <div className="auth-field">


                    <label>

                      Email address

                    </label>


                    <div

                      className={
                        `auth-input-wrap ${
                          emailError
                            ?
                            "invalid"
                            :
                            ""
                        }`
                      }

                    >


                      <i className="bi bi-envelope"></i>


                      <input

                        type="email"

                        placeholder="you@example.com"

                        autoComplete="email"

                        value={
                          email
                        }

                        onChange={
                          event => {

                            setEmail(
                              event.target.value
                            );


                            if (
                              emailError
                            ) {

                              setEmailError("");

                            }

                          }
                        }

                        onBlur={
                          validateEmail
                        }

                      />


                    </div>


                    <small className="auth-error">

                      {emailError}

                    </small>


                  </div>



                  {/* =========================================
                      PASSWORD
                  ========================================= */}

                  <div className="auth-field">


                    <div className="auth-label-row">


                      <label>

                        Password

                      </label>


                      <button

                        type="button"

                        className="forgot-password-btn"

                        onClick={
                          forgotPassword
                        }

                      >

                        Forgot password?

                      </button>


                    </div>



                    <div

                      className={
                        `auth-input-wrap ${
                          passwordError
                            ?
                            "invalid"
                            :
                            ""
                        }`
                      }

                    >


                      <i className="bi bi-lock"></i>


                      <input

                        type={
                          showPassword
                            ?
                            "text"
                            :
                            "password"
                        }

                        placeholder="Enter your password"

                        autoComplete="current-password"

                        value={
                          password
                        }

                        onChange={
                          event => {

                            setPassword(
                              event.target.value
                            );


                            if (
                              passwordError
                            ) {

                              setPasswordError("");

                            }

                          }
                        }

                        onBlur={
                          validatePassword
                        }

                      />


                      <motion.button

                        type="button"

                        className="password-toggle"

                        whileTap={{
                          scale: 0.85
                        }}

                        onClick={
                          () =>
                            setShowPassword(
                              current =>
                                !current
                            )
                        }

                      >

                        <i

                          className={
                            showPassword
                              ?
                              "bi bi-eye-slash"
                              :
                              "bi bi-eye"
                          }

                        ></i>

                      </motion.button>


                    </div>


                    <small className="auth-error">

                      {passwordError}

                    </small>


                  </div>



                  {/* =========================================
                      OPTIONS
                  ========================================= */}

                  <div className="auth-options">


                    <label className="remember-me">


                      <input

                        type="checkbox"

                        checked={
                          rememberMe
                        }

                        onChange={
                          event =>
                            setRememberMe(
                              event.target.checked
                            )
                        }

                      />


                      <span className="remember-check">

                        <i className="bi bi-check"></i>

                      </span>


                      <span>

                        Remember me

                      </span>


                    </label>


                  </div>



                  {/* =========================================
                      SUBMIT
                  ========================================= */}

                  <motion.button

                    type="submit"

                    className="auth-submit-btn"

                    whileHover={{
                      y: -2,
                      scale: 1.01
                    }}

                    whileTap={{
                      scale: 0.97
                    }}

                  >

                    Sign in

                    <i className="bi bi-arrow-right"></i>

                  </motion.button>


                </form>



                {/* =============================================
                    DIVIDER
                ============================================= */}

                <div className="auth-divider">

                  <span>

                    or

                  </span>

                </div>



                {/* =============================================
                    DEMO LOGIN
                ============================================= */}

                <motion.button

                  type="button"

                  className="demo-login-btn"

                  whileHover={{
                    y: -2
                  }}

                  whileTap={{
                    scale: 0.98
                  }}

                  onClick={
                    fillDemoAccount
                  }

                >


                  <span>

                    <i className="bi bi-person-badge"></i>

                  </span>


                  <div>

                    <strong>

                      Use demo account

                    </strong>


                    <small>

                      demo@vendra.com · 123456

                    </small>

                  </div>


                  <i className="bi bi-arrow-right"></i>


                </motion.button>



                {/* =============================================
                    REGISTER
                ============================================= */}

                <p className="auth-register-text">

                  Don't have an account?

                  <Link to="/register">

                    Create one

                  </Link>

                </p>


              </div>


            </div>


          </motion.div>


        </div>


      </section>



      {/* =====================================================
          TOAST
      ===================================================== */}

      <AnimatePresence>


        {toast && (

          <motion.div

            className="react-cart-toast"

            initial={{
              opacity: 0,
              y: 25,
              scale: 0.94
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: 20
            }}

          >

            <span>

              <i className="bi bi-check-lg"></i>

            </span>


            {toast}


          </motion.div>

        )}


      </AnimatePresence>


    </main>

  );

}


export default Login;