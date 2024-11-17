package controllers

import (
	"QueryConnectAPI/models"

	"github.com/kataras/iris/v12"
)

type InteractionsController struct{}

type SearchRequest struct {
	Tags string `json:"tags"`
}

func (c *InteractionsController) Get() []models.Interaction {
	interactions := models.GetAllInteractions()
	return interactions
}

func (c *InteractionsController) GetBy(intrType string) []models.Interaction {
	items := models.GetInteractionsByType(intrType)
	return items
}

// "http://localhost:8080/interactions/owner?ownerid=123"
func (c *InteractionsController) GetInteractionsByOwner(ctx iris.Context) []models.Interaction {

	ownerId := ctx.URLParam("ownerid")

	items := models.GetInteractionsByOwnerID(ownerId)
	return items
}
