/*

The full query, jesus christ

SELECT Tags.tagId, Tags.title, Tags.color FROM Tags
	INNER JOIN TaskTags ON Tags.tagId = TaskTags.tagId
		INNER JOIN Tasks ON TaskTags.taskId = Tasks.taskId
			INNER JOIN Statuses ON Statuses.statId = Tasks.statId 
				INNER JOIN Boards ON Statuses.boardId = Boards.boardId 
					INNER JOIN Users ON Users.userId = Boards.userId 
WHERE Boards.boardId = ? AND Users.userId = ?;


SELECT Tags.tagId, Tags.title, Tags.color FROM Tags INNER JOIN TaskTags ON Tags.tagId = TaskTags.tagId INNER JOIN Tasks ON TaskTags.taskId = Tasks.taskId INNER JOIN Statuses ON Statuses.statId = Tasks.statId  INNER JOIN Boards ON Statuses.boardId = Boards.boardId  INNER JOIN Users ON Users.userId = Boards.userId  WHERE Boards.boardId = ? AND Users.userId = ?;
*/

package queries

import (
    "database/sql"
    "root/models"
)


func GetTags(db *sql.DB, userID int, boardID int) ([]models.Tags, error) {
    rows, err := db.Query("SELECT Tags.tagId, Tags.title, Tags.color FROM Tags INNER JOIN TaskTags ON Tags.tagId = TaskTags.tagId INNER JOIN Tasks ON TaskTags.taskId = Tasks.taskId INNER JOIN Statuses ON Statuses.statId = Tasks.statId  INNER JOIN Boards ON Statuses.boardId = Boards.boardId  INNER JOIN Users ON Users.userId = Boards.userId  WHERE Boards.boardId = ? AND Users.userId = ?", boardID, userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var tags []models.Tags
    for rows.Next() {
        var tag models.Tags
        err := rows.Scan(&tag.TagId, &tag.Title, &tag.Color)
        if err != nil {return nil, err}
        tags = append(tags, tag)
    }
    return tags, nil

}