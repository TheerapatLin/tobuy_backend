package db

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func ConnectPostgres() {
	var err error
	connStr := "postgres://admin:admin@localhost:5432/tobuy_list"
	DB, err = pgx.Connect(context.Background(), connStr)
	if err != nil {
		log.Fatal("❌ Failed to connect to PostgreSQL:", err)
	}
	fmt.Println("✅ PostgreSQL connected")
}
