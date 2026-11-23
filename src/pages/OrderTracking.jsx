import {
  useEffect,
  useMemo
} from "react";

import {
  motion
} from "motion/react";

import {
  Link,
  useSearchParams
} from "react-router-dom";


function OrderTracking() {

  const [
    searchParams
  ] = useSearchParams();


  const orderId =
    searchParams.get(
      "order"
    );


  // =========================================================
  // ORDERS
  // =========================================================

  const getOrders = () => {

    try {

      return JSON.parse(
        localStorage.getItem(
          "vendraOrders"
        )
        ||
        "[]"
      );

    } catch {

      return [];

    }

  };


  const orders =
    getOrders();


  const order =
    orders.find(
      item =>
        item.id ===
        orderId
    );


  // =========================================================
  // PAGE TITLE
  // =========================================================

  useEffect(
    () => {

      document.title =
        "Track Order — Vendra";

    },
    []
  );


  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate =
    value => {

      const date =
        new Date(
          value
        );


      return date.toLocaleDateString(
        "en-US",
        {
          year:
            "numeric",

          month:
            "long",

          day:
            "numeric"
        }
      );

    };


  const normalizeStatus =
    status => {

      const value =
        (
          status
          ||
          "Processing"
        )
          .trim()
          .toLowerCase();


      if (
        value ===
        "delivered"
      ) {

        return "delivered";

      }


      if (
        value ===
        "out for delivery"
        ||
        value ===
        "out-for-delivery"
      ) {

        return "out-for-delivery";

      }


      if (
        value ===
        "shipped"
      ) {

        return "shipped";

      }


      return "processing";

    };


  const statusOrder = [
    "processing",
    "shipped",
    "out-for-delivery",
    "delivered"
  ];


  const currentStatus =
    normalizeStatus(
      order?.status
    );


  const currentIndex =
    statusOrder.indexOf(
      currentStatus
    );


  // =========================================================
  // TOTAL
  // =========================================================

  const total =
    useMemo(
      () => {

        if (
          !order
        ) {

          return 0;

        }


        if (
          typeof order.total ===
          "number"
        ) {

          return order.total;

        }


        return order.items.reduce(
          (
            sum,
            item
          ) => {

            return (
              sum
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
      [order]
    );


  // =========================================================
  // TOTAL ITEMS
  // =========================================================

  const totalItems =
    useMemo(
      () => {

        if (
          !order
        ) {

          return 0;

        }


        return order.items.reduce(
          (
            sum,
            item
          ) =>
            sum
            +
            Number(
              item.quantity
            ),
          0
        );

      },
      [order]
    );


  // =========================================================
  // STEPS
  // =========================================================

  const steps = [

    {
      id:
        "processing",

      icon:
        "bi-check-lg",

      title:
        "Order confirmed",

      text:
        "Your order has been received successfully."
    },

    {
      id:
        "shipped",

      icon:
        "bi-box-seam",

      title:
        "Shipped",

      text:
        "Your order has left the seller."
    },

    {
      id:
        "out-for-delivery",

      icon:
        "bi-truck",

      title:
        "Out for delivery",

      text:
        "Your order is on its way to you."
    },

    {
      id:
        "delivered",

      icon:
        "bi-house-check",

      title:
        "Delivered",

      text:
        "Your order has been delivered."
    }

  ];


  // =========================================================
  // NOT FOUND
  // =========================================================

  if (
    !order
  ) {

    return (

      <main>


        <section className="tracking-page">


          <div className="container">


            <nav className="page-breadcrumb">


              <Link to="/">

                <i className="bi bi-house-door"></i>

                {" "}Home

              </Link>


              <i className="bi bi-chevron-right"></i>


              <Link to="/orders">

                Orders

              </Link>


              <i className="bi bi-chevron-right"></i>


              <span>

                Track order

              </span>


            </nav>



            <motion.div

              className="tracking-not-found"

              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

            >


              <motion.span

                animate={{
                  y: [
                    0,
                    -8,
                    0
                  ]
                }}

                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}

              >

                <i className="bi bi-search"></i>

              </motion.span>


              <h1>

                Order not found

              </h1>


              <p>

                We couldn't find an order matching
                this order number.

              </p>


              <Link

                to="/orders"

                className="btn btn-vendra"

              >

                View my orders

              </Link>


            </motion.div>


          </div>


        </section>


      </main>

    );

  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      <section className="tracking-page">


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


            <Link to="/orders">

              Orders

            </Link>


            <i className="bi bi-chevron-right"></i>


            <span>

              Track order

            </span>


          </motion.nav>



          {/* =================================================
              HEADER
          ================================================= */}

          <motion.div

            className="tracking-header"

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

          >


            <div>

              <span className="section-label">

                Order tracking

              </span>


              <h1>

                Track your order

              </h1>


              <p>

                Follow your order from confirmation
                until it reaches your door.

              </p>

            </div>


            <Link

              to="/orders"

              className="tracking-back-btn"

            >

              <i className="bi bi-arrow-left"></i>

              My orders

            </Link>


          </motion.div>



          {/* =================================================
              HERO CARD
          ================================================= */}

          <motion.section

            className="tracking-order-card"

            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            transition={{
              duration: 0.65
            }}

          >


            <div className="tracking-order-main">


              <div>


                <span className="tracking-label">

                  Order number

                </span>


                <h2>

                  #{order.id}

                </h2>



                <div className="tracking-order-meta">


                  <span>

                    <i className="bi bi-calendar3"></i>

                    {formatDate(
                      order.date
                    )}

                  </span>


                  <span>

                    <i className="bi bi-box-seam"></i>

                    {totalItems}

                    {" "}

                    {
                      totalItems ===
                      1
                        ?
                        "item"
                        :
                        "items"
                    }

                  </span>


                </div>


              </div>



              <div className="tracking-current-status">


                <small>

                  Current status

                </small>


                <motion.strong

                  key={
                    order.status
                  }

                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1
                  }}

                >

                  {
                    order.status
                    ||
                    "Processing"
                  }

                </motion.strong>


              </div>


            </div>


          </motion.section>



          <div className="row g-4 align-items-start">


            {/* =================================================
                LEFT
            ================================================= */}

            <div className="col-lg-8">


              {/* ===============================================
                  TIMELINE
              =============================================== */}

              <motion.section

                className="tracking-card"

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
                  delay: 0.1
                }}

              >


                <div className="tracking-card-heading">


                  <span>

                    <i className="bi bi-geo-alt"></i>

                  </span>


                  <div>

                    <h2>

                      Delivery progress

                    </h2>


                    <p>

                      Your order journey.

                    </p>

                  </div>


                </div>



                <div className="tracking-timeline">


                  {steps.map(
                    (
                      step,
                      index
                    ) => {

                      const stepIndex =
                        statusOrder.indexOf(
                          step.id
                        );


                      const completed =
                        stepIndex <
                        currentIndex;


                      const current =
                        stepIndex ===
                        currentIndex;


                      return (

                        <motion.div

                          className={
                            `tracking-step ${
                              completed
                                ?
                                "completed"
                                :
                                ""
                            } ${
                              current
                                ?
                                "current"
                                :
                                ""
                            }`
                          }

                          key={
                            step.id
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
                              0.2
                              +
                              index *
                              0.12
                          }}

                        >


                          <motion.div

                            className="tracking-step-marker"

                            animate={
                              current
                                ?
                                {
                                  scale: [
                                    1,
                                    1.12,
                                    1
                                  ]
                                }
                                :
                                {}
                            }

                            transition={{
                              duration: 1.8,
                              repeat:
                                current
                                  ?
                                  Infinity
                                  :
                                  0
                            }}

                          >

                            <i
                              className={
                                `bi ${step.icon}`
                              }
                            ></i>

                          </motion.div>



                          {index <
                          steps.length -
                          1 && (

                            <div className="tracking-step-line"></div>

                          )}



                          <div className="tracking-step-content">


                            <strong>

                              {step.title}

                            </strong>


                            <span>

                              {step.text}

                            </span>


                          </div>


                        </motion.div>

                      );

                    }
                  )}


                </div>


              </motion.section>



              {/* ===============================================
                  PRODUCTS
              =============================================== */}

              <motion.section

                className="tracking-card"

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
                  delay: 0.2
                }}

              >


                <div className="tracking-card-heading">


                  <span>

                    <i className="bi bi-bag"></i>

                  </span>


                  <div>

                    <h2>

                      Order items

                    </h2>


                    <p>

                      Products included in this order.

                    </p>

                  </div>


                </div>



                <div className="tracking-products">


                  {order.items.map(
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

                        <motion.article

                          className="tracking-product"

                          key={
                            item.name
                            +
                            index
                          }

                          initial={{
                            opacity: 0,
                            y: 20
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

                          whileHover={{
                            y: -3
                          }}

                        >


                          <div className="tracking-product-image">


                            <img

                              src={
                                item.image
                              }

                              alt={
                                item.name
                              }

                            />


                          </div>



                          <div className="tracking-product-info">


                            <small>

                              {
                                item.store
                                ||
                                "Vendra store"
                              }

                            </small>


                            <strong>

                              {
                                item.name
                              }

                            </strong>


                            <span>

                              Quantity: {
                                item.quantity
                              }

                            </span>


                          </div>



                          <strong className="tracking-product-price">

                            $
                            {
                              lineTotal.toFixed(
                                2
                              )
                            }

                          </strong>


                        </motion.article>

                      );

                    }
                  )}


                </div>


              </motion.section>


            </div>



            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="col-lg-4">


              <motion.aside

                className="tracking-side-card"

                initial={{
                  opacity: 0,
                  x: 35
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  duration: 0.6,
                  delay: 0.15
                }}

              >


                <span className="tracking-side-label">

                  Delivery information

                </span>


                <h2>

                  Shipping details

                </h2>



                <div className="tracking-info-list">


                  {/* CUSTOMER */}

                  <div>


                    <span>

                      <i className="bi bi-person"></i>

                    </span>


                    <div>

                      <small>

                        Customer

                      </small>


                      <strong>

                        {
                          [
                            order.customer
                              ?.firstName,

                            order.customer
                              ?.lastName
                          ]
                            .filter(
                              Boolean
                            )
                            .join(
                              " "
                            )
                          ||
                          "Vendra customer"
                        }

                      </strong>

                    </div>


                  </div>



                  {/* ADDRESS */}

                  <div>


                    <span>

                      <i className="bi bi-geo-alt"></i>

                    </span>


                    <div>

                      <small>

                        Address

                      </small>


                      <strong>

                        {
                          [
                            order.customer
                              ?.address,

                            order.customer
                              ?.city
                          ]
                            .filter(
                              Boolean
                            )
                            .join(
                              ", "
                            )
                          ||
                          "Address not available"
                        }

                      </strong>

                    </div>


                  </div>



                  {/* PHONE */}

                  <div>


                    <span>

                      <i className="bi bi-telephone"></i>

                    </span>


                    <div>

                      <small>

                        Phone

                      </small>


                      <strong>

                        {
                          order.customer
                            ?.phone
                          ||
                          "Not available"
                        }

                      </strong>

                    </div>


                  </div>



                  {/* PAYMENT */}

                  <div>


                    <span>

                      <i className="bi bi-credit-card"></i>

                    </span>


                    <div>

                      <small>

                        Payment

                      </small>


                      <strong>

                        {
                          order.payment ===
                          "card"
                            ?
                            "Credit / Debit card"
                            :
                            "Cash on delivery"
                        }

                      </strong>

                    </div>


                  </div>


                </div>



                <div className="tracking-side-total">


                  <span>

                    Order total

                  </span>


                  <strong>

                    $
                    {
                      total.toFixed(
                        2
                      )
                    }

                  </strong>


                </div>


              </motion.aside>


            </div>


          </div>


        </div>


      </section>


    </main>

  );

}


export default OrderTracking;