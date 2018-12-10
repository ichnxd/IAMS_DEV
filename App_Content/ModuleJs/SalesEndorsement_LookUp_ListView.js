define(["app","baseListViewController","/JsApp/GetScript?Url=Salespipeline%2fVC_SalesEndorsement"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5486,ModelViewName:"SalesEndorsement_LookUp_ListView",StateName:i,ID_View:6771,ModelName:"SalesEndorsement",Icon:"mdi mdi-account-switch",DisplayName:"Sales Endorsement",ID_ModelDetailView:6245,ID_ViewType:2,ViewControllerName:"SalesEndorsement_DetailView",ID_Model:5279,DisplayProperty:"DocumentNo",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"5NCzHSQdD6nWE0j7RhPxpZ9g3wmg42t0TMWGIMGoE4kuaV372WuNiz30wmnjNXFKYJbj2m2yNhKaQsD7H/4hrYEwdAK6anTGSuhbLie3/bNvGNgx9LxeztNfN8bX331/",SQLUpdateProc:"fdacgXzTyypxJ0Ry2ngevR0DIFycmIxCp+12FfS2fpax+VyqnlMYKrWXOOEYz4/NgXfk5NMm+9j/aHae4F7toLkgw+kNodZN7LUvnDR2ct7zS+kfPqy+pRXkRdqvDu97"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="SalesEndorsement";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:13804,ID_Column:15754,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:13812,ID_Column:15762,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:316256,ID_Column:1071e3,dataField:"ContactAcctPhone",allowFixing:!0,visible:!1,caption:"ContactAcctPhone",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:13807,ID_Column:15757,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:13808,ID_Column:15758,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:13809,ID_Column:15759,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"PfawpHGJO2lW+x5NNPrzumw7AMXFvluTkF6akVVRDdz0FnwqokbgKKOknZtHZrxf+ajp3vZwUTp8OAadJ2CDAhvQnpmZsXGqcQJRDBEzaRpxlVIG/sxN2GR/WWl56SRi",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:13810,ID_Column:15760,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"YUkFc8g+lcWzb15YUgjCIikNVVafthdVNl9Hh03NSvDb7WeyQcRAS+FN+P9jaMBDkBA9lst55YjOaQ68PB3rm0HdD/ytz+VED8AkR6zkAlaqyeuyYdNq1kzP0HYYKeLO",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:13806,ID_Column:15756,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:13805,ID_Column:15755,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17783,ID_Column:20578,dataField:"ID_BusinessUnit",allowFixing:!0,visible:!1,caption:"ID_BusinessUnit",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17784,ID_Column:20580,dataField:"ID_Opportunity",allowFixing:!0,visible:!1,caption:"ID_Opportunity",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17890,ID_Column:20796,dataField:"TotalPriceVatEx",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalPriceVatEx",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17891,ID_Column:20798,dataField:"TotalPriceVatInc",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalPriceVatInc",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17892,ID_Column:20800,dataField:"ID_InvetoryStatus",allowFixing:!0,visible:!1,caption:"ID_InvetoryStatus",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17893,ID_Column:20802,dataField:"ID_PaymentType",allowFixing:!0,visible:!1,caption:"ID_PaymentType",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17894,ID_Column:20804,dataField:"Location",allowFixing:!0,visible:!1,caption:"Location",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17895,ID_Column:20806,dataField:"Warranty",allowFixing:!0,visible:!1,caption:"Warranty",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17896,ID_Column:20808,dataField:"DeliveryDate",allowFixing:!0,visible:!1,caption:"DeliveryDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17897,ID_Column:20810,dataField:"InstallationRemarks",allowFixing:!0,visible:!1,caption:"InstallationRemarks",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17898,ID_Column:20812,dataField:"SpecialRemarks",allowFixing:!0,visible:!1,caption:"SpecialRemarks",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17900,ID_Column:20816,dataField:"PONumber",allowFixing:!0,visible:!1,caption:"PONumber",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17901,ID_Column:20818,dataField:"ID_ContactPerson",allowFixing:!0,visible:!1,caption:"ID_ContactPerson",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17924,ID_Column:20862,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:17926,ID_Column:20866,dataField:"ID_Customer",allowFixing:!0,visible:!1,caption:"ID_Customer",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17929,ID_Column:20872,dataField:"CustomerPOFile",allowFixing:!0,visible:!1,caption:"CustomerPOFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17930,ID_Column:20874,dataField:"FinalProposalFile",allowFixing:!0,visible:!1,caption:"FinalProposalFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17931,ID_Column:20876,dataField:"TenderBizFile",allowFixing:!0,visible:!1,caption:"TenderBizFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17932,ID_Column:20878,dataField:"CustomerContractFile",allowFixing:!0,visible:!1,caption:"CustomerContractFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17933,ID_Column:20880,dataField:"OthersFile",allowFixing:!0,visible:!1,caption:"OthersFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:17934,ID_Column:20882,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"KjOBpeFDzsauT2byZoFiZiVxl+yAZKqChvFIJusLrklZTmCOh68YZz2aZJB0btzKWKG8DTm962c75bLk3QlXM4yXOT6IEV+nbmLeW2/nqKTW1Y4EVBZXlRabMnN0O7vy"},{editorOptions:{min:0},ID_ModelProperty:17935,ID_Column:20884,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17936,ID_Column:20886,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17937,ID_Column:20888,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17938,ID_Column:20890,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17977,ID_Column:20961,dataField:"ID_TaxScheme",allowFixing:!0,visible:!1,caption:"ID_TaxScheme",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18305,ID_Column:21608,dataField:"TenderBiz",allowFixing:!0,visible:!1,caption:"TenderBiz",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18307,ID_Column:21612,dataField:"PODate",allowFixing:!0,visible:!1,caption:"PODate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:18604,ID_Column:22152,dataField:"BillOfMaterialsFile",allowFixing:!0,visible:!1,caption:"BillOfMaterialsFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19133,ID_Column:23146,dataField:"TIN",allowFixing:!0,visible:!1,caption:"TIN",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19156,ID_Column:23189,dataField:"AwardNotice",allowFixing:!0,visible:!1,caption:"AwardNotice",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19157,ID_Column:23191,dataField:"ProgressBilling",allowFixing:!0,visible:!1,caption:"ProgressBilling",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19158,ID_Column:23193,dataField:"ForImportation",allowFixing:!0,visible:!1,caption:"ForImportation",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19203,ID_Column:23283,dataField:"ID_ApproverMatrix_Summary",allowFixing:!0,visible:!1,caption:"ID_ApproverMatrix_Summary",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19247,ID_Column:23365,dataField:"TotalContractPrice",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalContractPrice",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19248,ID_Column:23367,dataField:"TotalDiscount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalDiscount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19249,ID_Column:23369,dataField:"Subtotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Subtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19250,ID_Column:23371,dataField:"ID_PaymentTerm",allowFixing:!0,visible:!1,caption:"ID_PaymentTerm",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19251,ID_Column:23373,dataField:"TotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalVat",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19446,ID_Column:23769,dataField:"DocumentNo",allowFixing:!0,visible:!1,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19507,ID_Column:23921,dataField:"Notes",allowFixing:!0,visible:!1,caption:"Notes",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:21410,ID_Column:26416,dataField:"NewClientsSubjectForApproval",allowFixing:!0,visible:!1,caption:"NewClientsSubjectForApproval",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:21411,ID_Column:26415,dataField:"DeliveryAddress",allowFixing:!0,visible:!1,caption:"DeliveryAddress",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:22443,ID_Column:26832,dataField:"ID_ContactAcctDept",allowFixing:!0,visible:!1,caption:"ID_ContactAcctDept",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:22444,ID_Column:26834,dataField:"ID_ContactWrhDept",allowFixing:!0,visible:!1,caption:"ID_ContactWrhDept",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:22445,ID_Column:26836,dataField:"ID_ContactPurchsDept",allowFixing:!0,visible:!1,caption:"ID_ContactPurchsDept",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:22446,ID_Column:26838,dataField:"ContactAcctNo",allowFixing:!0,visible:!1,caption:"ContactAcctNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:22447,ID_Column:26840,dataField:"ContactWrhNo",allowFixing:!0,visible:!1,caption:"ContactWrhNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:22448,ID_Column:26842,dataField:"ContactPurchsNo",allowFixing:!0,visible:!1,caption:"ContactPurchsNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:22449,ID_Column:26844,dataField:"ContactWrhEmail",allowFixing:!0,visible:!1,caption:"ContactWrhEmail",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:22450,ID_Column:26846,dataField:"ContactPurchsEmail",allowFixing:!0,visible:!1,caption:"ContactPurchsEmail",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:22451,ID_Column:26848,dataField:"ContactAcctEmail",allowFixing:!0,visible:!1,caption:"ContactAcctEmail",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:22456,ID_Column:26858,dataField:"isSalesOrder",allowFixing:!0,visible:!1,caption:"isSalesOrder",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224256,ID_Column:268081,dataField:"ID_AccountExecutive",allowFixing:!0,visible:!1,caption:"ID_AccountExecutive",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224257,ID_Column:268083,dataField:"ID_EndorsedBy",allowFixing:!0,visible:!1,caption:"ID_EndorsedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224258,ID_Column:268085,dataField:"DateEndorsed",allowFixing:!0,visible:!1,caption:"DateEndorsed",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224728,ID_Column:969898,dataField:"RegisteredCompany",allowFixing:!0,visible:!1,caption:"RegisteredCompany",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224729,ID_Column:969900,dataField:"BillingAddress",allowFixing:!0,visible:!1,caption:"BillingAddress",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224730,ID_Column:969902,dataField:"IsSameAsDelivery",allowFixing:!0,visible:!1,caption:"IsSameAsDelivery",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224767,ID_Column:969972,dataField:"Service_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_SubTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224768,ID_Column:969974,dataField:"Service_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_DiscountAmt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224769,ID_Column:969976,dataField:"Service_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_DiscountRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224770,ID_Column:969978,dataField:"Service_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224771,ID_Column:969980,dataField:"Service_IsLot",allowFixing:!0,visible:!1,caption:"Service_IsLot",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224772,ID_Column:969982,dataField:"BOM_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_SubTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224773,ID_Column:969984,dataField:"BOM_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_DiscountAmt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224774,ID_Column:969986,dataField:"BOM_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_DiscountRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224775,ID_Column:969988,dataField:"BOM_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224776,ID_Column:969990,dataField:"BOM_IsLot",allowFixing:!0,visible:!1,caption:"BOM_IsLot",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224777,ID_Column:969992,dataField:"QuotationFile",allowFixing:!0,visible:!1,caption:"QuotationFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224802,ID_Column:970034,dataField:"ParentCompany",allowFixing:!0,visible:!1,caption:"ParentCompany",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316203,ID_Column:1070865,dataField:"Equipment_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Subtotal",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316204,ID_Column:1070867,dataField:"Equipment_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount %",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316205,ID_Column:1070869,dataField:"Equipment_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount Amt",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316206,ID_Column:1070871,dataField:"Equipment_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total Amount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:316226,ID_Column:1070930,dataField:"ContactAcctPosition",allowFixing:!0,visible:!1,caption:"Position",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})