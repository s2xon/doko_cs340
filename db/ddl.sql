-- ---------------------------------------------------------------------------
-- Saxon Payne and Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by us. 
-- ---------------------------------------------------------------------------
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


DROP TABLE IF EXISTS TaskTags;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Statuses;
DROP TABLE IF EXISTS Boards;
DROP TABLE IF EXISTS Users;

-- Users
CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Boards
CREATE TABLE Boards (
    boardId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Statuses
CREATE TABLE Statuses (
    statId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    boardId INT,
    FOREIGN KEY (boardId) REFERENCES Boards(boardId)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tasks
CREATE TABLE Tasks (
    taskId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    `desc` TEXT,
    statId INT,
    FOREIGN KEY (statId) REFERENCES Statuses(statId)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tags
CREATE TABLE Tags (
    tagId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    color VARCHAR(50)
);

-- TaskTags
CREATE TABLE TaskTags (
    taskId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY KEY (taskId, tagId),
    FOREIGN KEY (taskId) REFERENCES Tasks(taskId)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (tagId) REFERENCES Tags(tagId)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Insert sample users
INSERT INTO Users (name) VALUES ('Saxon'), ('Matthew'), ('Jim');

-- Insert sample boards
INSERT INTO Boards (title, userId) VALUES
('Work Projects', 1),
('Personal Goals', 2),
('School Assignments', 3);

-- Insert sample statuses
INSERT INTO Statuses (title, boardId) VALUES
('To Do', 1),
('In Progress', 1),
('Done', 1);

-- Insert sample tasks
INSERT INTO Tasks (title, `desc`, statId) VALUES
('Finish Report', 'Complete the financial section', 1),
('Review PR', 'Code review for team member', 2),
('Submit Homework', 'Calculus assignment', 3);

-- Insert sample tags
INSERT INTO Tags (title, color) VALUES
('Urgent', 'red'),
('Optional', 'gray'),
('Client', 'blue');

-- Insert into TaskTags (task-tag relations)
INSERT INTO TaskTags (taskId, tagId) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1);

