-- ---------------------------------------------------------------------------
-- Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by me.
-- ---------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS updatetask;

DELIMITER //

CREATE PROCEDURE updatetask (
    IN p_taskId INT,
    IN p_title VARCHAR(255),
    IN p_desc TEXT
)
BEGIN

    START TRANSACTION;
        
    -- update the task 
    UPDATE Tasks
    SET title = p_title, `desc` = p_desc
    WHERE Tasks.taskId = p_taskId;

    
    -- Would need to add a section here for task updates.
    

    COMMIT;
END //

DELIMITER ;