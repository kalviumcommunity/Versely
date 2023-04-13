package main

import (
	"github.com/praduman03/go-crud/initializers"
	"github.com/praduman03/go-crud/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Post{})
}
