package models

type Users struct {
	UserId int `json:"UserId"`
	name string `json:"name"`

}

type Boards struct {
	BoardId int `json:"BoardId"`
	title string `json:"title"`
	userId int `json:"userId"`
}

type Statuses struct {
	statId int `json:"statId"`
	title string `json:"title"`
	BoardId int `json:"BoardId"`
}

type Tasks struct {
	taskId int `json:"taskId"`
	title string `json:"title"`
	desc string `json:"desc"`
	statId int `json:"statId"`
}

type Tasks struct {
	taskId int `json:"taskId"`
	tagId int `json:"tagId"`
}