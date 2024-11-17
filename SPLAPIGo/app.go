package main

import (
	"github.com/kataras/iris/v12"
)

func main() {
	//Initialize app
	app := iris.New()

	app.Get("/", func(ctx iris.Context) {
		ctx.HTML("Hello This is Iris")
	})

	app.Run(iris.Addr(":5000"))
}
