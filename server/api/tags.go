package handlers

import (
    "encoding/json"
    "net/http"
    "strconv"
    "root/queries"
	"root/store"
	"log"
    // "root/models"

    "github.com/gorilla/mux"
)


func HandleGetTags(w http.ResponseWriter, r *http.Request){

	taskIdStr := mux.Vars(r)["taskId"]
    taskId, err := strconv.Atoi(taskIdStr)
    if err != nil {
        http.Error(w, "Invalid task ID", http.StatusBadRequest)
        return
    }

	tags, err := queries.GetTagsV2(store.DB, taskId)
    if err != nil {
        http.Error(w, "Error fetching tags", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(tags)


}


func HandleDeleteTag(w http.ResponseWriter, r *http.Request) {

    taskIdStr := mux.Vars(r)["taskId"]
    taskId, err := strconv.Atoi(taskIdStr)
    if err != nil {
        http.Error(w, "Invalid task ID", http.StatusBadRequest)
        return
    }

	tagIdStr := mux.Vars(r)["tagId"]
    tagId, err := strconv.Atoi(tagIdStr)
    if err != nil {
        http.Error(w, "Invalid tag ID", http.StatusBadRequest)
        return
    }

    // See "/queries/task.go" for the db function.
    err = queries.DeleteTag(store.DB, taskId, tagId)
    if err != nil {
        http.Error(w, "Error deleting tag", http.StatusInternalServerError)
		log.Printf("2: some error: %v", err)
        return
    }
	return
}