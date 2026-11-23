import { motion } from "motion/react";

function ProductCard({
  name,
  store,
  image,
  price,
  oldPrice,
  rating,
  reviews,
  tag
}) {

  return (

    <motion.article
      className="product-card"

      initial={{
        opacity: 0,
        y: 35
      }}

      whileInView={{
        opacity: 1,
        y: 0
      }}

      viewport={{
        once: true,
        amount: 0.2
      }}

      transition={{
        duration: 0.45
      }}

      whileHover={{
        y: -6
      }}
    >

      <div className="product-img">


        {tag && (

          <span
            className={
              `product-tag ${
                tag === "New"
                  ? "tag-new"
                  : ""
              }`
            }
          >

            {tag}

          </span>

        )}


        <button
          className="wish-btn"
          type="button"
        >

          <i className="bi bi-heart"></i>

        </button>


        <img
          src={image}
          alt={name}
        />

      </div>


      <div className="product-body">


        <span className="product-store">

          <i className="bi bi-patch-check-fill me-1"></i>

          {store}

        </span>


        <h3 className="product-name">

          {name}

        </h3>


        <div className="product-rating">

          <i className="bi bi-star-fill"></i>

          {" "}
          {rating}

          <span>

            {" "}
            ({reviews} reviews)

          </span>

        </div>


        <div className="product-footer">


          <div className="product-price">

            ${price}

            {oldPrice && (

              <del>
                ${oldPrice}
              </del>

            )}

          </div>


          <motion.button
            className="add-btn"

            type="button"

            whileHover={{
              scale: 1.08
            }}

            whileTap={{
              scale: 0.9
            }}
          >

            <i className="bi bi-plus-lg"></i>

          </motion.button>


        </div>

      </div>

    </motion.article>

  );

}

export default ProductCard;