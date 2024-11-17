package main

import (
	"QueryConnectAPI/controllers"
	"QueryConnectAPI/models"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
)

func main() {
	app := iris.New()
	mvc.New(app.Party("/interactions")).Handle(new(controllers.InteractionsController))
	mvc.New(app.Party("/responses")).Handle(new(controllers.ResponsesController))
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
