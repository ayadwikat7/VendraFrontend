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
  useNavigate,
  useParams
} from "react-router-dom";


const PRODUCTS = {

  "Wireless Headphones": {
    name: "Wireless Headphones",
    store: "SoundHub",
    image: "/images/headPhone.png",
    price: 79,
    oldPrice: 99,
    discount: "-20%",
    rating: 4.8,
    reviews: 214,
    category: "Electronics",
    stock: "In stock",

    description:
      "Enjoy immersive sound, comfortable ear cushions and long-lasting battery life. Designed for music, work and everyday listening with a clean modern style.",

    features: [
      {
        icon: "bi-bluetooth",
        text: "Bluetooth"
      },
      {
        icon: "bi-battery-charging",
        text: "30h Battery"
      },
      {
        icon: "bi-soundwave",
        text: "HD Sound"
      }
    ],

    specifications: {
      Connection: "Bluetooth 5.3",
      "Battery life": "Up to 30 hours",
      Charging: "USB-C",
      Microphone: "Built-in"
    }
  },


  "Classic Women Watch": {
    name: "Classic Women Watch",
    store: "Timeless Co.",
    image: "/images/whtcheswoman.png",
    price: 129,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 98,
    category: "Accessories",
    stock: "In stock",

    description:
      "An elegant women's watch designed for everyday wear and special occasions, combining a timeless look with a refined modern finish.",

    features: [
      {
        icon: "bi-watch",
        text: "Elegant Design"
      },
      {
        icon: "bi-droplet",
        text: "Water Resistant"
      },
      {
        icon: "bi-gem",
        text: "Premium Finish"
      }
    ],

    specifications: {
      Style: "Classic",
      Strap: "Metal",
      Display: "Analog",
      Warranty: "1 Year"
    }
  },


  "Running Sneakers": {
    name: "Running Sneakers",
    store: "Stride",
    image: "/images/choo.png",
    price: 95,
    oldPrice: null,
    discount: "New",
    rating: 4.7,
    reviews: 321,
    category: "Fashion",
    stock: "In stock",

    description:
      "Lightweight and comfortable sneakers made for everyday movement, workouts and casual wear.",

    features: [
      {
        icon: "bi-lightning-charge",
        text: "Lightweight"
      },
      {
        icon: "bi-wind",
        text: "Breathable"
      },
      {
        icon: "bi-shield-check",
        text: "Comfort Fit"
      }
    ],

    specifications: {
      Material: "Breathable Mesh",
      Sole: "Rubber",
      Fit: "Regular",
      Usage: "Running & Casual"
    }
  },


  "Summer Sunglasses": {
    name: "Summer Sunglasses",
    store: "Optica",

    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&q=85",

    price: 45,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    reviews: 76,
    category: "Accessories",
    stock: "In stock",

    description:
      "Stylish sunglasses with a lightweight frame and comfortable fit, perfect for sunny days and everyday looks.",

    features: [
      {
        icon: "bi-sun",
        text: "UV Protection"
      },
      {
        icon: "bi-stars",
        text: "Modern Style"
      },
      {
        icon: "bi-feather",
        text: "Lightweight"
      }
    ],

    specifications: {
      Protection: "UV Protection",
      Frame: "Lightweight",
      Style: "Modern",
      Fit: "Universal"
    }
  },


  "Instant Camera": {
    name: "Instant Camera",
    store: "SnapShop",

    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85",

    price: 110,
    oldPrice: null,
    discount: null,
    rating: 4.5,
    reviews: 142,
    category: "Electronics",
    stock: "In stock",

    description:
      "Capture your favorite moments and print them instantly with a compact camera designed for simple and fun photography.",

    features: [
      {
        icon: "bi-camera",
        text: "Instant Print"
      },
      {
        icon: "bi-lightning",
        text: "Built-in Flash"
      },
      {
        icon: "bi-image",
        text: "Easy Photos"
      }
    ],

    specifications: {
      Type: "Instant Camera",
      Flash: "Built-in",
      Power: "Battery",
      Format: "Instant Film"
    }
  },


  "Urban Backpack": {
    name: "Urban Backpack",
    store: "Urban Wear",

    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",

    price: 65,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 188,
    category: "Fashion",
    stock: "In stock",

    description:
      "A practical everyday backpack with modern styling and enough space for work, study or travel essentials.",

    features: [
      {
        icon: "bi-backpack",
        text: "Spacious"
      },
      {
        icon: "bi-laptop",
        text: "Laptop Pocket"
      },
      {
        icon: "bi-shield-check",
        text: "Durable"
      }
    ],

    specifications: {
      Material: "Polyester",
      Capacity: "Medium",
      Pockets: "Multiple",
      Usage: "Daily"
    }
  },


  "Pro Laptop": {
    name: "Pro Laptop",
    store: "TechZone",

    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85",

    price: 1199,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 64,
    category: "Electronics",
    stock: "In stock",

    description:
      "A powerful laptop designed for productivity, study and professional work with a premium modern build.",

    features: [
      {
        icon: "bi-cpu",
        text: "Fast Performance"
      },
      {
        icon: "bi-laptop",
        text: "Full HD Display"
      },
      {
        icon: "bi-battery-charging",
        text: "Long Battery"
      }
    ],

    specifications: {
      Display: "Full HD",
      Storage: "SSD",
      Memory: "16 GB",
      Type: "Professional Laptop"
    }
  },


  "Floral Perfume": {
    name: "Floral Perfume",
    store: "Glow Beauty",

    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=85",

    price: 58,
    oldPrice: 68,
    discount: "-15%",
    rating: 4.8,
    reviews: 230,
    category: "Beauty",
    stock: "In stock",

    description:
      "A soft floral fragrance with an elegant character, designed for a fresh and feminine everyday scent.",

    features: [
      {
        icon: "bi-flower1",
        text: "Floral Scent"
      },
      {
        icon: "bi-stars",
        text: "Elegant"
      },
      {
        icon: "bi-clock",
        text: "Long Lasting"
      }
    ],

    specifications: {
      Type: "Eau de Parfum",
      Scent: "Floral",
      Style: "Feminine",
      Usage: "Daily"
    }
  },


  "Wooden Chair": {
    name: "Wooden Chair",
    store: "HomeNest",

    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=900&q=85",

    price: 149,
    oldPrice: null,
    discount: null,
    rating: 4.4,
    reviews: 51,
    category: "Home",
    stock: "In stock",

    description:
      "A clean modern wooden chair designed to add warmth and simplicity to dining, office or living spaces.",

    features: [
      {
        icon: "bi-house",
        text: "Modern Home"
      },
      {
        icon: "bi-tree",
        text: "Wood Finish"
      },
      {
        icon: "bi-shield-check",
        text: "Durable"
      }
    ],

    specifications: {
      Material: "Wood",
      Style: "Modern",
      Usage: "Indoor",
      Assembly: "Required"
    }
  },


  "Mini Plant": {
    name: "Mini Plant",
    store: "Green Corner",

    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&q=85",

    price: 22,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    reviews: 119,
    category: "Home",
    stock: "In stock",

    description:
      "A beautiful small indoor plant that adds a fresh green touch to desks, bedrooms and living spaces.",

    features: [
      {
        icon: "bi-flower2",
        text: "Indoor Plant"
      },
      {
        icon: "bi-sun",
        text: "Easy Care"
      },
      {
        icon: "bi-house-heart",
        text: "Home Decor"
      }
    ],

    specifications: {
      Type: "Indoor Plant",
      Size: "Mini",
      Care: "Easy",
      Pot: "Included"
    }
  },


  "Basic White Tee": {
    name: "Basic White Tee",
    store: "Urban Wear",

    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",

    price: 19,
    oldPrice: null,
    discount: null,
    rating: 4.3,
    reviews: 402,
    category: "Fashion",
    stock: "In stock",

    description:
      "A simple everyday white T-shirt with a comfortable fit and versatile style for casual outfits.",

    features: [
      {
        icon: "bi-stars",
        text: "Basic Style"
      },
      {
        icon: "bi-wind",
        text: "Comfortable"
      },
      {
        icon: "bi-check-circle",
        text: "Everyday Fit"
      }
    ],

    specifications: {
      Material: "Cotton",
      Fit: "Regular",
      Color: "White",
      Style: "Basic"
    }
  },


  "Makeup Set": {
    name: "Makeup Set",
    store: "Glow Beauty",

    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=85",

    price: 39,
    oldPrice: null,
    discount: "New",
    rating: 4.7,
    reviews: 87,
    category: "Beauty",
    stock: "In stock",

    description:
      "A versatile makeup collection with essential products for creating simple everyday or more polished looks.",

    features: [
      {
        icon: "bi-stars",
        text: "Beauty Set"
      },
      {
        icon: "bi-palette",
        text: "Multiple Shades"
      },
      {
        icon: "bi-bag-heart",
        text: "Complete Kit"
      }
    ],

    specifications: {
      Type: "Makeup Kit",
      Pieces: "Multiple",
      Use: "Face & Eyes",
      Category: "Beauty"
    }
  }

};


