package main

import (
	"database/sql"
	"net/http"
	"fmt"
	"log"
	"os"
	"root/store"
	"root/api"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/gorilla/mux"
)

// var db *sql.DB

func main() {

	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// Capture connection properties.
	cfg := mysql.NewConfig()
	cfg.User = os.Getenv("DBUSER")
	cfg.Passwd = os.Getenv("DBPASS")
	cfg.Net = "tcp"
	cfg.Addr = "localhost:3306"
	cfg.DBName = os.Getenv("DBNAME")

	// Get a database handle.
	fmt.Println(cfg.FormatDSN())
	store.DB, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := store.DB.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
	rows, err := store.DB.Query("SELECT * FROM Users;")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		var id int
		var name string

		if err := rows.Scan(&id, &name); err != nil {
			fmt.Errorf("User %q", err)
		}
		fmt.Println(id, name)

	}

	r := mux.NewRouter()
	r.HandleFunc("/users/{userId}/boards", handlers.HandleGetBoards).Methods("GET")
	r.HandleFunc("/users/{userId}/board/{boardId}", handlers.HandleGetBoardInfo).Methods("GET")
	http.ListenAndServe(":8000", r)
}
