define(["app","baseDetailViewController","/JsApp/GetScript?Url=VC_BOQ_Materials"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Materials",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=10480,s.ID_View=24628,s.ID_Model=12513,s.ModelViewName="BillOfQuantity_Materials_DetailView",s.ModelName="BillOfQuantity_Materials",s.DisplayName="Materials",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:12513},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Brand":"CurrentObject.Brand","formData.ID_Item":"CurrentObject.ID_Item","formData.ModelCode":"CurrentObject.ModelCode","formData.Name":"CurrentObject.Name","formData.PartNo":"CurrentObject.PartNo","formData.ItemCategory":"CurrentObject.ItemCategory","formData.ItemSubCategory":"CurrentObject.ItemSubCategory","formData.ItemType":"CurrentObject.ItemType","formData.UOM":"CurrentObject.UOM"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","ID","ID_Item","Name"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ModelCode"||n.dataField==="Name"||n.dataField==="PartNo"||n.dataField==="ID_ItemType")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="Code"&&n.dataField!=="ModelCode"&&n.dataField!=="PartNo"&&n.dataField!=="ID_ItemType"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_ItemCategory",label:{text:"Category",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ItemCategory",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_ItemCategory",readOnly:!0,SQL:"hpCWPz81ZZCe64d1uyHOo+YyGZJeVmS9/linBhOE2VaUhNWhgLMTOHjCPNyI62UNzQgqVmp+0gvKhdNG4M/3Hk+pSdZciA+4l1GNJBgyNlMalJcd8BfXq4nm9NBb4EQSs/dU4Yl9VlZqeTa+purleu23BxnvaGaO9g82biaYngk=",IsDeveloperMode:!1,ID_Control:316984,ID_ModelProperty:317442,ControlName:"ID_ItemCategory",DisplayProperty:"ItemCategory",CurrentObject:s.CurrentObject,onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_ItemCategory!=null&&(t=[{ID:s.$scope.CurrentObject.ID_ItemCategory,Name:s.$scope.CurrentObject.ItemCategory}],s.$scope.CurrentObject.EXPR_ID_ItemCategory=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_ItemCategory",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_ItemCategory=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_ItemCategory",value:t})});s.$scope.CurrentObject.ID_ItemCategory=t!==null?t.ID:null;s.$scope.CurrentObject.ItemCategory=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_ItemCategory",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.ItemCategory};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},tabIndex:1e8}},{name:"ID_Item",label:{text:"Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_Item",SQL:"LtdT6yxbXiJwO40t4DmC3AL+HgljnTEIv5HxQAoqWPmYu03mCP5GK+kf0vexQ7f8NI+HGofD/3Jnp4q4ZwE/32dyoN8wrtKbQUHYM8Qg6afmNAkX1ePsmlpdF15EN3JmieK/lac1tNKp/O0p29IrAZB66ECb34OSjEesbSfdWq8GTGdMT8t6vV6sYa9luvbvKmtSvRAyG95sz1clASC9Zq4rWje8yTwTn9n5xgWHJmiSD0tnJ20ylr+OFK+BZdppzJjYyW21H8HJilhCqVYn3SBSqI6dSq9x7vd56QoO25KAyb15sxoYWTWBJ76oYikXE95T7eI/yVMwgMIhZ5fX348xuO0WwWxsx9KoAh7/SQMZjgK6FfCA3hQge/u+08FX",IsDeveloperMode:!1,ID_Control:317011,ID_ModelProperty:317469,ControlName:"ID_Item",DisplayProperty:"Item",CurrentObject:s.CurrentObject,Columns:["ID","Code","Name"],onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_Item!=null&&(t=[{ID:s.$scope.CurrentObject.ID_Item,Name:s.$scope.CurrentObject.Item}],s.$scope.CurrentObject.EXPR_ID_Item=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_Item",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_Item=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Item",value:t})});s.$scope.CurrentObject.ID_Item=t!==null?t.ID:null;s.$scope.CurrentObject.Item=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Item",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.Item};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}}}},{name:"ID_ItemSubCategory",label:{text:"Sub Category",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ItemSubCategory",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_ItemSubCategory",readOnly:!0,SQL:"j1caf7AxZbjog1bzvt/WLdB0d10k/8D9MSP/nou7HXLBy4R7JHA3qCMrm2UZFmMcSIMAvl5hR+XsC9ToAKVuEU7+MWZm6u0AK/8i84DBtf1ndcbaB773ofA15UsilowFvlrS1DzarTJ4MGwx+S3qWRm7oTUiPG7VPdiKYBgNQH8=",IsDeveloperMode:!1,ID_Control:316985,ID_ModelProperty:317443,ControlName:"ID_ItemSubCategory",DisplayProperty:"ItemSubCategory",CurrentObject:s.CurrentObject,onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_ItemSubCategory!=null&&(t=[{ID:s.$scope.CurrentObject.ID_ItemSubCategory,Name:s.$scope.CurrentObject.ItemSubCategory}],s.$scope.CurrentObject.EXPR_ID_ItemSubCategory=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_ItemSubCategory",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_ItemSubCategory=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_ItemSubCategory",value:t})});s.$scope.CurrentObject.ID_ItemSubCategory=t!==null?t.ID:null;s.$scope.CurrentObject.ItemSubCategory=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_ItemSubCategory",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.ItemSubCategory};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},tabIndex:1e8}},{name:"ID_ItemType",label:{text:"Item Type",alignment:"right",showColon:!1,location:"left"},dataField:"ItemType",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ItemType",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_ItemType",n)},tabIndex:1e8}},{name:"Name",label:{text:"Description",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Description"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Description is required"}],cssClass:"js-dx-required"},{name:"ID_Brand",label:{text:"Brand",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Brand",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_Brand",readOnly:!0,SQL:"RE/7nBO3a2dtqoxetzWTfKd24VBVUFY+P4d4JdxCyZ2u1loj8IBRlAL+D6MOC6ao6O1czf1bE09+CfP4xzFOYofSPEfNLkHR0P8uu5po5I6sDHKq73Be0uX0Uw8gqQEP",IsDeveloperMode:!1,ID_Control:316986,ID_ModelProperty:317444,ControlName:"ID_Brand",DisplayProperty:"Brand",CurrentObject:s.CurrentObject,onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_Brand!=null&&(t=[{ID:s.$scope.CurrentObject.ID_Brand,Name:s.$scope.CurrentObject.Brand}],s.$scope.CurrentObject.EXPR_ID_Brand=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_Brand",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_Brand=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Brand",value:t})});s.$scope.CurrentObject.ID_Brand=t!==null?t.ID:null;s.$scope.CurrentObject.Brand=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Brand",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.Brand};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},tabIndex:1e8}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Code",n)},tabIndex:1e8}},{name:"ModelCode",label:{text:"ModelCode",alignment:"right",showColon:!1,location:"left"},dataField:"ModelCode",editorType:"dxTextBox",editorOptions:{PropertyName:"ModelCode",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ModelCode",n)},tabIndex:1e8}},{name:"ID_UOM",label:{text:"UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_UOM",readOnly:!0,SQL:"nExAkncSw/qGrWGg8lQaUVLY9tZ9C+FZJxrNutLI1TagocSubRPQMw33ACuzYrQkNvVu2UaSmFI6gGqfKBiN5h+VJk6UouAsJswuxl38aQFPAtHN3T/6FxEoDv+1H4bS",IsDeveloperMode:!1,ID_Control:316987,ID_ModelProperty:317445,ControlName:"ID_UOM",DisplayProperty:"UOM",CurrentObject:s.CurrentObject,onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_UOM!=null&&(t=[{ID:s.$scope.CurrentObject.ID_UOM,Name:s.$scope.CurrentObject.UOM}],s.$scope.CurrentObject.EXPR_ID_UOM=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_UOM",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_UOM=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_UOM",value:t})});s.$scope.CurrentObject.ID_UOM=t!==null?t.ID:null;s.$scope.CurrentObject.UOM=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_UOM",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.UOM};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},tabIndex:1e8}},{name:"PartNo",label:{text:"PartNo",alignment:"right",showColon:!1,location:"left"},dataField:"PartNo",editorType:"dxTextBox",editorOptions:{PropertyName:"PartNo",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("PartNo",n)},tabIndex:1e8}}]}]}]},{ID_Tab:316949,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"right",showColon:!1,location:"left"},dataField:"Comment",editorType:"dxTextBox",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:316950,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:12513},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    