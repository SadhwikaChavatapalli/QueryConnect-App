package main

import (
	"QueryConnectAPI/controllers"

	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
)

func main() {
	app := iris.New()

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	})

	mvc.New(app.Party("/interactions")).Handle(new(controllers.InteractionsController))

	app.Get("/interactions/type", func(ctx iris.Context) {
		controller := controllers.InteractionsController{}
		interactions := controller.GetByType(ctx)
		ctx.JSON(interactions)
	})

	app.Get("/interactions/owner", func(ctx iris.Context) {
		controller := controllers.InteractionsController{}
		interactions := controller.GetByType(ctx)
		ctx.JSON(interactions)
	})

	app.Get("/interactions/interaction", func(ctx iris.Context) {
		controller := controllers.InteractionsController{}
		interactions := controller.GetInteractionsByInteractionId(ctx)
		ctx.JSON(interactions)
	})

	app.Get("/interactions/search", func(ctx iris.Context) {
		controller := controllers.InteractionsController{}
		interactions := controller.Search(ctx)
		ctx.JSON(interactions)
	})

	mvc.New(app.Party("/responses")).Handle(new(controllers.ResponsesController))
	mvc.New(app.Party("/users")).Handle(new(controllers.UserController))

	app.Post("/users/authenticate", func(ctx iris.Context) {
		userController := controllers.UserController{}
		user := userController.AuthenticateUser(ctx)
		ctx.JSON(user)
	})

	app.Post("/interactions/edit", func(ctx iris.Context) {
		controller := controllers.InteractionsController{}
		controller.Edit(ctx)
	})

	app.Get("/interactions/delete", func(ctx iris.Context) {
		controller := controllers.InteractionsController{}
		controller.DeleteByID(ctx)
	})

	app.UseRouter(crs)
	app.Run(iris.Addr(":8080"))
}
