// [TODO] Create task DB Api
package handlers

import (
    "net/http"
    "strconv"
    "root/queries"
	"root/store"
	"log"
    "encoding/json"

    "github.com/gorilla/mux"
)



func HandleMoveTask(w http.ResponseWriter, r *http.Request) {
    taskIdStr := mux.Vars(r)["taskId"]
    taskId, err := strconv.Atoi(taskIdStr)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // See "/queries/task.go" for the db function.
    err = queries.MoveTasks(store.DB, taskId)
    if err != nil {
        http.Error(w, "Error moving task", http.StatusInternalServerError)
		log.Printf("2: some error: %v", err)
        return
    }
	return
}


// Make sure to change this
func HandleAddTask(w http.ResponseWriter, r *http.Request) {

    // data is passed via packet content rather than url
    var reqData struct {
		StatId int `json:"statId"`
        Title string `json:"title"`
        Desc string `json:"desc"`
	}

    // Decode request body
	if err1 := json.NewDecoder(r.Body).Decode(&reqData); err1 != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
    // log.Printf("2: some error: %d", reqData.StatId)
    // log.Printf("2: some error: %s", reqData.Title)
    // log.Printf("2: some error: %s", reqData.Desc)

    // See "/queries/task.go" for the db function.
    err := queries.AddTasks(store.DB, reqData.StatId, reqData.Title, reqData.Desc)
    if err != nil {
        http.Error(w, "Error adding task", http.StatusInternalServerError)
		log.Printf("2: some error: %v", err)
        return
    }
	return
}

// Make sure to change this
func HandleDeleteTask(w http.ResponseWriter, r *http.Request) {

    taskIdStr := mux.Vars(r)["taskId"]
    taskId, err := strconv.Atoi(taskIdStr)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // See "/queries/task.go" for the db function.
    err = queries.DeleteTasks(store.DB, taskId)
    if err != nil {
        http.Error(w, "Error deleting task", http.StatusInternalServerError)
		log.Printf("2: some error: %v", err)
        return
    }
	return
}

func HandleUpdateTask(w http.ResponseWriter, r *http.Request) {

    // data is passed via packet content rather than url
    var reqData struct {
		TaskId int `json:"taskId"`
        Title string `json:"title"`
        Desc string `json:"desc"`
	}

    // Decode request body
	if err1 := json.NewDecoder(r.Body).Decode(&reqData); err1 != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
    // log.Printf("2: some error: %d", reqData.StatId)
    // log.Printf("2: some error: %s", reqData.Title)
    // log.Printf("2: some error: %s", reqData.Desc)

    // See "/queries/task.go" for the db function.
    err := queries.UpdateTasks(store.DB, reqData.TaskId, reqData.Title, reqData.Desc)
    if err != nil {
        http.Error(w, "Error editing task", http.StatusInternalServerError)
		log.Printf("2: some error: %v", err)
        return
    }
	return
}

