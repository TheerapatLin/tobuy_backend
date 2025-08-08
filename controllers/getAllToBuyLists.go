package controllers

import (
	"context"
	"log"
	"net/http"

	"tobuy-backend/internal/db"
	"tobuy-backend/schemas"

	"github.com/labstack/echo/v4"
)

func GetAllToBuyLists(c echo.Context) error {
	tBList := []schemas.ToBuyItem{}

	rows, errRows := db.DB.Query(context.Background(), `SELECT id, name, number, cost, date FROM ToBuyList`)
	if errRows != nil {
		log.Fatal(`query eror : `, errRows)
	}
	defer rows.Close()

	for rows.Next() {
		var tB schemas.ToBuyItem
		if errGet := rows.Scan(&tB.Id, &tB.Name, &tB.Number, &tB.Cost, &tB.Date); errGet != nil {
			return c.JSON(http.StatusInternalServerError, "scan : "+errGet.Error())
		}
		tBList = append(tBList, tB)
	}

	if err := rows.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, tBList)
}
