
// All the interfaces to interpret the json from api returns.
// Should match with the back-end "models.go"

export interface Board {
  BoardId: number;
  title: string;
  userId: string;
}

export interface Statuses {
    statId: number;
    title: string;
    boardId: number;
}

export interface Tasks {
    taskId: number;
    title: string;
    desc: string;
    statId: number;
}

export interface Tags {
    tagId: number;
    title: string;
    color: string;

}

export interface TaskTags {
    taskId: number;
    tagId: number;
}

export interface BoardData {
    AllStatuses: Statuses[]; 
    AllTasks: Tasks[];
    AllTags: Tags[];
    
}

