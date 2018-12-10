define(["app","baseListViewController","/JsApp/GetScript?Url=Salespipeline%2fVC_CustomerLead"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9888,ModelViewName:"CustomerLead_ListView",StateName:i,ID_View:15602,ModelName:"CustomerLead",Icon:"FontInSys",DisplayName:"Leads",ID_ModelDetailView:10444,ID_ViewType:2,ViewControllerName:"CustomerLead_DetailView",ID_Model:12477,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"IP40Enjktxa/Jp52jjDWLSNDDykMmNIZsUi+721LeMgOYpWVJVp935Ok0IPtsP8JQNkESFJJceCP1POvzKbobiqeG9wyincKOjj6lNePFp4evWXlQ1z+v+fPgjpGfKWC",SQLUpdateProc:"xajIqvEdeEK7HRQPUEl441SVmFdvGDUlmKcsrNVo9JkON90RoS+2Rjh745K84bJA8ZokjI7+kqxZJbxB+ocDlyXbfT9Jo4r2Quw5a8RHp0W9O/1jOgeIlfHwf1INLkGP"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="CustomerLead";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:224552,ID_Column:1069587,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",width:127,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224553,ID_Column:1069598,dataField:"Name",allowFixing:!0,visible:!0,caption:"Company Name",width:127,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224561,ID_Column:1069594,dataField:"Industry",allowFixing:!0,visible:!0,caption:"Industry",width:151,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Industry",cellTemplate:function(n,t){t.data.Industry===undefined&&u.console_warn("Industry is undefined in datasource");var i=t.data.Industry!==undefined?t.data.Industry===null?"-":t.data.Industry:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:224562,ID_Column:1069596,dataField:"MediaSource",allowFixing:!0,visible:!0,caption:"Media Source",width:141,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_MediaSource",cellTemplate:function(n,t){t.data.MediaSource===undefined&&u.console_warn("MediaSource is undefined in datasource");var i=t.data.MediaSource!==undefined?t.data.MediaSource===null?"-":t.data.MediaSource:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224564,ID_Column:1069586,dataField:"Address",allowFixing:!0,visible:!1,caption:"Address",width:597,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224555,ID_Column:1069589,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224556,ID_Column:1069590,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:224551,ID_Column:1069591,dataField:"ID_PaymentTerm",allowFixing:!0,visible:!0,caption:"ID",width:100,fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224557,ID_Column:1069593,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:151,alignment:"left",fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:224558,ID_Column:1069595,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224554,ID_Column:1069597,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224563,ID_Column:1069599,dataField:"Website",allowFixing:!0,visible:!0,caption:"Website",width:143,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224560,ID_Column:1069588,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",width:187,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224855,ID_Column:1070140,dataField:"EventName",allowFixing:!0,visible:!1,caption:"EventName",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224992,ID_Column:1070410,dataField:"Event",allowFixing:!0,visible:!1,caption:"Event",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:225008,ID_Column:1070436,dataField:"EmailAddress",allowFixing:!0,visible:!1,caption:"EmailAddress",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224565,ID_Column:1069601,dataField:"IsAV",allowFixing:!0,visible:!1,caption:"IsItemA",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224566,ID_Column:1069603,dataField:"IsDell",allowFixing:!0,visible:!1,caption:"IsItemB",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224567,ID_Column:1069605,dataField:"IsMicrosoft",allowFixing:!0,visible:!1,caption:"IsItemC",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224568,ID_Column:1069607,dataField:"IsCorporate",allowFixing:!0,visible:!1,caption:"IsItemD",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224569,ID_Column:1069609,dataField:"IsTrade",allowFixing:!0,visible:!1,caption:"IsItemE",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224570,ID_Column:1069611,dataField:"IsCorpRetail",allowFixing:!0,visible:!1,caption:"IsItemF",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224571,ID_Column:1069613,dataField:"IsSecurity",allowFixing:!0,visible:!1,caption:"IsItemG",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224572,ID_Column:1069615,dataField:"IsLighting",allowFixing:!0,visible:!1,caption:"IsItemH",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224573,ID_Column:1069617,dataField:"IsVimar",allowFixing:!0,visible:!1,caption:"IsItemI",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224574,ID_Column:1069619,dataField:"IsInteriorAndCorp",allowFixing:!0,visible:!1,caption:"IsItemJ",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224575,ID_Column:1069621,dataField:"IsAds",allowFixing:!0,visible:!1,caption:"IsItemK",allowEditing:!1,dataType:"boolean",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})