(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5f56"],{9768:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container new bg with-pagination"},[a("div",{staticClass:"card",attrs:{"element-loading-text":"拼命加载中","element-loading-background":"rgba(0, 0, 0, 0.5)"}},[a("div",{staticClass:"card-title"},[a("Toolbar",{attrs:{name:t.filename}},[a("span",{staticClass:"action",on:{click:t.getList}},[a("svg-icon",{attrs:{"icon-class":"search"}}),t._v(" "),a("span",{staticClass:"action__desc"},[t._v(t._s(t.$t("base.search")))])],1),t._v(" "),a("el-dropdown",{staticClass:"action",attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("span",[a("svg-icon",{attrs:{"icon-class":"download"}}),t._v(" "),a("span",{staticClass:"action__desc"},[t._v(t._s(t.$t("base.download")))])],1),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{"data-table-action":"excel",command:"xlsx"}},[t._v("\n              Excel (.xlsx)\n            ")])],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"card-body"},[a("el-row",{staticClass:"filter-container",attrs:{gutter:40}},[a("el-col",{attrs:{xs:12,sm:8,md:4}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"是否有效",clearable:"",size:t.searchSize},on:{change:t.handleChange},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},[t._l(t.selectOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),t._v(" "),a("svg-icon",{attrs:{slot:"prefix","class-name":"el-input__icon","icon-class":"list"},slot:"prefix"})],2)],1),t._v(" "),a("el-col",{attrs:{xs:12,sm:8,md:4}},[a("el-date-picker",{staticClass:"filter-item",attrs:{size:t.searchSize,type:"datetime",placeholder:"开始时间","picker-options":t.pickerOptions,align:"right","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.listQuery.startTime,callback:function(e){t.$set(t.listQuery,"startTime",e)},expression:"listQuery.startTime"}})],1),t._v(" "),a("el-col",{attrs:{xs:12,sm:8,md:4}},[a("el-date-picker",{staticClass:"filter-item",attrs:{size:t.searchSize,type:"datetime",placeholder:"结束时间","picker-options":t.pickerOptions,align:"right","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.listQuery.stopTime,callback:function(e){t.$set(t.listQuery,"stopTime",e)},expression:"listQuery.stopTime"}})],1)],1),t._v(" "),a("div",{staticClass:"card-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:t.list,fit:"","highlight-current-row":"","empty-text":t.emptyText}},[a("el-table-column",{attrs:{align:t.tableAlign,label:"告警时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.alarmTime||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"录音开始时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.audioStartTime||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"录音结束时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.audioEndTime||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"告警音频地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.audioUrl||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"操作用户"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.operUserName||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.createTime||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.updateTime||"--"))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("filterStatus")(e.row.status)))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:t.tableAlign,label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"gosuncn-icon el-icon-ext-triangle card-table__icon",staticStyle:{cursor:"pointer"},on:{click:function(a){return t.handlePlay(e.row.audioUrl)}}})]}}])})],1)],1)],1)]),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},l=[],i=a("0a1f"),n=a("ed08"),o=i["device"].selectAlarmAudios,r={name:"AlarmAudioQuery",components:{},filters:{filterStatus:function(t){var e="";switch(+t){case 0:e="无效";break;case 1:e="有效";break;default:e="未知"}return e}},data:function(){var t=new Date;return t.setTime(t.getTime()-36e5),{emptyText:null,list:[],source:[],total:null,listLoading:!0,filename:this.$t("route.alarm-audio-query"),selectOptions:[{value:"",label:"请选择 - 是否有效"},{value:0,label:"有效"},{value:1,label:"无效"}],pickerOptions:n["m"],listQuery:{page:1,limit:10,audioUrl:"",startTime:"",stopTime:Object(n["l"])(t),status:""}}},mounted:function(){var t=this.$route.query,e=t.audioId,a=t.startTime,s=t.stopTime,l=t.status;e&&(this.listQuery=Object.assign({},this.listQuery,{audioId:e,startTime:a,stopTime:s,status:l})),this.getList()},methods:{getList:function(t){var e=this;"boolean"===typeof t&&t||(this.listQuery.page=1),this.listLoading=!0,this.emptyText="暂无数据",o(this.listQuery).then(function(t){e.source=t.data.rows,e.list=t.data.rows,e.total=t.data.total,e.listLoading=!1},function(t){console.log(t),e.listLoading=!1,e.emptyText="网络错误"})},handleChange:function(){var t=this;null!=this.listQuery.status&&(""===this.listQuery.status?this.list=this.source:this.list=this.source.filter(function(e){var a=e.status;if(a!==t.listQuery.status)return!0}))},handlePlay:function(t){window.open(t)},handleCommand:function(t){if("undefined"!==typeof t)switch(t){case"xlsx":var e=this.listQuery,a=e.audioId,s=void 0===a?"":a,l=e.audioUrl,i=void 0===l?"":l,n=e.startTime,o=void 0===n?"":n,r=e.stopTime,u=void 0===r?"":r,c=e.status;window.open("/robotservice/device/selectAlarmAudios.action?audioId="+s+"&audioUrl="+i+"&startTime="+o+"&stopTime="+u+"&status="+c);break}},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()}}},u=r,c=a("2877"),d=Object(c["a"])(u,s,l,!1,null,"1e23d84c",null);e["default"]=d.exports}}]);