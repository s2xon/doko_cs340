-- ---------------------------------------------------------------------------
-- Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by me.
-- ---------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS deletetask;

DELIMITER //

CREATE PROCEDURE deletetask (
    IN p_taskId INT
)
BEGIN

    START TRANSACTION;
        
    -- Delete the task 

    DELETE FROM Tasks
    WHERE taskId = p_taskId;

    COMMIT;
END //

DELIMITER ;