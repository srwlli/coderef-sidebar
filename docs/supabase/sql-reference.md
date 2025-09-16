# SQL Reference Sheet

## Table of Contents

1. [Basic Queries](#basic-queries)
2. [Data Types](#data-types)
3. [Table Operations](#table-operations)
4. [Column Operations](#column-operations)
5. [Data Manipulation](#data-manipulation)
6. [Filtering & Sorting](#filtering--sorting)
7. [Joins](#joins)
8. [Aggregation](#aggregation)
9. [PostgreSQL Specific](#postgresql-specific)
10. [Supabase Helpers](#supabase-helpers)

---

## Basic Queries

### SELECT

```sql
-- Basic select
SELECT column1, column2 FROM table_name;

-- Select all columns
SELECT * FROM table_name;

-- Select with alias
SELECT column_name AS alias_name FROM table_name;

-- Select distinct values
SELECT DISTINCT column_name FROM table_name;
```

### WHERE Conditions

```sql
-- Basic conditions
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE name = 'John';
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Multiple conditions
SELECT * FROM users WHERE age > 18 AND status = 'active';
SELECT * FROM users WHERE city = 'NYC' OR city = 'LA';

-- IN operator
SELECT * FROM users WHERE city IN ('NYC', 'LA', 'Chicago');

-- NULL checks
SELECT * FROM users WHERE phone IS NOT NULL;
SELECT * FROM users WHERE description IS NULL;
```

---

## Data Types

### Common PostgreSQL Types

```sql
-- Text types
VARCHAR(n)          -- Variable length string (max n characters)
TEXT                -- Unlimited length string
CHAR(n)            -- Fixed length string

-- Numeric types
INTEGER            -- 32-bit integer
BIGINT             -- 64-bit integer
DECIMAL(p,s)       -- Exact decimal (precision, scale)
NUMERIC(p,s)       -- Same as DECIMAL
REAL               -- 32-bit floating point
DOUBLE PRECISION   -- 64-bit floating point

-- Date/Time types
DATE               -- Date only (YYYY-MM-DD)
TIME               -- Time only (HH:MM:SS)
TIMESTAMP          -- Date and time
TIMESTAMPTZ        -- Timestamp with timezone

-- Other types
BOOLEAN            -- TRUE/FALSE
UUID               -- Universally unique identifier
JSON               -- JSON data
JSONB              -- Binary JSON (faster, recommended)
ARRAY              -- Array of any type (e.g., TEXT[])
```

---

## Table Operations

### Create Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    age INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    tags TEXT[] DEFAULT '{}'
);
```

### Drop Table

```sql
DROP TABLE table_name;
DROP TABLE IF EXISTS table_name;
```

### Rename Table

```sql
ALTER TABLE old_name RENAME TO new_name;
```

### View Table Structure

```sql
-- PostgreSQL specific
\d table_name

-- Standard SQL
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'your_table'
ORDER BY ordinal_position;
```

---

## Column Operations

### Add Column

```sql
-- Add single column
ALTER TABLE table_name ADD COLUMN column_name data_type;

-- Add multiple columns
ALTER TABLE table_name
ADD COLUMN col1 VARCHAR(100),
ADD COLUMN col2 INTEGER;

-- Add column with constraints
ALTER TABLE users ADD COLUMN phone VARCHAR(20) UNIQUE;
```

### Drop Column

```sql
ALTER TABLE table_name DROP COLUMN column_name;
ALTER TABLE table_name DROP COLUMN IF EXISTS column_name;
```

### Rename Column

```sql
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;
```

### Change Column Type

```sql
ALTER TABLE table_name ALTER COLUMN column_name TYPE new_type;

-- With conversion function if needed
ALTER TABLE table_name ALTER COLUMN column_name TYPE INTEGER USING column_name::INTEGER;
```

### Add/Drop Constraints

```sql
-- Add constraints
ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column_name);
ALTER TABLE table_name ADD CONSTRAINT constraint_name CHECK (column_name > 0);

-- Drop constraints
ALTER TABLE table_name DROP CONSTRAINT constraint_name;
```

---

## Data Manipulation

### INSERT

```sql
-- Insert single row
INSERT INTO users (username, email, age)
VALUES ('john_doe', 'john@example.com', 25);

-- Insert multiple rows
INSERT INTO users (username, email, age) VALUES
    ('alice', 'alice@example.com', 30),
    ('bob', 'bob@example.com', 28);

-- Insert with returning
INSERT INTO users (username, email)
VALUES ('charlie', 'charlie@example.com')
RETURNING id, created_at;
```

### UPDATE

```sql
-- Update single column
UPDATE users SET age = 26 WHERE username = 'john_doe';

-- Update multiple columns
UPDATE users SET
    age = 26,
    email = 'newemail@example.com'
WHERE id = 1;

-- Update with calculation
UPDATE products SET price = price * 1.1 WHERE category = 'electronics';
```

### DELETE

```sql
-- Delete specific rows
DELETE FROM users WHERE age < 18;

-- Delete all rows (keep table structure)
DELETE FROM users;

-- Truncate (faster for deleting all rows)
TRUNCATE TABLE users;
```

---

## Filtering & Sorting

### ORDER BY

```sql
-- Sort ascending (default)
SELECT * FROM users ORDER BY created_at;

-- Sort descending
SELECT * FROM users ORDER BY age DESC;

-- Multiple columns
SELECT * FROM users ORDER BY age DESC, username ASC;
```

### LIMIT & OFFSET

```sql
-- Limit results
SELECT * FROM users LIMIT 10;

-- Pagination
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;
```

### LIKE Patterns

```sql
-- Starts with
SELECT * FROM users WHERE username LIKE 'john%';

-- Ends with
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Contains
SELECT * FROM users WHERE username LIKE '%doe%';

-- Case insensitive (PostgreSQL)
SELECT * FROM users WHERE username ILIKE 'JOHN%';
```

---

## Joins

### INNER JOIN

```sql
SELECT u.username, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;
```

### LEFT JOIN

```sql
SELECT u.username, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id;
```

### RIGHT JOIN

```sql
SELECT u.username, p.title
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id;
```

### FULL OUTER JOIN

```sql
SELECT u.username, p.title
FROM users u
FULL OUTER JOIN posts p ON u.id = p.user_id;
```

---

## Aggregation

### Basic Aggregates

```sql
-- Count
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT city) FROM users;

-- Sum, Average, Min, Max
SELECT
    SUM(salary),
    AVG(salary),
    MIN(salary),
    MAX(salary)
FROM employees;
```

### GROUP BY

```sql
-- Group by single column
SELECT city, COUNT(*) as user_count
FROM users
GROUP BY city;

-- Group by multiple columns
SELECT city, age, COUNT(*)
FROM users
GROUP BY city, age
ORDER BY city, age;
```

### HAVING

```sql
-- Filter grouped results
SELECT city, COUNT(*) as user_count
FROM users
GROUP BY city
HAVING COUNT(*) > 10;
```

---

## PostgreSQL Specific

### Arrays

```sql
-- Array operations
SELECT * FROM projects WHERE 'react' = ANY(tags);
SELECT * FROM projects WHERE tags @> '{"react", "typescript"}';

-- Array functions
SELECT array_length(tags, 1) FROM projects;
SELECT unnest(tags) FROM projects;
```

### JSON/JSONB

```sql
-- JSON operations
SELECT data->>'name' FROM users WHERE data->>'age' > '25';
SELECT data->'address'->>'city' FROM users;

-- JSONB operations (faster)
SELECT * FROM users WHERE data @> '{"status": "active"}';
```

### String Functions

```sql
-- String manipulation
SELECT CONCAT(first_name, ' ', last_name) as full_name FROM users;
SELECT UPPER(username) FROM users;
SELECT LENGTH(username) FROM users;
SELECT SUBSTRING(email FROM 1 FOR 5) FROM users;
```

### Date Functions

```sql
-- Date operations
SELECT NOW();
SELECT CURRENT_DATE;
SELECT AGE(birth_date) FROM users;
SELECT EXTRACT(YEAR FROM created_at) FROM posts;

-- Date arithmetic
SELECT created_at + INTERVAL '1 day' FROM posts;
SELECT created_at - INTERVAL '1 week' FROM posts;
```

---

## Supabase Helpers

### RLS (Row Level Security)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = user_id);

-- Update policy
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = user_id);
```

### Auth Functions

```sql
-- Get current user ID
SELECT auth.uid();

-- Get current user JWT
SELECT auth.jwt();

-- Check user role
SELECT auth.jwt() ->> 'role';
```

### Common Patterns

```sql
-- Insert with user_id
INSERT INTO projects (user_id, name, description)
VALUES (auth.uid(), 'My Project', 'Project description');

-- Query user's data
SELECT * FROM projects WHERE user_id = auth.uid();

-- Update with timestamp
UPDATE projects
SET description = 'Updated description',
    updated_at = NOW()
WHERE id = 1 AND user_id = auth.uid();
```

### Indexes

```sql
-- Create index for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Partial index
CREATE INDEX idx_active_users ON users(username) WHERE is_active = true;
```

---

## Quick Tips

### Performance

- Use `LIMIT` for large result sets
- Create indexes on frequently queried columns
- Use `EXPLAIN ANALYZE` to check query performance
- Prefer `JSONB` over `JSON` for better performance

### Best Practices

- Always use parameterized queries to prevent SQL injection
- Use meaningful column and table names
- Add appropriate constraints and indexes
- Use transactions for multiple related operations
- Regular `VACUUM` and `ANALYZE` for maintenance

### Common Gotchas

- PostgreSQL is case-sensitive for identifiers in quotes
- Use single quotes for string literals, double quotes for identifiers
- `NULL` comparisons require `IS NULL` or `IS NOT NULL`
- Array indexing starts at 1, not 0
- Use `TIMESTAMPTZ` for timezone-aware dates

---

_This reference covers the most commonly used SQL operations for PostgreSQL/Supabase. For more advanced features, consult the PostgreSQL documentation._
