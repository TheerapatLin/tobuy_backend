const CREATETOBUYLISTTABLE = `
    CREATE TABLE IF NOT EXISTS tobuy_lists (
    id SERIAL PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);
`

const CREATETOBUYITEMSTABLE = ` 
    CREATE TABLE IF NOT EXISTS tobuy_items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`

const CREATETOBUYLISTITEMSTABLE = `
    CREATE TABLE IF NOT EXISTS tobuy_list_items (
    list_id INT NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (list_id, item_id),
    FOREIGN KEY (list_id) REFERENCES tobuy_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES tobuy_items(id) ON DELETE CASCADE
);
`
const ADDITEM = `
    INSERT INTO tobuy_items (item_name, user_id)
    VALUES ($1, (SELECT id FROM users WHERE username = $2))
`

const GETITEMS_BY_USER = `SELECT * FROM tobuy_items WHERE user_id = (SELECT id FROM users WHERE username = $1)`;

const DELETEITEMS_BY_USER = `
    DELETE FROM tobuy_items 
    WHERE id = $1 AND user_id = (SELECT id FROM users WHERE username = $2);
`

module.exports = {
    CREATETOBUYLISTTABLE,
    CREATETOBUYITEMSTABLE,
    CREATETOBUYLISTITEMSTABLE,
    ADDITEM,
    GETITEMS_BY_USER,
    DELETEITEMS_BY_USER
};