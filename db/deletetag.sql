-- ---------------------------------------------------------------------------
-- Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by me.
-- ---------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS deletetag;

DELIMITER //

CREATE PROCEDURE deletetag (
    IN p_taskId INT,
    IN p_tagId INT
)
BEGIN

    START TRANSACTION;
        
    -- Delete the task 

    DELETE FROM TaskTags
    WHERE taskId = p_taskId AND tagId = p_tagId;

    COMMIT;
END //

DELIMITER ;