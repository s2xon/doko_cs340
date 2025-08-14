

#!/bin/bash
SESSION_NAME="my-backend"
PROJECT_PATH="/nfs/stak/users/dickinma/projectLive/doko_cs340/server" # Change to your local directory. Too lazy to make env file for :)

tmux new-session -d -s $SESSION_NAME -c $PROJECT_PATH "go run ./main.go"

# Code my Matthew Martin