package store

import "database/sql"

// Globally creates the DB variable.
// Is defined/connected in main.go when ran.

var DB *sql.DB