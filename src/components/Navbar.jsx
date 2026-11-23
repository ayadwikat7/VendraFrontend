import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  motion
} from "motion/react";


function Navbar() {

  // =========================================================
  // CART COUNT
  // =========================================================

  const getCartCount = () => {

    try {

      const cart =
        JSON.parse(
          localStorage.getItem(
            "vendraCart"
          )
          ||
          "[]"
        );


      return cart.reduce(
        (
          total,
          item
        ) => {

          return (
            total
            +
            Number(
              item.quantity || 0
            )
          );

        },
        0
      );

    } catch {

      return 0;

    }

  };


  // =========================================================
  // STATE
  // =========================================================

  const [
    cartCount,
    setCartCount
  ] = useState(
    getCartCount
  );


  const [
    scrolled,
    setScrolled
  ] = useState(false);


  const [
    menuOpen,
    setMenuOpen
  ] = useState(false);


  // =========================================================
  // NAVBAR SCROLL EFFECT
  // =========================================================

  useEffect(
    () => {

      const handleScroll = () => {

        setScrolled(
          window.scrollY > 20
        );

      };


      window.addEventListener(
        "scroll",
        handleScroll
      );


      handleScroll();


      return () => {

        window.removeEventListener(
          "scroll",
          handleScroll
        );

      };

    },
    []
  );


  // =========================================================
  // UPDATE CART COUNT
  // =========================================================

  useEffect(
    () => {

      const updateCart = () => {

        setCartCount(
          getCartCount()
        );

      };


      window.addEventListener(
        "vendra-cart-updated",
        updateCart
      );


      window.addEventListener(
        "storage",
        updateCart
      );


      return () => {

        window.removeEventListener(
          "vendra-cart-updated",
          updateCart
        );


        window.removeEventListener(
          "storage",
          updateCart
        );

      };

    },
    []
  );


  // =========================================================
  // CLOSE MOBILE MENU
  // =========================================================

  const closeMenu = () => {

    setMenuOpen(false);

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <header

      className={
        `vx-header ${
          scrolled
            ? "scrolled"
            : ""
        }`
      }

    >


      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="vx-topbar">


        <div className="container">


          <span>

            <i className="bi bi-truck"></i>

            {" "}

            Free delivery on orders over $50

          </span>



          <span className="d-none d-md-inline">

            <i className="bi bi-shield-check"></i>

            {" "}

            Secure payment & easy returns

          </span>


        </div>


      </div>



      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar navbar-expand-lg vx-nav">


        <div className="container">


          {/* =================================================
              LOGO
          ================================================= */}

          <Link

            to="/"

            className="vx-brand"

            onClick={
              closeMenu
            }

          >

            <img

              src="/images/vendra-logo.svg"

              alt="Vendra"

            />

          </Link>



          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button

            className="vx-toggler d-lg-none"

            type="button"

            aria-label="Toggle navigation"

            aria-expanded={
              menuOpen
            }

            onClick={
              () =>
                setMenuOpen(
                  current =>
                    !current
                )
            }

          >

            <span></span>

            <span></span>

            <span></span>

          </button>



          {/* =================================================
              MAIN MENU
          ================================================= */}

          <div

            className={
              `collapse navbar-collapse order-last order-lg-0 ${
                menuOpen
                  ? "show"
                  : ""
              }`
            }

          >


            <ul className="navbar-nav vx-links mx-lg-auto">


              {/* HOME */}

              <li className="nav-item">


                <Link

                  to="/"

                  className="nav-link"

                  onClick={
                    closeMenu
                  }

                >

                  <i className="bi bi-house-door"></i>

                  Home

                </Link>


              </li>



              {/* PRODUCTS */}

              <li className="nav-item">


                <Link

                  to="/products"

                  className="nav-link"

                  onClick={
                    closeMenu
                  }

                >

                  <i className="bi bi-grid"></i>

                  Products

                </Link>


              </li>



              {/* STORES */}

              <li className="nav-item">


                <a

                  href="/#stores"

                  className="nav-link"

                  onClick={
                    closeMenu
                  }

                >

                  <i className="bi bi-shop"></i>

                  Stores

                </a>


              </li>



              {/* HOW IT WORKS */}

              <li className="nav-item">


                <a

                  href="/#how"

                  className="nav-link"

                  onClick={
                    closeMenu
                  }

                >

                  <i className="bi bi-lightning-charge"></i>

                  How it works

                </a>


              </li>


            </ul>



            {/* =================================================
                MOBILE ACTIONS
            ================================================= */}

            <div className="vx-menu-actions">
<Link

  to="/login"

  className="vx-icon-btn"

  onClick={
    closeMenu
  }

>

  <i className="bi bi-person"></i>

  <span className="d-lg-none">

    Sign in

  </span>

</Link>

              {/* SEARCH */}

              <button

                type="button"

                className="vx-icon-btn"

              >

                <i className="bi bi-search"></i>


                <span className="d-lg-none">

                  Search

                </span>

              </button>



              {/* WISHLIST */}

              <button

                type="button"

                className="vx-icon-btn"

              >

                <i className="bi bi-heart"></i>


                <span className="d-lg-none">

                  Wishlist

                </span>

              </button>



              {/* MY ORDERS - MOBILE */}

              <Link

                to="/orders"

                className="vx-icon-btn"

                onClick={
                  closeMenu
                }

              >

                <i className="bi bi-box-seam"></i>


                <span className="d-lg-none">

                  My Orders

                </span>

              </Link>


            </div>


          </div>



          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="vx-right">


            {/* =================================================
                MY ORDERS - DESKTOP
            ================================================= */}

            <motion.div

              className="d-none d-lg-block"

              whileHover={{
                y: -2
              }}

              whileTap={{
                scale: 0.96
              }}

            >

              <Link

                to="/orders"

                className="vx-signin"

                onClick={
                  closeMenu
                }

              >

                <i className="bi bi-box-seam"></i>

                My Orders

              </Link>

            </motion.div>



            {/* =================================================
                CART
            ================================================= */}

            <motion.div

              whileHover={{
                scale: 1.05
              }}

              whileTap={{
                scale: 0.94
              }}

            >

              <Link

                to="/cart"

                className="vx-icon-btn vx-cart"

                aria-label="Shopping cart"

                onClick={
                  closeMenu
                }

              >

                <i className="bi bi-bag"></i>


                <motion.span

                  className="cart-count"

                  key={
                    cartCount
                  }

                  initial={{
                    scale: 1.6
                  }}

                  animate={{
                    scale: 1
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18
                  }}

                >

                  {cartCount}

                </motion.span>


              </Link>

            </motion.div>



            <span className="vx-divider d-none d-lg-block"></span>



            {/* =================================================
                SIGN IN
            ================================================= */}

           <motion.div

  className="d-none d-lg-block"

  whileHover={{
    y: -2
  }}

  whileTap={{
    scale: 0.96
  }}

>

  <Link

    to="/login"

    className="vx-signin"

    onClick={
      closeMenu
    }

  >

    <i className="bi bi-person"></i>

    Sign in

  </Link>

</motion.div>


          </div>


        </div>


      </nav>


    </header>

  );

}


export default Navbar;