package queries

// for future reference, use package to definition,
// then referance it in import using its location in the directory.
// i.e. "root/models" below.

import (
    "database/sql"
    "root/models"
)

// Get all 
func GetBoardsByUserID(db *sql.DB, userID int) ([]models.Boards, error) {
    rows, err := db.Query("SELECT boardId, title, userId FROM Boards WHERE userId = ?", userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

	// Translate the return from db to board model, then return all boards
    var boards []models.Boards
    for rows.Next() {
        var b models.Boards
        err := rows.Scan(&b.BoardId, &b.Title, &b.UserId)
        if err != nil {return nil, err}
        boards = append(boards, b)
    }
    return boards, nil
}
