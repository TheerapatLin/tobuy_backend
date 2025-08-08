package db

import (
	"context"
	"fmt"
	"log"
	"tobuy-backend/querys"
)

// CreateTable สร้าง table ToBuyList
func CreateToBuyListTable() {
	_, err := DB.Exec(context.Background(), querys.QueryCreateToBuyListTable)
	if err != nil {
		log.Fatal("❌ Failed to create table ToBuyList:", err)
	}
	fmt.Println("✅ Table ToBuyList created")
}
