// [TODO] Create Board DB Api
// Handling the actual API calls,
// using the associated query function and model
package handlers

import (
    "encoding/json"
    "net/http"
    "strconv"
    "root/queries"
	"root/store"

    "github.com/gorilla/mux"
)

func HandleGetBoards(w http.ResponseWriter, r *http.Request) {
    userIDStr := mux.Vars(r)["userId"]
    userID, err := strconv.Atoi(userIDStr)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    boards, err := queries.GetBoardsByUserID(store.DB, userID)
    if err != nil {
        http.Error(w, "Error fetching boards", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(boards)
}