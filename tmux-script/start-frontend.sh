#!/bin/bash
SESSION_NAME="my-frontend"
PROJECT_PATH="/nfs/stak/users/dickinma/projectLive/doko_cs340" # Change to your local directory. Too lazy to make env file for :)

tmux new-session -d -s $SESSION_NAME -c $PROJECT_PATH "npm run dev"

# Code my Matthew Martin