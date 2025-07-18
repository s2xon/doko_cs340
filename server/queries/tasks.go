package queries

import (
    "database/sql"
    "root/models"
)


// func GetBoardStatus(db *sql.DB, userID int, boardID int) ([]models.Statuses, error) {
//     rows, err := db.Query("SELECT Statuses.statId, Statuses.title, Statuses.boardId FROM Statuses INNER JOIN Boards ON Statuses.boardId = Boards.boardId INNER JOIN Users ON Users.userId = Boards.userId WHERE Boards.boardId = ? AND Users.userId = ?", boardID, userID)
//     if err != nil {
//         return nil, err
//     }
//     defer rows.Close()

//     var statuses []models.Statuses
//     for rows.Next() {
//         var status models.Statuses
//         err := rows.Scan(&status.StatId, &status.Title, &status.BoardId)
//         if err != nil {return nil, err}
//         statuses = append(statuses, status)
//     }
//     return statuses, nil

// }

func GetTasks(db *sql.DB, userID int, boardID int) ([]models.Tasks, error) {
    rows, err := db.Query("SELECT Tasks.taskId, Tasks.title, Tasks.desc, Tasks.statId FROM Tasks INNER JOIN Statuses ON Statuses.statId = Tasks.statId INNER JOIN Boards ON Statuses.boardId = Boards.boardId INNER JOIN Users ON Users.userId = Boards.userId WHERE Boards.boardId = ? AND Users.userId = ?", boardID, userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var tasks []models.Tasks
    for rows.Next() {
        var task models.Tasks
        err := rows.Scan(&task.TaskId, &task.Title, &task.Desc, &task.StatId)
        if err != nil {return nil, err}
        tasks = append(tasks, task)
    }
    return tasks, nil

}