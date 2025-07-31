package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"root/api"
	"root/models"
	"root/store"

	"github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// var db *sql.DB

/*
type Users struct {
	UserId int `json:"userId"`
	name string `json:"name"`
}
*/

func AuthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var reqData struct {
		Name string `json:"name"`
	}

	// Decode request body
	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if reqData.Name == "" {
		http.Error(w, "Name is required", http.StatusBadRequest)
		return
	}

	// Make the user variable local
	var user models.Users

	// Check if user exists
	err := store.DB.QueryRow("SELECT userId, name FROM Users WHERE name = ?", reqData.Name).
		Scan(&user.UserId, &user.Name)

	if err == nil {
		// User already exists
		json.NewEncoder(w).Encode(user)
		return
	}

	if err != sql.ErrNoRows {
		// SELECT failed for another reason
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// User not found, create new one
	result, err := store.DB.Exec("INSERT INTO Users (name) VALUES (?)", reqData.Name)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()
	user = models.Users{UserId: int(id), Name: reqData.Name}
	json.NewEncoder(w).Encode(user)
}

func main() {
	// middleware to access the DB properly via the frontend.
	// Specifies perameters for accessing api calls to DB.
	c := cors.New(cors.Options{
	AllowedOrigins: []string{"http://localhost:3000"}, // Replace with osu url if needed
	AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowedHeaders: []string{"Content-Type", "Authorization"},
	Debug: true,
	})

	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// Capture connection properties.
	// Modify the ".env" file with db credentials to access.
	cfg := mysql.NewConfig()
	cfg.User = os.Getenv("DBUSER")
	cfg.Passwd = os.Getenv("DBPASS")
	cfg.Net = "tcp"
	cfg.Addr = os.Getenv("DBHOST")
	cfg.DBName = os.Getenv("DBNAME")

	// Get a database handle.
	fmt.Println(cfg.FormatDSN())
	store.DB, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	// The following code is just testing the connection, along with a test SELECT.
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

	// Router for all the api calls
	r := mux.NewRouter()

	// Each type of call (i.e. get with the URL) is directed to the correlated handler function in "/api" directory
	r.HandleFunc("/users/{userId}/boards", handlers.HandleGetBoards).Methods("GET") // in /api/board.go
	r.HandleFunc("/users/{userId}/board/{boardId}", handlers.HandleGetBoardInfo).Methods("GET") // in /api/board.go

	r.HandleFunc("/users/auth", AuthHandler).Methods("POST") // uses function above main() to handle.

	// Specifying that the rounter will be handled with CORS middleware.
	handlerWithCORS := c.Handler(r)

	// Middleware serves from port 8010, logs failure.
	log.Fatal(http.ListenAndServe(":8010", handlerWithCORS))
}
