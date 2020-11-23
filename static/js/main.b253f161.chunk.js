(this["webpackJsonpus-district-map"]=this["webpackJsonpus-district-map"]||[]).push([[0],{115:function(e,t,n){},141:function(e,t,n){"use strict";n.r(t);var o=n(2),a=n(1),r=n.n(a),i=n(49),s=n.n(i),c=(n(115),n(28)),u=n(32),d="LOAD_STATES",l="LOAD_COUNTIES",p="LOAD_COVID",f="LOAD_US_COVID",j="SET_ZOOM",h="SET_CENTER",v="SET_FOCUSED_STATE_ID",b="ZOOM",O="SET_TOOLTIP",m={states:null,counties:null},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;return Object(u.a)(e,(function(e){var n=t.payload;switch(t.type){case d:e.states=n;break;case l:e.counties=n;break;default:return}}))},_=n(87),g={center:[0,0],zoom:1,focusedStateId:0,tooltip:""},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;return Object(u.a)(e,(function(e){var n=t.payload;switch(t.type){case h:e.center=n;break;case j:e.zoom=n;break;case v:e.focusedStateId=n;break;case O:e.tooltip=n;break;case b:return Object(_.a)({},n);default:return}}))},C={us:[],ma:[]},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;return Object(u.a)(e,(function(e){var n=t.payload;switch(t.type){case p:e.ma=n;break;case f:e.us=n;break;default:return}}))},k=Object(c.c)({boundaries:y,mapParams:D,covidData:S}),x=n(89);var w=n(37);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=n(57),I=n(58),B=n(95),E=n(92),L=n(94),M=n(26),z=n(146),A=function(e){var t=e.counties,n=e.covidData,a=e.focusedStateId,r=e.setTooltip,i=n.filter((function(e){return"11/9/2020"===e.date})).sort((function(e,t){return e.new_confirmed_cases-t.new_confirmed_cases})),s=Object(z.a)().domain([0,i[i.length-1].new_confirmed_cases]).range(["white","red"]);return Object(o.jsx)(M.Geographies,{geography:t,children:function(e){var t=e.geographies,n=(e.projection,e.path,t.filter((function(e){return+e.id.substring(0,2)===a})));return Object(o.jsx)(o.Fragment,{children:n.map((function(e){var t=e.properties.name,n=25===a?i.find((function(e){return e.county===t})):void 0;return Object(o.jsx)(M.Geography,{stroke:"#000",geography:e,fill:n?s(n.new_confirmed_cases):"#DDD",onMouseEnter:function(){if(25===a){var e=i.find((function(e){return e.county===t})),n=e.county,s=e.new_confirmed_cases,c=e.total_confirmed_cases;r(Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{children:["County: ",n]}),Object(o.jsxs)("div",{children:["New Cases: ",s]}),Object(o.jsxs)("div",{children:["Total Cases: ",c]})]}))}else r(t)},onMouseLeave:function(){r("")},style:{default:{stroke:"#607D8B",strokeWidth:.1,outline:"none"},hover:{fill:"#CFD8DC",stroke:"#607D8B",strokeWidth:.2,outline:"none"}}},e.rsmKey)}))})}})},F=Object(a.memo)(A),U=function(e){var t=e.statesBoundaries,n=e.countiesBoundaries,a=e.center,r=e.zoom,i=e.usCovidData,s=e.covidData,c=e.focusedStateId,u=e.doZoom,d=(e.setFocusedState,e.setTooltip);return Object(o.jsx)(M.ComposableMap,{"data-tip":"",projection:"geoAlbersUsa",style:{border:"1px black solid",width:"90%",height:"600px"},children:Object(o.jsxs)(M.ZoomableGroup,{center:a,zoom:r,onMoveEnd:function(e,t){var n=e.zoom;u(n<4?{center:e.coordinates,zoom:n,focusedStateId:0}:{center:e.coordinates,zoom:n,focusedStateId:c})},children:[Object(o.jsx)(M.Geographies,{geography:t,children:function(e){var t=e.geographies,n=e.projection,a=e.path,s=Object(L.a)(i).sort((function(e,t){return e.Cases_in_Last_7_Days-t.Cases_in_Last_7_Days})),c=Object(z.a)().domain([0,s[s.length-1].Cases_in_Last_7_Days]).range(["white","red"]);return t.map((function(e){var t=s.find((function(t){return t.State===e.properties.name}));return Object(o.jsx)(M.Geography,{stroke:"#000",geography:e,fill:t?c(t.Cases_in_Last_7_Days):"#DDD",onMouseEnter:function(){var n=e.properties.name;d(Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{children:n}),Object(o.jsx)("div",{children:t.Cases_in_Last_7_Days})]}))},onMouseLeave:function(){d("")},onClick:function(){return function(e,t,n){var o=t.invert(n.centroid(e));u({center:o,zoom:r>4?r:4,focusedStateId:+e.id})}(e,n,a)},style:{default:{stroke:"#607D8B",strokeWidth:.75/r,outline:"none"},hover:{fill:"#CFD8DC",stroke:"#607D8B",strokeWidth:1/r,outline:"none"}}},e.rsmKey)}))}}),c>0?Object(o.jsx)(F,{counties:n,covidData:s,setTooltip:d,focusedStateId:c}):null]})})},W=Object(a.memo)(U);n(64),n(13),n(42),n(77),n(86);var Z,G=Object(w.b)((function(e){var t=e.boundaries,n=t.states,o=t.counties,a=e.mapParams;return{statesBoundaries:n,countiesBoundaries:o,zoom:a.zoom,center:a.center,focusedStateId:a.focusedStateId,usCovidData:e.covidData.us,covidData:e.covidData.ma}}),(function(e){return{setCenter:function(t){e(function(e){return{type:h,payload:e}}(t))},setZoom:function(t){e(function(e){return{type:j,payload:e}}(t))},setFocusedState:function(t){e(function(e){return{type:v,payload:e}}(t))},doZoom:function(t){e(function(e){return{type:b,payload:e}}(t))},setTooltip:function(t){e(function(e){return{type:O,payload:e}}(t))}}}))(W),P=n(70),N=n.n(P),J=n(93),K=n(147),V=function(e){Object(B.a)(n,e);var t=Object(E.a)(n);function n(){return Object(T.a)(this,n),t.apply(this,arguments)}return Object(I.a)(n,[{key:"componentDidMount",value:function(){var e=this;N.a.get("/states-10m.json").then((function(t){return e.props.loadStatesBoundaries(t.data)})),N.a.get("/counties-10m.json").then((function(t){return e.props.loadCountiesBoundaries(t.data)})),Object(K.a)("/covid.csv").then((function(t){return e.props.loadCovid(t)})),Object(K.a)("/united_states_covid19_cases_and_deaths_by_state.csv").then((function(t){return e.props.loadUSCovid(t)}))}},{key:"render",value:function(){var e=this.props.tooltip;return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{children:Object(o.jsx)("h1",{children:"US Map"})}),Object(o.jsxs)("div",{style:{padding:"5"},children:[Object(o.jsx)(G,{}),Object(o.jsx)(J.a,{children:e})]})]})}}]),n}(a.PureComponent),R=Object(w.b)((function(e){return{tooltip:e.mapParams.tooltip}}),(function(e){return{loadStatesBoundaries:function(t){e({type:d,payload:t})},loadCountiesBoundaries:function(t){e({type:l,payload:t})},loadCovid:function(t){e({type:p,payload:t})},loadUSCovid:function(t){e({type:f,payload:t})}}}))(V),$=Object(c.d)(k,Z,Object(c.a)(x.a));s.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(w.a,{store:$,children:Object(o.jsx)(R,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[141,1,2]]]);
//# sourceMappingURL=main.b253f161.chunk.js.map