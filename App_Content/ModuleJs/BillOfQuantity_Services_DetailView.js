define(["app","baseDetailViewController","/JsApp/GetScript?Url=VC_BOQ_Services"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Services",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=10481,s.ID_View=24631,s.ID_Model=12514,s.ModelViewName="BillOfQuantity_Services_DetailView",s.ModelName="BillOfQuantity_Services",s.DisplayName="Services",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:12514},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_Item":"CurrentObject.ID_Item","formData.ManHours":"CurrentObject.ManHours","formData.Name":"CurrentObject.Name"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","ID","ID_Item","ManHours","Name"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);s.setManHoursReadOnly!==undefined&&s.setManHoursReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ManHours"||n.dataField==="Name")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="Code"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ManHours",label:{text:"ManHours",alignment:"right",showColon:!1,location:"left"},dataField:"ManHours",editorType:"dxTextBox",editorOptions:{PropertyName:"ManHours",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ManHours",n)}}},{name:"ID_Item",label:{text:"Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_Item",SQL:"thOtb4nMid1Z7fVlOr5x812+fwVB5dJwHl7W1+fTvzMuMvqHvDSEVaFS9S/X0HBsY3geZMFPtdBeiz/fP4avqHtzgeTxx/JuNg43UnMJyPsHkQspptdvMFA2b7oLw+1TltDG/xDweDh9SXZ73YIDvMEZcXkvI10IYc29dgKOZiNj9VGTM6BBxcGqY1orKMkfOziW/SrEpFoHMjnseCiZaBjqHpMXL0xndO/Ad2AySPEGD4kbbVSnusH4HnjSv8AUwTyVMR458ZUAqDZ4Z2Q7akxvvaCsRpvUDUr6yet2jPVw4jdu566cYQqDlYviGXzGV075YFLWKct4CwDsOxS6MlGipFeRam4bzan1vImoT78pEtcTOmVyLWOu6Qv9KNCK",IsDeveloperMode:!1,ID_Control:317012,ID_ModelProperty:317470,ControlName:"ID_Item",DisplayProperty:"Item",CurrentObject:s.CurrentObject,Columns:["ID","Code","Name"],onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_Item!=null&&(t=[{ID:s.$scope.CurrentObject.ID_Item,Name:s.$scope.CurrentObject.Item}],s.$scope.CurrentObject.EXPR_ID_Item=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_Item",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_Item=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Item",value:t})});s.$scope.CurrentObject.ID_Item=t!==null?t.ID:null;s.$scope.CurrentObject.Item=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Item",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.Item};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Item"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Item is required"}],cssClass:"js-dx-required"},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Code",n)},tabIndex:1e8}},{name:"Name",label:{text:"Description",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Description"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Description is required"}],cssClass:"js-dx-required"}]}]}]},{ID_Tab:316956,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"right",showColon:!1,location:"left"},dataField:"Comment",editorType:"dxTextBox",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:316957,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:12514},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    