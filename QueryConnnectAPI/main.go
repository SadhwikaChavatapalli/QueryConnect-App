package main

import (
	"QueryConnectAPI/controllers"
	"QueryConnectAPI/models"

	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
)

func main() {
	app := iris.New()

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
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

	mvc.New(app.Party("/responses")).Handle(new(controllers.ResponsesController))

	app.UseRouter(crs)
	app.Run(iris.Addr(":8080"))

	// interactionsAPI := app.Party("/interactions")
	// {
	// 	interactionsAPI.Use(iris.Compression)

	// 	// GET: http://localhost:8080/interactions
	// 	interactionsAPI.Get("/", list)
	// 	// POST: http://localhost:8080/interactions
	// 	interactionsAPI.Post("/", create)
	// }

	//app.Listen(":8080")
}

// Book example.
type Book struct {
	Title string `json:"title"`
}

func list(ctx iris.Context) {
	// books := []Book{
	// 	{"Mastering Concurrency in Go"},
	// 	{"Go Design Patterns"},
	// 	{"Black Hat Go"},
	// }

	books := models.GetAllInteractions()

	ctx.JSON(books)
	// TIP: negotiate the response between server's prioritizes
	// and client's requirements, instead of ctx.JSON:
	// ctx.Negotiation().JSON().MsgPack().Protobuf()
	// ctx.Negotiate(books)
}

func create(ctx iris.Context) {
	var b Book
	err := ctx.ReadJSON(&b)
	// TIP: use ctx.ReadBody(&b) to bind
	// any type of incoming data instead.
	if err != nil {
		ctx.StopWithProblem(iris.StatusBadRequest, iris.NewProblem().
			Title("Book creation failure").DetailErr(err))
		// TIP: use ctx.StopWithError(code, err) when only
		// plain text responses are expected on errors.
		return
	}

	println("Received Book: " + b.Title)

	ctx.StatusCode(iris.StatusCreated)
}
