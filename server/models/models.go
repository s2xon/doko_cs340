package models

/* 
Models help direct the returned data from the DB (in the queries directory)

*/

type Users struct {
	UserId int    `json:"userId"`
	Name   string `json:"name"`
}

type Boards struct {
	BoardId int    `json:"BoardId"`
	Title   string `json:"title"`
	UserId  int    `json:"userId"`
}

type Statuses struct {
	StatId  int    `json:"statId"`
	Title   string `json:"title"`
	BoardId int    `json:"boardId"`
}

type Tasks struct {
	TaskId int    `json:"taskId"`
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	StatId int    `json:"statId"`
}

type Tags struct {
	TagId int    `json:"tagId"`
	Title string `json:"title"`
	Color string `json:"color"`
}

type TaskTags struct {
	TaskId int `json:"taskId"`
	TagId  int `json:"tagId"`
}

type BoardData struct {
		AllStatuses []Statuses `json:"allStatuses`
		AllTasks []Tasks `json:"allTasks`
		AllTags []Tags `json:"allTags`
}

