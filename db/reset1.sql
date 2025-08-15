-- ---------------------------------------------------------------------------
-- Matthew Martin
-- CS340 Summer 2025
-- Group 49
-- doko
-- All code was done by me.
-- ---------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS resetDB;

DELIMITER / /

CREATE PROCEDURE resetDB ()
BEGIN

    START TRANSACTION;
        
    -- reset

    source ./ddl.sql;

    COMMIT;
END //

DELIMITER;