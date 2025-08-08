package main

import (
	"log"
	"tobuy-backend/controllers"
	"tobuy-backend/internal/db"

	// "tobuy-backend/internal/redis"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	db.ConnectPostgres()
	db.CreateToBuyListTable()
	// redis.ConnectRedis()

	appEcho := echo.New()
	appEcho.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `${time_rfc3339} ${method} [${uri}] ${status} [${error || "error"}] | ${latency_human}` + "\n",
	}))

	appEcho.GET("/api/tobuy", controllers.GetAllToBuyLists)

	PORT := "8080"
	log.Println("starting... port : ", PORT)
	log.Fatal(appEcho.Start(":" + PORT))

}
