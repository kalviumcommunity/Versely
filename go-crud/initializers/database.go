package initializers

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	dsn := "host=kandula.db.elephantsql.com user=hpixyqgl password=gQcsCv0Pp-3jaeBSvNLTqgA33FLqDYdy dbname=hpixyqgl port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Fail to connect to database")
	}
}
