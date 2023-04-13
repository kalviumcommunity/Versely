package main

import (
	"github.com/gin-gonic/gin"
	"github.com/praduman03/go-crud/controllers"
	"github.com/praduman03/go-crud/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()
	r.POST("/posts", controllers.PostsCreate)
	r.GET("/getposts", controllers.PostsIndex)
	r.DELETE("/posts/:id", controllers.PostsDelete)
	r.Run()
}
