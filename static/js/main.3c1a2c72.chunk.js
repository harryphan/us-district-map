(this["webpackJsonpus-district-map"]=this["webpackJsonpus-district-map"]||[]).push([[0],{66:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var a=n(2),o=n(0),r=n.n(o),c=n(27),s=n.n(c),i=(n(66),n(14)),u=n(3),d=n.n(u),p=n(22),l=n(18),f="LOAD_STATES",h="LOAD_COUNTIES",j="LOAD_COVID",v="LOAD_US_COVID",b="SET_ZOOM",O="SET_CENTER",m="SET_FOCUSED_STATE_ID",y="ZOOM",_="SET_TOOLTIP",g=n(23),D=n.n(g),x={states:null,counties:null};function k(){return(k=Object(p.a)(d.a.mark((function e(t,n){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.a.get("states-10m.json");case 2:a=e.sent,t({type:f,payload:a.data});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=Object(p.a)(d.a.mark((function e(t,n){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.a.get("counties-10m.json");case 2:a=e.sent,t({type:h,payload:a.data});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;return Object(l.a)(e,(function(e){var n=t.payload;switch(t.type){case f:e.states=n;break;case h:e.counties=n;break;default:return}}))},C=n(49),T={center:[0,0],zoom:1,focusedStateId:0,tooltip:""},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;return Object(l.a)(e,(function(e){var n=t.payload;switch(t.type){case O:e.center=n;break;case b:e.zoom=n;break;case m:e.focusedStateId=n;break;case _:e.tooltip=n;break;case y:return Object(C.a)({},n);default:return}}))},E=n(102),L={us:[],ma:[]};function z(){return(z=Object(p.a)(d.a.mark((function e(t,n){var a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.a.get("covid.csv");case 2:a=e.sent,o=Object(E.a)(a.data),t({type:j,payload:o});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=Object(p.a)(d.a.mark((function e(t,n){var a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.a.get("us-covid.csv");case 2:a=e.sent,o=Object(E.a)(a.data),t({type:v,payload:o});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;return Object(l.a)(e,(function(e){var n=t.payload;switch(t.type){case j:e.ma=n;break;case v:e.us=n;break;default:return}}))},A=Object(i.c)({boundaries:S,mapParams:I,covidData:M}),F=n(51);var W=n(21);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z=n(32),G=n(33),P=n(57),U=n(54),N=n(56),J=n(13),K=n(101),V=function(e){var t=e.counties,n=e.covidData,o=e.focusedStateId,r=e.setTooltip,c=n.filter((function(e){return"11/9/2020"===e.date})).sort((function(e,t){return e.new_confirmed_cases-t.new_confirmed_cases})),s=Object(K.a)().domain([0,c[c.length-1].new_confirmed_cases]).range(["white","red"]);return Object(a.jsx)(J.Geographies,{geography:t,children:function(e){var t=e.geographies,n=(e.projection,e.path,t.filter((function(e){return+e.id.substring(0,2)===o})));return Object(a.jsx)(a.Fragment,{children:n.map((function(e){var t=e.properties.name,n=25===o?c.find((function(e){return e.county===t})):void 0;return Object(a.jsx)(J.Geography,{stroke:"#000",geography:e,fill:n?s(n.new_confirmed_cases):"#DDD",onMouseEnter:function(){if(25===o){var e=c.find((function(e){return e.county===t})),n=e.county,s=e.new_confirmed_cases,i=e.total_confirmed_cases;r(Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{children:["County: ",n]}),Object(a.jsxs)("div",{children:["New Cases: ",s]}),Object(a.jsxs)("div",{children:["Total Cases: ",i]})]}))}else r(t)},onMouseLeave:function(){r("")},style:{default:{stroke:"#607D8B",strokeWidth:.1,outline:"none"},hover:{fill:"#CFD8DC",stroke:"#607D8B",strokeWidth:.2,outline:"none"}}},e.rsmKey)}))})}})},R=Object(o.memo)(V),$=function(e){var t=e.statesBoundaries,n=e.countiesBoundaries,o=e.center,r=e.zoom,c=e.usCovidData,s=e.covidData,i=e.focusedStateId,u=e.doZoom,d=(e.setFocusedState,e.setTooltip);return Object(a.jsx)(J.ComposableMap,{"data-tip":"",projection:"geoAlbersUsa",style:{border:"1px black solid",width:"90%",height:"600px"},children:Object(a.jsxs)(J.ZoomableGroup,{center:o,zoom:r,onMoveEnd:function(e,t){var n=e.zoom;u(n<4?{center:e.coordinates,zoom:n,focusedStateId:0}:{center:e.coordinates,zoom:n,focusedStateId:i})},children:[Object(a.jsx)(J.Geographies,{geography:t,children:function(e){var t=e.geographies,n=e.projection,o=e.path,s=Object(N.a)(c).sort((function(e,t){return e.Cases_in_Last_7_Days-t.Cases_in_Last_7_Days})),i=Object(K.a)().domain([0,s[s.length-1].Cases_in_Last_7_Days]).range(["white","red"]);return t.map((function(e){var t=s.find((function(t){return t.State===e.properties.name}));return Object(a.jsx)(J.Geography,{stroke:"#000",geography:e,fill:t?i(t.Cases_in_Last_7_Days):"#DDD",onMouseEnter:function(){var n=e.properties.name;d(Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:n}),Object(a.jsx)("div",{children:t.Cases_in_Last_7_Days})]}))},onMouseLeave:function(){d("")},onClick:function(){return function(e,t,n){var a=t.invert(n.centroid(e));u({center:a,zoom:r>4?r:4,focusedStateId:+e.id})}(e,n,o)},style:{default:{stroke:"#607D8B",strokeWidth:.75/r,outline:"none"},hover:{fill:"#CFD8DC",stroke:"#607D8B",strokeWidth:1/r,outline:"none"}}},e.rsmKey)}))}}),i>0?Object(a.jsx)(R,{counties:n,covidData:s,setTooltip:d,focusedStateId:i}):null]})})},q=Object(o.memo)($);var H,Q=Object(W.b)((function(e){var t=e.boundaries,n=t.states,a=t.counties,o=e.mapParams;return{statesBoundaries:n,countiesBoundaries:a,zoom:o.zoom,center:o.center,focusedStateId:o.focusedStateId,usCovidData:e.covidData.us,covidData:e.covidData.ma}}),(function(e){return{setCenter:function(t){e(function(e){return{type:O,payload:e}}(t))},setZoom:function(t){e(function(e){return{type:b,payload:e}}(t))},setFocusedState:function(t){e(function(e){return{type:m,payload:e}}(t))},doZoom:function(t){e(function(e){return{type:y,payload:e}}(t))},setTooltip:function(t){e(function(e){return{type:_,payload:e}}(t))}}}))(q),X=n(55),Y=function(e){Object(P.a)(n,e);var t=Object(U.a)(n);function n(){return Object(Z.a)(this,n),t.apply(this,arguments)}return Object(G.a)(n,[{key:"render",value:function(){var e=this.props.tooltip;return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:Object(a.jsx)("h1",{children:"US Map"})}),Object(a.jsxs)("div",{style:{padding:"5"},children:[Object(a.jsx)(Q,{}),Object(a.jsx)(X.a,{children:e})]})]})}}]),n}(o.PureComponent),ee=Object(W.b)((function(e){return{tooltip:e.mapParams.tooltip}}))(Y),te=Object(i.d)(A,H,Object(i.a)(F.a));te.dispatch((function(e,t){return k.apply(this,arguments)})),te.dispatch((function(e,t){return w.apply(this,arguments)})),te.dispatch((function(e,t){return z.apply(this,arguments)})),te.dispatch((function(e,t){return B.apply(this,arguments)})),s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(W.a,{store:te,children:Object(a.jsx)(ee,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[94,1,2]]]);
//# sourceMappingURL=main.3c1a2c72.chunk.js.map