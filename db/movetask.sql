DROP PROCEDURE IF EXISTS movetask;

DELIMITER //

CREATE PROCEDURE movetask (
    IN p_taskId INT
)
BEGIN

        -- Temp variables
    DECLARE v_current_statId INT;
    DECLARE v_boardId INT;
    DECLARE v_next_statId INT;

    START TRANSACTION;
        
    -- Get the statId and boardId for the task we want to move (s/t are aliases)
    SELECT t.statId, s.boardId 
    INTO v_current_statId, v_boardId
    FROM Tasks t
    JOIN Statuses s ON t.statId = s.statId
    WHERE t.taskId = p_taskId;

    -- gets the next statId (minimum statId that is greater than current, in board)
    SELECT MIN(s.statId) 
    INTO v_next_statId
    FROM Statuses s
    WHERE s.boardId = v_boardId AND s.statId > v_current_statId;

    -- check if a next status exists
    IF v_next_statId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Task is already in the last status of its board.';
    ELSE
        -- Update the task's status
        UPDATE Tasks
        SET statId = v_next_statId
        WHERE taskId = p_taskId;
    END IF;
    COMMIT;
END //

DELIMITER ;