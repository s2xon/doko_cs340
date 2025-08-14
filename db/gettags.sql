-- ---------------------------------------------------------------------------
-- Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by me.
-- ---------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS gettags;

DELIMITER //

CREATE PROCEDURE gettags (
    IN p_taskId INT
)
BEGIN

    START TRANSACTION;

    SELECT Tags.tagId, Tags.title, Tags.color FROM Tags
    	INNER JOIN TaskTags ON Tags.tagId = TaskTags.tagId
		    INNER JOIN Tasks ON TaskTags.taskId = Tasks.taskId
    WHERE TaskTags.taskId = p_taskId;

    COMMIT;
END //

DELIMITER ;