// [TODO] Create task DB Api
package handlers

import (
    "net/http"
    "strconv"
    "root/queries"
	"root/store"

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
	// TODO: Add more specific error handling if you feel like it
    err = queries.MoveTasks(store.DB, taskId) 
    if err != nil {
        http.Error(w, "Error moving task", http.StatusInternalServerError)
        return
    }
	return
}
