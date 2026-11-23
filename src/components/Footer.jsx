function Footer() {

  return (

    <footer className="vendra-footer">

      <div className="container-fluid px-4 px-lg-5">

        <div className="footer-shell">


          <div className="footer-newsletter">


            <div>

              <h3>

                Get the best deals first

              </h3>


              <p>

                Subscribe and receive weekly offers
                from your favorite stores.

              </p>

            </div>


            <form
              className="newsletter-form"
              onSubmit={
                event =>
                  event.preventDefault()
              }
            >

              <input
                type="email"
                placeholder="Your email address"
              />

              <button type="submit">

                Subscribe

              </button>

            </form>


          </div>



          <div className="row g-4 footer-links">


            <div className="col-lg-4">


              <a
                className="vendra-logo footer-logo"
                href="#"
              >

                <span className="logo-mark">

                  V

                </span>

                Vendra

              </a>


              <p className="footer-about">

                One marketplace that brings
                trusted stores and happy shoppers
                together.

              </p>


              <div className="footer-social">

                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>

                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>

                <a href="#">
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a href="#">
                  <i className="bi bi-tiktok"></i>
                </a>

              </div>


            </div>



            <div className="col-6 col-lg-2">

              <h4>
                Shop
              </h4>

              <ul>

                <li>
                  <a href="#products">
                    Products
                  </a>
                </li>

                <li>
                  <a href="#stores">
                    Stores
                  </a>
                </li>

                <li>
                  <a href="#">
                    Deals
                  </a>
                </li>

              </ul>

            </div>



            <div className="col-6 col-lg-2">

              <h4>
                Sell
              </h4>

              <ul>

                <li>
                  <a href="#">
                    Open a store
                  </a>
                </li>

                <li>
                  <a href="#">
                    Seller center
                  </a>
                </li>

              </ul>

            </div>



            <div className="col-6 col-lg-2">

              <h4>
                Help
              </h4>

              <ul>

                <li>
                  <a href="#">
                    FAQ
                  </a>
                </li>

                <li>
                  <a href="#">
                    Shipping
                  </a>
                </li>

                <li>
                  <a href="#">
                    Returns
                  </a>
                </li>

              </ul>

            </div>



            <div className="col-6 col-lg-2">

              <h4>
                Company
              </h4>

              <ul>

                <li>
                  <a href="#">
                    About
                  </a>
                </li>

                <li>
                  <a href="#">
                    Privacy
                  </a>
                </li>

              </ul>

            </div>


          </div>



          <div className="footer-bottom">


            <span>

              © 2026 Vendra.
              All rights reserved.

            </span>


            <span>

              Made with

              <i className="bi bi-heart-fill mx-1"></i>

              for shoppers

            </span>


          </div>


        </div>

      </div>

    </footer>

  );

}

export default Footer;