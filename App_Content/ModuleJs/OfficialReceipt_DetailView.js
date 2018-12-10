define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Official Receipt",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=6247,s.ID_View=6779,s.ID_Model=5281,s.ModelViewName="OfficialReceipt_DetailView",s.ModelName="OfficialReceipt",s.DisplayName="Official Receipt",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:5281,OfficialReceipt_Details:5282},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Comment":"CurrentObject.Comment","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.Name":"CurrentObject.Name","formData.CreatedBy":"CurrentObject.CreatedBy","formData.LastModifiedBy":"CurrentObject.LastModifiedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","ID","Name"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);$.each(["OfficialReceipt_Details"],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Comment"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="ID"||n.dataField==="Name"||n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="ID_CreatedBy"&&n.dataField!=="ID_LastModifiedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"}]}]}]}]}]},s.$scope.OfficialReceipt_DetailsGridOption=s.GetDetailGridOption("OfficialReceipt_Detail_LookUp_ListView","$parent.$parent.CurrentObject.OfficialReceipt_Details","OfficialReceipt_Details",[{ID_ModelProperty:13839,ID_Column:15818,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:13842,ID_Column:15821,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:13838,ID_Column:15817,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{editorOptions:{min:0},ID_ModelProperty:13843,ID_Column:15822,dataField:"ID_OfficialReceipt",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID_OfficialReceipt",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:13841,ID_Column:15820,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:13840,ID_Column:15819,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0}],"",6248,null,400,"@ID",null,"Details",5492,5282,16058,13844,undefined,100),s.$scope.OfficialReceipt_Details_MenuOptions=[],s.$scope.GeneralGridTabPabelItems=[{isForm:!1,Caption:"Details",Name:"OfficialReceipt_DetailsGridContainer",title:"Details",PropertyName:"OfficialReceipt_Details",DisplayProperty:"Name",GridOption:s.$scope.OfficialReceipt_DetailsGridOption,width:"100%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.OfficialReceipt_Details_MenuOptions"})},{title:"Comment",isForm:!0,ID_Tab:16038,name:"CommentTab",formOption:{bindingOptions:{"formData.Comment":"$parent.$parent.CurrentObject.Comment"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:1,onInitialized:function(n){n.component.option("$EditableProperties",["Comment"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n)},s.onCommentTab_TabFormInitialized!==undefined)s.onCommentTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:n.dataField==="Comment"&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:1,colSpan:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]}]}},{title:"Status",isForm:!0,ID_Tab:16039,name:"StatusTab",formOption:{bindingOptions:{"formData.CreatedBy":"$parent.$parent.CurrentObject.CreatedBy","formData.LastModifiedBy":"$parent.$parent.CurrentObject.LastModifiedBy","formData.DateCreated":"$parent.$parent.CurrentObject.DateCreated","formData.DateModified":"$parent.$parent.CurrentObject.DateModified"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",[]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(){},s.onStatusTab_TabFormInitialized!==undefined)s.onStatusTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="DateCreated"||n.dataField==="DateModified")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="DateCreated"||n.dataField==="DateModified")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}}]}]}}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:5281,OfficialReceipt_Details:5282},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    