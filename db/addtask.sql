-- ---------------------------------------------------------------------------
-- Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by me.
-- ---------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS addtask;

DELIMITER //

CREATE PROCEDURE addtask (
    IN p_statId INT,
    IN p_title VARCHAR(255),
    IN p_desc TEXT
)
BEGIN

    DECLARE new_taskId INT;

    START TRANSACTION;
        
    -- insert the task 
    INSERT INTO Tasks (title, `desc`, statId)
    VALUES (p_title, p_desc, p_statId);
    
    SET new_taskId = LAST_INSERT_ID();
    
    -- These are hardcoded TaskTags for now.
    -- Add 'Optional' tag (tagId = 2)
    INSERT INTO TaskTags (taskId, tagId) VALUES (new_taskId, 2);
    -- Add 'Feature' tag (tagId = 5)
    INSERT INTO TaskTags (taskId, tagId) VALUES (new_taskId, 5);
    

    COMMIT;
END //

DELIMITER ;