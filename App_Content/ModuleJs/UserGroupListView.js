define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:1107,ModelViewName:"UserGroup_ListView",StateName:i,ID_View:2154,ModelName:"UserGroup",Icon:"mdi mdi-account-multiple",DisplayName:"User Group",ID_ModelDetailView:2048,ID_ViewType:2,ViewControllerName:"UserGroup_DetailView",ID_Model:1087,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"x1rNYAEeMetZfJQsgIqdu+xdDZSTyMcseF+dCMWhgedRbVNog5PjZlPIsL4in3ezrv2Lf3o9RGnnMiV3/vbDYgWYVvoD4d1DuE2gx0HB+IYf13W/BIrD6GbehFV+g3B5",SQLUpdateProc:"9UdFJoeTsWCd2jQiDslgkjehYQV7I9HFA/jP+UsvBNfJsfFZ/nXhO4XvisPurH2lkXbdI0aEC4goV9D+gmoQgtE5enaEdrk2fU5+3gGZZGWd1e7E8j6cZRNBFewxXz3R"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="UserGroup";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:3757,ID_Column:4004,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",width:68,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3758,ID_Column:4005,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:151,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3759,ID_Column:4006,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",width:152,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:3760,ID_Column:4007,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",width:184,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:3761,ID_Column:4008,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:185,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"6Lmry+PgMT6z0kJaylbwntF5ttfO88TYiHKa3IMFMxjI0LJhCTGRoCN/5QRwVmw6DRPGizJFZrZy/QNWoJ+MWsr56ewYD1DJm8rha1j6KiQgSHYjA+00HQbsGAMT7U/e",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:3763,ID_Column:4010,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",width:146,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})