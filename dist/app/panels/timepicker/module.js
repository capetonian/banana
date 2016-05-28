/*! banana-fusion - v1.6.9 - 2016-05-28
 * https://github.com/LucidWorks/banana/wiki
 * Copyright (c) 2016 Andrew Thanalertvisuti; Licensed Apache License */

define("panels/timepicker/module",["angular","app","underscore","moment","kbn","jquery"],function(a,b,c,d,e,f){"use strict";var g=a.module("kibana.panels.timepicker",[]);b.useModule(g),g.controller("timepicker",["$scope","$rootScope","$timeout","timer","$http","dashboard","filterSrv",function(a,b,g,h,i,j,k){function l(b){return b.type="time",k.removeByType("time"),a.panel.filter_id=k.set(m(b)),a.panel.filter_id}function m(b){var c=f.extend(!0,{},b);if("relative"===a.panel.mode){var e,g=a.panel.timespan.substr(-1),h=a.panel.timespan.substr(0,a.panel.timespan.length-1);switch(g){case"s":e="SECOND";break;case"m":e="MINUTE";break;case"h":e="HOUR";break;case"d":e="DAY";break;case"w":h=7*h,e="DAY";break;case"y":e="YEAR"}c.from="NOW/"+e+"-"+h+e,c.to="NOW/"+e+"%2B1"+e,c.fromDateObj=d().subtract(g,h).toDate(),c.toDateObj=new Date}else"since"===a.panel.mode?(c.fromDateObj=c.from.toDate(),c.toDateObj=new Date,c.from=c.from.toDate().toISOString()+"/SECOND",c.to="*"):"absolute"===a.panel.mode&&(c.from=c.from.toDate(),c.to=c.to.toDate());return c}function n(b,c){a.timepicker={from:{time:b.format("HH:mm:ss"),date:b.format("MM/DD/YYYY")},to:{time:c.format("HH:mm:ss"),date:c.format("MM/DD/YYYY")}}}a.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:!0}],status:"Stable",description:"A panel for controlling the time range filters. If you have time based data,  or if you're using time stamped indices, you need one of these"};var o={status:"Stable",mode:"relative",time_options:["5m","15m","1h","6h","12h","24h","2d","7d","30d"],timespan:"15m",timefield:"event_timestamp",timeformat:"",spyable:!0,refresh:{enable:!1,interval:30,min:3}};c.defaults(a.panel,o),a.init=function(){switch(a.refresh_interval=a.panel.refresh.interval,a.filterSrv=k,a.panel.mode){case"absolute":a.time={from:d(a.panel.time.from,"MM/DD/YYYY HH:mm:ss")||d(e.time_ago(a.panel.timespan)),to:d(a.panel.time.to,"MM/DD/YYYY HH:mm:ss")||d()};break;case"since":a.time={from:d(a.panel.time.from,"MM/DD/YYYY HH:mm:ss")||d(e.time_ago(a.panel.timespan)),to:d()};break;case"relative":a.time={from:d(e.time_ago(a.panel.timespan)),to:d()}}a.time.field=a.panel.timefield,n(a.time.from,a.time.to),p(),l(a.time),j.refresh(),a.panel.refresh.enable&&a.set_interval(a.panel.refresh.interval),a.$on("refresh",function(){if(k.idsByType("time").length>0){var b=k.timeRange("min");0===a.time.from.diff(d.utc(b.from),"seconds")&&0===a.time.to.diff(d.utc(b.to),"seconds")||(a.set_mode("absolute"),n(d(b.from),d(b.to)),a.time=a.time_calc(),p())}})},a.set_interval=function(b){if(a.panel.refresh.interval=b,c.isNumber(a.panel.refresh.interval)){if(a.panel.refresh.interval<a.panel.refresh.min)return a.panel.refresh.interval=a.panel.refresh.min,void h.cancel(a.refresh_timer);h.cancel(a.refresh_timer),a.refresh()}else h.cancel(a.refresh_timer)},a.refresh=function(){a.panel.refresh.enable?(h.cancel(a.refresh_timer),a.refresh_timer=h.register(g(function(){a.refresh(),a.time_apply()},1e3*a.panel.refresh.interval))):h.cancel(a.refresh_timer)};var p=function(){"relative"!==a.panel.mode?a.panel.time={from:a.time.from.format("MM/DD/YYYY HH:mm:ss"),to:a.time.to.format("MM/DD/YYYY HH:mm:ss")}:delete a.panel.time};a.set_mode=function(b){a.panel.mode=b,a.panel.refresh.enable="absolute"===b?!1:a.panel.refresh.enable,p()},a.to_now=function(){a.timepicker.to={time:d().format("HH:mm:ss"),date:d().format("MM/DD/YYYY")}},a.set_timespan=function(b){a.panel.timespan=b,a.timepicker.from={time:d(e.time_ago(b)).format("HH:mm:ss"),date:d(e.time_ago(b)).format("MM/DD/YYYY")},a.time_apply()},a.close_edit=function(){a.time_apply()},a.time_calc=function(){var b,f;if(c.isUndefined(a.timepicker))b="relative"===a.panel.mode?d(e.time_ago(a.panel.timespan)):a.time.from,f="absolute"!==a.panel.mode?d():a.time.to;else{var g=a.panel.timespan.substr(-1),h=a.panel.timespan.substr(0,a.panel.timespan.length-1);b="relative"===a.panel.mode?d().subtract(g,h):d(d(a.timepicker.from.date).format("MM/DD/YYYY")+" "+a.timepicker.from.time,"MM/DD/YYYY HH:mm:ss"),f="absolute"!==a.panel.mode?d():d(d(a.timepicker.to.date).format("MM/DD/YYYY")+" "+a.timepicker.to.time,"MM/DD/YYYY HH:mm:ss")}return b.valueOf()>=f.valueOf()&&(b=d(f.valueOf()-1e3)),{from:b,to:f}},a.time_apply=function(){a.panel.error="",k.removeByType("time"),a.time=a.time_calc(),a.time.field=a.panel.timefield,p(),l(a.time),j.refresh()},a.time_check=function(){}}])});