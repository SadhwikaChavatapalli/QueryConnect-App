package controllers

import (
	"QueryConnectAPI/models"
	"fmt"

	"github.com/kataras/iris/v12"
)

type ResponsesController struct{}

func (c *ResponsesController) GetBy(interactionID string) []models.Response {
	items := models.GetResponsesByIntrID(interactionID)
	return items
}

func (c *ResponsesController) Post(ctx iris.Context) {

	var response models.Response
	err := ctx.ReadJSON(&response)
	fmt.Printf(response.ResponseContent)
	if err != nil {
		fmt.Printf(err.Error())
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Invalid request payload"})
		return
	}
	// Add your logic here to save the interaction
	// For example, you could call a method on your model
	res := models.InsertResponse(response)
	fmt.Printf("\n%s", res)
	ctx.StatusCode(iris.StatusCreated)
	ctx.JSON(response)
}
