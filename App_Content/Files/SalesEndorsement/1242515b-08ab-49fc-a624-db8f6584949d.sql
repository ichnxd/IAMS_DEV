
 DECLARE @object VARCHAR(MAX) = ''
  
 DECLARE zz_cursor CURSOR FAST_FORWARD
 FOR
    SELECT  sysobjects.name AS trigger_name
    FROM    sysobjects
            INNER JOIN sysusers ON sysobjects.uid = sysusers.uid
            INNER JOIN sys.tables t ON sysobjects.parent_obj = t.object_id
            INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
    WHERE   sysobjects.type = 'TR'
            AND sysobjects.name LIKE '%tr_dbo_tNotification%'
				
 OPEN zz_cursor
		
 FETCH NEXT FROM zz_cursor
	INTO @object
 WHILE @@FETCH_STATUS = 0
    BEGIN

        DECLARE @sqlName NVARCHAR(MAX) = '	DROP TRIGGER dbo.[' + @object + ']'

        EXECUTE sp_executesql @sqlName

        FETCH NEXT FROM zz_cursor	
		INTO @object
    END  				
				
 CLOSE zz_cursor
 DEALLOCATE zz_cursor




