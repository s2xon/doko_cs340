## Project Info
Doko is a web application (React + Go) backed by MySQL that lets a user break tasks into multiple Boards (think digital Kanban walls) and populate them with Tasks and color-coded Tags. Its serves as the final project for OSU Intro to Databases class for Saxon Payne and Matthew Martin.


## Getting Started

### Running the Development Server

```
npm install
npm run dev
```

Open [OregonState Classwork Site (port 3620)](http://classwork.engr.oregonstate.edu:3620) with your browser to see the result.

### Running the Go Server

Navigate to the server directory.

```
cd server
```

You will need to make sure to input your database credentials in a .env file. If its not present, simply:

```
touch .env
vim .env
```
Paste in:
```
DBUSER=
DBPASS=
DBHOST=classmysql.engr.oregonstate.edu
DBNAME=
```
Save and exit vim (or whatever text editor you used). You should be able to run the server now.
```
go run ./main.go
```

### Importing the DB

To actually use the provided filler data and base Boards, you will need to load them into your DB.
First, navigate to the db directory:
```
cd ../db
OR
cd db
```
Next, connect to mysql or mariadb. On the OSU servers this will look like:
```
mysql -u [DBUSER] -h classmysql.engr.oregonstate.edu -p
```
Enter your password [DBPASS], then switch to your local db:
```
use [DBNAME];
```
Finally, source all the necessary sql files:
```
source ./ddl.sql;
source ./addtask.sql;
source ./deletetask.sql;
...
```

With everything working properly, the frontend should display 3 boards and all the correlated data when clicked on.

## CRUD Operations

#### Move Task
To move a task, simply click the "move" button on the task, which will move the task to the next Status column. I didn't manage to develop the move back feature in time... so for now moving forward in life is the only way.

#### Add Task
Click the large grey "Add Task" button at the bottom of a Status column to add it there. Enter the desired title and description for the task, then click "Submit." If successful, it will immediately add it to the column.

#### Edit Task
This ones a bit less obvious. Simply click the Task you wish to Edit, and the task will transform into a form. Simple change what you wish, and click "Save." This will send it to the DB and change the task accordingly.

#### Delete Task
Click the big ol' delete button and click "Ok" when prompted from the {window.confirm} pop-up. The task will be dealt with immediately.

#### Delete Tag (M:N)
Same method as the task, click the [x] on the tag and click "Ok" when prompted from the {window.confirm} pop-up.

## General Citation Info
If there is no citation header for a file, assume that it was written by us. Otherwise there will be a citation header with cites or AI used. A good portion of the initial set up was from:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



*Docs written by Matthew Martin*


