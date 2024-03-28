CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) CHECK (category IN ('food', 'drink')) DEFAULT 'food',
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY, 
  owner VARCHAR(255) NOT NULL,
  order_number VARCHAR(255) NOT NULL UNIQUE, 
  phone_number VARCHAR(255) NOT NULL,
  total_price NUMERIC NOT NULL DEFAULT 0.0,
  is_paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMP,
  arrive_time VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(order_id) NOT NULL, 
  name VARCHAR(255) NOT NULL,
  qty INTEGER NOT NULL,
  image VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  product_id INTEGER REFERENCES products(id) 
);
CREATE TABLE promotions (
  promotion_id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL CHECK (LENGTH(name) >= 3 AND LENGTH(name) <= 30), 
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    initial_number NUMERIC(10, 2) NOT NULL CHECK (initial_number >= 0),
    damaged_number NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (damaged_number >= 0),
    remaining_number NUMERIC(10, 2) DEFAULT 0 NOT NULL CHECK (remaining_number >= 0),
    added_number NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (added_number >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback (
  feedback_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL CHECK (LENGTH(name) >= 3 AND LENGTH(name) <= 50), 
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email LIKE '%@%'),  
  comment TEXT NOT NULL CHECK (LENGTH(comment) >= 5),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- CREATE TABLE workers (
--   worker_id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   position VARCHAR(255) NOT NULL, 
--   salary NUMERIC NOT NULL,
--   negative_balance NUMERIC NOT NULL DEFAULT 0 CHECK (negative_balance >= 0),
--   address VARCHAR(255) NOT NULL,
--   phone_number VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE balance_history (
--   balance_history_id SERIAL PRIMARY KEY,
--   worker_id INTEGER REFERENCES workers(worker_id) NOT NULL,
--   balance_entry VARCHAR(255) NOT NULL
-- );

CREATE TABLE worker (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  negative_balance DECIMAL(10,2) DEFAULT 0 NOT NULL CHECK (negative_balance >= 0),
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  balance_history TEXT[]
);