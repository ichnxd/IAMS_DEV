--SELECT DataSource,* FROM  dbo.[_tModelDetailView_Detail] WHERE ID = 294950
--GO

--UPDATE dbo.[_tModelDetailView_Detail] SET DataSource = 'SELECT ID,Name FROM dbo.tOpportunity WHERE ID_Customer = @ID_Client' WHERE ID = 294950
--GO
--SELECT DataSource,* FROM  dbo.[_tModelDetailView_Detail] WHERE ID = 294841
UPDATE dbo.[_tModelDetailView_Detail] SET DataSource = 'SELECT  opp.ID ,opp.DocumentNo AS Name , opp.DocumentNo , opp.Name AS ProjectName ,opp.Name AS BDM ,opp.TradeName AS Customer ,opp.Branch FROM    vOpportunity opp WHERE   opp.ID_OpportunityStage NOT IN ( 6, 5 )' WHERE ID = 294841
GO

ALTER VIEW dbo.vzSalesEndorsementForm
AS
    SELECT  se.ID ,
            cus.Name AS CompanyName ,
            cus.TradeName
            + CASE WHEN LEN(dbo.fCleanTrim(cus.Branch)) > 1
                   THEN ' (' + cus.Branch + ')'
                   ELSE ''
              END TradeNameBranch ,
            cus.Address AS CompanyAddress ,
            cus.TIN ,
            se.ID_ContactPerson ,
            cus.PhoneNo ,
            cusd.Name AS ContactPerson ,
            ID_ApprovedBy ,
            UPPER(emp.Name) AS EmployeeName ,
            se.AccountExecutive AS AccountExecutive ,
            se.ID_ContactAcctDept ,
            Warranty ,
            DeliveryDate ,
            bs.Name AS BusinessStyleName ,
            op.Name AS PaymentType ,
            ins.Name AS InventoryStatus ,
            TotalPriceVatEx ,
            TotalPriceVatInc ,
            InstallationRemarks ,
            se.TenderBizFile ,
            SpecialRemarks ,
            UPPER(bu.Head) Head ,
            se.DocumentNo SEDocumentNo ,
            se.DateCreated ,
            se.AccountingDept ,
            CASE WHEN se.ContactAcctNo = '63' THEN NULL
                 ELSE '+(' + SUBSTRING(se.ContactAcctNo, 1, 2) + ')'
                      + SUBSTRING(se.ContactAcctNo, 3, 3) + '-'
                      + SUBSTRING(se.ContactAcctNo, 6, 4) + '-'
                      + SUBSTRING(se.ContactAcctNo, 10, 3)
            END ContactAcctNo ,
            se.ContactAcctEmail ,
            se.WarehouseDept ,
            CASE WHEN se.ContactWrhNo = '63' THEN NULL
                 ELSE '+(' + SUBSTRING(se.ContactWrhNo, 1, 2) + ')'
                      + SUBSTRING(se.ContactWrhNo, 3, 3) + '-'
                      + SUBSTRING(se.ContactWrhNo, 6, 4) + '-'
                      + SUBSTRING(se.ContactWrhNo, 10, 3)
            END ContactWrhNo ,
            se.ContactWrhEmail ,
            CASE WHEN se.ContactPurchsNo = '63' THEN NULL
                 ELSE '+(' + SUBSTRING(se.ContactPurchsNo, 1, 2) + ')'
                      + SUBSTRING(se.ContactPurchsNo, 3, 3) + '-'
                      + SUBSTRING(se.ContactPurchsNo, 6, 4) + '-'
                      + SUBSTRING(se.ContactPurchsNo, 10, 3)
            END ContactPurchsNo ,
            se.ContactPurchsEmail ,
            se.PurchasingDept ,
            bu.Name BusinessUnit ,
            se.PaymentTerm ,
            se.PONumber ,
            se.Opportunity ,
            se.NewClientsSubjectForApproval ,
            se.DeliveryAddress ,
            se.Branch ,
            se.Comment,
			se.ProjectName
    FROM    dbo.vSalesEndorsement AS se
            LEFT JOIN dbo.tCustomer cus ON cus.ID = se.ID_Customer
            LEFT JOIN dbo.tCustomer_Detail cusd ON cusd.ID_Customer = se.ID_Company
            LEFT JOIN dbo.tUser AS emp ON emp.ID = se.ID_CreatedBy
			--LEFT JOIN dbo.tEmployee AE ON se.id_ac
            LEFT JOIN dbo.tInventoryStatus AS ins ON ins.ID = se.ID_InvetoryStatus
            LEFT JOIN dbo.tOpportunity AS op ON op.ID = se.ID_PaymentType
            LEFT JOIN dbo.tIndustry AS bs ON bs.ID = cus.ID_Industry
            LEFT JOIN dbo.vBusinessUnit bu ON bu.ID = se.ID_BusinessUnit

GO

UPDATE dbo.tItem SET Name = Description WHERE Comment = 'New'