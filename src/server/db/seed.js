const db = require("./client");
const { createUser } = require("./users");
const { createProduct } = require("./products");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },

  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "admin",
    email: "admin@admin.com",
    password: "adminadmin",
  },
  // Add more user objects as needed
];

const products = [
  {
    id: 1,
    title: "b-series universal turbo kit",
    price: 899.99,
    description: "A universal turbo kit that fits all b-series engines.",
    manufacturer: "Rev9",
    img: "src/client/photos/bseriesturbo.jpg",
  },
  {
    id: 2,
    title:
      "Spec-D Projector Headlights Infiniti G35 Coupe (03-07) Sequential Signal - Black / Chrome / Smoked",
    price: 399,
    description:
      "Spec-D headlights are designed to be a direct replacement for your factory headlights and require no modifications, cutting or wire splicing to install.",
    manufacturer: "Spec-D",
    img: "src/client/photos/g35headlights.jpg",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) DEFAULT 'title',
          price VARCHAR(255) DEFAULT 'price',
          manufacturer VARCHAR(255) DEFAULT 'manufacturer',
          description VARCHAR(255) DEFAULT 'description',
          img VARCHAR(255) DEFAULT 'img'
      )
        `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({
        title: product.title,
        price: product.price,
        manufacturer: product.manufacturer,
        description: product.description,
        img: product.img,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertProducts();
    await insertUsers();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
