import {
  useEffect,
  useMemo,
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


function Register() {

  const navigate =
    useNavigate();


  // =========================================================
  // FORM
  // =========================================================

  const [form, setForm] =
    useState({

      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""

    });


  const [accountType, setAccountType] =
    useState("customer");


  const [acceptTerms, setAcceptTerms] =
    useState(false);


  const [showPassword, setShowPassword] =
    useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);


  const [errors, setErrors] =
    useState({});


  const [toast, setToast] =
    useState("");


  // =========================================================
  // PAGE TITLE
  // =========================================================

  useEffect(
    () => {

      document.title =
        "Create Account — Vendra";

    },
    []
  );


  // =========================================================
  // CHANGE
  // =========================================================

  const handleChange =
    event => {

      const {
        name,
        value
      } = event.target;


      setForm(
        current => ({

          ...current,

          [name]:
            value

        })
      );


      setErrors(
        current => ({

          ...current,

          [name]:
            ""

        })
      );

    };


  // =========================================================
  // PASSWORD STRENGTH
  // =========================================================

  const passwordStrength =
    useMemo(
      () => {

        const password =
          form.password;


        if (
          !password
        ) {

          return {
            label: "",
            className: "",
            width: "0%"
          };

        }


        let score =
          0;


        if (
          password.length >= 6
        ) {

          score++;

        }


        if (
          /[A-Z]/.test(
            password
          )
        ) {

          score++;

        }


        if (
          /[0-9]/.test(
            password
          )
        ) {

          score++;

        }


        if (
          /[^A-Za-z0-9]/.test(
            password
          )
        ) {

          score++;

        }


        if (
          score <= 1
        ) {

          return {
            label:
              "Weak password",
            className:
              "weak",
            width:
              "33%"
          };

        }


        if (
          score <= 3
        ) {

          return {
            label:
              "Medium password",
            className:
              "medium",
            width:
              "66%"
          };

        }


        return {
          label:
            "Strong password",
          className:
            "strong",
          width:
            "100%"
        };

      },
      [form.password]
    );


  // =========================================================
  // VALIDATE
  // =========================================================

  const validateForm = () => {

    const newErrors = {};


    if (
      !form.firstName.trim()
    ) {

      newErrors.firstName =
        "Please enter your first name.";

    } else if (
      form.firstName
        .trim()
        .length < 2
    ) {

      newErrors.firstName =
        "First name is too short.";

    }


    if (
      !form.lastName.trim()
    ) {

      newErrors.lastName =
        "Please enter your last name.";

    } else if (
      form.lastName
        .trim()
        .length < 2
    ) {

      newErrors.lastName =
        "Last name is too short.";

    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !form.email.trim()
    ) {

      newErrors.email =
        "Please enter your email address.";

    } else if (
      !emailPattern.test(
        form.email.trim()
      )
    ) {

      newErrors.email =
        "Please enter a valid email address.";

    }


    if (
      !form.phone.trim()
    ) {

      newErrors.phone =
        "Please enter your phone number.";

    } else if (
      form.phone
        .replace(
          /\D/g,
          ""
        )
        .length < 7
    ) {

      newErrors.phone =
        "Please enter a valid phone number.";

    }


    if (
      !form.password
    ) {

      newErrors.password =
        "Please enter a password.";

    } else if (
      form.password.length < 6
    ) {

      newErrors.password =
        "Password must contain at least 6 characters.";

    }


    if (
      !form.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Please confirm your password.";

    } else if (
      form.confirmPassword !==
      form.password
    ) {

      newErrors.confirmPassword =
        "Passwords do not match.";

    }


    if (
      !acceptTerms
    ) {

      newErrors.terms =
        "Please accept the terms and privacy policy.";

    }


    setErrors(
      newErrors
    );


    return (
      Object.keys(
        newErrors
      ).length === 0
    );

  };


  // =========================================================
  // REGISTER
  // =========================================================

  const handleSubmit =
    event => {

      event.preventDefault();


      if (
        !validateForm()
      ) {

        return;

      }


      const newUser = {

        firstName:
          form.firstName.trim(),

        lastName:
          form.lastName.trim(),

        name:
          `${form.firstName.trim()} ${form.lastName.trim()}`,

        email:
          form.email.trim(),

        phone:
          form.phone.trim(),

        accountType:
          accountType,

        loggedIn:
          true

      };


      localStorage.setItem(
        "vendraUser",
        JSON.stringify(
          newUser
        )
      );


      window.dispatchEvent(
        new Event(
          "vendra-user-updated"
        )
      );


      setToast(
        "Account created successfully"
      );


      setTimeout(
        () => {

          navigate(
            "/"
          );

        },
        600
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

            className="auth-layout register-layout"

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
              duration: 0.7
            }}

          >


            {/* =================================================
                LEFT
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

                  <i className="bi bi-person-plus"></i>

                  Join Vendra

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

                  Your shopping journey

                  <span>

                    starts here

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

                  Create your account and enjoy
                  a simpler way to shop from
                  multiple trusted stores.

                </motion.p>



                <div className="auth-benefits">


                  {[
                    {
                      icon:
                        "bi-shop",
                      title:
                        "Multiple stores",
                      text:
                        "Shop from different sellers in one marketplace."
                    },

                    {
                      icon:
                        "bi-clock-history",
                      title:
                        "Order history",
                      text:
                        "Keep all your orders organized."
                    },

                    {
                      icon:
                        "bi-geo-alt",
                      title:
                        "Track deliveries",
                      text:
                        "Follow your orders from purchase to delivery."
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
                    -20,
                    0
                  ],
                  y: [
                    0,
                    18,
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
                RIGHT
            ================================================= */}

            <div className="auth-form-side register-form-side">


              <div className="auth-form-card register-form-card">


                <div className="auth-form-heading">


                  <span className="section-label">

                    New account

                  </span>


                  <h2>

                    Create account

                  </h2>


                  <p>

                    Enter your information to get started.

                  </p>


                </div>



                <form

                  onSubmit={
                    handleSubmit
                  }

                  noValidate

                >


                  <div className="row g-3">


                    {/* FIRST NAME */}

                    <div className="col-md-6">


                      <div className="auth-field">


                        <label>

                          First name

                        </label>


                        <div

                          className={
                            `auth-input-wrap ${
                              errors.firstName
                                ?
                                "invalid"
                                :
                                ""
                            }`
                          }

                        >


                          <i className="bi bi-person"></i>


                          <input

                            type="text"

                            name="firstName"

                            placeholder="First name"

                            value={
                              form.firstName
                            }

                            onChange={
                              handleChange
                            }

                          />


                        </div>


                        <small className="auth-error">

                          {errors.firstName}

                        </small>


                      </div>


                    </div>



                    {/* LAST NAME */}

                    <div className="col-md-6">


                      <div className="auth-field">


                        <label>

                          Last name

                        </label>


                        <div

                          className={
                            `auth-input-wrap ${
                              errors.lastName
                                ?
                                "invalid"
                                :
                                ""
                            }`
                          }

                        >


                          <i className="bi bi-person"></i>


                          <input

                            type="text"

                            name="lastName"

                            placeholder="Last name"

                            value={
                              form.lastName
                            }

                            onChange={
                              handleChange
                            }

                          />


                        </div>


                        <small className="auth-error">

                          {errors.lastName}

                        </small>


                      </div>


                    </div>



                    {/* EMAIL */}

                    <div className="col-md-6">


                      <div className="auth-field">


                        <label>

                          Email address

                        </label>


                        <div

                          className={
                            `auth-input-wrap ${
                              errors.email
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

                            name="email"

                            placeholder="you@example.com"

                            value={
                              form.email
                            }

                            onChange={
                              handleChange
                            }

                          />


                        </div>


                        <small className="auth-error">

                          {errors.email}

                        </small>


                      </div>


                    </div>



                    {/* PHONE */}

                    <div className="col-md-6">


                      <div className="auth-field">


                        <label>

                          Phone number

                        </label>


                        <div

                          className={
                            `auth-input-wrap ${
                              errors.phone
                                ?
                                "invalid"
                                :
                                ""
                            }`
                          }

                        >


                          <i className="bi bi-telephone"></i>


                          <input

                            type="tel"

                            name="phone"

                            placeholder="+970..."

                            value={
                              form.phone
                            }

                            onChange={
                              handleChange
                            }

                          />


                        </div>


                        <small className="auth-error">

                          {errors.phone}

                        </small>


                      </div>


                    </div>


                  </div>



                  {/* =========================================
                      ACCOUNT TYPE
                  ========================================= */}

                  <div className="auth-field">


                    <label>

                      Account type

                    </label>


                    <div className="account-type-options">


                      <motion.label

                        className={
                          `account-type-option ${
                            accountType ===
                            "customer"
                              ?
                              "active"
                              :
                              ""
                          }`
                        }

                        whileHover={{
                          y: -2
                        }}

                      >


                        <input

                          type="radio"

                          name="accountType"

                          value="customer"

                          checked={
                            accountType ===
                            "customer"
                          }

                          onChange={
                            () =>
                              setAccountType(
                                "customer"
                              )
                          }

                        />


                        <span>

                          <i className="bi bi-bag"></i>

                        </span>


                        <div>

                          <strong>

                            Customer

                          </strong>


                          <small>

                            Shop products on Vendra

                          </small>

                        </div>


                      </motion.label>



                      <motion.label

                        className={
                          `account-type-option ${
                            accountType ===
                            "merchant"
                              ?
                              "active"
                              :
                              ""
                          }`
                        }

                        whileHover={{
                          y: -2
                        }}

                      >


                        <input

                          type="radio"

                          name="accountType"

                          value="merchant"

                          checked={
                            accountType ===
                            "merchant"
                          }

                          onChange={
                            () =>
                              setAccountType(
                                "merchant"
                              )
                          }

                        />


                        <span>

                          <i className="bi bi-shop"></i>

                        </span>


                        <div>

                          <strong>

                            Merchant

                          </strong>


                          <small>

                            Sell products on Vendra

                          </small>

                        </div>


                      </motion.label>


                    </div>


                  </div>



                  {/* =========================================
                      PASSWORD
                  ========================================= */}

                  <div className="auth-field">


                    <label>

                      Password

                    </label>


                    <div

                      className={
                        `auth-input-wrap ${
                          errors.password
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

                        name="password"

                        placeholder="Create a password"

                        value={
                          form.password
                        }

                        onChange={
                          handleChange
                        }

                      />


                      <button

                        type="button"

                        className="password-toggle"

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

                      </button>


                    </div>


                    <div className="password-strength">

                      <span

                        className={
                          passwordStrength
                            .className
                        }

                        style={{
                          width:
                            passwordStrength
                              .width
                        }}

                      ></span>

                    </div>


                    <small className="password-hint">

                      {
                        passwordStrength
                          .label
                        ||
                        "Use at least 6 characters."
                      }

                    </small>


                    <small className="auth-error">

                      {errors.password}

                    </small>


                  </div>



                  {/* =========================================
                      CONFIRM PASSWORD
                  ========================================= */}

                  <div className="auth-field">


                    <label>

                      Confirm password

                    </label>


                    <div

                      className={
                        `auth-input-wrap ${
                          errors.confirmPassword
                            ?
                            "invalid"
                            :
                            ""
                        }`
                      }

                    >


                      <i className="bi bi-shield-lock"></i>


                      <input

                        type={
                          showConfirmPassword
                            ?
                            "text"
                            :
                            "password"
                        }

                        name="confirmPassword"

                        placeholder="Repeat your password"

                        value={
                          form.confirmPassword
                        }

                        onChange={
                          handleChange
                        }

                      />


                      <button

                        type="button"

                        className="password-toggle"

                        onClick={
                          () =>
                            setShowConfirmPassword(
                              current =>
                                !current
                            )
                        }

                      >

                        <i

                          className={
                            showConfirmPassword
                              ?
                              "bi bi-eye-slash"
                              :
                              "bi bi-eye"
                          }

                        ></i>

                      </button>


                    </div>


                    <small className="auth-error">

                      {errors.confirmPassword}

                    </small>


                  </div>



                  {/* =========================================
                      TERMS
                  ========================================= */}

                  <div className="register-terms">


                    <label className="remember-me">


                      <input

                        type="checkbox"

                        checked={
                          acceptTerms
                        }

                        onChange={
                          event => {

                            setAcceptTerms(
                              event.target.checked
                            );


                            setErrors(
                              current => ({

                                ...current,

                                terms:
                                  ""

                              })
                            );

                          }
                        }

                      />


                      <span className="remember-check">

                        <i className="bi bi-check"></i>

                      </span>


                      <span>

                        I agree to the{" "}

                        <a
                          href="#terms"
                          onClick={
                            event =>
                              event.preventDefault()
                          }
                        >

                          Terms

                        </a>

                        {" "}and{" "}

                        <a
                          href="#privacy"
                          onClick={
                            event =>
                              event.preventDefault()
                          }
                        >

                          Privacy Policy

                        </a>

                      </span>


                    </label>


                    <small className="auth-error">

                      {errors.terms}

                    </small>


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

                    Create account

                    <i className="bi bi-arrow-right"></i>

                  </motion.button>


                </form>



                {/* =============================================
                    LOGIN LINK
                ============================================= */}

                <p className="auth-register-text">

                  Already have an account?

                  <Link to="/login">

                    Sign in

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


export default Register;