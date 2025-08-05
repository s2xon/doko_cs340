// Source for figuring out error handling:
// http://go-database-sql.org/errors.html



package queries

import "fmt"

import (
    "database/sql"
    "root/models"
)


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

func MoveTasks(db *sql.DB, taskId int) (error) {
    // db.Exec is used for statements that do not return a result set (like INSERT, UPDATE, DELETE, or a stored procedure that modifies data).
    _, err := db.Exec("CALL increment_task_status(?)", taskId)
    if err != nil {
        return fmt.Errorf("failed to increment task status for taskId %d: %w", taskId, err)
    }
    return nil

}