import { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform
} from "motion/react";

import ProductCard from "../components/ProductCard";


function Home() {

  // =========================================================
  // HERO REFERENCE
  // =========================================================

  const heroRef = useRef(null);


  // =========================================================
  // PRODUCTS DATA
  // =========================================================

  const products = [

    {
      name: "Wireless Headphones",
      store: "SoundHub",
      image: "/images/headPhone.png",
      price: 79,
      oldPrice: 99,
      rating: 4.8,
      reviews: 214,
      tag: "-20%"
    },

    {
      name: "Classic Women Watch",
      store: "Timeless Co.",
      image: "/images/whtcheswoman.png",
      price: 129,
      oldPrice: null,
      rating: 4.9,
      reviews: 98
    },

    {
      name: "Running Sneakers",
      store: "Stride",
      image: "/images/choo.png",
      price: 95,
      oldPrice: null,
      rating: 4.7,
      reviews: 321,
      tag: "New"
    }

  ];


  // =========================================================
  // STORES DATA
  // =========================================================

  const stores = [

    {
      name: "SoundHub",
      category: "Electronics",
      image: "/images/headPhone.png",
      rating: 4.9
    },

    {
      name: "Timeless Co.",
      category: "Accessories",
      image: "/images/whtcheswoman.png",
      rating: 4.8
    },

    {
      name: "Stride",
      category: "Fashion",
      image: "/images/choo.png",
      rating: 4.9
    }

  ];


  // =========================================================
  // HOW IT WORKS DATA
  // =========================================================

  const steps = [

    {
      number: "01",
      icon: "bi-search",
      title: "Discover",
      text:
        "Browse products from multiple trusted stores."
    },

    {
      number: "02",
      icon: "bi-bag",
      title: "Shop",
      text:
        "Add your favorite products to your cart."
    },

    {
      number: "03",
      icon: "bi-truck",
      title: "Receive",
      text:
        "Track your order until it reaches your door."
    }

  ];


  // =========================================================
  // PAGE SCROLL PROGRESS
  // =========================================================

  const {
    scrollYProgress
  } = useScroll();


  // =========================================================
  // HERO PARALLAX
  // =========================================================

  const {
    scrollYProgress: heroScroll
  } = useScroll({

    target: heroRef,

    offset: [
      "start start",
      "end start"
    ]

  });


  const heroImageY =
    useTransform(
      heroScroll,
      [0, 1],
      [0, 110]
    );


  const heroImageScale =
    useTransform(
      heroScroll,
      [0, 1],
      [1, 0.92]
    );


  const heroImageRotate =
    useTransform(
      heroScroll,
      [0, 1],
      [0, 2]
    );


  const heroTextY =
    useTransform(
      heroScroll,
      [0, 1],
      [0, 50]
    );


  const heroTextOpacity =
    useTransform(
      heroScroll,
      [0, 0.75],
      [1, 0]
    );


  // =========================================================
  // HERO TEXT VARIANTS
  // =========================================================

  const heroContainerVariants = {

    hidden: {},

    visible: {

      transition: {

        staggerChildren: 0.13,

        delayChildren: 0.12

      }

    }

  };


  const heroItemVariants = {

    hidden: {

      opacity: 0,

      y: 35

    },

    visible: {

      opacity: 1,

      y: 0,

      transition: {

        duration: 0.65,

        ease: [
          0.22,
          1,
          0.36,
          1
        ]

      }

    }

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <>


      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      <motion.div

        className="home-scroll-progress"

        style={{
          scaleX:
            scrollYProgress
        }}

      />


      <main className="react-home">


        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="hero-section"
          ref={heroRef}
        >


          {/* BACKGROUND ORB 1 */}

          <motion.div

            className="hero-motion-orb orb-one"

            animate={{

              x: [
                0,
                -40,
                15,
                0
              ],

              y: [
                0,
                30,
                -20,
                0
              ],

              scale: [
                1,
                1.15,
                0.95,
                1
              ]

            }}

            transition={{

              duration: 12,

              repeat: Infinity,

              ease: "easeInOut"

            }}

          />


          {/* BACKGROUND ORB 2 */}

          <motion.div

            className="hero-motion-orb orb-two"

            animate={{

              x: [
                0,
                35,
                -15,
                0
              ],

              y: [
                0,
                -25,
                20,
                0
              ],

              scale: [
                1,
                0.9,
                1.1,
                1
              ]

            }}

            transition={{

              duration: 14,

              repeat: Infinity,

              ease: "easeInOut"

            }}

          />


          <div className="container">


            <div className="row align-items-center g-5">


              {/* =============================================
                  HERO LEFT
              ============================================= */}

              <div className="col-lg-6">


                <motion.div

                  style={{

                    y:
                      heroTextY,

                    opacity:
                      heroTextOpacity

                  }}

                  variants={
                    heroContainerVariants
                  }

                  initial="hidden"

                  animate="visible"

                >


                  {/* BADGE */}

                  <motion.span

                    className="hero-badge"

                    variants={{

                      hidden: {

                        opacity: 0,

                        y: 25,

                        scale: 0.9

                      },

                      visible: {

                        opacity: 1,

                        y: 0,

                        scale: 1,

                        transition: {

                          duration: 0.55

                        }

                      }

                    }}

                  >

                    <i className="bi bi-stars"></i>

                    Discover more. Shop smarter.

                  </motion.span>



                  {/* TITLE */}

                  <motion.h1

                    className="hero-title"

                    variants={
                      heroItemVariants
                    }

                  >

                    One marketplace,

                    <br />


                    <motion.span

                      className="text-gradient"

                      initial={{

                        backgroundPosition:
                          "0% 50%"

                      }}

                      animate={{

                        backgroundPosition: [

                          "0% 50%",

                          "100% 50%",

                          "0% 50%"

                        ]

                      }}

                      transition={{

                        duration: 7,

                        repeat: Infinity,

                        ease: "linear"

                      }}

                      style={{

                        backgroundSize:
                          "200% 200%"

                      }}

                    >

                      endless stores.

                    </motion.span>

                  </motion.h1>



                  {/* DESCRIPTION */}

                  <motion.p

                    className="hero-text"

                    variants={
                      heroItemVariants
                    }

                  >

                    Discover products from trusted stores,
                    compare your favorites and enjoy a
                    simple shopping experience — all in
                    one place.

                  </motion.p>



                  {/* SEARCH */}

                  <motion.div

                    className="hero-search"

                    variants={{

                      hidden: {

                        opacity: 0,

                        y: 30,

                        scale: 0.97

                      },

                      visible: {

                        opacity: 1,

                        y: 0,

                        scale: 1,

                        transition: {

                          duration: 0.6

                        }

                      }

                    }}

                    whileHover={{

                      scale: 1.015

                    }}

                    whileFocusWithin={{

                      scale: 1.015

                    }}

                  >

                    <i className="bi bi-search"></i>


                    <input

                      type="search"

                      placeholder="Search products, stores..."

                    />


                    <motion.button

                      className="btn btn-vendra hero-primary-btn"

                      type="button"

                      whileHover={{

                        scale: 1.04

                      }}

                      whileTap={{

                        scale: 0.96

                      }}

                    >

                      Search

                    </motion.button>


                  </motion.div>



                  {/* HERO STATS */}

                  <motion.div

                    className="hero-stats"

                    variants={{

                      hidden: {},

                      visible: {

                        transition: {

                          staggerChildren:
                            0.1

                        }

                      }

                    }}

                  >


                    <motion.div

                      variants={
                        heroItemVariants
                      }

                      whileHover={{

                        y: -5,

                        scale: 1.03

                      }}

                    >

                      <strong>

                        100+

                      </strong>


                      <span>

                        Trusted stores

                      </span>

                    </motion.div>



                    <motion.div

                      variants={
                        heroItemVariants
                      }

                      whileHover={{

                        y: -5,

                        scale: 1.03

                      }}

                    >

                      <strong>

                        5K+

                      </strong>


                      <span>

                        Products

                      </span>

                    </motion.div>



                    <motion.div

                      variants={
                        heroItemVariants
                      }

                      whileHover={{

                        y: -5,

                        scale: 1.03

                      }}

                    >

                      <strong>

                        10K+

                      </strong>


                      <span>

                        Shoppers

                      </span>

                    </motion.div>


                  </motion.div>


                </motion.div>


              </div>



              {/* =============================================
                  HERO RIGHT
              ============================================= */}

              <div className="col-lg-6">


                <motion.div

                  className="hero-visual hero-motion-wrapper"

                  style={{

                    y:
                      heroImageY,

                    scale:
                      heroImageScale,

                    rotate:
                      heroImageRotate

                  }}

                  initial={{

                    opacity: 0,

                    x: 90,

                    rotateY: -8

                  }}

                  animate={{

                    opacity: 1,

                    x: 0,

                    rotateY: 0

                  }}

                  transition={{

                    duration: 0.9,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1
                    ]

                  }}

                >


                  {/* HERO BLOB */}

                  <motion.div

                    className="hero-blob"

                    animate={{

                      rotate: [
                        4,
                        7,
                        2,
                        4
                      ],

                      scale: [
                        1,
                        1.03,
                        0.98,
                        1
                      ]

                    }}

                    transition={{

                      duration: 8,

                      repeat: Infinity,

                      ease: "easeInOut"

                    }}

                  />



                  {/* HERO IMAGE */}

                  <motion.img

                    className="hero-img hero-motion-image"

                    src="/images/backgroundIndexPage.png"

                    alt="Vendra marketplace"

                    animate={{

                      y: [
                        0,
                        -8,
                        0
                      ]

                    }}

                    transition={{

                      duration: 5,

                      repeat: Infinity,

                      ease: "easeInOut"

                    }}

                  />



                  {/* FLOAT CARD TOP */}

                  <motion.div

                    className="float-card float-card-top"

                    initial={{

                      opacity: 0,

                      x: -25,

                      scale: 0.85

                    }}

                    animate={{

                      opacity: 1,

                      x: 0,

                      scale: 1,

                      y: [
                        0,
                        -12,
                        0
                      ]

                    }}

                    transition={{

                      opacity: {

                        delay: 0.9,

                        duration: 0.4

                      },

                      x: {

                        delay: 0.9,

                        duration: 0.5

                      },

                      scale: {

                        delay: 0.9,

                        duration: 0.5

                      },

                      y: {

                        delay: 1.4,

                        duration: 4,

                        repeat: Infinity,

                        ease: "easeInOut"

                      }

                    }}

                  >

                    <span className="float-icon">

                      <i className="bi bi-shop"></i>

                    </span>


                    <div>

                      <strong>

                        Trusted stores

                      </strong>


                      <small>

                        Shop with confidence

                      </small>

                    </div>


                  </motion.div>



                  {/* FLOAT CARD BOTTOM */}

                  <motion.div

                    className="float-card float-card-bottom"

                    initial={{

                      opacity: 0,

                      x: 25,

                      scale: 0.85

                    }}

                    animate={{

                      opacity: 1,

                      x: 0,

                      scale: 1,

                      y: [
                        0,
                        12,
                        0
                      ]

                    }}

                    transition={{

                      opacity: {

                        delay: 1.05,

                        duration: 0.4

                      },

                      x: {

                        delay: 1.05,

                        duration: 0.5

                      },

                      scale: {

                        delay: 1.05,

                        duration: 0.5

                      },

                      y: {

                        delay: 1.5,

                        duration: 4.5,

                        repeat: Infinity,

                        ease: "easeInOut"

                      }

                    }}

                  >

                    <span className="float-icon">

                      <i className="bi bi-truck"></i>

                    </span>


                    <div>

                      <strong>

                        Fast delivery

                      </strong>


                      <small>

                        Right to your door

                      </small>

                    </div>


                  </motion.div>


                </motion.div>


              </div>


            </div>


          </div>


        </section>



        {/* ===================================================
            FEATURED PRODUCTS
        =================================================== */}

        <section
          className="section section-soft motion-section"
          id="products"
        >


          <div className="container">


            {/* SECTION HEADER */}

            <motion.div

              className="section-head"

              initial={{

                opacity: 0,

                y: 40

              }}

              whileInView={{

                opacity: 1,

                y: 0

              }}

              viewport={{

                once: true,

                amount: 0.3

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


              <div>

                <span className="section-label">

                  Popular now

                </span>


                <h2 className="section-title">

                  Featured products

                </h2>


                <p className="section-text">

                  Discover some of the most popular
                  products across Vendra stores.

                </p>

              </div>



              <motion.a

                href="#"

                className="view-all"

                whileHover={{

                  x: 5

                }}

              >

                View all


                <i className="bi bi-arrow-right ms-2"></i>

              </motion.a>


            </motion.div>



            {/* PRODUCTS */}

            <div className="row g-4">


              {products.map(
                (
                  product,
                  index
                ) => (

                  <motion.div

                    className="col-md-6 col-lg-4"

                    key={
                      product.name
                    }

                    initial={{

                      opacity: 0,

                      y: 55,

                      scale: 0.94

                    }}

                    whileInView={{

                      opacity: 1,

                      y: 0,

                      scale: 1

                    }}

                    viewport={{

                      once: true,

                      amount: 0.2

                    }}

                    transition={{

                      duration:
                        0.65,

                      delay:
                        index *
                        0.12,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1
                      ]

                    }}

                  >

                    <div className="motion-card-wrapper">


                      <ProductCard
                        {...product}
                      />


                    </div>

                  </motion.div>

                )
              )}


            </div>


          </div>


        </section>



        {/* ===================================================
            FEATURED STORES
        =================================================== */}

        <section
          className="section motion-section"
          id="stores"
        >


          <div className="container">


            {/* HEADER */}

            <motion.div

              className="section-head"

              initial={{

                opacity: 0,

                y: 40

              }}

              whileInView={{

                opacity: 1,

                y: 0

              }}

              viewport={{

                once: true,

                amount: 0.3

              }}

              transition={{

                duration: 0.7

              }}

            >


              <div>

                <span className="section-label">

                  Shop your way

                </span>


                <h2 className="section-title">

                  Featured stores

                </h2>


                <p className="section-text">

                  Explore trusted sellers from
                  different categories.

                </p>

              </div>


            </motion.div>



            {/* STORES */}

            <div className="row g-4">


              {stores.map(
                (
                  store,
                  index
                ) => (

                  <motion.div

                    className="col-lg-4"

                    key={
                      store.name
                    }

                    initial={{

                      opacity: 0,

                      y: 55,

                      scale: 0.95

                    }}

                    whileInView={{

                      opacity: 1,

                      y: 0,

                      scale: 1

                    }}

                    viewport={{

                      once: true,

                      amount: 0.2

                    }}

                    transition={{

                      duration:
                        0.65,

                      delay:
                        index *
                        0.12

                    }}

                    whileHover={{

                      y: -8

                    }}

                  >


                    <article className="store-card">


                      <div className="store-cover">


                        <motion.img

                          src={
                            store.image
                          }

                          alt={
                            store.name
                          }

                          whileHover={{

                            scale: 1.07

                          }}

                          transition={{

                            duration: 0.45

                          }}

                        />


                      </div>



                      <div className="store-body">


                        <motion.span

                          className="store-logo"

                          whileHover={{

                            rotate: 5,

                            scale: 1.08

                          }}

                        >

                          {
                            store.name
                              .charAt(0)
                          }

                        </motion.span>



                        <div className="store-info">

                          <h3>

                            {
                              store.name
                            }

                          </h3>


                          <p>

                            {
                              store.category
                            }

                          </p>

                        </div>



                        <div className="store-rating">

                          <i className="bi bi-star-fill"></i>

                          {" "}

                          {
                            store.rating
                          }

                        </div>


                      </div>



                      <motion.button

                        className="btn btn-vendra-soft w-100"

                        type="button"

                        whileHover={{

                          scale: 1.02

                        }}

                        whileTap={{

                          scale: 0.97

                        }}

                      >

                        Visit store

                      </motion.button>


                    </article>


                  </motion.div>

                )
              )}


            </div>


          </div>


        </section>



        {/* ===================================================
            HOW IT WORKS
        =================================================== */}

        <section
          className="section section-soft motion-section"
          id="how"
        >


          <div className="container">


            {/* HEADER */}

            <motion.div

              className="text-center mb-5"

              initial={{

                opacity: 0,

                y: 40

              }}

              whileInView={{

                opacity: 1,

                y: 0

              }}

              viewport={{

                once: true,

                amount: 0.3

              }}

              transition={{

                duration: 0.7

              }}

            >


              <span className="section-label">

                Simple shopping

              </span>


              <h2 className="section-title">

                How Vendra works

              </h2>


              <p
                className="section-text mx-auto"
              >

                From discovery to delivery,
                Vendra keeps shopping simple.

              </p>


            </motion.div>



            {/* STEPS */}

            <div className="row g-4">


              {steps.map(
                (
                  step,
                  index
                ) => (

                  <motion.div

                    className="col-md-4"

                    key={
                      step.number
                    }

                    initial={{

                      opacity: 0,

                      y: 60,

                      scale: 0.94

                    }}

                    whileInView={{

                      opacity: 1,

                      y: 0,

                      scale: 1

                    }}

                    viewport={{

                      once: true,

                      amount: 0.25

                    }}

                    transition={{

                      duration:
                        0.65,

                      delay:
                        index *
                        0.15

                    }}

                    whileHover={{

                      y: -8

                    }}

                  >


                    <div className="step-card">


                      <span className="step-number">

                        {
                          step.number
                        }

                      </span>



                      <motion.div

                        className="step-icon"

                        whileHover={{

                          rotate: [
                            0,
                            -8,
                            8,
                            0
                          ],

                          scale:
                            1.08

                        }}

                        transition={{

                          duration:
                            0.5

                        }}

                      >

                        <i
                          className={
                            `bi ${step.icon}`
                          }
                        ></i>

                      </motion.div>



                      <h3>

                        {
                          step.title
                        }

                      </h3>



                      <p>

                        {
                          step.text
                        }

                      </p>


                    </div>


                  </motion.div>

                )
              )}


            </div>


          </div>


        </section>


      </main>


    </>

  );

}


export default Home;