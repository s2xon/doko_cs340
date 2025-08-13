// Source for figuring out error handling:
// http://go-database-sql.org/errors.html



package queries

import "fmt"

import (
    "database/sql"
    "root/models"
    "log"
)


// For error handling you will see the error "1:" in the go log
// which just represents there was a DB error when processing this step.
// more for covenience tbh. (i.e. a "2:" error is for the handler functions in api directory)


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
    _, err := db.Exec("CALL movetask(?)", taskId)
    if err != nil {
        log.Printf("1: some error: %v", err)
        return fmt.Errorf("failed to increment task status for taskId %d: %w", taskId, err)
        
    }
    return nil

}

func AddTasks(db *sql.DB, statId int, title string, desc string) (error) {

    _, err := db.Exec("CALL addtask(?, ?, ?)", statId, title, desc)
    if err != nil {
        log.Printf("1: some error: %v", err)
        return fmt.Errorf("failed to add task for statId %d: %w", statId, err)
        
    }
    return nil

}


func DeleteTasks(db *sql.DB, taskId int) (error) {
    _, err := db.Exec("CALL deletetask(?)", taskId)
    if err != nil {
        log.Printf("1: some error: %v", err)
        return fmt.Errorf("failed to task for taskId %d: %w", taskId, err)
        
    }
    return nil

}


func UpdateTasks(db *sql.DB, taskId int, title string, desc string) (error) {

    _, err := db.Exec("CALL updatetask(?, ?, ?)", taskId, title, desc)
    if err != nil {
        log.Printf("1: some error: %v", err)
        return fmt.Errorf("failed to add task for statId %d: %w", taskId, err)
        
    }
    return nil

}