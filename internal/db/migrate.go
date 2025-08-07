package db

import (
	"context"
	"fmt"
	"log"
)

// CreateTable สร้าง table ToBuyList ถ้ายังไม่มี
func CreateTable() {
	query := `
    CREATE TABLE IF NOT EXISTS ToBuyList (
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Number INT NOT NULL,
        Cost DECIMAL(10, 2) NOT NULL,
        Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`

	_, err := DB.Exec(context.Background(), query)
	if err != nil {
		log.Fatal("❌ Failed to create table ToBuyList:", err)
	}
	fmt.Println("✅ Table ToBuyList created")
}
