package handlers

import (
    "net/http"
    "root/queries"
	"root/store"
	// "log"
    // "encoding/json"

    // "github.com/gorilla/mux"
)



func HandleResetDB(w http.ResponseWriter, r *http.Request) {

    queries.ResetDB(store.DB)
    // if err != nil {
    //     http.Error(w, "Error resetting db", http.StatusInternalServerError)
	// 	log.Printf("2: some error: %v", err)
    //     return
    // }
	return
}