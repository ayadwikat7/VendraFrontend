import {
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

const PRODUCTS = [

  {
    id: 1,
    name: "Wireless Headphones",
    store: "SoundHub",
    category: "electronics",
    price: 79,
    oldPrice: 99,
    rating: 4.8,
    reviews: 214,
    sale: true,
    tag: "-20%",
    image: "/images/headPhone.png"
  },

  {
    id: 2,
    name: "Classic Women Watch",
    store: "Timeless Co.",
    category: "accessories",
    price: 129,
    oldPrice: null,
    rating: 4.9,
    reviews: 98,
    sale: false,
    tag: null,
    image: "/images/whtcheswoman.png"
  },

  {
    id: 3,
    name: "Running Sneakers",
    store: "Stride",
    category: "fashion",
    price: 95,
    oldPrice: null,
    rating: 4.7,
    reviews: 321,
    sale: false,
    tag: "New",
    image: "/images/choo.png"
  },

  {
    id: 4,
    name: "Summer Sunglasses",
    store: "Optica",
    category: "accessories",
    price: 45,
    oldPrice: null,
    rating: 4.6,
    reviews: 76,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"
  },

  {
    id: 5,
    name: "Instant Camera",
    store: "SnapShop",
    category: "electronics",
    price: 110,
    oldPrice: null,
    rating: 4.5,
    reviews: 142,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80"
  },

  {
    id: 6,
    name: "Urban Backpack",
    store: "Urban Wear",
    category: "fashion",
    price: 65,
    oldPrice: null,
    rating: 4.7,
    reviews: 188,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
  },

  {
    id: 7,
    name: "Pro Laptop",
    store: "TechZone",
    category: "electronics",
    price: 1199,
    oldPrice: null,
    rating: 4.9,
    reviews: 64,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80"
  },

  {
    id: 8,
    name: "Floral Perfume",
    store: "Glow Beauty",
    category: "beauty",
    price: 58,
    oldPrice: 68,
    rating: 4.8,
    reviews: 230,
    sale: true,
    tag: "-15%",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80"
  },

  {
    id: 9,
    name: "Wooden Chair",
    store: "HomeNest",
    category: "home",
    price: 149,
    oldPrice: null,
    rating: 4.4,
    reviews: 51,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80"
  },

  {
    id: 10,
    name: "Mini Plant",
    store: "Green Corner",
    category: "home",
    price: 22,
    oldPrice: null,
    rating: 4.6,
    reviews: 119,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80"
  },

  {
    id: 11,
    name: "Basic White Tee",
    store: "Urban Wear",
    category: "fashion",
    price: 19,
    oldPrice: null,
    rating: 4.3,
    reviews: 402,
    sale: false,
    tag: null,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
  },

  {
    id: 12,
    name: "Makeup Set",
    store: "Glow Beauty",
    category: "beauty",
    price: 39,
    oldPrice: null,
    rating: 4.7,
    reviews: 87,
    sale: false,
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80"
  }

];


const CATEGORIES = [

  {
    id: "all",
    label: "All",
    icon: "bi-grid"
  },

  {
    id: "electronics",
    label: "Electronics",
    icon: "bi-laptop"
  },

  {
    id: "fashion",
    label: "Fashion",
    icon: "bi-handbag"
  },

  {
    id: "beauty",
    label: "Beauty",
    icon: "bi-flower1"
  },

  {
    id: "home",
    label: "Home",
    icon: "bi-house"
  },

  {
    id: "accessories",
    label: "Accessories",
    icon: "bi-watch"
  }

];


function Products() {

    const navigate =
  useNavigate();
  // =========================================================
  // STATE
  // =========================================================

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [selectedStores, setSelectedStores] =
    useState([]);

  const [saleOnly, setSaleOnly] =
    useState(false);

  const [sort, setSort] =
    useState("featured");

  const [view, setView] =
    useState("grid");

  const [limit, setLimit] =
    useState(9);

  const [wishlist, setWishlist] =
    useState([]);

  const [addedProduct, setAddedProduct] =
    useState(null);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);


  // =========================================================
  // STORES
  // =========================================================

  const stores =
    useMemo(
      () => {

        return [
          ...new Set(
            PRODUCTS.map(
              product =>
                product.store
            )
          )
        ].sort();

      },
      []
    );


  // =========================================================
  // CATEGORY COUNT
  // =========================================================

  const getCategoryCount =
    categoryId => {

      if (
        categoryId === "all"
      ) {

        return PRODUCTS.length;

      }

      return PRODUCTS.filter(
        product =>
          product.category ===
          categoryId
      ).length;

    };


  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  const filteredProducts =
    useMemo(
      () => {

        let result =
          PRODUCTS.filter(
            product => {

              const searchableText =
                (
                  product.name +
                  " " +
                  product.store
                ).toLowerCase();


              const matchesSearch =
                searchableText.includes(
                  search
                    .trim()
                    .toLowerCase()
                );


              const matchesCategory =
                category === "all"
                ||
                product.category ===
                  category;


              const matchesMin =
                minPrice === ""
                ||
                product.price >=
                  Number(minPrice);


              const matchesMax =
                maxPrice === ""
                ||
                product.price <=
                  Number(maxPrice);


              const matchesRating =
                product.rating >=
                Number(rating);


              const matchesStore =
                selectedStores.length === 0
                ||
                selectedStores.includes(
                  product.store
                );


              const matchesSale =
                !saleOnly
                ||
                product.sale;


              return (
                matchesSearch
                &&
                matchesCategory
                &&
                matchesMin
                &&
                matchesMax
                &&
                matchesRating
                &&
                matchesStore
                &&
                matchesSale
              );

            }
          );


        result =
          [...result];


        switch (sort) {

          case "price-asc":

            result.sort(
              (a, b) =>
                a.price - b.price
            );

            break;


          case "price-desc":

            result.sort(
              (a, b) =>
                b.price - a.price
            );

            break;


          case "rating":

            result.sort(
              (a, b) =>
                b.rating - a.rating
            );

            break;


          default:

            result.sort(
              (a, b) =>
                a.id - b.id
            );

        }


        return result;

      },
      [
        search,
        category,
        minPrice,
        maxPrice,
        rating,
        selectedStores,
        saleOnly,
        sort
      ]
    );


  const visibleProducts =
    filteredProducts.slice(
      0,
      limit
    );


  // =========================================================
  // FILTER COUNT
  // =========================================================

  const activeFilterCount =

    (search ? 1 : 0)

    +

    (
      category !== "all"
        ? 1
        : 0
    )

    +

    (
      minPrice !== ""
      ||
      maxPrice !== ""
        ? 1
        : 0
    )

    +

    (
      Number(rating) > 0
        ? 1
        : 0
    )

    +

    selectedStores.length

    +

    (
      saleOnly
        ? 1
        : 0
    );


  // =========================================================
  // RESET
  // =========================================================

  const resetFilters = () => {

    setSearch("");

    setCategory("all");

    setMinPrice("");

    setMaxPrice("");

    setRating(0);

    setSelectedStores([]);

    setSaleOnly(false);

    setLimit(9);

  };


  // =========================================================
  // QUICK PRICE
  // =========================================================

  const setQuickPrice =
    (
      min,
      max
    ) => {

      setMinPrice(
        min === null
          ? ""
          : String(min)
      );

      setMaxPrice(
        max === null
          ? ""
          : String(max)
      );

      setLimit(9);

    };


  // =========================================================
  // STORE FILTER
  // =========================================================

  const toggleStore =
    store => {

      setSelectedStores(
        current => {

          if (
            current.includes(
              store
            )
          ) {

            return current.filter(
              item =>
                item !== store
            );

          }

          return [
            ...current,
            store
          ];

        }
      );

      setLimit(9);

    };


  // =========================================================
  // WISHLIST
  // =========================================================

  const toggleWishlist =
    productId => {

      setWishlist(
        current => {

          if (
            current.includes(
              productId
            )
          ) {

            return current.filter(
              id =>
                id !== productId
            );

          }

          return [
            ...current,
            productId
          ];

        }
      );

    };


  // =========================================================
  // CART
  // =========================================================

  const addToCart =
    product => {

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


      const existingItem =
        cart.find(
          item =>
            item.name ===
            product.name
        );


      if (existingItem) {

        existingItem.quantity += 1;

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
            1

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


      setAddedProduct(
        product.id
      );


      setTimeout(
        () => {

          setAddedProduct(null);

        },
        1100
      );

    };


  // =========================================================
  // ACTIVE FILTER LABELS
  // =========================================================

  const activeFilters = [];


  if (search) {

    activeFilters.push({

      id: "search",

      label:
        `"${search}"`,

      remove:
        () =>
          setSearch("")

    });

  }


  if (
    category !== "all"
  ) {

    activeFilters.push({

      id: "category",

      label:
        CATEGORIES.find(
          item =>
            item.id === category
        )?.label,

      remove:
        () =>
          setCategory("all")

    });

  }


  if (
    minPrice !== ""
    ||
    maxPrice !== ""
  ) {

    activeFilters.push({

      id: "price",

      label:
        `$${minPrice || 0} – ${
          maxPrice
            ? "$" + maxPrice
            : "any"
        }`,

      remove:
        () => {

          setMinPrice("");
          setMaxPrice("");

        }

    });

  }


  if (
    Number(rating) > 0
  ) {

    activeFilters.push({

      id: "rating",

      label:
        `${rating}+ stars`,

      remove:
        () =>
          setRating(0)

    });

  }


  selectedStores.forEach(
    store => {

      activeFilters.push({

        id:
          `store-${store}`,

        label:
          store,

        remove:
          () =>
            toggleStore(store)

      });

    }
  );


  if (saleOnly) {

    activeFilters.push({

      id: "sale",

      label:
        "On sale",

      remove:
        () =>
          setSaleOnly(false)

    });

  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <main>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="shop-header">


        <div className="container">


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

              Products

            </span>

          </motion.nav>



          <div className="shop-header-row">


            <motion.div

              initial={{
                opacity: 0,
                y: 35
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

              <h1 className="shop-title">

                All products

              </h1>


              <p className="shop-subtitle">

                Find what you need from
                trusted stores — fast.

              </p>

            </motion.div>



            {/* SEARCH */}

            <motion.div

              className="shop-search"

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
                delay: 0.1
              }}

              whileFocusWithin={{
                scale: 1.02
              }}

            >

              <i className="bi bi-search"></i>


              <input

                type="search"

                placeholder="Search products or stores..."

                value={search}

                onChange={
                  event => {

                    setSearch(
                      event.target.value
                    );

                    setLimit(9);

                  }
                }

              />


              <AnimatePresence>

                {search && (

                  <motion.button

                    type="button"

                    className="search-clear"

                    aria-label="Clear search"

                    initial={{
                      opacity: 0,
                      scale: 0.5
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1
                    }}

                    exit={{
                      opacity: 0,
                      scale: 0.5
                    }}

                    onClick={
                      () =>
                        setSearch("")
                    }

                  >

                    <i className="bi bi-x-lg"></i>

                  </motion.button>

                )}

              </AnimatePresence>


            </motion.div>


          </div>



          {/* =================================================
              CATEGORIES
          ================================================= */}

          <motion.div

            className="category-chips"

            initial="hidden"

            animate="visible"

            variants={{

              hidden: {},

              visible: {

                transition: {
                  staggerChildren: 0.07
                }

              }

            }}

          >


            {CATEGORIES.map(
              item => (

                <motion.button

                  key={item.id}

                  type="button"

                  className={
                    `cat-chip ${
                      category === item.id
                        ? "active"
                        : ""
                    }`
                  }

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

                  whileHover={{
                    y: -3
                  }}

                  whileTap={{
                    scale: 0.95
                  }}

                  onClick={
                    () => {

                      setCategory(
                        item.id
                      );

                      setLimit(9);

                    }
                  }

                >

                  <i
                    className={
                      `bi ${item.icon}`
                    }
                  ></i>


                  {item.label}


                  <span className="chip-count">

                    {
                      getCategoryCount(
                        item.id
                      )
                    }

                  </span>


                </motion.button>

              )
            )}


          </motion.div>


        </div>


      </section>



      {/* =====================================================
          PRODUCTS AREA
      ===================================================== */}

      <section className="shop-section">


        <div className="container">


          <div className="row g-4">


            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="col-lg-3">


              {/* MOBILE OVERLAY */}

              {mobileFiltersOpen && (

                <div
                  className="products-filter-backdrop d-lg-none"
                  onClick={
                    () =>
                      setMobileFiltersOpen(false)
                  }
                ></div>

              )}


              <motion.aside

                className={
                  `react-filter-panel ${
                    mobileFiltersOpen
                      ? "mobile-open"
                      : ""
                  }`
                }

                initial={{
                  opacity: 0,
                  x: -30
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  duration: 0.6
                }}

              >


                <div className="filters">


                  <div className="filters-top">

                    <h4>

                      <i className="bi bi-sliders"></i>

                      Filters

                    </h4>


                    <button

                      type="button"

                      className="link-btn"

                      onClick={
                        resetFilters
                      }

                    >

                      Reset all

                    </button>

                  </div>



                  {/* PRICE */}

                  <div className="filter-group">

                    <h5>
                      Price
                    </h5>


                    <div className="price-inputs">


                      <label>

                        <span>
                          Min
                        </span>

                        <input

                          type="number"

                          placeholder="$0"

                          min="0"

                          value={minPrice}

                          onChange={
                            event => {

                              setMinPrice(
                                event.target.value
                              );

                              setLimit(9);

                            }
                          }

                        />

                      </label>


                      <span className="price-dash">

                        —

                      </span>


                      <label>

                        <span>
                          Max
                        </span>

                        <input

                          type="number"

                          placeholder="$1200"

                          min="0"

                          value={maxPrice}

                          onChange={
                            event => {

                              setMaxPrice(
                                event.target.value
                              );

                              setLimit(9);

                            }
                          }

                        />

                      </label>


                    </div>



                    <div className="quick-prices">


                      <button

                        type="button"

                        className="price-pill"

                        onClick={
                          () =>
                            setQuickPrice(
                              0,
                              50
                            )
                        }

                      >

                        Under $50

                      </button>


                      <button

                        type="button"

                        className="price-pill"

                        onClick={
                          () =>
                            setQuickPrice(
                              50,
                              150
                            )
                        }

                      >

                        $50 – $150

                      </button>


                      <button

                        type="button"

                        className="price-pill"

                        onClick={
                          () =>
                            setQuickPrice(
                              150,
                              null
                            )
                        }

                      >

                        $150+

                      </button>


                    </div>


                  </div>



                  {/* RATING */}

                  <div className="filter-group">


                    <h5>
                      Rating
                    </h5>


                    <div className="rating-pills">


                      {[
                        0,
                        4.5,
                        4.8
                      ].map(
                        value => (

                          <label
                            className="rating-pill"
                            key={value}
                          >

                            <input

                              type="radio"

                              name="rating"

                              value={value}

                              checked={
                                Number(rating) ===
                                value
                              }

                              onChange={
                                () => {

                                  setRating(
                                    value
                                  );

                                  setLimit(9);

                                }
                              }

                            />


                            <span>

                              {
                                value === 0
                                  ? "Any"
                                  : (
                                    <>
                                      <i className="bi bi-star-fill"></i>
                                      {" "}
                                      {value}+
                                    </>
                                  )
                              }

                            </span>


                          </label>

                        )
                      )}


                    </div>


                  </div>



                  {/* STORES */}

                  <div className="filter-group">


                    <h5>
                      Stores
                    </h5>


                    <div className="store-checks">


                      {stores.map(
                        store => {

                          const count =
                            PRODUCTS.filter(
                              product =>
                                product.store ===
                                store
                            ).length;


                          const checked =
                            selectedStores.includes(
                              store
                            );


                          return (

                            <label
                              className="store-check"
                              key={store}
                            >

                              <input

                                type="checkbox"

                                checked={checked}

                                onChange={
                                  () =>
                                    toggleStore(
                                      store
                                    )
                                }

                              />


                              <span className="check-box">

                                <i className="bi bi-check"></i>

                              </span>


                              <span className="store-check-name">

                                {store}

                              </span>


                              <span className="store-check-count">

                                {count}

                              </span>


                            </label>

                          );

                        }
                      )}


                    </div>


                  </div>



                  {/* SALE */}

                  <div className="filter-group border-0 mb-0 pb-0">


                    <label className="switch-row">


                      <span>

                        <strong>

                          On sale only

                        </strong>

                        <small>

                          Show discounted products

                        </small>

                      </span>


                      <span className="form-check form-switch m-0">

                        <input

                          className="form-check-input"

                          type="checkbox"

                          checked={saleOnly}

                          onChange={
                            event => {

                              setSaleOnly(
                                event.target.checked
                              );

                              setLimit(9);

                            }
                          }

                        />

                      </span>


                    </label>


                  </div>



                  <button

                    type="button"

                    className="btn btn-vendra w-100 mt-4 d-lg-none"

                    onClick={
                      () =>
                        setMobileFiltersOpen(false)
                    }

                  >

                    Show {filteredProducts.length} results

                  </button>


                </div>


              </motion.aside>


            </div>



            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div className="col-lg-9">


              {/* TOOLBAR */}

              <div className="shop-toolbar">


                <div className="toolbar-left">


                  <button

                    className="btn btn-vendra-outline btn-sm-pill d-lg-none"

                    type="button"

                    onClick={
                      () =>
                        setMobileFiltersOpen(true)
                    }

                  >

                    <i className="bi bi-sliders"></i>

                    {" "}Filters


                    {activeFilterCount > 0 && (

                      <span className="filter-badge">

                        {activeFilterCount}

                      </span>

                    )}


                  </button>


                  <p className="result-text">

                    <strong>

                      {filteredProducts.length}

                    </strong>

                    {" "}products found

                  </p>


                </div>



                <div className="toolbar-right">


                  <select

                    className="form-select sort-select"

                    value={sort}

                    onChange={
                      event =>
                        setSort(
                          event.target.value
                        )
                    }

                  >

                    <option value="featured">
                      Featured
                    </option>

                    <option value="price-asc">
                      Price: Low to High
                    </option>

                    <option value="price-desc">
                      Price: High to Low
                    </option>

                    <option value="rating">
                      Top rated
                    </option>

                  </select>



                  <div className="view-toggle">


                    <button

                      type="button"

                      className={
                        `view-btn ${
                          view === "grid"
                            ? "active"
                            : ""
                        }`
                      }

                      onClick={
                        () =>
                          setView("grid")
                      }

                    >

                      <i className="bi bi-grid-3x3-gap"></i>

                    </button>


                    <button

                      type="button"

                      className={
                        `view-btn ${
                          view === "list"
                            ? "active"
                            : ""
                        }`
                      }

                      onClick={
                        () =>
                          setView("list")
                      }

                    >

                      <i className="bi bi-list-ul"></i>

                    </button>


                  </div>


                </div>


              </div>



              {/* ===============================================
                  ACTIVE FILTERS
              =============================================== */}

              <AnimatePresence>


                {activeFilters.length > 0 && (

                  <motion.div

                    className="active-filters"

                    initial={{
                      opacity: 0,
                      y: -10
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


                    {activeFilters.map(
                      filter => (

                        <motion.button

                          layout

                          key={filter.id}

                          type="button"

                          className="active-tag"

                          initial={{
                            opacity: 0,
                            scale: 0.8
                          }}

                          animate={{
                            opacity: 1,
                            scale: 1
                          }}

                          exit={{
                            opacity: 0,
                            scale: 0.7
                          }}

                          onClick={
                            filter.remove
                          }

                        >

                          {filter.label}

                          <i className="bi bi-x"></i>

                        </motion.button>

                      )
                    )}


                    <button

                      type="button"

                      className="link-btn"

                      onClick={
                        resetFilters
                      }

                    >

                      Clear all

                    </button>


                  </motion.div>

                )}


              </AnimatePresence>



              {/* ===============================================
                  PRODUCTS GRID
              =============================================== */}

              {filteredProducts.length > 0 ? (

                <motion.div

                  layout

                  className={
                    `row g-4 products-grid ${
                      view === "list"
                        ? "list-view"
                        : ""
                    }`
                  }

                >


                  <AnimatePresence mode="popLayout">


                    {visibleProducts.map(
                      (
                        product,
                        index
                      ) => (

                        <motion.div

                          layout

                          key={product.id}

                          className="col-sm-6 col-xl-4 product-item"

                          initial={{
                            opacity: 0,
                            y: 45,
                            scale: 0.94
                          }}

                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                          }}

                          exit={{
                            opacity: 0,
                            scale: 0.88,
                            y: 25
                          }}

                          transition={{
                            duration: 0.45,
                            delay:
                              Math.min(
                                index * 0.04,
                                0.25
                              ),
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1
                            ]
                          }}

                        >


                        <motion.article

  className="shop-card"

  whileHover={{
    y: -7
  }}

  transition={{
    duration: 0.25
  }}

  onClick={
    () =>
      navigate(
        `/product/${encodeURIComponent(
          product.name
        )}`
      )
  }

>


                            {/* IMAGE */}

                            <div className="shop-card-img">


                              {product.tag && (

                                <span
                                  className={
                                    `product-tag ${
                                      product.tag === "New"
                                        ? "tag-new"
                                        : ""
                                    }`
                                  }
                                >

                                  {product.tag}

                                </span>

                              )}



                              <motion.button

                                type="button"

                                className={
                                  `wish-btn ${
                                    wishlist.includes(
                                      product.id
                                    )
                                      ? "active"
                                      : ""
                                  }`
                                }

                                whileHover={{
                                  scale: 1.12
                                }}

                                whileTap={{
                                  scale: 0.85
                                }}

                               onClick={
  event => {

    event.stopPropagation();

    toggleWishlist(
      product.id
    );

  }
}

                              >

                                <i
                                  className={
                                    wishlist.includes(
                                      product.id
                                    )
                                      ? "bi bi-heart-fill"
                                      : "bi bi-heart"
                                  }
                                ></i>

                              </motion.button>



                              <motion.img

                                src={product.image}

                                alt={product.name}

                                loading="lazy"

                                whileHover={{
                                  scale: 1.07
                                }}

                                transition={{
                                  duration: 0.5
                                }}

                              />


                            </div>



                            {/* BODY */}

                            <div className="shop-card-body">


                              <span className="shop-card-store">

                                <i className="bi bi-patch-check-fill"></i>

                                {" "}

                                {product.store}

                              </span>



                              <h3 className="shop-card-name">

                                {product.name}

                              </h3>



                              <div className="shop-card-rating">

                                <i className="bi bi-star-fill"></i>

                                {" "}

                                {product.rating}

                                <span>

                                  {" "}
                                  ({product.reviews} reviews)

                                </span>

                              </div>



                              <div className="shop-card-price">

                                <strong>

                                  ${product.price.toLocaleString()}

                                </strong>


                                {product.oldPrice && (

                                  <del>

                                    ${product.oldPrice}

                                  </del>

                                )}

                              </div>



                              <span className="shop-card-delivery">

                                <i className="bi bi-truck"></i>

                                {" "}Free delivery

                              </span>



                              <motion.button

                                type="button"

                                className={
                                  `cart-btn ${
                                    addedProduct ===
                                    product.id
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
  event => {

    event.stopPropagation();

    addToCart(
      product
    );

  }
}

                              >


                                <AnimatePresence
                                  mode="wait"
                                >


                                  {addedProduct ===
                                  product.id ? (

                                    <motion.span

                                      key="added"

                                      initial={{
                                        opacity: 0,
                                        y: 5
                                      }}

                                      animate={{
                                        opacity: 1,
                                        y: 0
                                      }}

                                      exit={{
                                        opacity: 0
                                      }}

                                    >

                                      <i className="bi bi-check-lg"></i>

                                      {" "}Added

                                    </motion.span>

                                  ) : (

                                    <motion.span

                                      key="cart"

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

                                      <i className="bi bi-bag-plus"></i>

                                      {" "}Add to cart

                                    </motion.span>

                                  )}


                                </AnimatePresence>


                              </motion.button>


                            </div>


                          </motion.article>


                        </motion.div>

                      )
                    )}


                  </AnimatePresence>


                </motion.div>

              ) : (

                /* =============================================
                   EMPTY STATE
                ============================================= */

                <motion.div

                  className="no-results"

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

                    className="no-results-icon"

                    animate={{
                      y: [
                        0,
                        -8,
                        0
                      ]
                    }}

                    transition={{
                      duration: 2.5,
                      repeat: Infinity
                    }}

                  >

                    <i className="bi bi-search"></i>

                  </motion.span>


                  <h3>

                    No products match your filters

                  </h3>


                  <p>

                    Try a different word,
                    or reset the filters to
                    see everything.

                  </p>


                  <button

                    type="button"

                    className="btn btn-vendra"

                    onClick={
                      resetFilters
                    }

                  >

                    Reset filters

                  </button>


                </motion.div>

              )}



              {/* ===============================================
                  LOAD MORE
              =============================================== */}

              {filteredProducts.length > 0 && (

                <div className="load-more-wrap">


                  <p className="load-more-text">

                    You've seen

                    {" "}

                    <strong>

                      {
                        Math.min(
                          limit,
                          filteredProducts.length
                        )
                      }

                    </strong>

                    {" "}of{" "}

                    <strong>

                      {filteredProducts.length}

                    </strong>

                    {" "}products

                  </p>



                  <div className="load-more-bar">


                    <motion.span

                      animate={{

                        width:
                          `${
                            filteredProducts.length
                              ? (
                                Math.min(
                                  limit,
                                  filteredProducts.length
                                )
                                /
                                filteredProducts.length
                              ) * 100
                              : 0
                          }%`

                      }}

                      transition={{
                        duration: 0.5
                      }}

                    />


                  </div>



                  {limit <
                  filteredProducts.length && (

                    <motion.button

                      type="button"

                      className="btn btn-vendra-outline"

                      whileHover={{
                        scale: 1.04
                      }}

                      whileTap={{
                        scale: 0.96
                      }}

                      onClick={
                        () =>
                          setLimit(
                            current =>
                              current + 9
                          )
                      }

                    >

                      Load more products

                    </motion.button>

                  )}


                </div>

              )}


            </div>


          </div>


        </div>


      </section>


    </main>

  );

}


export default Products;