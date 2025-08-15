package queries

import (
    "database/sql"
    _ "embed"
    "fmt"
    "log"
    "strings"
)

//go:embed ddl.sql
var ddlScript string

func ResetDB(db *sql.DB) error {
    // remove the returns from ddl.sql
    sanitizedScript := strings.ReplaceAll(ddlScript, "\r\n", "\n")

    // run the "script" or ddl.sql 
    _, err := db.Exec(sanitizedScript) // Use the cleaned version
    if err != nil {
        return fmt.Errorf("failed to reset db: %w", err)
    }

    log.Println("Database reset successfully!")
    return nil
}