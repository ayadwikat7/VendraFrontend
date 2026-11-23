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


function Cart() {

  const navigate =
    useNavigate();


  // =========================================================
  // READ CART
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


  // =========================================================
  // STATE
  // =========================================================

  const [cart, setCart] =
    useState(
      readCart
    );


  const [coupon, setCoupon] =
    useState("");


  const [discount, setDiscount] =
    useState(
      Number(
        localStorage.getItem(
          "vendraDiscount"
        )
        ||
        0
      )
    );


  const [couponMessage, setCouponMessage] =
    useState("");


  const [couponStatus, setCouponStatus] =
    useState("");


  const [toast, setToast] =
    useState("");


  // =========================================================
  // PAGE TITLE
  // =========================================================

  useEffect(
    () => {

      document.title =
        "Shopping Cart — Vendra";

    },
    []
  );


  // =========================================================
  // SAVE CART
  // =========================================================

  const saveCart =
    updatedCart => {

      setCart(
        updatedCart
      );


      localStorage.setItem(
        "vendraCart",
        JSON.stringify(
          updatedCart
        )
      );


      window.dispatchEvent(
        new Event(
          "vendra-cart-updated"
        )
      );

    };


  // =========================================================
  // TOAST
  // =========================================================

  const showToast =
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
  // TOTAL QUANTITY
  // =========================================================

  const totalQuantity =
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
                item.quantity
                ||
                0
              )
            );

          },
          0
        );

      },
      [cart]
    );


  // =========================================================
  // SUBTOTAL
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


  // =========================================================
  // DISCOUNT
  // =========================================================

  const discountAmount =
    subtotal *
    discount;


  const total =
    subtotal -
    discountAmount;


  // =========================================================
  // INCREASE
  // =========================================================

  const increaseQuantity =
    index => {

      const updatedCart =
        [...cart];


      updatedCart[index] = {

        ...updatedCart[index],

        quantity:
          Number(
            updatedCart[index]
              .quantity
          )
          +
          1

      };


      saveCart(
        updatedCart
      );

    };


  // =========================================================
  // DECREASE
  // =========================================================

  const decreaseQuantity =
    index => {

      const updatedCart =
        [...cart];


      if (
        updatedCart[index]
          .quantity > 1
      ) {

        updatedCart[index] = {

          ...updatedCart[index],

          quantity:
            updatedCart[index]
              .quantity - 1

        };

      } else {

        updatedCart.splice(
          index,
          1
        );

      }


      saveCart(
        updatedCart
      );

    };


  // =========================================================
  // REMOVE
  // =========================================================

  const removeItem =
    index => {

      const updatedCart =
        cart.filter(
          (
            item,
            itemIndex
          ) =>
            itemIndex !== index
        );


      saveCart(
        updatedCart
      );


      showToast(
        "Item removed from cart"
      );

    };


  // =========================================================
  // CLEAR
  // =========================================================

  const clearCart = () => {

    saveCart([]);


    setDiscount(
      0
    );


    setCoupon("");


    setCouponMessage("");


    setCouponStatus("");


    localStorage.removeItem(
      "vendraDiscount"
    );


    showToast(
      "Cart cleared"
    );

  };


  // =========================================================
  // COUPON
  // =========================================================

  const applyCoupon = () => {

    const code =
      coupon
        .trim()
        .toUpperCase();


    if (
      code === "VENDRA10"
    ) {

      const value =
        0.10;


      setDiscount(
        value
      );


      localStorage.setItem(
        "vendraDiscount",
        value
      );


      setCouponMessage(
        "10% discount applied"
      );


      setCouponStatus(
        "success"
      );


      showToast(
        "Promo code applied"
      );

    } else {

      setDiscount(
        0
      );


      localStorage.removeItem(
        "vendraDiscount"
      );


      setCouponMessage(
        "Invalid promo code"
      );


      setCouponStatus(
        "error"
      );

    }

  };


  // =========================================================
  // CHECKOUT
  // =========================================================

  const goToCheckout = () => {

    if (
      cart.length === 0
    ) {

      return;

    }


    navigate(
      "/checkout"
    );

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      <section className="cart-page">


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

            transition={{
              duration: 0.5
            }}

          >

            <Link to="/">

              <i className="bi bi-house-door"></i>

              {" "}Home

            </Link>


            <i className="bi bi-chevron-right"></i>


            <span>

              Shopping Cart

            </span>


          </motion.nav>



          {/* =================================================
              HEADER
          ================================================= */}

          <motion.div

            className="cart-page-header"

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.65,
              ease: [
                0.22,
                1,
                0.36,
                1
              ]
            }}

          >


            <div>

              <span className="section-label">

                Your order

              </span>


              <h1>

                Shopping cart

              </h1>


              <p>

                Review your items before
                continuing to checkout.

              </p>

            </div>


            <Link

              to="/products"

              className="continue-shopping"

            >

              <i className="bi bi-arrow-left"></i>

              Continue shopping

            </Link>


          </motion.div>



          <div className="row g-4">


            {/* =================================================
                LEFT
            ================================================= */}

            <div className="col-lg-8">


              <motion.div

                className="cart-items-card"

                initial={{
                  opacity: 0,
                  x: -35
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  duration: 0.65
                }}

              >


                <div className="cart-items-header">


                  <h2>

                    Your items

                    <motion.span

                      key={totalQuantity}

                      initial={{
                        scale: 1.4
                      }}

                      animate={{
                        scale: 1
                      }}

                    >

                      {totalQuantity}

                    </motion.span>

                  </h2>


                  {cart.length > 0 && (

                    <motion.button

                      type="button"

                      className="clear-cart-btn"

                      whileHover={{
                        scale: 1.03
                      }}

                      whileTap={{
                        scale: 0.95
                      }}

                      onClick={
                        clearCart
                      }

                    >

                      <i className="bi bi-trash3"></i>

                      Clear cart

                    </motion.button>

                  )}


                </div>



                {/* =============================================
                    CART ITEMS
                ============================================= */}

                <AnimatePresence mode="popLayout">


                  {cart.length > 0 ? (

                    cart.map(
                      (
                        item,
                        index
                      ) => (

                        <motion.article

                          layout

                          key={
                            item.name
                            +
                            index
                          }

                          className="cart-product"

                          initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.97
                          }}

                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                          }}

                          exit={{
                            opacity: 0,
                            x: -60,
                            scale: 0.92
                          }}

                          transition={{
                            duration: 0.35
                          }}

                        >


                          {/* IMAGE */}

                          <motion.div

                            className="cart-product-image"

                            whileHover={{
                              scale: 1.04
                            }}

                          >

                            <img

                              src={
                                item.image
                              }

                              alt={
                                item.name
                              }

                            />

                          </motion.div>



                          {/* INFO */}

                          <div className="cart-product-info">


                            <span className="cart-product-store">

                              <i className="bi bi-patch-check-fill"></i>

                              {" "}

                              {item.store}

                            </span>


                            <h3>

                              {item.name}

                            </h3>


                            {item.color && (

                              <span className="cart-react-color">

                                Color: {item.color}

                              </span>

                            )}


                            <span className="cart-product-delivery">

                              <i className="bi bi-truck"></i>

                              {" "}Free delivery

                            </span>


                            <motion.button

                              type="button"

                              className="cart-remove"

                              whileHover={{
                                x: 3
                              }}

                              whileTap={{
                                scale: 0.94
                              }}

                              onClick={
                                () =>
                                  removeItem(
                                    index
                                  )
                              }

                            >

                              <i className="bi bi-trash3"></i>

                              Remove

                            </motion.button>


                          </div>



                          {/* RIGHT */}

                          <div className="cart-product-right">


                            <strong className="cart-product-price">

                              $
                              {
                                Number(
                                  item.price
                                )
                                .toLocaleString()
                              }

                            </strong>



                            <div className="cart-quantity">


                              <motion.button

                                type="button"

                                whileTap={{
                                  scale: 0.8
                                }}

                                onClick={
                                  () =>
                                    decreaseQuantity(
                                      index
                                    )
                                }

                              >

                                <i className="bi bi-dash"></i>

                              </motion.button>


                              <AnimatePresence mode="wait">

                                <motion.span

                                  key={
                                    item.quantity
                                  }

                                  initial={{
                                    opacity: 0,
                                    y: -7
                                  }}

                                  animate={{
                                    opacity: 1,
                                    y: 0
                                  }}

                                  exit={{
                                    opacity: 0,
                                    y: 7
                                  }}

                                >

                                  {item.quantity}

                                </motion.span>

                              </AnimatePresence>


                              <motion.button

                                type="button"

                                whileTap={{
                                  scale: 0.8
                                }}

                                onClick={
                                  () =>
                                    increaseQuantity(
                                      index
                                    )
                                }

                              >

                                <i className="bi bi-plus"></i>

                              </motion.button>


                            </div>



                            <motion.span

                              className="cart-line-total"

                              key={
                                item.quantity
                              }

                              initial={{
                                opacity: 0.5,
                                scale: 1.08
                              }}

                              animate={{
                                opacity: 1,
                                scale: 1
                              }}

                            >

                              $
                              {
                                (
                                  Number(
                                    item.price
                                  )
                                  *
                                  Number(
                                    item.quantity
                                  )
                                ).toLocaleString()
                              }

                            </motion.span>


                          </div>


                        </motion.article>

                      )
                    )

                  ) : (

                    /* =========================================
                       EMPTY CART
                    ========================================= */

                    <motion.div

                      key="empty"

                      className="cart-empty"

                      initial={{
                        opacity: 0,
                        scale: 0.94
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1
                      }}

                    >


                      <motion.span

                        className="cart-empty-icon"

                        animate={{
                          y: [
                            0,
                            -10,
                            0
                          ]
                        }}

                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}

                      >

                        <i className="bi bi-bag"></i>

                      </motion.span>


                      <h3>

                        Your cart is empty

                      </h3>


                      <p>

                        Looks like you haven't
                        added anything yet.

                      </p>


                      <Link

                        to="/products"

                        className="btn btn-vendra"

                      >

                        Explore products

                      </Link>


                    </motion.div>

                  )}


                </AnimatePresence>


              </motion.div>


            </div>



            {/* =================================================
                RIGHT SUMMARY
            ================================================= */}

            <div className="col-lg-4">


              <motion.aside

                className="order-summary"

                initial={{
                  opacity: 0,
                  x: 35
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  duration: 0.65,
                  delay: 0.12
                }}

              >


                <span className="summary-label">

                  Order summary

                </span>


                <h2>

                  Summary

                </h2>



                {/* SUMMARY LINES */}

                <div className="summary-lines">


                  <div>

                    <span>

                      Subtotal

                    </span>


                    <motion.strong

                      key={subtotal}

                      initial={{
                        opacity: 0.5
                      }}

                      animate={{
                        opacity: 1
                      }}

                    >

                      $
                      {
                        subtotal.toFixed(
                          2
                        )
                      }

                    </motion.strong>

                  </div>



                  <div>

                    <span>

                      Delivery

                    </span>


                    <strong className="summary-free">

                      Free

                    </strong>

                  </div>



                  <div>

                    <span>

                      Discount

                    </span>


                    <motion.strong

                      key={
                        discountAmount
                      }

                      initial={{
                        scale: 1.1
                      }}

                      animate={{
                        scale: 1
                      }}

                    >

                      {
                        discountAmount > 0
                          ?
                          `-$${discountAmount.toFixed(2)}`
                          :
                          "$0"
                      }

                    </motion.strong>

                  </div>


                </div>



                {/* =================================================
                    COUPON
                ================================================= */}

                <div className="coupon-box">


                  <label>

                    Promo code

                  </label>


                  <div className="coupon-input">


                    <input

                      type="text"

                      placeholder="Enter code"

                      value={coupon}

                      onChange={
                        event => {

                          setCoupon(
                            event.target.value
                          );

                          setCouponMessage("");

                          setCouponStatus("");

                        }
                      }

                      onKeyDown={
                        event => {

                          if (
                            event.key ===
                            "Enter"
                          ) {

                            applyCoupon();

                          }

                        }
                      }

                    />


                    <motion.button

                      type="button"

                      whileHover={{
                        scale: 1.04
                      }}

                      whileTap={{
                        scale: 0.94
                      }}

                      onClick={
                        applyCoupon
                      }

                    >

                      Apply

                    </motion.button>


                  </div>



                  <AnimatePresence mode="wait">


                    {couponMessage && (

                      <motion.small

                        key={
                          couponMessage
                        }

                        className={
                          couponStatus ===
                          "success"
                            ?
                            "coupon-success"
                            :
                            "coupon-error"
                        }

                        initial={{
                          opacity: 0,
                          y: -5
                        }}

                        animate={{
                          opacity: 1,
                          y: 0
                        }}

                        exit={{
                          opacity: 0
                        }}

                      >

                        {
                          couponStatus ===
                          "success"
                          &&
                          <i className="bi bi-check-circle me-1"></i>
                        }

                        {
                          couponMessage
                        }

                      </motion.small>

                    )}


                  </AnimatePresence>


                </div>



                {/* =================================================
                    TOTAL
                ================================================= */}

                <div className="summary-total">

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



                {/* =================================================
                    CHECKOUT
                ================================================= */}

                <motion.button

                  type="button"

                  className={
                    `checkout-btn ${
                      cart.length === 0
                        ?
                        "disabled"
                        :
                        ""
                    }`
                  }

                  disabled={
                    cart.length === 0
                  }

                  whileHover={
                    cart.length
                      ?
                      {
                        y: -2,
                        scale: 1.01
                      }
                      :
                      {}
                  }

                  whileTap={
                    cart.length
                      ?
                      {
                        scale: 0.97
                      }
                      :
                      {}
                  }

                  onClick={
                    goToCheckout
                  }

                >

                  Proceed to checkout

                  <i className="bi bi-arrow-right"></i>

                </motion.button>



                <div className="secure-checkout">

                  <i className="bi bi-shield-check"></i>

                  Secure checkout

                </div>


              </motion.aside>


            </div>


          </div>


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
              y: 20,
              scale: 0.94
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


export default Cart;