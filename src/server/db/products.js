const db = require('./client')
// const util = require('./util'); (WILL USE THIS AT A LATER POINT)


// Create a new product in the DB
const createProduct = async({title, price, manufacturer, description, img }) => {
try {
const { rows } = await db.query(`
INSERT INTO products(title, price, manufacturer, description, img)
VALUES($1, $2, $3, $4, $5)
RETURNING *`, [title, price, manufacturer, description, img]);

return rows;
} catch (err) {
throw err;
}
}


// UPDATE a product in the DB
async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  if (setString.length === 0) {
      return;
  }
  try {
      const { rows: [product] } = await db.query(`
          UPDATE products
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
      `, Object.values(fields));
      return product;
  } catch (error) {
      throw error;
  }
}

// Get all products in the DB
const getAllProducts = async() => {
    try {
        const { rows } = await db.query(`
        SELECT * FROM products;`);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Get product by ID from the DB
async function getProductById(id) {
    try {
      const { rows: [ products ]  } = await db.query(`
        SELECT *
        FROM products
        WHERE id=$1;
      `, [id]);
  
      if (!products) {
        throw {
          name: "productNotFoundError",
          message: "Could not find a product with that productId"
        };
      }
  
      return products;
    } catch (error) {
      throw error;
    }
  }

  // Get product by stripe_ID from the DB

  // async function getProductByStripeId(id) {
  //   try {
  //     const { rows: [ products ]  } = await db.query(`
  //       SELECT *
  //       FROM products
  //       WHERE stripe_id=$1;
  //     `, [id]);
  
  //     if (!products) {
  //       throw {
  //         name: "productNotFoundError",
  //         message: "Could not find a product with that productId"
  //       };
  //     }
  
  //     return products;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // UNCOMMENT OUT LATER WHEN ADDING CART FUNCTIONALITY

  // DELETE a product by ID from the DB
  async function deleteProduct(id) {
    try {
        const { rows: [product] } = await db.query(`
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
}




module.exports = {
createProduct,
getAllProducts,
getProductById,
// getProductByStripeId,
updateProduct,
deleteProduct,
};
