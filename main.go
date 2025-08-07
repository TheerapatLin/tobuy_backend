package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"tobuy-backend/internal/db"
	// "tobuy-backend/internal/redis"
)

// handler function สำหรับ root path "/"
func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, Go Backend Server!")
}

func getToBuyListHandler(w http.ResponseWriter, r *http.Request) {
	items, err := db.GetAllToBuyItems()
	if err != nil {
		http.Error(w, "Error fetching items: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func main() {

	db.ConnectPostgres()
	db.CreateTable()
	// redis.ConnectRedis()

	// สร้าง route
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/tobuy", getToBuyListHandler)

	// ตั้งค่าพอร์ต และเริ่ม server
	port := ":8080"
	fmt.Println("Server is running on port", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
