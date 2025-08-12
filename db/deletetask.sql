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