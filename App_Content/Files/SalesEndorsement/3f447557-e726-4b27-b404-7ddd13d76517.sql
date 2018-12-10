ALTER PROC dbo.pAutoUpdate_PremiumHistory_MemberStatus_By_member_PT ( @ID_Members INT )
AS
    DECLARE @ID_MembersPremiumHistory_Contract INT = 0
    DECLARE @ID_Period INT = 0
			
    DECLARE @Period INT = 0
    DECLARE @ID_Period_Initial INT = 0
		
    DECLARE @DateEffective DATE
    DECLARE @DueDate DATE
		
    DECLARE @SystemCurrentDate DATE = GETDATE()
		
    DECLARE @Comment VARCHAR(MAX)= ''
		
    DECLARE @ID_Period_LAST_By_CurrentDate INT = 0
    DECLARE @ID_Period_LAST_LastPayment INT = 0
		
			
    DECLARE @ID_Period_LAST INT = 0
    DECLARE @ID_Reference INT = 0
			
    DECLARE @Balance DECIMAL(18, 2)  = 0
    DECLARE @PremiumRate DECIMAL(18, 2) = 0
		
    DECLARE @PaymentAmount DECIMAL(18, 2) = 0
			
    DECLARE @ID_MemberStatus INT = 0
    DECLARE @ID_MemberStatus_Current INT = 0
    DECLARE @LapsedCounter INT = 0
			
    DECLARE @ID_EmploymentStatus INT = 0

    SELECT  @ID_EmploymentStatus = ID_EmploymentStatus
    FROM    dbo.tMembers
    WHERE   ID = @ID_Members


	-------- ReUpdate ng IsCurrentPeriod Kpag Collection ang cuntract
    UPDATE  dbo.tMembersPremiumHistory
    SET     isCurrentPeriod = 0
    FROM    dbo.tMembersPremiumHistory mp
            LEFT JOIN dbo.tMembersPremiumHistory_Contract mpc ON mpc.ID = mp.ID_MembersPremiumHistory_Contract
            LEFT JOIN dbo.vContract ON vContract.ID = mpc.ID_Contract
    WHERE   vContract.ID_ContractType = 3
            AND ID_Member = @ID_Members

    UPDATE  dbo.tMembersPremiumHistory
    SET     isCurrentPeriod = 1
    FROM    dbo.tMembersPremiumHistory mp
            LEFT JOIN dbo.tMembersPremiumHistory_Contract mpc ON mpc.ID = mp.ID_MembersPremiumHistory_Contract
            LEFT JOIN dbo.vContract ON vContract.ID = mpc.ID_Contract
    WHERE   mp.Comment LIKE '%New%'
            OR mp.Comment LIKE '%NEW%'
            AND vContract.ID_ContractType = 3
            AND ID_Member = @ID_Members
	

    DECLARE @count INT = 0

    SELECT  @count = COUNT(*)
    FROM    dbo.tMembersPremiumHistory
    WHERE   ID_Member = @ID_Members
            AND isCurrentPeriod = 1

    IF @count = 0
        BEGIN
		
            DECLARE @TOP_ID_MPH INT = 0

            SELECT TOP 1
                    @TOP_ID_MPH = ID
            FROM    dbo.tMembersPremiumHistory
            WHERE   ID_Member = @ID_Members
            ORDER BY DueDateStart ASC

            UPDATE  dbo.tMembersPremiumHistory
            SET     isCurrentPeriod = 1
            WHERE   ID = @TOP_ID_MPH

        END



		
    SELECT TOP 1
            @ID_Period_Initial = tMembersPremiumHistory.ID
    FROM    tMembersPremiumHistory
            LEFT  JOIN tMembers ON tMembersPremiumHistory.ID_Member = tMembers.ID
    WHERE   isCurrentPeriod = 1
            AND dbo.tMembers.ID = @ID_Members
    ORDER BY tMembersPremiumHistory.ID_MembersPremiumHistory_Contract ASC ,
            tMembersPremiumHistory.DueDateStart ASC ,
            Period ASC

    UPDATE  dbo.tMembersPremiumHistory
    SET     ID_MemberStatus = 0 ,
            IsBilled = 1
    WHERE   ID < @ID_Period_Initial
            AND ID_Member = @ID_Members
		
			---- Get the last ID_MP by Current Date
    SELECT TOP 1
            @ID_Period_LAST_By_CurrentDate = tMembersPremiumHistory.ID
    FROM    tMembersPremiumHistory
            LEFT OUTER JOIN tMembers ON tMembersPremiumHistory.ID_Member = tMembers.ID
    WHERE   DueDate < GETDATE()
            AND dbo.tMembers.ID = @ID_Members
    ORDER BY tMembersPremiumHistory.ID_MembersPremiumHistory_Contract DESC ,
            Period DESC	
		
					
			---- Get the last ID_MP by LastPayment
    SELECT TOP 1
            @ID_Period_LAST_LastPayment = tMembersPremiumHistory.ID
    FROM    tMembersPremiumHistory
    WHERE   ( ( ( ISNULL(CollAmt, 0) > 0
                  OR ISNULL(PaidAmount, 0) > 0
                )
                OR ISNULL(ID_Reference, 0) > 0
              )
              OR ID_MemberStatus = 1
            )
            AND ID_Member = @ID_Members
    ORDER BY tMembersPremiumHistory.ID_MembersPremiumHistory_Contract DESC ,
            Period DESC	

		
    SET @ID_Period_LAST = CASE WHEN @ID_Period_LAST_LastPayment >= @ID_Period_LAST_By_CurrentDate
                               THEN @ID_Period_LAST_LastPayment
                               ELSE @ID_Period_LAST_By_CurrentDate
                          END
		
			
			---Remove ID_MemberStatus Na walangPayment and Labas sa range ng From @ID_Period_Initial  to @ID_Period_LAST
    UPDATE  dbo.tMembersPremiumHistory
    SET     ID_MemberStatus = 0
    WHERE   ID_Member = @ID_Members
            AND ID NOT BETWEEN @ID_Period_Initial AND @ID_Period_LAST
            AND Balance = PremiumRate
		
				---------------------- Update the very First Status OF first PRemium History
    DECLARE @ContractCount AS INTEGER = 0 
    SELECT  @ContractCount = COUNT(*)
    FROM    dbo.tMembersPremiumHistory_Contract
    WHERE   ID_Members = @ID_Members
			
    IF @ContractCount > 1
        BEGIN
					
            UPDATE  dbo.tMembersPremiumHistory
            SET     ID_MemberStatus = 2
            WHERE   ID = @ID_Period_Initial
		
        END
    ELSE
        BEGIN
					
            UPDATE  dbo.tMembersPremiumHistory
            SET     ID_MemberStatus = 4
            WHERE   ID = @ID_Period_Initial
        END
				----------------------------------------
				 
		
    SELECT  @ID_MemberStatus = ID_MemberStatus ,
            @DateEffective = DueDateStart
    FROM    dbo.tMembersPremiumHistory
    WHERE   ID = @ID_Period_Initial
		
		
    SET @ID_MemberStatus_Current = @ID_MemberStatus
		    
	-- Reset only the comment for those who are new and no memberstatus assigned as mga premium History
    UPDATE  dbo.tMembersPremiumHistory
    SET     Comment = NULL
    WHERE   ISNULL(ID_MemberStatus, 0) IN ( 0, 4, 6, 5 )
            AND ISNULL(ID_Reference, 0) = 0
            AND ( ISNULL(CollAmt, 0) = 0
                  OR ISNULL(PaidAmount, 0) = 0
                )
            AND ID_Member = @ID_Members
            AND ( Comment NOT LIKE '%New%'
                  OR Comment NOT  LIKE '%NEW%'
                )
	
	
	----------------------------------------------------------------

    DECLARE @ID_MemberStatus_Previous INT = 0
    DECLARE @LastPeriod INT = 0
    DECLARE @LastPeriodDueDate DATE
		
    DECLARE @TotalBalanceAmount DECIMAL(18, 2) = 0


    DECLARE zz_cursor2 CURSOR FAST_FORWARD
    FOR
        SELECT  ID ,
                Period ,
                Balance ,
                PremiumRate ,
                PaymentAmount ,
                DueDate ,
                ID_Reference ,
                Comment
        FROM    vxMemberPreliumHistoryPaymentByPeriod
        WHERE   ID_Member = @ID_Members
                AND ID BETWEEN @ID_Period_Initial AND @ID_Period_LAST
        ORDER BY DueDateStart ASC ,
                Period ASC

   
							
    OPEN zz_cursor2 
					
					
    FETCH NEXT FROM zz_cursor2	
				INTO @ID_Period, @Period, @Balance, @PremiumRate,
        @PaymentAmount, @DueDate, @ID_Reference, @Comment
    WHILE @@FETCH_STATUS = 0
        BEGIN

		
            IF ISNULL(@PaymentAmount, 0) = 0
                BEGIN
				
                    SET @PaymentAmount = dbo.fGetPaidAmountFromPrincipalMember(@ID_Members,
                                                              @ID_Period)

                    IF ISNULL(@PaymentAmount, 0) > 0
                        BEGIN
						
			
                            UPDATE  dbo.tMembersPremiumHistory
                            SET     CollAmt = @PaymentAmount
                            WHERE   ID = @ID_Period
                                    AND ISNULL(ID_Reference, 0) = 0

                            UPDATE  dbo.tMembersPremiumHistory
                            SET     PaidAmount = @PaymentAmount
                            WHERE   ID = @ID_Period
                                    AND ISNULL(ID_Reference, 0) > 0

                        END


                    
                END


				
            SET @Balance = @PremiumRate - @PaymentAmount
				  

				
            IF @Balance = 0 -- Kapag May Payment
                BEGIN
			
                    IF @ID_MemberStatus_Current = 6
                        BEGIN
                            SET @ID_MemberStatus_Current = 7
                            SET @LapsedCounter = 0
									
								
                        END	
                    ELSE
                        SET @ID_MemberStatus_Current = 2
						SET @LapsedCounter = 0
                END	
            ELSE
                IF @Balance > 0
                    AND @Balance < @PaymentAmount
                    BEGIN
		
                        SET @ID_MemberStatus_Current = 2
						          SET @LapsedCounter = 0
                    END	
		
                ELSE
                    IF @PremiumRate = @Balance
                        BEGIN

                            SET @ID_MemberStatus_Current = 5
		
                            IF @SystemCurrentDate > @DueDate
                                BEGIN
			
                                    IF @LapsedCounter > 1
                                        BEGIN
			
                                            SET @ID_MemberStatus_Current = 6
		
		
                                        END
			
                                    ELSE
                                        BEGIN
                                            SET @LapsedCounter = @LapsedCounter
                                                + 1
			                	
                                        END
												
                                    IF ISNULL(@ID_Reference, 0) = 0
                                        AND @ID_MemberStatus_Current IN ( 5, 6 )
                                        BEGIN
												 --SET @Comment = CONVERT(VARCHAR(MAX), DATEDIFF(DAY,
		                                        --                      @DueDate,
		                                        --                      @SystemCurrentDate))
                                            SET @Comment = 'Due Date is already matured.'
                                        END
		                                       
                                END
                            ELSE
                                IF ISNULL(@ID_Reference, 0) = 0
                                    AND @ID_MemberStatus_Current <> 4
                                    BEGIN
                                        SET @ID_MemberStatus_Current = 0


                                    END
                                
                            IF @ID_EmploymentStatus IN ( 1, 3 )
                                AND @ID_MemberStatus_Current IN ( 5, 6 )
                                BEGIN
								
                                    SET @ID_MemberStatus_Current = 5

                                    UPDATE  dbo.tMembersPremiumHistory
                                    SET     Balance = 0 ,
                                            ID_Reference = 0
                                    WHERE   ID = @ID_Period

								
                                END
                             
                        END
		

            IF @ID_MemberStatus_Current IN ( 4, 5, 6 )
                SET @TotalBalanceAmount = @TotalBalanceAmount + @Balance
            ELSE
                SET @TotalBalanceAmount = 0

            UPDATE  tMembersPremiumHistory
            SET     ID_MemberStatus = @ID_MemberStatus_Current ,
                    Balance = @TotalBalanceAmount ,
                    Comment = @Comment
            WHERE   ID = @ID_Period

	

            IF @ID_MemberStatus_Previous IN ( 5, 6 )
                EXEC pUpdateMemberPremiumPeriodBalanceByLapsedInactiveStatus @ID_Members,
                    @ID_Period
		
		
            SET @LastPeriod = @Period
            SET @LastPeriodDueDate = @DueDate
			


			
            PRINT @Period
            PRINT @PaymentAmount
            PRINT @ID_MemberStatus_Current
  

            FETCH NEXT FROM zz_cursor2 			
					INTO @ID_Period, @Period, @Balance, @PremiumRate,
                @PaymentAmount, @DueDate, @ID_Reference, @Comment
        END  				
							
    CLOSE zz_cursor2
    DEALLOCATE zz_cursor2

		--------------------------------------------------




		--------------------------------------
			


    IF GETDATE() > @LastPeriodDueDate
        AND @ID_MemberStatus_Current IN ( 5, 6 )
        AND @LastPeriod IN ( 12, 24 ) -- Kapag lumagpas na sa due date ung pinika-last period and ung Memberstatus is either Lapsed or Inactive 
        SET @ID_MemberStatus_Current = 6						  -- Inactive na si Member
    ELSE
        BEGIN
									
            IF @ID_MemberStatus_Current = 5 --- if Lapsed Status
                SET @ID_MemberStatus_Current = 2  -- Magiging Ative Parin
			
			
            IF @ID_MemberStatus_Current = 6 --- if Inactive
                SET @ID_MemberStatus_Current = 6
        END


			
    IF @ID_MemberStatus_Current = 4--- if Reinstated
        SET @ID_MemberStatus_Current = 2 -- Active Parin
			
			
    IF @ID_MemberStatus_Current = 7 --- if Reinstated
        SET @ID_MemberStatus_Current = 2 -- Active Parin
			
			---------------------------------------------
    DECLARE @ID_MPH_Min INT = 0
			
		
    SELECT TOP 1
            @ID_MPH_Min = MIN(ID) ,
            @ID_MembersPremiumHistory_Contract = ID_MembersPremiumHistory_Contract
    FROM    tMembersPremiumHistory
    WHERE   ISNULL(ID_MemberStatus, 0) = 0
            AND ID_Member = @ID_Members
            AND ID > @ID_Period_Initial
    GROUP BY ID_MembersPremiumHistory_Contract ,
            ID ,
            Period
    ORDER BY ID_MembersPremiumHistory_Contract ,
            Period ASC
		
		
    DECLARE @CountNewMemberStatus INT = 0
		
		
    SELECT  @CountNewMemberStatus = COUNT(*)
    FROM    dbo.tMembersPremiumHistory
    WHERE   ID_MembersPremiumHistory_Contract = @ID_MembersPremiumHistory_Contract
            AND ID_MemberStatus = 4
            AND ISNULL(ID_Reference, 0) = 0
            AND ID_Member = @ID_Members
		
    IF @CountNewMemberStatus = 0
        BEGIN


            IF @ID_EmploymentStatus IN ( 1, 3 )
                BEGIN
			
                    UPDATE  dbo.tMembersPremiumHistory
                    SET     ID_MemberStatus = 0 ,
                            ID_Reference = NULL ,
                            PaidAmount = 0 ,
                            Balance = PremiumRate
                    WHERE   ID_Member = @ID_Members
                            AND ID_MemberStatus NOT IN ( 2, 7, 9, 5, 1 )

                 
                END
            ELSE
                BEGIN
                    UPDATE  dbo.tMembersPremiumHistory
                    SET     ID_MemberStatus = 4 ,
                            ID_Reference = NULL ,
                            PaidAmount = 0 ,
                            Balance = PremiumRate
                    WHERE   ID = @ID_MPH_Min
                            AND ISNULL(ID_Reference, 0) = 0




                END

        END
				
    exit_:

	

    
			-----------------------------------------------------
		
    IF @ID_EmploymentStatus NOT IN ( 1, 3 )
        BEGIN
            UPDATE  dbo.tMembers
            SET     ID_EmploymentStatus = @ID_MemberStatus_Current ,
                    IsActive = 1
            WHERE   ID = @ID_Members
        END

    --ELSE
    --    BEGIN
			
    --        UPDATE  dbo.tMembers
    -- -    SET     --ID_EmploymentStatus = @ID_EmploymentStatus ,
    --           --     IsActive = 0
    --        WHERE   ID = @ID_Members

    --    END

    UPDATE  dbo.tMembersPremiumHistory
    SET     ID_MemberStatus = 1
    FROM    dbo.tHMOBillingInvoice_ResignedMember biResignedMember
            INNER JOIN dbo.tMembersPremiumHistory ON tMembersPremiumHistory.ID_Member = biResignedMember.ID_Members
    WHERE   biResignedMember.ResignedDate BETWEEN DueDateStart
                                          AND     DueDate
                          

	
    UPDATE  dbo.tMembersPremiumHistory
    SET     ID_MemberStatus = 0
    WHERE   ID_Member = @ID_Members
            AND ID_MemberStatus = 4

    UPDATE  dbo.tMembers
    SET     DateEffective = @DateEffective
    WHERE   ID = @ID_Members
            AND DateEffective IS NULL


    UPDATE  tMembers
    SET     IsActive = 0 ,
            ID_EmploymentStatus = 1 ,
            ID_EStatus = biResignedMember.ID_EmploymentStatus
    FROM    dbo.tHMOBillingInvoice_ResignedMember biResignedMember
            INNER JOIN dbo.tMembers ON tMembers.ID = biResignedMember.ID_Members
			
GO


