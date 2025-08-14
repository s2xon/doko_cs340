#!/bin/bash
SESSION_NAME="my-frontend"
PROJECT_PATH="/nfs/stak/users/dickinma/projectLive/doko_cs340" 

tmux new-session -d -s $SESSION_NAME -c $PROJECT_PATH "npm run dev"

echo "Site started in tmux session '$SESSION_NAME'."
echo "To attach, run:  tmux a -t $SESSION_NAME"
echo "To stop, run:   tmux kill-session -t $SESSION_NAME"