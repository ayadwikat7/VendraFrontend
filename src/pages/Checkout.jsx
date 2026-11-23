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


function Checkout() {

  const navigate =
    useNavigate();


  // =========================================================
  // CART
  // =========================================================

  const readCart = () => {

    try {

      return JSON.parse(
        localStorage.getItem(
          "vendraCart"
        )
        ||
        "[]"
      );

    } catch {

      return [];

    }

  };


  const [cart] =
    useState(
      readCart
    );


  const discount =
    Number(
      localStorage.getItem(
        "vendraDiscount"
      )
      ||
      0
    );


  // =========================================================
  // FORM
  // =========================================================

  const [form, setForm] =
    useState({

      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: ""

    });


  // =========================================================
  // PAYMENT
  // =========================================================

  const [payment, setPayment] =
    useState("cash");


  const [card, setCard] =
    useState({

      number: "",
      expiry: "",
      cvv: ""

    });


  // =========================================================
  // UI STATE
  // =========================================================

  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState(false);


  const [orderNumber, setOrderNumber] =
    useState("");


  const [submitting, setSubmitting] =
    useState(false);


  // =========================================================
  // PAGE START
  // =========================================================

  useEffect(
    () => {

      document.title =
        "Checkout — Vendra";


      if (
        cart.length === 0
      ) {

        navigate(
          "/cart",
          {
            replace: true
          }
        );

      }

    },
    [
      cart.length,
      navigate
    ]
  );


  // =========================================================
  // TOTALS
  // =========================================================

  const subtotal =
    useMemo(
      () => {

        return cart.reduce(
          (
            total,
            item
          ) => {

            return (
              total
              +
              Number(
                item.price
              )
              *
              Number(
                item.quantity
              )
            );

          },
          0
        );

      },
      [cart]
    );


  const discountAmount =
    subtotal *
    discount;


  const total =
    subtotal -
    discountAmount;


  // =========================================================
  // FORM CHANGE
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


      setError("");

    };


  // =========================================================
  // CARD CHANGE
  // =========================================================

  const handleCardChange =
    event => {

      const {
        name,
        value
      } = event.target;


      setCard(
        current => ({

          ...current,

          [name]:
            value

        })
      );


      setError("");

    };


  // =========================================================
  // FORMAT CARD NUMBER
  // =========================================================

  const handleCardNumber =
    event => {

      let value =
        event.target.value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            16
          );


      value =
        value.replace(
          /(.{4})/g,
          "$1 "
        )
        .trim();


      setCard(
        current => ({

          ...current,

          number:
            value

        })
      );

    };


  // =========================================================
  // FORMAT EXPIRY
  // =========================================================

  const handleExpiry =
    event => {

      let value =
        event.target.value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            4
          );


      if (
        value.length > 2
      ) {

        value =
          value.slice(
            0,
            2
          )
          +
          "/"
          +
          value.slice(
            2
          );

      }


      setCard(
        current => ({

          ...current,

          expiry:
            value

        })
      );

    };


  // =========================================================
  // VALIDATE
  // =========================================================

  const validateForm = () => {

    if (
      !form.firstName.trim()
      ||
      !form.lastName.trim()
      ||
      !form.email.trim()
      ||
      !form.phone.trim()
      ||
      !form.address.trim()
      ||
      !form.city.trim()
    ) {

      setError(
        "Please complete all required shipping information."
      );

      return false;

    }


    if (
      payment === "card"
      &&
      (
        !card.number.trim()
        ||
        !card.expiry.trim()
        ||
        !card.cvv.trim()
      )
    ) {

      setError(
        "Please enter your card details."
      );

      return false;

    }


    return true;

  };


  // =========================================================
  // PLACE ORDER
  // =========================================================

  const placeOrder =
    event => {

      event.preventDefault();


      if (
        cart.length === 0
      ) {

        navigate(
          "/cart"
        );

        return;

      }


      if (
        !validateForm()
      ) {

        return;

      }


      setSubmitting(true);


      const generatedOrderNumber =
        "VND-"
        +
        Date.now()
          .toString()
          .slice(
            -6
          );


      const order = {

        id:
          generatedOrderNumber,

        date:
          new Date()
            .toISOString(),

        customer: {

          firstName:
            form.firstName,

          lastName:
            form.lastName,

          email:
            form.email,

          phone:
            form.phone,

          address:
            form.address,

          city:
            form.city,

          postalCode:
            form.postalCode,

          notes:
            form.notes

        },

        payment:
          payment,

        items:
          cart,

        subtotal:
          subtotal,

        discount:
          discountAmount,

        total:
          total,

        status:
          "Processing"

      };


      let orders = [];


      try {

        orders =
          JSON.parse(
            localStorage.getItem(
              "vendraOrders"
            )
            ||
            "[]"
          );

      } catch {

        orders = [];

      }


      orders.unshift(
        order
      );


      localStorage.setItem(
        "vendraOrders",
        JSON.stringify(
          orders
        )
      );


      // Clear cart

      localStorage.removeItem(
        "vendraCart"
      );


      localStorage.removeItem(
        "vendraDiscount"
      );


      window.dispatchEvent(
        new Event(
          "vendra-cart-updated"
        )
      );


      setOrderNumber(
        generatedOrderNumber
      );


      setSubmitting(false);

      setSuccess(true);


      document.body.style.overflow =
        "hidden";

    };


  // =========================================================
  // CLOSE SUCCESS
  // =========================================================

  const continueShopping = () => {

    document.body.style.overflow =
      "";

    navigate(
      "/products"
    );

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      <section className="checkout-page">


        <div className="container">


          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <motion.nav

            className="page-breadcrumb"

            initial={{
              opacity: 0,
              x: -20
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

          >


            <Link to="/">

              <i className="bi bi-house-door"></i>

              {" "}Home

            </Link>


            <i className="bi bi-chevron-right"></i>


            <Link to="/cart">

              Cart

            </Link>


            <i className="bi bi-chevron-right"></i>


            <span>

              Checkout

            </span>


          </motion.nav>



          {/* =================================================
              HEADER
          ================================================= */}

          <motion.div

            className="checkout-header"

            initial={{
              opacity: 0,
              y: 35
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.65
            }}

          >


            <span className="section-label">

              Final step

            </span>


            <h1>

              Secure checkout

            </h1>


            <p>

              Enter your delivery information
              and confirm your order.

            </p>


          </motion.div>



          <div className="row g-4 align-items-start">


            {/* =================================================
                LEFT
            ================================================= */}

            <div className="col-lg-8">


              <form
                onSubmit={
                  placeOrder
                }
              >


                {/* =============================================
                    SHIPPING
                ============================================= */}

                <motion.section

                  className="checkout-card"

                  initial={{
                    opacity: 0,
                    x: -35
                  }}

                  animate={{
                    opacity: 1,
                    x: 0
                  }}

                  transition={{
                    duration: 0.6
                  }}

                >


                  <div className="checkout-card-title">


                    <span>

                      <i className="bi bi-truck"></i>

                    </span>


                    <div>

                      <h2>

                        Shipping information

                      </h2>


                      <p>

                        Where should we deliver
                        your order?

                      </p>

                    </div>


                  </div>



                  <div className="row g-3">


                    {/* FIRST NAME */}

                    <div className="col-md-6">


                      <label className="checkout-label">

                        First name

                      </label>


                      <input

                        className="checkout-input"

                        type="text"

                        name="firstName"

                        value={
                          form.firstName
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />


                    </div>



                    {/* LAST NAME */}

                    <div className="col-md-6">


                      <label className="checkout-label">

                        Last name

                      </label>


                      <input

                        className="checkout-input"

                        type="text"

                        name="lastName"

                        value={
                          form.lastName
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />


                    </div>



                    {/* EMAIL */}

                    <div className="col-md-6">


                      <label className="checkout-label">

                        Email address

                      </label>


                      <input

                        className="checkout-input"

                        type="email"

                        name="email"

                        value={
                          form.email
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />


                    </div>



                    {/* PHONE */}

                    <div className="col-md-6">


                      <label className="checkout-label">

                        Phone number

                      </label>


                      <input

                        className="checkout-input"

                        type="tel"

                        name="phone"

                        value={
                          form.phone
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />


                    </div>



                    {/* ADDRESS */}

                    <div className="col-12">


                      <label className="checkout-label">

                        Address

                      </label>


                      <input

                        className="checkout-input"

                        type="text"

                        name="address"

                        placeholder="Street, building, apartment"

                        value={
                          form.address
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />


                    </div>



                    {/* CITY */}

                    <div className="col-md-6">


                      <label className="checkout-label">

                        City

                      </label>


                      <input

                        className="checkout-input"

                        type="text"

                        name="city"

                        value={
                          form.city
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />


                    </div>



                    {/* POSTAL */}

                    <div className="col-md-6">


                      <label className="checkout-label">

                        Postal code

                      </label>


                      <input

                        className="checkout-input"

                        type="text"

                        name="postalCode"

                        value={
                          form.postalCode
                        }

                        onChange={
                          handleChange
                        }

                      />


                    </div>



                    {/* NOTES */}

                    <div className="col-12">


                      <label className="checkout-label">

                        Delivery notes

                        <span>

                          Optional

                        </span>

                      </label>


                      <textarea

                        className="checkout-input checkout-textarea"

                        name="notes"

                        rows="4"

                        placeholder="Any special delivery instructions?"

                        value={
                          form.notes
                        }

                        onChange={
                          handleChange
                        }

                      ></textarea>


                    </div>


                  </div>


                </motion.section>



                {/* =============================================
                    PAYMENT
                ============================================= */}

                <motion.section

                  className="checkout-card"

                  initial={{
                    opacity: 0,
                    x: -35
                  }}

                  animate={{
                    opacity: 1,
                    x: 0
                  }}

                  transition={{
                    duration: 0.6,
                    delay: 0.12
                  }}

                >


                  <div className="checkout-card-title">


                    <span>

                      <i className="bi bi-credit-card"></i>

                    </span>


                    <div>

                      <h2>

                        Payment method

                      </h2>


                      <p>

                        Choose how you want to pay.

                      </p>

                    </div>


                  </div>



                  <div className="payment-methods">


                    {/* CASH */}

                    <motion.label

                      className={
                        `payment-option ${
                          payment === "cash"
                            ? "active"
                            : ""
                        }`
                      }

                      whileHover={{
                        y: -3
                      }}

                    >


                      <input

                        type="radio"

                        name="payment"

                        value="cash"

                        checked={
                          payment ===
                          "cash"
                        }

                        onChange={
                          () =>
                            setPayment(
                              "cash"
                            )
                        }

                      />


                      <span className="payment-radio"></span>


                      <span className="payment-icon">

                        <i className="bi bi-cash-stack"></i>

                      </span>


                      <span className="payment-info">

                        <strong>

                          Cash on delivery

                        </strong>


                        <small>

                          Pay when your order arrives.

                        </small>

                      </span>


                    </motion.label>



                    {/* CARD */}

                    <motion.label

                      className={
                        `payment-option ${
                          payment === "card"
                            ? "active"
                            : ""
                        }`
                      }

                      whileHover={{
                        y: -3
                      }}

                    >


                      <input

                        type="radio"

                        name="payment"

                        value="card"

                        checked={
                          payment ===
                          "card"
                        }

                        onChange={
                          () =>
                            setPayment(
                              "card"
                            )
                        }

                      />


                      <span className="payment-radio"></span>


                      <span className="payment-icon">

                        <i className="bi bi-credit-card-2-front"></i>

                      </span>


                      <span className="payment-info">

                        <strong>

                          Credit / Debit card

                        </strong>


                        <small>

                          Secure card payment.

                        </small>

                      </span>


                    </motion.label>


                  </div>



                  {/* =========================================
                      CARD FIELDS
                  ========================================= */}

                  <AnimatePresence>


                    {payment ===
                    "card" && (

                      <motion.div

                        className="card-payment-fields"

                        initial={{
                          opacity: 0,
                          height: 0,
                          y: -10
                        }}

                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0
                        }}

                        exit={{
                          opacity: 0,
                          height: 0
                        }}

                      >


                        <div className="row g-3">


                          <div className="col-12">


                            <label className="checkout-label">

                              Card number

                            </label>


                            <div className="checkout-icon-input">


                              <i className="bi bi-credit-card"></i>


                              <input

                                type="text"

                                name="number"

                                placeholder="1234 5678 9012 3456"

                                maxLength="19"

                                value={
                                  card.number
                                }

                                onChange={
                                  handleCardNumber
                                }

                              />


                            </div>


                          </div>



                          <div className="col-md-6">


                            <label className="checkout-label">

                              Expiry date

                            </label>


                            <input

                              className="checkout-input"

                              type="text"

                              name="expiry"

                              placeholder="MM/YY"

                              maxLength="5"

                              value={
                                card.expiry
                              }

                              onChange={
                                handleExpiry
                              }

                            />


                          </div>



                          <div className="col-md-6">


                            <label className="checkout-label">

                              CVV

                            </label>


                            <input

                              className="checkout-input"

                              type="password"

                              name="cvv"

                              placeholder="123"

                              maxLength="4"

                              value={
                                card.cvv
                              }

                              onChange={
                                handleCardChange
                              }

                            />


                          </div>


                        </div>


                      </motion.div>

                    )}


                  </AnimatePresence>



                  {/* ERROR */}

                  <AnimatePresence>


                    {error && (

                      <motion.div

                        className="checkout-react-error"

                        initial={{
                          opacity: 0,
                          y: -8
                        }}

                        animate={{
                          opacity: 1,
                          y: 0
                        }}

                        exit={{
                          opacity: 0
                        }}

                      >

                        <i className="bi bi-exclamation-circle"></i>

                        {error}

                      </motion.div>

                    )}


                  </AnimatePresence>


                </motion.section>



                <Link

                  to="/cart"

                  className="checkout-back"

                >

                  <i className="bi bi-arrow-left"></i>

                  Back to cart

                </Link>


              </form>


            </div>



            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="col-lg-4">


              <motion.aside

                className="checkout-summary"

                initial={{
                  opacity: 0,
                  x: 40
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  duration: 0.65,
                  delay: 0.15
                }}

              >


                <span className="summary-label">

                  Your order

                </span>


                <h2>

                  Order summary

                </h2>



                {/* PRODUCTS */}

                <div className="checkout-products">


                  {cart.map(
                    (
                      item,
                      index
                    ) => {

                      const lineTotal =
                        Number(
                          item.price
                        )
                        *
                        Number(
                          item.quantity
                        );


                      return (

                        <motion.div

                          className="checkout-product-item"

                          key={
                            item.name
                            +
                            index
                          }

                          initial={{
                            opacity: 0,
                            y: 15
                          }}

                          animate={{
                            opacity: 1,
                            y: 0
                          }}

                          transition={{
                            delay:
                              index *
                              0.08
                          }}

                        >


                          <div className="checkout-product-image">


                            <img

                              src={
                                item.image
                              }

                              alt={
                                item.name
                              }

                            />


                            <span>

                              {
                                item.quantity
                              }

                            </span>


                          </div>



                          <div className="checkout-product-info">


                            <strong>

                              {
                                item.name
                              }

                            </strong>


                            <small>

                              {
                                item.store
                              }

                            </small>


                          </div>



                          <strong className="checkout-product-price">

                            $
                            {
                              lineTotal
                                .toFixed(
                                  2
                                )
                            }

                          </strong>


                        </motion.div>

                      );

                    }
                  )}


                </div>



                {/* TOTAL LINES */}

                <div className="checkout-summary-lines">


                  <div>

                    <span>

                      Subtotal

                    </span>

                    <strong>

                      $
                      {
                        subtotal
                          .toFixed(
                            2
                          )
                      }

                    </strong>

                  </div>



                  <div>

                    <span>

                      Delivery

                    </span>

                    <strong>

                      Free

                    </strong>

                  </div>



                  <div>

                    <span>

                      Discount

                    </span>

                    <strong>

                      {
                        discountAmount >
                        0
                          ?
                          `-$${discountAmount.toFixed(2)}`
                          :
                          "$0"
                      }

                    </strong>

                  </div>


                </div>



                {/* TOTAL */}

                <div className="checkout-total">


                  <span>

                    Total

                  </span>


                  <motion.strong

                    key={total}

                    initial={{
                      scale: 1.08
                    }}

                    animate={{
                      scale: 1
                    }}

                  >

                    $
                    {
                      total.toFixed(
                        2
                      )
                    }

                  </motion.strong>


                </div>



                {/* PLACE ORDER */}

                <motion.button

                  type="button"

                  className="place-order-btn"

                  disabled={
                    submitting
                  }

                  whileHover={{
                    y: -2,
                    scale: 1.01
                  }}

                  whileTap={{
                    scale: 0.97
                  }}

                  onClick={
                    placeOrder
                  }

                >


                  {submitting ? (

                    <>

                      <span className="spinner-border spinner-border-sm"></span>

                      Processing...

                    </>

                  ) : (

                    <>

                      <span>

                        Place order

                      </span>

                      <i className="bi bi-arrow-right"></i>

                    </>

                  )}


                </motion.button>



                <div className="checkout-security">


                  <i className="bi bi-shield-lock"></i>


                  <span>

                    Your checkout information
                    is protected.

                  </span>


                </div>


              </motion.aside>


            </div>


          </div>


        </div>


      </section>



      {/* =====================================================
          SUCCESS
      ===================================================== */}

      <AnimatePresence>


        {success && (

          <motion.div

            className="order-success-overlay"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

          >


            <motion.div

              className="order-success-card"

              initial={{
                opacity: 0,
                y: 45,
                scale: 0.88
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18
              }}

            >


              <motion.div

                className="order-success-icon"

                initial={{
                  scale: 0,
                  rotate: -90
                }}

                animate={{
                  scale: 1,
                  rotate: 0
                }}

                transition={{
                  delay: 0.15,
                  type: "spring"
                }}

              >

                <i className="bi bi-check-lg"></i>

              </motion.div>



              <span className="section-label">

                Order confirmed

              </span>


              <h2>

                Thank you for your order!

              </h2>


              <p>

                Your order has been placed successfully.
                You can follow its progress from your
                order history.

              </p>



              <div className="success-order-number">

                Order

                <strong>

                  #{orderNumber}

                </strong>

              </div>



              <div className="d-flex justify-content-center gap-2 flex-wrap">


                <button

                  type="button"

                  className="btn btn-vendra"

                  onClick={
                    () => {

                      document.body.style.overflow =
                        "";

                      navigate(
                        "/orders"
                      );

                    }
                  }

                >

                  <i className="bi bi-box-seam"></i>

                  {" "}View my orders

                </button>



                <button

                  type="button"

                  className="btn btn-vendra-outline"

                  onClick={
                    continueShopping
                  }

                >

                  Continue shopping

                </button>


              </div>


            </motion.div>


          </motion.div>

        )}


      </AnimatePresence>


    </main>

  );

}


export default Checkout;