-- ---------------------------------------------------------------------------
-- Saxon Payne and Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by us. 
-- ---------------------------------------------------------------------------
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- Citation for the following code:
-- Date: 8 / 2 / 2025
-- Adapted From Google Gemini
-- Source URL: https://gemini.google.com/app/bcbb702807c71170
-- Provided our DDL code, and asked it to add more example data to what we had. (see insert statements)


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
('School Projects', 1),
('Hobbies', 1),
('Personal Goals', 2),
('School Assignments', 3);

-- Insert sample statuses for each board
INSERT INTO Statuses (title, boardId) VALUES
('To Do', 1),        -- StatId 1 for Work Projects
('In Progress', 1),  -- StatId 2 for Work Projects
('Done', 1),         -- StatId 3 for Work Projects

('To Do', 2),        -- StatId 4 for School Projects
('In Progress', 2),  -- StatId 5 for School Projects
('Done', 2),         -- StatId 6 for School Projects

('Ideas', 3),        -- StatId 7 for Hobbies
('In Progress', 3),  -- StatId 8 for Hobbies
('Completed', 3),    -- StatId 9 for Hobbies

('Daily Tasks', 4),  -- StatId 10 for Personal Goals
('Weekly Goals', 4), -- StatId 11 for Personal Goals
('Achieved', 4),     -- StatId 12 for Personal Goals

('Assignments', 5),  -- StatId 13 for School Assignments
('Drafts', 5),       -- StatId 14 for School Assignments
('Submitted', 5);    -- StatId 15 for School Assignments

-- Insert sample tasks for each board's statuses
INSERT INTO Tasks (title, `desc`, statId) VALUES
-- Tasks for 'Work Projects' (Board 1)
('Finish Q3 Report', 'Complete the financial analysis and write the summary.', 1),
('Review Marketing Plan', 'Check for consistency and budget alignment.', 2),
('Deploy new feature', 'Push the latest code to production environment.', 3),
('Onboard new intern', 'Prepare training materials and schedule meetings.', 1),

-- Tasks for 'School Projects' (Board 2)
('Write essay on Shakespeare', 'Focus on Hamlet and Macbeth themes.', 4),
('Prepare presentation', 'Create slides for the science fair project.', 5),
('Read chapter 5', 'Finish the required reading for tomorrow''s class.', 6),

-- Tasks for 'Hobbies' (Board 3)
('Plan next painting', 'Sketch out a new landscape idea.', 7),
('Start woodworking project', 'Begin carving the new bookshelf.', 8),
('Finish novel', 'Complete the final chapter of "The Great Gatsby."', 9),

-- Tasks for 'Personal Goals' (Board 4)
('Morning workout', '30 minutes of cardio.', 10),
('Learn Python basics', 'Complete the first five tutorials.', 11),
('Complete 10k run', 'Successfully finish the city race.', 12),

-- Tasks for 'School Assignments' (Board 5)
('Math problem set', 'Problems 1-10 from the textbook.', 13),
('Biology lab report', 'Write up the results from the dissection.', 14),
('History presentation', 'Research and present on the French Revolution.', 15);

-- Insert sample tags
INSERT INTO Tags (title, color) VALUES
('Urgent', 'red'),
('Optional', 'gray'),
('Client', 'blue'),
('Bug', 'orange'),
('Feature', 'green'),
('Research', 'purple');

-- Insert into TaskTags (task-tag relations)
INSERT INTO TaskTags (taskId, tagId) VALUES
(1, 1), -- Finish Q3 Report (Urgent)
(1, 3), -- Finish Q3 Report (Client)
(2, 2), -- Review Marketing Plan (Optional)
(4, 1), -- Onboard new intern (Urgent)
(5, 6), -- Write essay on Shakespeare (Research)
(6, 4), -- Prepare presentation (Bug - just an example of a tag!)
(7, 5); -- Plan next painting (Feature - just an example)