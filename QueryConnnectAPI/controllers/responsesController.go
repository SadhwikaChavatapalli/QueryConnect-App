package controllers

import (
	"QueryConnectAPI/models"
)

type ResponsesController struct{}

func (c *ResponsesController) GetBy(interactionID string) []models.Response {
	items := models.GetResponsesByIntrID(interactionID)
	return items
}
