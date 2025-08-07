package db

import (
	"context"
	"fmt"
	"log"
	"time"

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

type ToBuyItem struct {
	Id     int     `json:"id"`
	Name   string  `json:"name"`
	Number int     `json:"number"`
	Cost   float64 `json:"cost"`
	Date   string  `json:"date"` // จะส่งออกเป็น string
}

func GetAllToBuyItems() ([]ToBuyItem, error) {
	rows, err := DB.Query(context.Background(), "SELECT id, name, number, cost, date FROM ToBuyList")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []ToBuyItem
	for rows.Next() {
		var (
			item     ToBuyItem
			dateTime time.Time
		)
		if err := rows.Scan(&item.Id, &item.Name, &item.Number, &item.Cost, &dateTime); err != nil {
			return nil, err
		}

		// แปลง dateTime เป็น string แบบ ISO8601 หรือแบบกำหนดเองก็ได้
		item.Date = dateTime.Format("2006-01-02 15:04:05")

		items = append(items, item)
	}
	return items, nil
}
