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