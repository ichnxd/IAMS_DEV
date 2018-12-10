define(["app","baseDetailViewController","/JsApp/GetScript?Url=Inventory%2fVC_InventoryAdjustment"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this,l,h,c;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Inventory Adjustment",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=4195,s.ID_View=4632,s.ID_Model=3234,s.ModelViewName="InventoryAdjustment_DetailView",s.ModelName="InventoryAdjustment",s.DisplayName="Inventory Adjustment",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:3234,InventoryAdjustment_Details:3235,InventoryAdjustment_Detail_Serials:3236},t.prototype.Init.call(this,n,i,r,u,f,e,o),l=i,h=s.GetControlDataSource("LJI5ggjlZmNwwYS5qTl2Q87teVjhP3ZuBwyRRvVDnG1GaCcu4tKZPqSpkO74n5A42i/HyOzw375I3pc+5jz1kHmHy7mUsgQLCADChCeQb8uRxHWDm3mz/bARv92s95dByZ4mOlQ1B/TZ7exu1hzSBAHN3Dr/8J8Ya8nnzvHdzhU="),s.ComputeExpression=function(){s.calculateHeaderExpression("TotalQty","#InventoryAdjustment_Details.SUM('Quantity')",4)},s.$scope.GeneralFormOptions={bindingOptions:{"formData.Comment":"CurrentObject.Comment","formData.Date":"CurrentObject.Date","formData.DateApproved":"CurrentObject.DateApproved","formData.DateCancelled":"CurrentObject.DateCancelled","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.DocumentNo":"CurrentObject.DocumentNo","formData.Reason":"CurrentObject.Reason","formData.ReasonOfAdjustment":"CurrentObject.ReasonOfAdjustment","formData.TotalQty":"CurrentObject.TotalQty","formData.ID_Warehouse":"CurrentObject.ID_Warehouse","formData.LastModifiedBy":"CurrentObject.LastModifiedBy","formData.ApprovedBy":"CurrentObject.ApprovedBy","formData.CancelledBy":"CurrentObject.CancelledBy","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","Date","ID","ReasonOfAdjustment","ID_Warehouse"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDateReadOnly!==undefined&&s.setDateReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setReasonOfAdjustmentReadOnly!==undefined&&s.setReasonOfAdjustmentReadOnly(n);s.setReadOnly!==undefined&&s.setReadOnly(n);s.setID_WarehouseReadOnly!==undefined&&s.setID_WarehouseReadOnly(n);$.each(["InventoryAdjustment_Detail_Serials","InventoryAdjustment_Details"],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Comment"||n.dataField==="Date"||n.dataField==="DateApproved"||n.dataField==="DateCancelled"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DocumentNo"||n.dataField==="ID"||n.dataField==="Reason"||n.dataField==="ReasonOfAdjustment"||n.dataField==="TotalQty"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CancelledBy"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateApproved"&&n.dataField!=="DateCancelled"&&n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="DocumentNo"&&n.dataField!=="Reason"&&n.dataField!=="TotalQty"&&n.dataField!=="ID_LastModifiedBy"&&n.dataField!=="ID_ApprovedBy"&&n.dataField!=="ID_CancelledBy"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"DocumentNo",label:{text:"I.A. No",alignment:"right",showColon:!1,location:"left"},dataField:"DocumentNo",editorType:"dxTextBox",editorOptions:{PropertyName:"DocumentNo",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("DocumentNo",n)},tabIndex:1e8}},{name:"Date",label:{text:"I.A. Date",alignment:"right",showColon:!1,location:"left"},dataField:"Date",editorType:"dxDateBox",editorOptions:{PropertyName:"Date",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("Date",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify I.A. Date"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"I.A. Date is required"}],cssClass:"js-dx-required"},{name:"TotalQty",label:{text:"Total Qty",alignment:"right",showColon:!1,location:"left"},dataField:"TotalQty",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalQty",readOnly:!0,PropertyName:"TotalQty",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalQty=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalQty",n)},tabIndex:1e8}},{name:"ID_Warehouse",label:{text:"Warehouse",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Warehouse",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_Warehouse",showClearButton:!0,searchEnabled:!0,searchMode:"contains",dataSource:h,onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_Warehouse",value:t});s.$scope.CurrentObject.ID_Warehouse=t!==null?t.ID:null;s.$scope.CurrentObject.Warehouse=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_Warehouse",n)},displayExpr:"Name",valueExpr:"ID",onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Warehouse"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Warehouse is required"}],cssClass:"js-dx-required"},{name:"ReasonOfAdjustment",label:{text:"Reason Of Adjustment",alignment:"right",showColon:!1,location:"left"},dataField:"ReasonOfAdjustment",editorType:"dxTextArea",editorOptions:{PropertyName:"ReasonOfAdjustment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:150,onInitialized:function(n){s.onControl_Initialized("ReasonOfAdjustment",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Reason Of Adjustment"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Reason Of Adjustment is required"}],cssClass:"js-dx-required"}]}]}]}]}]},c=s.GetControlDataSource("1HNYbn5qlC+FM+zZehnWHnDyVkYxqC2eUTdp5wVw42lSKP+euSSDBihitUuHR/iYH3wlRjk7R1mOahLdeqPb0JHtcYH2TLs68SpJBoWtl+uMtrAyl5XMGDl0H1bZTPXvwWrkAn+IHevXfcnTNkRJ7AxSDWnxFMQRLEnD8OWiSoo="),s.$scope.InventoryAdjustment_DetailsGridOption=s.GetDetailGridOption("InventoryAdjustment_Detail_LookUp_ListView","$parent.$parent.CurrentObject.InventoryAdjustment_Details","InventoryAdjustment_Details",[{editorOptions:{min:0},ID_ModelProperty:7963,ID_Column:10255,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:7965,ID_Column:10257,dataField:"Name",allowFixing:!0,visible:!1,caption:"Description",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7967,ID_Column:10259,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:200,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7968,ID_Column:10260,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",width:200,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:7969,ID_Column:10261,dataField:"ID_CreatedBy",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Created By",width:200,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.CreatedBy===undefined&&s.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===s.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:7970,ID_Column:10262,dataField:"ID_LastModifiedBy",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Last Modified By",width:200,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&s.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7964,ID_Column:10256,dataField:"Code",allowFixing:!0,visible:!1,caption:"Item Code",width:79,fixed:!0,fixedPosition:"left",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:315157,ID_Column:1070751,dataField:"SKUCode",allowFixing:!0,visible:!0,caption:"SKU Code",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7985,ID_Column:10295,dataField:"ID_Item",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"Item",width:228,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.Item===undefined&&s.console_warn("Item is undefined in datasource");var i=t.data.Item!==undefined?t.data.Item===null?"-":t.data.Item:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:17710,ID_Column:20449,dataField:"OnHand",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"System Qty",width:73,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17711,ID_Column:20451,dataField:"ActualQuantity",allowFixing:!0,format:"fixedPoint",precision:0,visible:!0,caption:"Actual Qty",width:76,allowEditing:!0,dataType:"number",isAllowZero:!0,cssClass:"editable-cell "},{ID_ModelProperty:7966,ID_Column:10258,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:525,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7986,ID_Column:10297,dataField:"Quantity",allowFixing:!0,format:"fixedPoint",precision:0,visible:!0,caption:"Variance",width:72,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.Quantity=s.calculateExpression(t.data,"@ActualQuantity - @OnHand","InventoryAdjustment_Details",5,t.rowIndex);n.html(Globalize.format(t.data.Quantity,"n2"))}},{ID_ModelProperty:7972,ID_Column:10264,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7981,ID_Column:10291,dataField:"ID_InventoryAdjustment",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_InventoryAdjustment",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7988,ID_Column:10301,dataField:"UnitCost",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Unit Cost",width:106,fixedPosition:"right",allowEditing:!0,dataType:"number",isAllowZero:!0,cssClass:"editable-cell "},{editorOptions:{min:0},ID_ModelProperty:7987,ID_Column:10299,dataField:"ID_UOM",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"UOM",width:120,alignment:"left",allowEditing:!0,dataType:"number",isAllowZero:!0,editCellTemplate:function(n,t){s.InitEditCellTemplate_SelectBox(n,t,{Name:"ID_UOM",DisplayProperty:"UOM",DataSource:c,ListViewPropertyName:"InventoryAdjustment_Details",PropertyAlias:"ID_UOM"})},cellTemplate:function(n,t){t.data.UOM===undefined&&s.console_warn("UOM is undefined in datasource");var i=t.data.UOM!==undefined?t.data.UOM===null?"-":t.data.UOM:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},validationRules:[{type:"required",message:"UOM is required"}],cssClass:"editable-cell  js-required"},{ID_ModelProperty:317308,ID_Column:1071159,dataField:"Description",allowFixing:!0,visible:!1,caption:"Description",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}],"",4196,[{Name:"InventoryAdjustment_Detail_Serials",PropertyName:"InventoryAdjustment_Detail_Serials",Caption:"Serials"}],300,"@ID",null,"Items",3402,3235,9924,7982,undefined,100),s.$scope.InventoryAdjustment_Detail_SerialsGridOption=s.GetDetailGridOption("InventoryAdjustment_Detail_Serial_LookUp_ListView","$parent.$parent.CurrentObject.InventoryAdjustment_Detail_Serials","InventoryAdjustment_Detail_Serials",[{editorOptions:{min:0},ID_ModelProperty:7974,ID_Column:10277,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:7976,ID_Column:10279,dataField:"Name",allowFixing:!0,visible:!0,caption:"Serial",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,validationRules:[{type:"required",message:"Serial is required"}],cssClass:"editable-cell  js-required"},{ID_ModelProperty:7977,ID_Column:10280,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:200,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7978,ID_Column:10281,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7975,ID_Column:10278,dataField:"Code",allowFixing:!0,visible:!0,caption:"Item",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7979,ID_Column:10282,dataField:"ID_Supplier",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Supplier",width:200,alignment:"left",allowEditing:!0,dataType:"number",isAllowZero:!0,editCellTemplate:function(n,t){s.InitEditCellTemplate_LVBox(n,t,{Name:"ID_Supplier",DisplayProperty:"Supplier",SQL:"onseqr55eCB8SK8HY2aQ+0fhmp53pqx+763pmI5ctuYrW1NXZSZml0BzstTbpEaAy8TI5G8+ObuumRv4EO0lmy8ENFiAMTctyboVRnRVObM0pVPLhV5Y8jkheILzjDsWwHHETPGB5AnrkYLZGQdS2U5ExvYkDER8KUkjux8Dng3xy8BdD0Fntm4fGqUS6cnbb6czIF82Y1oBOD1kHNijSg==",ListViewPropertyName:"InventoryAdjustment_Detail_Serials",PropertyAlias:"ID_Supplier"})},cellTemplate:function(n,t){t.data.Supplier===undefined&&s.console_warn("Supplier is undefined in datasource");var i=t.data.Supplier!==undefined?t.data.Supplier===null?"-":t.data.Supplier:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:"editable-cell "},{editorOptions:{min:0},ID_ModelProperty:7983,ID_Column:10293,dataField:"ID_InventoryAdjustment_Detail",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_InventoryAdjustment_Detail",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0}],"",4197,null,300,"@ID","InventoryAdjustment_Details","Serials",3404,3236,9926,7984,undefined,100),s.$scope.InventoryAdjustment_Detail_Serials_MenuOptions=[],s.$scope.InventoryAdjustment_Details_MenuOptions=[],s.$scope.GeneralGridTabPabelItems=[{isForm:!1,Caption:"Items",Name:"InventoryAdjustment_DetailsGridContainer",title:"Items",PropertyName:"InventoryAdjustment_Details",DisplayProperty:"Name",GridOption:s.$scope.InventoryAdjustment_DetailsGridOption,width:"70%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.InventoryAdjustment_Details_MenuOptions"}),ChildGrids:[{isForm:!1,Caption:"Serials",Name:"InventoryAdjustment_Detail_SerialsGridContainer",title:"Serials",PropertyName:"InventoryAdjustment_Detail_Serials",DisplayProperty:"Name",GridOption:s.$scope.InventoryAdjustment_Detail_SerialsGridOption,width:"29.6%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.InventoryAdjustment_Detail_Serials_MenuOptions"})}]},{title:"Comment",isForm:!0,ID_Tab:9879,name:"CommentTab",formOption:{bindingOptions:{"formData.Comment":"$parent.$parent.CurrentObject.Comment"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:1,onInitialized:function(n){n.component.option("$EditableProperties",["Comment"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n)},s.onCommentTab_TabFormInitialized!==undefined)s.onCommentTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:n.dataField==="Comment"&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:1,colSpan:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]}]}},{title:"Status",isForm:!0,ID_Tab:9880,name:"StatusTab",formOption:{bindingOptions:{"formData.CreatedBy":"$parent.$parent.CurrentObject.CreatedBy","formData.LastModifiedBy":"$parent.$parent.CurrentObject.LastModifiedBy","formData.ApprovedBy":"$parent.$parent.CurrentObject.ApprovedBy","formData.CancelledBy":"$parent.$parent.CurrentObject.CancelledBy","formData.DateCreated":"$parent.$parent.CurrentObject.DateCreated","formData.DateModified":"$parent.$parent.CurrentObject.DateModified","formData.DateApproved":"$parent.$parent.CurrentObject.DateApproved","formData.DateCancelled":"$parent.$parent.CurrentObject.DateCancelled","formData.Reason":"$parent.$parent.CurrentObject.Reason"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",[]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(){},s.onStatusTab_TabFormInitialized!==undefined)s.onStatusTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CancelledBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DateApproved"||n.dataField==="DateCancelled"||n.dataField==="Reason")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CancelledBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DateApproved"||n.dataField==="DateCancelled"||n.dataField==="Reason")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"ID_ApprovedBy",label:{text:"Approved by",alignment:"right",showColon:!1,location:"left"},dataField:"ApprovedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ApprovedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_ApprovedBy",n)},tabIndex:1e8}},{name:"ID_CancelledBy",label:{text:"Cancelled By",alignment:"right",showColon:!1,location:"left"},dataField:"CancelledBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CancelledBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CancelledBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"DateApproved",label:{text:"Date Approved",alignment:"right",showColon:!1,location:"left"},dataField:"DateApproved",editorType:"dxDateBox",editorOptions:{PropertyName:"DateApproved",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateApproved",n)},tabIndex:1e8}},{name:"DateCancelled",label:{text:"Date Cancelled",alignment:"right",showColon:!1,location:"left"},dataField:"DateCancelled",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCancelled",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCancelled",n)},tabIndex:1e8}},{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:150,onInitialized:function(n){s.onControl_Initialized("Reason",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Reason"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}}]}]}},{title:"Acct. Entries",isForm:!0,ID_Tab:294282,name:"JVTab",formOption:{bindingOptions:{"formData.JVGrid":"$parent.$parent.CurrentObject.JVGrid"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",["JVGrid"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setJVGridReadOnly!==undefined&&s.setJVGridReadOnly(n)},s.onJVTab_TabFormInitialized!==undefined)s.onJVTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0&&(s.$scope.CurrentObject.$dirty=!1)},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"JVGrid",label:{text:"Acct. Entries",location:"top",showColon:!1},dataField:"JVGrid",editorType:"jdxGridView",editorOptions:{PropertyName:"JVGrid",SQL:"Akb+p0g3j66kg0M1UJyvGpIADOo4ELRQdiCUK+L0CFOXX7kLJ1btp1cVa3CT0mEqHd5oQCuB3ZX+t0B/X0iI1Sga/bnzKsu1lDsU7drjgYKltSpC8DHiIb3ukixO9jo49T6JBf0dJ6mNyi49s/0Patno0rYRpkPA2N/e72ymzr/bBwh5VEF7qZEHiSmXzZdvuJPxgfY8GOJ2GeLQ2Xmic18fTHuB1EqzYy1l+QSzMXeqxzq6k0sv90709Oh5DK2SGOcSAdk699RxUSUcwmHVwFXuW0+dU5wEfZ4Zqg8FC0s=",height:"300px",ID_View:"C21CD12F-726F-435B-9E7D-1399D66F491E",OnGridInit:function(n){s.$GridControlList==undefined&&(s.$GridControlList=[]);s.$GridControlList.push(n)},onLoad:function(n){(n.params==null||n.params==undefined)&&(n.params={});n.params.ID=s.$scope.CurrentObject.ID},onLoad:function(n){n.params==undefined&&(n.params={});n.params==null&&(n.params={});n.params.ID=s.$scope.CurrentObject.ID;console.log("onLoad",n.params)}}}]}]}}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:3234,InventoryAdjustment_Details:3235,InventoryAdjustment_Detail_Serials:3236},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.$dateFields.push("DateApproved"),s.$dateFields.push("DateCancelled"),s.$dateFields.push("Date"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    