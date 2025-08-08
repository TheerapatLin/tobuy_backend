package schemas

import "time"

type ToBuyItem struct {
	Id     int       `json:"id"`
	Name   string    `json:"name"`
	Number int       `json:"number"`
	Cost   float64   `json:"cost"`
	Date   time.Time `json:"date"`
}