function ProductDetails() {

  const {
    productName
  } = useParams();


  const navigate =
    useNavigate();


  const decodedName =
    decodeURIComponent(
      productName || ""
    );


  const product =
    PRODUCTS[decodedName]
    ||
    PRODUCTS["Wireless Headphones"];


  const [quantity, setQuantity] =
    useState(1);


  const [selectedColor, setSelectedColor] =
    useState("Black");


  const [wishlist, setWishlist] =
    useState(false);


  const [activeTab, setActiveTab] =
    useState("description");


  const [added, setAdded] =
    useState(false);


  // =========================================================
  // PAGE TITLE
  // =========================================================

  useEffect(
    () => {

      document.title =
        `${product.name} — Vendra`;

      setQuantity(1);

      setSelectedColor("Black");

      setActiveTab("description");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    },
    [product.name]
  );


  // =========================================================
  // SAVE
  // =========================================================

  const saving =
    product.oldPrice
      ? product.oldPrice -
        product.price
      : 0;


  // =========================================================
  // ADD TO CART
  // =========================================================

  const addToCart = () => {

    let cart = [];

    try {

      cart =
        JSON.parse(
          localStorage.getItem(
            "vendraCart"
          )
          ||
          "[]"
        );

    } catch {

      cart = [];

    }


    const existing =
      cart.find(
        item =>
          item.name ===
          product.name
      );


    if (existing) {

      existing.quantity +=
        quantity;

    } else {

      cart.push({

        name:
          product.name,

        store:
          product.store,

        price:
          product.price,

        image:
          product.image,

        quantity:
          quantity,

        color:
          selectedColor

      });

    }


    localStorage.setItem(
      "vendraCart",
      JSON.stringify(cart)
    );


    window.dispatchEvent(
      new Event(
        "vendra-cart-updated"
      )
    );


    setAdded(true);


    setTimeout(
      () =>
        setAdded(false),
      1200
    );

  };


  // =========================================================
  // RELATED PRODUCTS
  // =========================================================

  const relatedProducts =
    useMemo(
      () => {

        const sameCategory =
          Object.values(
            PRODUCTS
          ).filter(
            item =>
              item.name !==
                product.name
              &&
              item.category ===
                product.category
          );


        const others =
          Object.values(
            PRODUCTS
          ).filter(
            item =>
              item.name !==
                product.name
              &&
              item.category !==
                product.category
          );


        return [
          ...sameCategory,
          ...others
        ].slice(0, 3);

      },
      [
        product.name,
        product.category
      ]
    );


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="product-details-section">


        <div className="container">


          {/* BREADCRUMB */}

          <motion.nav

            className="product-breadcrumb"

            initial={{
              opacity: 0,
              x: -25
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


            <Link to="/products">

              Products

            </Link>


            <i className="bi bi-chevron-right"></i>


            <span>

              {product.name}

            </span>

          </motion.nav>



          <div className="row g-5 align-items-start">


            {/* =================================================
                LEFT
            ================================================= */}

            <div className="col-lg-6">


              <motion.div

                className="product-gallery"

                initial={{
                  opacity: 0,
                  x: -60,
                  scale: 0.96
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1
                }}

                transition={{
                  duration: 0.75,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1
                  ]
                }}

              >


                <div className="product-detail-main-image">


                  {product.discount && (

                    <motion.span

                      className="details-sale-badge"

                      initial={{
                        opacity: 0,
                        scale: 0.7
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1
                      }}

                      transition={{
                        delay: 0.5
                      }}

                    >

                      {product.discount}

                    </motion.span>

                  )}



                  <motion.button

                    type="button"

                    className={
                      `details-wish-btn ${
                        wishlist
                          ? "active"
                          : ""
                      }`
                    }

                    whileHover={{
                      scale: 1.1
                    }}

                    whileTap={{
                      scale: 0.85
                    }}

                    onClick={
                      () =>
                        setWishlist(
                          !wishlist
                        )
                    }

                  >

                    <i
                      className={
                        wishlist
                          ? "bi bi-heart-fill"
                          : "bi bi-heart"
                      }
                    ></i>

                  </motion.button>



                  <AnimatePresence mode="wait">

                    <motion.img

                      key={product.name}

                      src={product.image}

                      alt={product.name}

                      initial={{
                        opacity: 0,
                        scale: 0.88,
                        rotate: -2
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0
                      }}

                      exit={{
                        opacity: 0,
                        scale: 0.9
                      }}

                      transition={{
                        duration: 0.55
                      }}

                      whileHover={{
                        scale: 1.04,
                        rotate: 1
                      }}

                    />

                  </AnimatePresence>


                </div>



                {/* THUMBNAILS */}

                <div className="product-thumbnails">


                  {[
                    product.image,
                    product.image,
                    product.image
                  ].map(
                    (
                      image,
                      index
                    ) => (

                      <motion.button

                        key={index}

                        type="button"

                        className={
                          `product-thumb ${
                            index === 0
                              ? "active"
                              : ""
                          }`
                        }

                        whileHover={{
                          y: -4
                        }}

                        whileTap={{
                          scale: 0.94
                        }}

                      >

                        <img
                          src={image}
                          alt={product.name}
                        />

                      </motion.button>

                    )
                  )}


                </div>


              </motion.div>


            </div>



            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="col-lg-6">


              <motion.div

                className="product-detail-info"

                initial="hidden"

                animate="visible"

                variants={{

                  hidden: {},

                  visible: {

                    transition: {
                      staggerChildren: 0.09
                    }

                  }

                }}

              >


                {/* STORE */}

                <motion.div

                  className="details-store"

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

                  <span className="details-store-icon">

                    <i className="bi bi-shop"></i>

                  </span>


                  <span>

                    <small>
                      Sold by
                    </small>

                    <strong>
                      {product.store}
                    </strong>

                  </span>


                  <i className="bi bi-patch-check-fill verified-store"></i>

                </motion.div>



                {/* TITLE */}

                <motion.h1

                  className="details-product-title"

                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30
                    },
                    visible: {
                      opacity: 1,
                      y: 0
                    }
                  }}

                >

                  {product.name}

                </motion.h1>



                {/* RATING */}

                <motion.div

                  className="details-rating"

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

                  <div className="details-stars">

                    {[1,2,3,4,5].map(
                      star => (

                        <i
                          key={star}
                          className="bi bi-star-fill"
                        ></i>

                      )
                    )}

                  </div>


                  <strong>

                    {product.rating}

                  </strong>


                  <span>

                    {product.reviews} reviews

                  </span>


                  <span className="details-divider">

                    |

                  </span>


                  <span className="stock-status">

                    <i className="bi bi-check-circle-fill"></i>

                    {" "}{product.stock}

                  </span>


                </motion.div>



                {/* PRICE */}

                <motion.div

                  className="details-price"

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

                  <strong>

                    ${product.price.toLocaleString()}

                  </strong>


                  {product.oldPrice && (

                    <del>

                      ${product.oldPrice.toLocaleString()}

                    </del>

                  )}


                  {product.oldPrice && (

                    <span>

                      Save ${saving}

                    </span>

                  )}


                </motion.div>



                {/* DESCRIPTION */}

                <motion.p

                  className="details-description"

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

                  {product.description}

                </motion.p>



                {/* FEATURES */}

                <motion.div

                  className="details-features"

                  variants={{
                    hidden: {
                      opacity: 0
                    },
                    visible: {
                      opacity: 1
                    }
                  }}

                >


                  {product.features.map(
                    feature => (

                      <motion.span

                        key={feature.text}

                        whileHover={{
                          y: -3,
                          scale: 1.03
                        }}

                      >

                        <i
                          className={
                            `bi ${feature.icon}`
                          }
                        ></i>

                        {feature.text}

                      </motion.span>

                    )
                  )}


                </motion.div>



                {/* COLOR */}

                <motion.div

                  className="details-option"

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


                  <div className="details-option-header">

                    <strong>
                      Color
                    </strong>

                    <span>

                      {selectedColor}

                    </span>

                  </div>



                  <div className="color-options">


                    {[
                      {
                        name: "Black",
                        className:
                          "color-black"
                      },

                      {
                        name: "Purple",
                        className:
                          "color-purple"
                      },

                      {
                        name: "Silver",
                        className:
                          "color-silver"
                      }

                    ].map(
                      color => (

                        <motion.button

                          key={color.name}

                          type="button"

                          className={
                            `color-option ${color.className} ${
                              selectedColor ===
                              color.name
                                ? "active"
                                : ""
                            }`
                          }

                          whileHover={{
                            scale: 1.12
                          }}

                          whileTap={{
                            scale: 0.9
                          }}

                          onClick={
                            () =>
                              setSelectedColor(
                                color.name
                              )
                          }

                        />

                      )
                    )}


                  </div>


                </motion.div>



                {/* QUANTITY */}

                <motion.div

                  className="details-option"

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

                  <strong>
                    Quantity
                  </strong>


                  <div className="quantity-control">


                    <motion.button

                      type="button"

                      whileTap={{
                        scale: 0.85
                      }}

                      onClick={
                        () =>
                          setQuantity(
                            current =>
                              Math.max(
                                1,
                                current - 1
                              )
                          )
                      }

                    >

                      <i className="bi bi-dash"></i>

                    </motion.button>


                    <AnimatePresence mode="wait">

                      <motion.span

                        key={quantity}

                        initial={{
                          opacity: 0,
                          y: -5
                        }}

                        animate={{
                          opacity: 1,
                          y: 0
                        }}

                        exit={{
                          opacity: 0,
                          y: 5
                        }}

                      >

                        {quantity}

                      </motion.span>

                    </AnimatePresence>


                    <motion.button

                      type="button"

                      whileTap={{
                        scale: 0.85
                      }}

                      onClick={
                        () =>
                          setQuantity(
                            current =>
                              current + 1
                          )
                      }

                    >

                      <i className="bi bi-plus"></i>

                    </motion.button>


                  </div>


                </motion.div>



                {/* ACTIONS */}

                <motion.div

                  className="details-actions"

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


                  <motion.button

                    type="button"

                    className={
                      `details-cart-btn ${
                        added
                          ? "added"
                          : ""
                      }`
                    }

                    whileHover={{
                      scale: 1.02
                    }}

                    whileTap={{
                      scale: 0.96
                    }}

                    onClick={
                      addToCart
                    }

                  >

                    {added ? (

                      <>
                        <i className="bi bi-check-lg"></i>
                        Added
                      </>

                    ) : (

                      <>
                        <i className="bi bi-bag-plus"></i>
                        Add to cart
                      </>

                    )}

                  </motion.button>



                  <motion.button

                    type="button"

                    className="details-buy-btn"

                    whileHover={{
                      scale: 1.02
                    }}

                    whileTap={{
                      scale: 0.96
                    }}

                  >

                    Buy now

                  </motion.button>


                </motion.div>



                {/* SERVICE */}

                <motion.div

                  className="details-service-box"

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


                  <div className="details-service-item">

                    <span>
                      <i className="bi bi-truck"></i>
                    </span>

                    <div>
                      <strong>
                        Free delivery
                      </strong>

                      <small>
                        On orders over $50
                      </small>
                    </div>

                  </div>


                  <div className="details-service-item">

                    <span>
                      <i className="bi bi-arrow-repeat"></i>
                    </span>

                    <div>
                      <strong>
                        Easy returns
                      </strong>

                      <small>
                        Return within 30 days
                      </small>
                    </div>

                  </div>


                  <div className="details-service-item">

                    <span>
                      <i className="bi bi-shield-check"></i>
                    </span>

                    <div>
                      <strong>
                        Secure payment
                      </strong>

                      <small>
                        Protected checkout
                      </small>
                    </div>

                  </div>


                </motion.div>


              </motion.div>


            </div>


          </div>


        </div>


      </section>



      {/* =====================================================
          INFORMATION TABS
      ===================================================== */}

      <section className="product-info-section">


        <div className="container">


          <motion.div

            className="product-info-card"

            initial={{
              opacity: 0,
              y: 45
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            viewport={{
              once: true,
              amount: 0.2
            }}

          >


            <div className="details-tabs">


              {[
                {
                  id: "description",
                  label: "Description"
                },

                {
                  id: "specifications",
                  label: "Specifications"
                },

                {
                  id: "reviews",
                  label:
                    `Reviews (${product.reviews})`
                }

              ].map(
                tab => (

                  <button

                    key={tab.id}

                    type="button"

                    className={
                      `details-tab ${
                        activeTab ===
                        tab.id
                          ? "active"
                          : ""
                      }`
                    }

                    onClick={
                      () =>
                        setActiveTab(
                          tab.id
                        )
                    }

                  >

                    {tab.label}

                  </button>

                )
              )}


            </div>



            <AnimatePresence mode="wait">


              {/* DESCRIPTION */}

              {activeTab ===
              "description" && (

                <motion.div

                  key="description"

                  className="details-tab-content active"

                  initial={{
                    opacity: 0,
                    y: 15
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  exit={{
                    opacity: 0,
                    y: -10
                  }}

                >

                  <h3>

                    About this product

                  </h3>


                  <p>

                    {product.description}

                  </p>


                  <div className="description-benefits">


                    {product.features.map(
                      feature => (

                        <div key={feature.text}>

                          <i className="bi bi-check2"></i>

                          {feature.text}

                        </div>

                      )
                    )}


                  </div>


                </motion.div>

              )}



              {/* SPECS */}

              {activeTab ===
              "specifications" && (

                <motion.div

                  key="specifications"

                  className="details-tab-content active"

                  initial={{
                    opacity: 0,
                    y: 15
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  exit={{
                    opacity: 0,
                    y: -10
                  }}

                >

                  <div className="specifications-grid">


                    {Object.entries(
                      product.specifications
                    ).map(
                      (
                        [
                          key,
                          value
                        ]
                      ) => (

                        <div key={key}>

                          <span>
                            {key}
                          </span>

                          <strong>
                            {value}
                          </strong>

                        </div>

                      )
                    )}


                  </div>


                </motion.div>

              )}



              {/* REVIEWS */}

              {activeTab ===
              "reviews" && (

                <motion.div

                  key="reviews"

                  className="details-tab-content active"

                  initial={{
                    opacity: 0,
                    y: 15
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  exit={{
                    opacity: 0,
                    y: -10
                  }}

                >

                  <div className="review-score">


                    <strong>

                      {product.rating}

                    </strong>


                    <div>

                      <div className="details-stars">

                        {[1,2,3,4,5].map(
                          star => (

                            <i
                              key={star}
                              className="bi bi-star-fill"
                            ></i>

                          )
                        )}

                      </div>


                      <span>

                        Based on {product.reviews} reviews

                      </span>

                    </div>


                  </div>


                </motion.div>

              )}


            </AnimatePresence>


          </motion.div>


        </div>


      </section>



      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      <section className="related-products section">


        <div className="container">


          <div className="section-head">


            <div>

              <span className="section-label">

                You may also like

              </span>


              <h2 className="section-title">

                Related products

              </h2>

            </div>


            <Link
              to="/products"
              className="view-all"
            >

              View all

              <i className="bi bi-arrow-right ms-2"></i>

            </Link>


          </div>



          <div className="row g-4">


            {relatedProducts.map(
              (
                item,
                index
              ) => (

                <motion.div

                  className="col-sm-6 col-lg-4"

                  key={item.name}

                  initial={{
                    opacity: 0,
                    y: 45
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}

                  viewport={{
                    once: true
                  }}

                  transition={{
                    delay:
                      index * 0.12
                  }}

                >


                  <motion.article

                    className="product-card"

                    whileHover={{
                      y: -8
                    }}

                    onClick={
                      () =>
                        navigate(
                          `/product/${encodeURIComponent(
                            item.name
                          )}`
                        )
                    }

                    style={{
                      cursor: "pointer"
                    }}

                  >


                    <div className="product-img">

                      {item.discount && (

                        <span
                          className={
                            `product-tag ${
                              item.discount ===
                              "New"
                                ? "tag-new"
                                : ""
                            }`
                          }
                        >

                          {item.discount}

                        </span>

                      )}


                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>


                    <div className="product-body">

                      <span className="product-store">

                        {item.store}

                      </span>


                      <h3 className="product-name">

                        {item.name}

                      </h3>


                      <div className="product-rating">

                        <i className="bi bi-star-fill"></i>

                        {" "}
                        {item.rating}

                        <span>

                          ({item.reviews})

                        </span>

                      </div>


                      <div className="product-footer">

                        <div className="product-price">

                          ${item.price}

                        </div>


                        <button
                          className="add-btn"
                          type="button"
                        >

                          <i className="bi bi-arrow-right"></i>

                        </button>

                      </div>

                    </div>


                  </motion.article>


                </motion.div>

              )
            )}


          </div>


        </div>


      </section>


    </main>

  );

}


export default ProductDetails;