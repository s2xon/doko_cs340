package models

type Users struct {
	UserId int `json:"UserId"`
	name string `json:"name"`

}

type Boards struct {
	BoardId int `json:"BoardId"`
	Title string `json:"title"`
	UserId int `json:"userId"`
}

type Statuses struct {
	StatId int `json:"statId"`
	Title string `json:"title"`
	BoardId int `json:"BoardId"`
}

type Tasks struct {
	TaskId int `json:"taskId"`
	Title string `json:"title"`
	Desc string `json:"desc"`
	StatId int `json:"statId"`
}

type TaskTags struct {
	TaskId int `json:"taskId"`
	TagId int `json:"tagId"`
}