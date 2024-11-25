package controllers

import (
	"QueryConnectAPI/models"
	"fmt"

	"github.com/kataras/iris/v12"
)

type UserController struct{}

func (u *UserController) Post(ctx iris.Context) {
	var user models.User

	err := ctx.ReadJSON(&user)

	fmt.Printf(user.Email)
	if err != nil {
		fmt.Printf(err.Error())
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Invalid request payload"})
		return
	}
	res := models.AddUser(user)

	fmt.Printf("\n%s", res)
	ctx.StatusCode(iris.StatusCreated)
	ctx.JSON(res)
}

func (u *UserController) GetUserByID(ctx iris.Context) models.User {
	uid := ctx.URLParam("userid")
	user := models.GetUserByID(uid)
	return user
}

func (u *UserController) AuthenticateUser(ctx iris.Context) *models.User {
	var user models.User

	err := ctx.ReadJSON(&user)

	fmt.Printf(user.Email)
	if err != nil {
		fmt.Printf(err.Error())
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Invalid request payload"})
	}

	res, err := models.AutheticateUser(user)
	if err != nil {
		fmt.Printf(err.Error())
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Invalid request payload"})
	} else if res == nil {
		fmt.Printf("User not found.")
		ctx.StatusCode(iris.StatusUnauthorized)
		ctx.JSON(iris.Map{"error": "User does not exist"})
	}

	fmt.Printf("\n%s", res)
	ctx.StatusCode(iris.StatusOK)
	return res
}
