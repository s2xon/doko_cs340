package queries

import (
	"database/sql"
	"root/models"
)

func GetBoardStatus(db *sql.DB, userID int, boardID int) ([]models.Statuses, error) {
	rows, err := db.Query("SELECT Statuses.statId, Statuses.title, Statuses.boardId FROM Statuses INNER JOIN Boards ON Statuses.boardId = Boards.boardId INNER JOIN Users ON Users.userId = Boards.userId WHERE Boards.boardId = ? AND Users.userId = ?", boardID, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var statuses []models.Statuses
	for rows.Next() {
		var status models.Statuses
		err := rows.Scan(&status.StatId, &status.Title, &status.BoardId)
		if err != nil {
			return nil, err
		}
		statuses = append(statuses, status)
	}
	return statuses, nil

}

