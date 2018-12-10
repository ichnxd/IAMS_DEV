define(["app","baseListViewController","/JsApp/GetScript?Url=Salespipeline%2fVC_Opportunity"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3293,ModelViewName:"Opportunity_ListView",StateName:i,ID_View:4456,ModelName:"Opportunity",Icon:"mdi mdi-account-star",DisplayName:"Opportunity",ID_ModelDetailView:4142,ID_ViewType:2,ViewControllerName:"Opportunity_DetailView",ID_Model:3181,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"O1+fyHTmI20/20LPg2oPHoueRC9tzQjmsLR76MM+Ah9HGhPWKCN8LzqeA+SVOGdWz73BVxD0UKSZ3BhaPrDRfwWQitjtP27OWJYWWXIEXBH6FkysTp0Tnae2CAi601lRR+TV7QRyduFj6PxWYGAEPJs39TiR1wm7YHjKz/blbIg=",SQLUpdateProc:"1m/E6f0f86gLIoULb6TkBEq8PSV+/gZmUGIzW0Kf0QWXIKnB8TdyG7+gcutKFNCMwPvaXCiyeDBiqo7WilZJ863nTVjD2P82Zyim+mQLb5OzhB/Kqvp0kil5W3UF8FXF"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="Opportunity";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalVatEx_Summary",showInColumn:"TotalVatEx",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalVatEx==undefined?"0.00":Globalize.format(u.$Summary.TotalVatEx,"n2")}},{name:"TotalVatInc_Summary",showInColumn:"TotalVatInc",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalVatInc==undefined?"0.00":Globalize.format(u.$Summary.TotalVatInc,"n2")}},{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{editorOptions:{min:0},ID_ModelProperty:7163,ID_Column:8678,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"fFLWMCDRtuF3X8T+i46MKraRMs4U4k+Rd6MZ4hRoU8qQ83bIFksvfb2Ooq0MV6MJACrVIlUG01iYp+1IoEIoauxZAVoo6ikYLxm1l3crzyobPTD8++zSvBljbCrM/fvG",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:17169,ID_Column:19530,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"OPP No.",width:84,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:7162,ID_Column:8677,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"BDM",width:148,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"fV6pPagi7HfvY+mL3ceY7pK5ER4PKTiuZc/9RwuTRL/yo7eO9In3SwQ9gr4a66wuBEjWei5HGsbq2OBW8A1BIY7Xu5Xfp5PdgAOvFw3Y7X0uOrDS08mveVaqHqfHeSdNp3s7JhlTl3eb3SM3BSLLq8sqDWyRHNtJvVX6QG6MKzc=",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19134,ID_Column:23149,dataField:"ProjectName",allowFixing:!0,visible:!0,caption:"Project Name",width:424,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9113,ID_Column:11544,dataField:"Stage",allowFixing:!0,visible:!0,caption:"Stage",width:92,alignment:"left",fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:4180,Icon:"FontInSys",ModelPropertyName:"Stage"},refDataField:"ID_OpportunityStage",SQL:"Wl2LGzjYEHKM82YPgyqzT7XX5ZYjCapQuzMVLi+zq53qI9OmxY8SRSAFu70OxAEw6U2T4U/5SKbqnXGtcydh+Iyp2uufUSIHzzP5EL3JS3G+q3WGxWawvMFh1dAqngNe",cellTemplate:function(n,t){t.data.Stage===undefined?u.console_warn("Stage is undefined in datasource"):u.addColumnClassMapping(n,"ID_OpportunityStage",t.data,"OppStage",[{ID:1,Value:"Introduction"},{ID:6,Value:"Lost"},{ID:2,Value:"Meeting"},{ID:3,Value:"Proposal"},{ID:4,Value:"VerbalConfirmation"},{ID:5,Value:"Won"}]);n.addClass("ID_OpportunityStage");var i=t.data.Stage!==undefined?t.data.Stage===null?"-":t.data.Stage:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption OppStage '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:9111,ID_Column:11540,dataField:"TradeName",allowFixing:!0,visible:!1,caption:"Trade Name",width:250,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:6249,Icon:"mdi mdi-account-edit",ModelPropertyName:"Client"},refDataField:"ID_Customer",SQL:"9crDvhyjOkmGyRCafzgMX03G4QJaZ1HbtqbpQO/crtBkWFVS3jiLO89vL8AsJnFnRv4Lp2VqK0rUHb+VJBiSFjAoRWXkikcGTFn4ePHQjN8ju0C112Hgxv5YvkHuzIiicut/u2snMAyTpA+aAMR7OI3V1BVDpQ/vmb9yjseHcgo=",cellTemplate:function(n,t){t.data.TradeName===undefined&&u.console_warn("TradeName is undefined in datasource");var i=t.data.TradeName!==undefined?t.data.TradeName===null?"-":t.data.TradeName:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7158,ID_Column:8673,dataField:"Name",allowFixing:!0,visible:!1,caption:"Opportunity Name",width:205,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7157,ID_Column:8672,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7159,ID_Column:8674,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7161,ID_Column:8676,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7165,ID_Column:8680,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9100,ID_Column:11518,dataField:"Type",allowFixing:!0,visible:!1,caption:"Type",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_OpportunityType",cellTemplate:function(n,t){t.data.Type===undefined&&u.console_warn("Type is undefined in datasource");var i=t.data.Type!==undefined?t.data.Type===null?"-":t.data.Type:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:9124,ID_Column:11566,dataField:"Category",allowFixing:!0,visible:!1,caption:"Category",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_OpportunityCategory",cellTemplate:function(n,t){t.data.Category===undefined&&u.console_warn("Category is undefined in datasource");var i=t.data.Category!==undefined?t.data.Category===null?"-":t.data.Category:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:9125,ID_Column:11568,dataField:"ContactA",allowFixing:!0,visible:!1,caption:"Contact A",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_ContactA",cellTemplate:function(n,t){t.data.ContactA===undefined&&u.console_warn("ContactA is undefined in datasource");var i=t.data.ContactA!==undefined?t.data.ContactA===null?"-":t.data.ContactA:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:9126,ID_Column:11570,dataField:"ContactB",allowFixing:!0,visible:!1,caption:"Contact B",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_ContactB",cellTemplate:function(n,t){t.data.ContactB===undefined&&u.console_warn("ContactB is undefined in datasource");var i=t.data.ContactB!==undefined?t.data.ContactB===null?"-":t.data.ContactB:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:9127,ID_Column:11572,dataField:"ContactC",allowFixing:!0,visible:!1,caption:"Contact C",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_ContactC",cellTemplate:function(n,t){t.data.ContactC===undefined&&u.console_warn("ContactC is undefined in datasource");var i=t.data.ContactC!==undefined?t.data.ContactC===null?"-":t.data.ContactC:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:9128,ID_Column:11574,dataField:"TargerCloseDate",allowFixing:!0,visible:!1,caption:"Target Closed Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:9129,ID_Column:11576,dataField:"WonLostDate",allowFixing:!0,visible:!1,caption:"Won Lost Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:9140,ID_Column:11598,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_OpportunityReason",cellTemplate:function(n,t){t.data.Reason===undefined&&u.console_warn("Reason is undefined in datasource");var i=t.data.Reason!==undefined?t.data.Reason===null?"-":t.data.Reason:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:9141,ID_Column:11600,dataField:"PrincipalTenderExprDate",allowFixing:!0,visible:!1,caption:"PTER",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:9153,ID_Column:11624,dataField:"ID_MediaSource",allowFixing:!0,visible:!1,caption:"Media Source",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17194,ID_Column:19581,dataField:"ID_TaxScheme",allowFixing:!0,visible:!1,caption:"ID_TaxScheme",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17257,ID_Column:19696,dataField:"TotalVatEx",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total VAT Ex",width:118,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{editorOptions:{min:0},ID_ModelProperty:17256,ID_Column:19694,dataField:"TotalVatInc",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total VAT Inc",width:126,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{ID_ModelProperty:19538,ID_Column:24009,dataField:"FollowUpNote",allowFixing:!0,visible:!1,caption:"Note",width:300,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19232,ID_Column:23334,dataField:"TotalContractPrice",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Contact Price",width:111,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17979,ID_Column:20967,dataField:"Diary",allowFixing:!0,visible:!0,caption:"Diary",width:133,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Diary",cellTemplate:function(n,t){t.data.Diary===undefined&&u.console_warn("Diary is undefined in datasource");var i=t.data.Diary!==undefined?t.data.Diary===null?"-":t.data.Diary:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:17980,ID_Column:20969,dataField:"DiaryDate",allowFixing:!0,visible:!0,caption:"Diary Date",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19257,ID_Column:23384,dataField:"DateEngaged",allowFixing:!0,visible:!1,caption:"Date Engaged",width:140,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:9112,ID_Column:11542,dataField:"BusinessUnit",allowFixing:!0,visible:!1,caption:"Business Unit",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_BusinessUnit",cellTemplate:function(n,t){t.data.BusinessUnit===undefined&&u.console_warn("BusinessUnit is undefined in datasource");var i=t.data.BusinessUnit!==undefined?t.data.BusinessUnit===null?"-":t.data.BusinessUnit:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:9142,ID_Column:11602,dataField:"NextStep",allowFixing:!0,visible:!1,caption:"Next Step",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17939,ID_Column:20893,dataField:"IsEndorsed",allowFixing:!0,visible:!1,caption:"Endorsed",width:82,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7160,ID_Column:8675,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:158,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:17800,ID_Column:20611,dataField:"ID_PaymentTerm",allowFixing:!0,visible:!1,caption:"ID_PaymentTerm",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17801,ID_Column:20613,dataField:"FinalVatEx",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"FinalVatEx",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17802,ID_Column:20615,dataField:"FinalVatInc",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"FinalVatInc",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17803,ID_Column:20617,dataField:"LastDateChanged",allowFixing:!0,visible:!1,caption:"LastDateChanged",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:17804,ID_Column:20619,dataField:"ID_Employee",allowFixing:!0,visible:!1,caption:"ID_Employee",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:3141,Icon:"mdi mdi-account-multiple",ModelPropertyName:"Employee"},SQL:"M8HH90r9miEZ5xnRgYH+MSlnCIjItuDOzDCf6RLAT8yUtjbWKRUR9iOtqlRlwDP5SdcRdd/u70FJ5QnhBhIRy4yblDOZKcb35NlKe9Yvz1iGXE87fSN4JIleeKl20/Mac8GymLkyxCeCL0qMHHLGye9Tn796O3nL9aW5XKijrMI="},{editorOptions:{min:0},ID_ModelProperty:17914,ID_Column:20843,dataField:"ID_EWT",allowFixing:!0,visible:!1,caption:"ID_EWT",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9154,ID_Column:11626,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total Amount",width:120,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:19083,ID_Column:23065,dataField:"TotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalVat",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19135,ID_Column:23151,dataField:"ID_PaymentType",allowFixing:!0,visible:!1,caption:"ID_PaymentType",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19230,ID_Column:23330,dataField:"TotalDiscount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalDiscount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19231,ID_Column:23332,dataField:"Subtotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Subtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19524,ID_Column:23965,dataField:"FollowUpDate",allowFixing:!0,visible:!1,caption:"FollowUpDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19528,ID_Column:23973,dataField:"ID_FollowUpType",allowFixing:!0,visible:!1,caption:"ID_FollowUpType",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_Column:23085,dataField:"Aging",allowFixing:!0,visible:!0,caption:"Aging",width:80,alignment:"center",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224635,ID_Column:969728,dataField:"BOM_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_SubTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224636,ID_Column:969730,dataField:"BOM_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_DiscountAmt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224637,ID_Column:969732,dataField:"BOM_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_DiscountRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224638,ID_Column:969734,dataField:"BOM_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224640,ID_Column:969738,dataField:"BOM_IsLot",allowFixing:!0,visible:!1,caption:"BOM_IsLot",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224644,ID_Column:969746,dataField:"RegisteredCompany",allowFixing:!0,visible:!1,caption:"RegisteredCompany",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224646,ID_Column:969750,dataField:"TIN",allowFixing:!0,visible:!1,caption:"TIN",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224677,ID_Column:969805,dataField:"Service_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_SubTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224678,ID_Column:969807,dataField:"Service_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_DiscountAmt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224679,ID_Column:969809,dataField:"Service_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_DiscountRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224680,ID_Column:969811,dataField:"Service_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224681,ID_Column:969813,dataField:"Service_IsLot",allowFixing:!0,visible:!1,caption:"Service_IsLot",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224789,ID_Column:970013,dataField:"Management",allowFixing:!0,visible:!1,caption:"Management",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224801,ID_Column:970033,dataField:"ParentCompany",allowFixing:!0,visible:!1,caption:"ParentCompany",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:225009,ID_Column:970438,dataField:"ID_BOM",allowFixing:!0,visible:!1,caption:"Reference BOM No.",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:315090,ID_Column:1070632,dataField:"TotalPaymentScheme",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalPaymentScheme",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:315118,ID_Column:1070677,dataField:"Equipment_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Equipment_SubTotal",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:315136,ID_Column:1070712,dataField:"OppurtunityName",allowFixing:!0,visible:!1,caption:"OppurtunityName",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316191,ID_Column:1070842,dataField:"Equipment_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount %",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316192,ID_Column:1070844,dataField:"Equipment_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount Amt",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316193,ID_Column:1070846,dataField:"Equipment_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total Amount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:316220,ID_Column:1070913,dataField:"ScopeOfWork",allowFixing:!0,visible:!1,caption:"ScopeOfWork",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:316221,ID_Column:1070915,dataField:"Notations",allowFixing:!0,visible:!1,caption:"Notations",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316225,ID_Column:1070929,dataField:"ID_AccountExecutive",allowFixing:!0,visible:!1,caption:"ID_AccountExecutive",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})