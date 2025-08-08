package querys

var QueryCreateToBuyListTable = `
    CREATE TABLE IF NOT EXISTS ToBuyList (
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Number INT NOT NULL,
        Cost DECIMAL(10, 2) NOT NULL,
        Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`

var QueryGetToBuyLists = `SELECT id, name, number, cost, date FROM ToBuyList`

var QueryPostTobuyList = `
		INSERT INTO ToBuyList (name, number, cost)
		VALUES ($1, $2, $3)
		RETURNING id, date
	`
