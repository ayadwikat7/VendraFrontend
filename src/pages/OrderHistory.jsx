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


function OrderHistory() {

  const navigate =
    useNavigate();


  // =========================================================
  // READ ORDERS
  // =========================================================

  const readOrders = () => {

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


  // =========================================================
  // STATE
  // =========================================================

  const [orders, setOrders] =
    useState(
      readOrders
    );


  const [search, setSearch] =
    useState("");


  const [status, setStatus] =
    useState("all");


  const [detailsOrder, setDetailsOrder] =
    useState(null);


  // =========================================================
  // PAGE
  // =========================================================

  useEffect(
    () => {

      document.title =
        "Order History — Vendra";


      const updateOrders = () => {

        setOrders(
          readOrders()
        );

      };


      window.addEventListener(
        "storage",
        updateOrders
      );


      return () => {

        window.removeEventListener(
          "storage",
          updateOrders
        );

      };

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
          year: "numeric",
          month: "short",
          day: "numeric"
        }
      );

    };


  const getOrderTotal =
    order => {

      if (
        typeof order.total ===
        "number"
      ) {

        return order.total;

      }


      return order.items.reduce(
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

    };


  const getStatusClass =
    value => {

      switch (
        value
      ) {

        case "Delivered":

          return "delivered";


        case "Shipped":

          return "shipped";


        case "Cancelled":

          return "cancelled";


        default:

          return "processing";

      }

    };


  // =========================================================
  // STATS
  // =========================================================

  const totalOrders =
    orders.length;


  const processingOrders =
    orders.filter(
      order =>
        order.status ===
        "Processing"
    ).length;


  const shippedOrders =
    orders.filter(
      order =>
        order.status ===
        "Shipped"
    ).length;


  const deliveredOrders =
    orders.filter(
      order =>
        order.status ===
        "Delivered"
    ).length;


  // =========================================================
  // FILTER
  // =========================================================

  const filteredOrders =
    useMemo(
      () => {

        const searchValue =
          search
            .trim()
            .toLowerCase();


        return orders.filter(
          order => {

            const matchesSearch =
              order.id
                .toLowerCase()
                .includes(
                  searchValue
                );


            const matchesStatus =
              status === "all"
              ||
              order.status ===
                status;


            return (
              matchesSearch
              &&
              matchesStatus
            );

          }
        );

      },
      [
        orders,
        search,
        status
      ]
    );


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      <section className="orders-page">


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


            <span>

              Order History

            </span>


          </motion.nav>



          {/* =================================================
              HEADER
          ================================================= */}

          <motion.div

            className="orders-header"

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


            <div>

              <span className="section-label">

                My account

              </span>


              <h1>

                Order history

              </h1>


              <p>

                View your recent orders and
                follow their current status.

              </p>

            </div>


            <Link

              to="/products"

              className="btn btn-vendra"

            >

              <i className="bi bi-bag-plus"></i>

              {" "}Continue shopping

            </Link>


          </motion.div>



          {/* =================================================
              STATS
          ================================================= */}

          <motion.div

            className="orders-stats"

            initial="hidden"

            animate="visible"

            variants={{

              hidden: {},

              visible: {

                transition: {
                  staggerChildren: 0.08
                }

              }

            }}

          >


            {[
              {
                label:
                  "Total orders",
                value:
                  totalOrders,
                icon:
                  "bi-box-seam"
              },

              {
                label:
                  "Processing",
                value:
                  processingOrders,
                icon:
                  "bi-hourglass-split"
              },

              {
                label:
                  "Shipped",
                value:
                  shippedOrders,
                icon:
                  "bi-truck"
              },

              {
                label:
                  "Delivered",
                value:
                  deliveredOrders,
                icon:
                  "bi-check-circle"
              }

            ].map(
              item => (

                <motion.article

                  key={
                    item.label
                  }

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

                  whileHover={{
                    y: -5
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

                    <small>

                      {item.label}

                    </small>


                    <motion.strong

                      key={
                        item.value
                      }

                      initial={{
                        scale: 1.25
                      }}

                      animate={{
                        scale: 1
                      }}

                    >

                      {item.value}

                    </motion.strong>

                  </div>


                </motion.article>

              )
            )}


          </motion.div>



          {/* =================================================
              TOOLBAR
          ================================================= */}

          <motion.div

            className="orders-toolbar"

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


            <div className="orders-search">


              <i className="bi bi-search"></i>


              <input

                type="search"

                placeholder="Search by order number..."

                value={
                  search
                }

                onChange={
                  event =>
                    setSearch(
                      event.target.value
                    )
                }

              />


            </div>



            <select

              className="orders-filter-select"

              value={
                status
              }

              onChange={
                event =>
                  setStatus(
                    event.target.value
                  )
              }

            >

              <option value="all">
                All orders
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>


          </motion.div>



          {/* =================================================
              ORDERS
          ================================================= */}

          <AnimatePresence mode="popLayout">


            {filteredOrders.length >
            0 ? (

              <motion.div

                className="orders-list"

                layout

              >


                {filteredOrders.map(
                  (
                    order,
                    index
                  ) => {

                    const total =
                      getOrderTotal(
                        order
                      );


                    const visibleItems =
                      order.items.slice(
                        0,
                        4
                      );


                    const extraCount =
                      order.items.length -
                      visibleItems.length;


                    return (

                      <motion.article

                        layout

                        key={
                          order.id
                        }

                        className="order-history-card"

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

                        exit={{
                          opacity: 0,
                          scale: 0.94
                        }}

                        transition={{
                          duration: 0.4,
                          delay:
                            Math.min(
                              index * 0.06,
                              0.25
                            )
                        }}

                        whileHover={{
                          y: -4
                        }}

                      >


                        {/* TOP */}

                        <div className="order-card-top">


                          <div>

                            <span className="order-number-label">

                              Order number

                            </span>


                            <h2>

                              #{order.id}

                            </h2>

                          </div>



                          <span

                            className={
                              `order-status ${
                                getStatusClass(
                                  order.status
                                )
                              }`
                            }

                          >

                            {order.status}

                          </span>


                        </div>



                        {/* META */}

                        <div className="order-card-meta">


                          <div>

                            <i className="bi bi-calendar3"></i>


                            <span>

                              Ordered on

                              {" "}

                              <strong>

                                {
                                  formatDate(
                                    order.date
                                  )
                                }

                              </strong>

                            </span>

                          </div>



                          <div>

                            <i className="bi bi-box-seam"></i>


                            <span>

                              {
                                order.items.length
                              }

                              {" "}

                              {
                                order.items.length ===
                                1
                                  ?
                                  "item"
                                  :
                                  "items"
                              }

                            </span>

                          </div>



                          <div>

                            <i className="bi bi-credit-card"></i>


                            <span>

                              {
                                order.payment ===
                                "card"
                                  ?
                                  "Card payment"
                                  :
                                  "Cash on delivery"
                              }

                            </span>

                          </div>


                        </div>



                        {/* PRODUCTS */}

                        <div className="order-card-products">


                          <div className="order-product-images">


                            {visibleItems.map(
                              (
                                item,
                                itemIndex
                              ) => (

                                <motion.div

                                  className="order-product-thumb"

                                  key={
                                    item.name
                                    +
                                    itemIndex
                                  }

                                  whileHover={{
                                    y: -3,
                                    scale: 1.06
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

                              )
                            )}


                            {extraCount >
                            0 && (

                              <div className="order-product-more">

                                +{extraCount}

                              </div>

                            )}


                          </div>



                          <div className="order-card-total">

                            <small>

                              Order total

                            </small>


                            <strong>

                              $
                              {
                                total.toFixed(
                                  2
                                )
                              }

                            </strong>

                          </div>


                        </div>



                        {/* BOTTOM */}

                        <div className="order-card-bottom">


                          <div className="order-delivery-address">

                            <i className="bi bi-geo-alt"></i>


                            <span>

                              {
                                order.customer
                                  ?.city
                                ||
                                "Delivery address"
                              }

                            </span>

                          </div>



                          <div className="order-actions">


                            <motion.button

                              type="button"

                              className="order-details-btn"

                              whileHover={{
                                scale: 1.03
                              }}

                              whileTap={{
                                scale: 0.96
                              }}

                              onClick={
                                () =>
                                  setDetailsOrder(
                                    order
                                  )
                              }

                            >

                              <i className="bi bi-eye"></i>

                              Details

                            </motion.button>



                            <motion.button

                              type="button"

                              className="order-track-btn"

                              whileHover={{
                                x: 3
                              }}

                              whileTap={{
                                scale: 0.96
                              }}

                              onClick={
                                () =>
                                  navigate(
                                    `/track-order?order=${encodeURIComponent(
                                      order.id
                                    )}`
                                  )
                              }

                            >

                              Track order

                              <i className="bi bi-arrow-right"></i>

                            </motion.button>


                          </div>


                        </div>


                      </motion.article>

                    );

                  }
                )}


              </motion.div>

            ) : (

              /* ===============================================
                 EMPTY
              =============================================== */

              <motion.div

                key="empty"

                className="orders-empty"

                initial={{
                  opacity: 0,
                  scale: 0.95
                }}

                animate={{
                  opacity: 1,
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
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}

                >

                  <i className="bi bi-box2"></i>

                </motion.span>


                <h2>

                  {
                    orders.length === 0
                      ?
                      "No orders yet"
                      :
                      "No matching orders"
                  }

                </h2>


                <p>

                  {
                    orders.length === 0
                      ?
                      "Your completed orders will appear here."
                      :
                      "Try another order number or status."
                  }

                </p>


                <Link

                  to="/products"

                  className="btn btn-vendra"

                >

                  Start shopping

                </Link>


              </motion.div>

            )}


          </AnimatePresence>


        </div>


      </section>



      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>


        {detailsOrder && (

          <motion.div

            className="order-details-overlay"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            onClick={
              () =>
                setDetailsOrder(
                  null
                )
            }

          >


            <motion.div

              className="order-details-modal"

              initial={{
                opacity: 0,
                y: 35,
                scale: 0.92
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}

              exit={{
                opacity: 0,
                y: 25,
                scale: 0.94
              }}

              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20
              }}

              onClick={
                event =>
                  event
                    .stopPropagation()
              }

            >


              <button

                type="button"

                className="order-details-close"

                onClick={
                  () =>
                    setDetailsOrder(
                      null
                    )
                }

              >

                <i className="bi bi-x-lg"></i>

              </button>


              <span className="section-label">

                Order details

              </span>


              <h2>

                #{detailsOrder.id}

              </h2>


              <div className="order-details-list">


                {detailsOrder.items.map(
                  (
                    item,
                    index
                  ) => (

                    <div

                      className="order-details-item"

                      key={
                        item.name
                        +
                        index
                      }

                    >


                      <img

                        src={
                          item.image
                        }

                        alt={
                          item.name
                        }

                      />


                      <div>

                        <strong>

                          {
                            item.quantity
                          }

                          {" × "}

                          {
                            item.name
                          }

                        </strong>


                        <span>

                          {item.store}

                        </span>

                      </div>


                      <strong>

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
                          ).toFixed(
                            2
                          )
                        }

                      </strong>


                    </div>

                  )
                )}


              </div>


              <div className="order-details-summary">


                <span>

                  Status

                  <strong>

                    {
                      detailsOrder.status
                    }

                  </strong>

                </span>


                <span>

                  Payment

                  <strong>

                    {
                      detailsOrder.payment ===
                      "card"
                        ?
                        "Card"
                        :
                        "Cash on delivery"
                    }

                  </strong>

                </span>


                <span>

                  Total

                  <strong>

                    $
                    {
                      getOrderTotal(
                        detailsOrder
                      ).toFixed(
                        2
                      )
                    }

                  </strong>

                </span>


              </div>


            </motion.div>


          </motion.div>

        )}


      </AnimatePresence>


    </main>

  );

}


export default OrderHistory;