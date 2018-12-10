define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Ledger Entry",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=5218,s.ID_View=5702,s.ID_Model=4257,s.ModelViewName="LedgerEntry_DetailView",s.ModelName="LedgerEntry",s.DisplayName="Ledger Entry",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:4257,LedgerEntry_Details:4256},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.FilingStatus":"CurrentObject.FilingStatus","formData.Comment":"CurrentObject.Comment","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.ID_BOA":"CurrentObject.ID_BOA","formData.Reference":"CurrentObject.Reference","formData.LedgerEntryDate":"CurrentObject.LedgerEntryDate","formData.Name":"CurrentObject.Name","formData.PostedDate":"CurrentObject.PostedDate","formData.Reason":"CurrentObject.Reason","formData.ID_Month":"CurrentObject.ID_Month","formData.ID_PostedBy":"CurrentObject.ID_PostedBy","formData.RefNo":"CurrentObject.RefNo","formData.TotalAmt":"CurrentObject.TotalAmt","formData.TransactionModule":"CurrentObject.TransactionModule","formData.Year":"CurrentObject.Year","formData.IsActive":"CurrentObject.IsActive","formData.CreatedBy":"CurrentObject.CreatedBy","formData.LastModifiedBy":"CurrentObject.LastModifiedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","ID","ID_BOA","LedgerEntryDate","Name","PostedDate","ID_Month","ID_PostedBy","RefNo","Year","IsActive"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_BOAReadOnly!==undefined&&s.setID_BOAReadOnly(n);s.setLedgerEntryDateReadOnly!==undefined&&s.setLedgerEntryDateReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setPostedDateReadOnly!==undefined&&s.setPostedDateReadOnly(n);s.setID_MonthReadOnly!==undefined&&s.setID_MonthReadOnly(n);s.setID_PostedByReadOnly!==undefined&&s.setID_PostedByReadOnly(n);s.setRefNoReadOnly!==undefined&&s.setRefNoReadOnly(n);s.setYearReadOnly!==undefined&&s.setYearReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);$.each(["LedgerEntry_Details"],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="ID_FilingStatus"||n.dataField==="Comment"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="ID"||n.dataField==="ID_BOA"||n.dataField==="ID_Reference"||n.dataField==="LedgerEntryDate"||n.dataField==="Name"||n.dataField==="PostedDate"||n.dataField==="Reason"||n.dataField==="ID_Month"||n.dataField==="ID_PostedBy"||n.dataField==="RefNo"||n.dataField==="TotalAmt"||n.dataField==="TransactionModule"||n.dataField==="Year"||n.dataField==="IsActive"||n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="ID_FilingStatus"&&n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="ID_Reference"&&n.dataField!=="Reason"&&n.dataField!=="TotalAmt"&&n.dataField!=="TransactionModule"&&n.dataField!=="ID_CreatedBy"&&n.dataField!=="ID_LastModifiedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"Name",label:{text:"LE No.",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify LE No."})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"LE No. is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_FilingStatus",label:{text:"Filing Status",alignment:"right",showColon:!1,location:"left"},dataField:"FilingStatus",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_FilingStatus",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_FilingStatus",n)},tabIndex:1e8}},{name:"ID_PostedBy",label:{text:"Posted By",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PostedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_PostedBy",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_PostedBy",n)}}},{name:"PostedDate",label:{text:"Date Posted",alignment:"right",showColon:!1,location:"left"},dataField:"PostedDate",editorType:"dxDateBox",editorOptions:{PropertyName:"PostedDate",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("PostedDate",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Date Posted"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Date Posted is required"}],cssClass:"js-dx-required"},{name:"ID_Reference",label:{text:"Reference",alignment:"right",showColon:!1,location:"left"},dataField:"Reference",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Reference",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_Reference",n)},tabIndex:1e8}},{name:"RefNo",label:{text:"Ref No",alignment:"right",showColon:!1,location:"left"},dataField:"RefNo",editorType:"dxTextBox",editorOptions:{PropertyName:"RefNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("RefNo",n)}}},{name:"LedgerEntryDate",label:{text:"Ledger Entry Date",alignment:"right",showColon:!1,location:"left"},dataField:"LedgerEntryDate",editorType:"dxDateBox",editorOptions:{PropertyName:"LedgerEntryDate",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("LedgerEntryDate",n)}}},{name:"ID_Month",label:{text:"Month",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Month",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Month",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Month",n)}}},{name:"Year",label:{text:"Year",alignment:"right",showColon:!1,location:"left"},dataField:"Year",editorType:"dxTextBox",editorOptions:{PropertyName:"Year",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Year",n)}}},{name:"ID_BOA",label:{text:"BOA",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BOA",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_BOA",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_BOA",n)}}},{name:"TotalAmt",label:{text:"Total Amt",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmt",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalAmt",readOnly:!0,PropertyName:"TotalAmt",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalAmt=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalAmt",n)},tabIndex:1e8}},{name:"TransactionModule",label:{text:"Transaction Module",alignment:"right",showColon:!1,location:"left"},dataField:"TransactionModule",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TransactionModule",readOnly:!0,PropertyName:"TransactionModule",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TransactionModule=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TransactionModule",n)},tabIndex:1e8}}]}]}]}]}]},s.$scope.LedgerEntry_DetailsGridOption=s.GetDetailGridOption("LedgerEntry_Detail_LookUp_ListView","$parent.$parent.CurrentObject.LedgerEntry_Details","LedgerEntry_Details",[{editorOptions:{min:0},ID_ModelProperty:10380,ID_Column:13047,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:10381,ID_Column:13048,dataField:"Code",allowFixing:!0,visible:!0,caption:"Account Code",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:10382,ID_Column:13049,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:10383,ID_Column:13050,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:200,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:10384,ID_Column:13051,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10389,ID_Column:13056,dataField:"ID_Account",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"Account Name",width:200,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.AccountName===undefined&&s.console_warn("AccountName is undefined in datasource");var i=t.data.AccountName!==undefined?t.data.AccountName===null?"-":t.data.AccountName:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:10385,ID_Column:13052,dataField:"DebitAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Debit Amt",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10386,ID_Column:13053,dataField:"CreditAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Credit Amt",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10387,ID_Column:13054,dataField:"Amount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Amount",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:10388,ID_Column:13055,dataField:"AccountName",allowFixing:!0,visible:!1,caption:"AccountName",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10390,ID_Column:13057,dataField:"ID_CostCenter",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"Cost Center",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10391,ID_Column:13058,dataField:"ID_Subsidiary",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"Subsidiary",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0}],"",5217,null,300,"@ID",null,"Details",4444,4256,14409,11380,undefined,100),s.$scope.LedgerEntry_Details_MenuOptions=[],s.$scope.GeneralGridTabPabelItems=[{isForm:!1,Caption:"Details",Name:"LedgerEntry_DetailsGridContainer",title:"Details",PropertyName:"LedgerEntry_Details",DisplayProperty:"Name",GridOption:s.$scope.LedgerEntry_DetailsGridOption,width:"100%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.LedgerEntry_Details_MenuOptions"})},{title:"Comment",isForm:!0,ID_Tab:13427,name:"CommentTab",formOption:{bindingOptions:{"formData.Comment":"$parent.$parent.CurrentObject.Comment"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:1,onInitialized:function(n){n.component.option("$EditableProperties",["Comment"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n)},s.onCommentTab_TabFormInitialized!==undefined)s.onCommentTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:n.dataField==="Comment"&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:1,colSpan:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}},colSpan:2}]}]}},{title:"Status",isForm:!0,ID_Tab:13428,name:"StatusTab",formOption:{bindingOptions:{"formData.CreatedBy":"$parent.$parent.CurrentObject.CreatedBy","formData.LastModifiedBy":"$parent.$parent.CurrentObject.LastModifiedBy","formData.DateCreated":"$parent.$parent.CurrentObject.DateCreated","formData.DateModified":"$parent.$parent.CurrentObject.DateModified","formData.Reason":"$parent.$parent.CurrentObject.Reason"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",[]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(){},s.onStatusTab_TabFormInitialized!==undefined)s.onStatusTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="Reason")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="Reason")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:150,onInitialized:function(n){s.onControl_Initialized("Reason",n)},tabIndex:1e8}}]}]}}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:4257,LedgerEntry_Details:4256},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.$dateFields.push("LedgerEntryDate"),s.$dateFields.push("PostedDate"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    