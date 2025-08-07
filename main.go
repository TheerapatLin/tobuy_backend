package main

import (
	"fmt"
	"log"
	"net/http"
)

// handler function สำหรับ root path "/"
func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, Go Backend Server!")
}

func main() {
	// สร้าง route
	http.HandleFunc("/", homeHandler)

	// ตั้งค่าพอร์ต และเริ่ม server
	port := ":8080"
	fmt.Println("Server is running on port", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}