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


/* Next task is to fetch all the board info from the db
This will require a few more queries functions, then call
all of them in this handler.

After this we need to implement react code to api call this to
load the board info, then toss it into the UI appropriately.
*/
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

func HandleGetBoardInfo(w http.ResponseWriter, r *http.Request) {
        userIDStr := mux.Vars(r)["userId"]
    userID, err := strconv.Atoi(userIDStr)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    boardIDStr := mux.Vars(r)["boardId"]
    boardID, err := strconv.Atoi(boardIDStr)
    if err != nil {
        http.Error(w, "Invalid board ID", http.StatusBadRequest)
        return
    }

    
    // Query for a boards statuses
    statuses, err := queries.GetBoardStatus(store.DB, userID, boardID)
    if err != nil {
        http.Error(w, "Error fetching statuses", http.StatusInternalServerError)
        return
    }


    // Cont. adding more board info here

    tasks, err := queries.GetTasks(store.DB, userID, boardID)
    if err != nil {
        http.Error(w, "Error fetching statuses", http.StatusInternalServerError)
        return
    }

    tags, err := queries.GetTags(store.DB, userID, boardID)
    if err != nil {
        http.Error(w, "Error fetching statuses", http.StatusInternalServerError)
        return
    }

    // might have to format differently to parse better when we populate UI
    json.NewEncoder(w).Encode(statuses)
    json.NewEncoder(w).Encode(tasks)
    json.NewEncoder(w).Encode(tags)
}