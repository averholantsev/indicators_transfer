(this.webpackJsonpindicators_transfer=this.webpackJsonpindicators_transfer||[]).push([[0],{249:function(e,t,a){e.exports=a(400)},254:function(e,t,a){},260:function(e,t,a){},280:function(e,t,a){},348:function(e,t,a){},399:function(e,t,a){},400:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(14),o=a.n(i),l=(a(254),a(255),a(29)),c=a(24),s=a(31),d=a(32),u=a(33),m=a(63),h=a(58),v=a(459),E=a(401),p=(a(260),a(451)),g=a(454),f=a(456),b=a(458),y=a(208),w=a.n(y),k=a(457),O=a(402),C=a(53),N=Object(p.a)((function(e){return{root:{flexGrow:1},button:{"&:hover":{color:"white"}},grow:{flexGrow:1}}})),S=function(e){var t=N();return r.a.createElement("div",{className:t.root},r.a.createElement(g.a,{position:"static"},r.a.createElement(f.a,null,r.a.createElement(k.a,{disableElevation:!0,variant:"contained",color:"primary"},r.a.createElement(O.a,{className:t.button,component:C.b,to:"/send-indicators"},"\u041f\u043e\u043a\u0430\u0437\u0430\u043d\u0438\u044f"),r.a.createElement(O.a,{className:t.button,component:C.b,to:"/outlay"},"\u0420\u0430\u0441\u0445\u043e\u0434\u044b")),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",null,r.a.createElement(b.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",color:"inherit",component:C.b,to:"/logout"},r.a.createElement(w.a,null))))))},j=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(v.a,{container:!0},this.props.isAuth&&r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(S,null)),r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(E.a,{className:"paper"},this.props.children)))}}]),t}(n.Component),x=a(34),W=a(47),I=a(209),H=a.n(I).a.create({baseURL:"https://reacttestproject-70f65.firebaseio.com/"}),D=a(467),T=(a(280),a(461)),_=a(465),A=a(464),B=a(460),Y=a(462),K=a(463),M=a(231),L=function(e){var t=e.indicatorsList,a=t.date,n=t.indicators,i=e.costNovogor,o="";switch(a.getMonth()){case 0:o="\u042f\u043d\u0432\u0430\u0440\u044c";break;case 1:o="\u0424\u0435\u0432\u0440\u0430\u043b\u044c";break;case 2:o="\u041c\u0430\u0440\u0442";break;case 3:o="\u0410\u043f\u0440\u0435\u043b\u044c";break;case 4:o="\u041c\u0430\u0439";break;case 5:o="\u0418\u044e\u043d\u044c";break;case 6:o="\u0418\u044e\u043b\u044c";break;case 7:o="\u0410\u0432\u0433\u0443\u0441\u0442";break;case 8:o="\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c";break;case 9:o="\u041e\u043a\u0442\u044f\u0431\u0440\u044c";break;case 10:o="\u041d\u043e\u044f\u0431\u0440\u044c";break;case 11:o="\u0414\u0435\u043a\u0430\u0431\u0440\u044c";break;default:o="\u041d\u0435 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d"}return r.a.createElement(B.a,{component:E.a,style:{marginTop:"30px"}},r.a.createElement(M.a,{variant:"h6",align:"center"},o," ",a.getFullYear()),r.a.createElement(T.a,{"aria-label":"simple table"},r.a.createElement(Y.a,null,r.a.createElement(K.a,null,r.a.createElement(A.a,null,"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u044c"),r.a.createElement(A.a,{align:"center"},"\u0420\u0430\u0441\u0445\u043e\u0434"),r.a.createElement(A.a,{align:"center"},"\u041f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435"))),r.a.createElement(_.a,null,n.map((function(e,t){return r.a.createElement(K.a,{key:t},r.a.createElement(A.a,{component:"th",scope:"row"},e.name),r.a.createElement(A.a,{align:"center"},e.intake),r.a.createElement(A.a,{align:"center"},e.outlay))})),r.a.createElement(K.a,null,r.a.createElement(A.a,{component:"th",scope:"row"},"\u041d\u043e\u0432\u043e\u0433\u043e\u0440"),r.a.createElement(A.a,{align:"center"},i)))))},U=a(59),F=a(474),P=a(466),R=Object(p.a)({root:{flexGrow:1,marginTop:"15px",boxShadow:"none"},label:{fontSize:"1rem"}}),V=function(e){var t=R(),a=r.a.useState(0),n=Object(U.a)(a,2),i=n[0],o=n[1];return r.a.createElement(E.a,{className:t.root},r.a.createElement(F.a,{value:i,onChange:function(t,a){o(a),e.changeCurrentYear(e.tabsList[a])},indicatorColor:"primary",textColor:"primary",centered:!0},e.tabsList.map((function(e){return r.a.createElement(P.a,{key:e,label:e,className:t.label})}))))},G=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={indicatorsList:[],prevIndicators:[{name:"\u042d\u043b-\u044f \u0434\u0435\u043d\u044c:",intake:18572},{name:"\u042d\u043b-\u044f \u043d\u043e\u0447\u044c:",intake:6699},{name:"\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430:",intake:402},{name:"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430:",intake:420},{name:"\u0412\u043e\u0434\u043e\u043e\u0442\u0432\u0435\u0434\u0435\u043d\u0438\u0435:",intake:822}],tariffs:[{id:"water",cost:33.03,dateStart:"2019-01-01",dateEnd:"2020-12-31"},{id:"hot_water",cost:1423.06,dateStart:"2020-01-01",dateEnd:"2020-06-30"},{id:"disposal_water",cost:23.14,dateStart:"2019-01-01",dateEnd:"2020-12-31"},{id:"day_electricity",cost:4.17,dateStart:"2020-01-01",dateEnd:"2020-06-30"},{id:"night_electricity",cost:2.66,dateStart:"2020-01-01",dateEnd:"2020-06-30"}],currentYear:(new Date).getUTCFullYear(),error:null},a.getListOfIndicators=function(){H.get("/indicators.json").then((function(e){console.log("\u041e\u0442\u0432\u0435\u0442 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: ",e.data);var t=Object.keys(e.data).map((function(t){return{id:t,date:new Date(e.data[t].CurrentDate.today),indicators:[{id:"day_electricity",name:"\u042d\u043b-\u044f \u0434\u0435\u043d\u044c:",intake:Number(e.data[t].Electricity.Day)},{id:"night_electricity",name:"\u042d\u043b-\u044f \u043d\u043e\u0447\u044c:",intake:Number(e.data[t].Electricity.Night)},{id:"cold_water",name:"\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430:",intake:Number(e.data[t].ColdWater.Bathroom)+Number(e.data[t].ColdWater.Kittchen)},{id:"hot_water",name:"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430:",intake:Number(e.data[t].HotWater.Bathroom)+Number(e.data[t].HotWater.Kittchen)},{id:"disposal_water",name:"\u0412\u043e\u0434\u043e\u043e\u0442\u0432\u0435\u0434\u0435\u043d\u0438\u0435:",intake:Number(e.data[t].ColdWater.Bathroom)+Number(e.data[t].ColdWater.Kittchen)+Number(e.data[t].HotWater.Bathroom)+Number(e.data[t].HotWater.Kittchen)}]}}));t.sort((function(e,t){return e.date.getTime()-t.date.getTime()})),a.setState({indicatorsList:a.countOutlay(t)})})).catch((function(e){console.log(e),a.setState({error:"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0421\u0438\u0441\u0442\u0435\u043c\u043d\u043e\u043c\u0443 \u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0443."})}))},a.countOutlay=function(e){for(var t=Object(W.a)(e),n=function(e){t[e]===t[0]?t[e].indicators=t[e].indicators.map((function(e,t){var n=Object(x.a)({},e);return n.outlay=n.intake-a.state.prevIndicators[t].intake,n})):t[e].indicators=t[e].indicators.map((function(a,n){var r=Object(x.a)({},a);return r.outlay=r.intake-t[e-1].indicators[n].intake,r}))},r=0;r<t.length;r++)n(r);return t},a.countCostNovogor=function(e,t){var n=null;try{n=e.find((function(e){return"cold_water"===e.id})).outlay}catch(c){console.log("\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430",c)}var r=null;try{r=e.find((function(e){return"hot_water"===e.id})).outlay}catch(c){console.log("\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430",c)}var i=null;try{i=e.find((function(e){return"disposal_water"===e.id})).outlay}catch(c){console.log("\u0412\u043e\u0434\u043e\u043e\u0442\u0432\u0435\u0434\u0435\u043d\u0438\u0435",c)}var o=null;try{o=a.state.tariffs.find((function(e){var a=e.id,n=e.dateStart,r=e.dateEnd;return"water"===a&&Date.parse(n)<=t&&Date.parse(r)>=t})).cost}catch(c){console.log("\u0422\u0430\u0440\u0438\u0444 \u043d\u0430 \u0432\u043e\u0434\u0443",c)}var l=null;try{l=a.state.tariffs.find((function(e){var a=e.id,n=e.dateStart,r=e.dateEnd;return"disposal_water"===a&&Date.parse(n)<=t&&Date.parse(r)>=t})).cost}catch(c){console.log("\u0422\u0430\u0440\u0438\u0444 \u043d\u0430 \u0432\u043e\u0434\u043e\u043e\u0442\u0432\u0435\u0434\u0435\u043d\u0438\u0435",c)}return((n+r)*o+i*l).toFixed(2)},a.changeCurrentYear=function(e){a.setState({currentYear:e})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getListOfIndicators()}},{key:"render",value:function(){var e=this,t=null;t=0===this.state.indicatorsList.length&&null==this.state.error?r.a.createElement(D.a,{active:!0,inline:"centered"},"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430"):this.state.indicatorsList.length>0?(t=this.state.indicatorsList.filter((function(t){return t.date.getUTCFullYear()===e.state.currentYear}))).length>0?t.map((function(t,a){return r.a.createElement(L,{key:a,indicatorsList:t,costNovogor:e.countCostNovogor(t.indicators,t.date)})})):r.a.createElement("p",{style:{textAlign:"center"}},"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u043d\u0430 ".concat(this.state.currentYear," \u0433\u043e\u0434")):r.a.createElement("p",{style:{textAlign:"center"}},this.state.error);for(var a=[],n=(new Date).getUTCFullYear();n>=(new Date).getUTCFullYear()-1;n--)a.push(n);return r.a.createElement("div",{className:"outlayContainer"},r.a.createElement(M.a,{variant:"h4",align:"center"},"\u0422\u0435\u043a\u0443\u0449\u0438\u0435 \u0440\u0430\u0441\u0445\u043e\u0434\u044b"),r.a.createElement(V,{tabsList:a,changeCurrentYear:this.changeCurrentYear}),r.a.createElement("div",{className:"indicatorsList"},t))}}]),t}(n.Component),z=a(210),J=a.n(z),X=a(64),$=[{key:"0",text:"\u042f\u043d\u0432\u0430\u0440\u044c",value:0},{key:"1",text:"\u0424\u0435\u0432\u0430\u0440\u043b\u044c",value:1},{key:"2",text:"\u041c\u0430\u0440\u0442",value:2},{key:"3",text:"\u0410\u043f\u0440\u0435\u043b\u044c",value:3},{key:"4",text:"\u041c\u0430\u0439",value:4},{key:"5",text:"\u0418\u044e\u043d\u044c",value:5},{key:"6",text:"\u0418\u044e\u043b\u044c",value:6},{key:"7",text:"\u0410\u0432\u0433\u0443\u0441\u0442",value:7},{key:"8",text:"\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c",value:8},{key:"9",text:"\u041e\u043a\u0442\u044f\u0431\u0440\u044c",value:9},{key:"10",text:"\u041d\u043e\u044f\u0431\u0440\u044c",value:10},{key:"11",text:"\u0414\u0435\u043a\u0430\u0431\u0440\u044c",value:11}],Q=a(211),Z=function(e){var t=r.a.createElement("div",{className:"ui pointing red basic label"},e.errorMessage);return r.a.createElement("div",{className:e.classEnter},r.a.createElement("label",{htmlFor:e.id},e.label),r.a.createElement(Q.a,{decimalScale:"2",decimalSeparator:".",allowNegative:!1,id:e.id,placeholder:e.placeholder,name:e.name,onChange:e.changed,value:e.value}),e.invalid?null:t)},q=a(473),ee=(a(348),a(477)),te=a(470),ae=a(469),ne=a(468),re=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={indicators:{ElectricityDay:{value:"",valid:!0},ElectricityNight:{value:"",valid:!0},ColdWaterKittchen:{value:"",valid:!0},ColdWaterBathroom:{value:"",valid:!0},HotWaterKittchen:{value:"",valid:!0},HotWaterBathroom:{value:"",valid:!0}},monthYear:{month:(new Date).getMonth(),year:(new Date).getFullYear()},emailData:{recipient:X.RECIPIENT,address:X.ADDRESS},modalOpen:!1},a.addIndicatorHandler=function(e,t){var n=t.target.value,r=Object(x.a)({},a.state.indicators);r[e].value=n,r[e].valid=!0,a.setState({indicators:r})},a.modalHandlerClose=function(){a.setState({modalOpen:!1})},a.modalHandlerOpen=function(e){for(var t in e.preventDefault(),a.state.indicators){if(""===Object(x.a)({},a.state.indicators)[t].value){var n=Object(x.a)({},a.state.indicators);n[t].valid=!1,a.setState({indicators:n}),a.setState({indicatorsValid:!1})}}a.state.indicators.ElectricityDay.valid&&a.state.indicators.ElectricityNight.valid&&a.state.indicators.ColdWaterKittchen.valid&&a.state.indicators.ColdWaterBathroom.valid&&a.state.indicators.HotWaterKittchen.valid&&a.state.indicators.HotWaterBathroom.valid&&a.setState({modalOpen:!0})},a.sendEmailHandler=function(){var e={recipient:a.state.emailData.recipient,address:a.state.emailData.address,month:$[a.state.monthYear.month].text,year:a.state.monthYear.year,electricityDay:a.state.indicators.ElectricityDay.value,electricityNight:a.state.indicators.ElectricityNight.value,coldWaterKittchen:a.state.indicators.ColdWaterKittchen.value,coldWaterBathroom:a.state.indicators.ColdWaterBathroom.value,hotWaterKittchen:a.state.indicators.HotWaterKittchen.value,hotWaterBathroom:a.state.indicators.HotWaterBathroom.value};J.a.send(X.SERVICE_ID,X.TEMPLATE_ID,e,X.USER_ID).then((function(e){console.log("SUCCESS!",e.status,e.text)}),(function(e){console.log("FAILED...",e)}))},a.sendIndicators=function(){var e=new Date(a.state.monthYear.year,a.state.monthYear.month,1,5,0,0,0).toISOString(),t={Electricity:{Day:a.state.indicators.ElectricityDay.value,Night:a.state.indicators.ElectricityNight.value},ColdWater:{Kittchen:a.state.indicators.ColdWaterKittchen.value,Bathroom:a.state.indicators.ColdWaterBathroom.value},HotWater:{Kittchen:a.state.indicators.HotWaterKittchen.value,Bathroom:a.state.indicators.HotWaterBathroom.value},CurrentDate:{today:e,year:a.state.monthYear.year}};H.post("/indicators.json",t).then((function(e){a.setState({modalOpen:!1}),a.sendEmailHandler(),a.props.history.push("/outlay")})).catch((function(e){console.log(e)}))},a.getCurrentMonth=function(){return(new Date).getMonth()},a.getCurrentYear=function(){for(var e=(new Date).getFullYear(),t=[],a=2;a>=0;a--)t.push({key:e-a,text:e-a,value:e-a});return t},a.setStateMonth=function(e,t){var n=t.value,r=Object(x.a)({},a.state.monthYear);r.month=n,a.setState({monthYear:r})},a.setStateYear=function(e,t){var n=t.value,r=Object(x.a)({},a.state.monthYear);r.year=n,a.setState({monthYear:r})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t="\u041f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f",a=["field"],n=["field","error"];return r.a.createElement("div",{className:"ui center ui_center"},r.a.createElement(ee.a,{open:this.state.modalOpen,onClose:this.modalHandlerClose,maxWidth:"xs","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(ne.a,{id:"alert-dialog-title"},r.a.createElement(M.a,{variant:"h5",align:"center"},"\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u0438 \u0437\u0430"," ",$[this.state.monthYear.month].text," ",this.state.monthYear.year," \u0433.")),r.a.createElement(ae.a,{dividers:!0},r.a.createElement(v.a,{container:!0},r.a.createElement(v.a,{container:!0},r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(M.a,{variant:"h6",align:"center"},"\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u044f")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},"\u0414\u0435\u043d\u044c:")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},this.state.indicators.ElectricityDay.value)),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},"\u041d\u043e\u0447\u044c:")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},this.state.indicators.ElectricityNight.value))),r.a.createElement(v.a,{container:!0},r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(M.a,{variant:"h6",align:"center"},"\u041a\u0443\u0445\u043d\u044f")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},"\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430:")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},this.state.indicators.ColdWaterKittchen.value)),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430:")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},this.state.indicators.HotWaterKittchen.value))),r.a.createElement(v.a,{container:!0},r.a.createElement(v.a,{item:!0,xs:12},r.a.createElement(M.a,{variant:"h6",align:"center"},"\u0412\u0430\u043d\u043d\u0430\u044f")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},"\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430:")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},this.state.indicators.ColdWaterBathroom.value)),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430:")),r.a.createElement(v.a,{item:!0,xs:3},r.a.createElement(M.a,{variant:"body1",align:"center"},this.state.indicators.HotWaterBathroom.value))))),r.a.createElement(te.a,null,r.a.createElement(O.a,{onClick:this.modalHandlerClose,color:"secondary"},"\u041e\u0442\u043c\u0435\u043d\u0430"),r.a.createElement(O.a,{onClick:this.sendIndicators,color:"primary",autoFocus:!0},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"))),r.a.createElement("form",{className:"ui form"},r.a.createElement("div",{className:"ui one column centered grid"},r.a.createElement("div",{className:"column"},r.a.createElement(M.a,{variant:"h4",align:"center"},"\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u043f\u043e\u043a\u0430\u0437\u0430\u043d\u0438\u0439"))),r.a.createElement("div",{className:"ui grid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement(M.a,{variant:"h5"},"\u041c\u0435\u0441\u044f\u0446 \u0438 \u0433\u043e\u0434"))),r.a.createElement("div",{className:"two column row"},r.a.createElement("div",{className:"column"},r.a.createElement(q.a,{placeholder:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u0441\u044f\u0446",selection:!0,fluid:!0,defaultValue:$[this.getCurrentMonth()].value,options:$,onChange:this.setStateMonth})),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"column"},r.a.createElement(q.a,{placeholder:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u0441\u044f\u0446",selection:!0,fluid:!0,defaultValue:this.getCurrentYear()[2].value,options:this.getCurrentYear(),onChange:this.setStateYear}))))),r.a.createElement("div",{className:"ui two column centered grid"},r.a.createElement("div",{className:"left floated column"},r.a.createElement(M.a,{variant:"h5"},"\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u044f")),r.a.createElement("div",{className:"two column row"},r.a.createElement("div",{className:"column"},r.a.createElement(Z,{classEnter:this.state.indicators.ElectricityDay.valid?a.join(" "):n.join(" "),id:"ElectricityDay",label:"\u0414\u0435\u043d\u044c",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u043d\u0435\u0432\u043d\u043e\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435",name:"ElectricityDay",changed:function(t){return e.addIndicatorHandler("ElectricityDay",t)},value:this.state.indicators.ElectricityDay.value,invalid:this.state.indicators.ElectricityDay.valid,errorMessage:t})),r.a.createElement("div",{className:"column"},r.a.createElement(Z,{classEnter:this.state.indicators.ElectricityNight.valid?a.join(" "):n.join(" "),id:"ElectricityNight",label:"\u041d\u043e\u0447\u044c",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u0447\u043d\u043e\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435",name:"ElectricityNight",changed:function(t){return e.addIndicatorHandler("ElectricityNight",t)},value:this.state.indicators.ElectricityNight.value,invalid:this.state.indicators.ElectricityNight.valid,errorMessage:t})))),r.a.createElement("div",{className:"ui two column centered grid indicator_container"},r.a.createElement("div",{className:"left floated column"},r.a.createElement(M.a,{variant:"h5"},"\u041a\u0443\u0445\u043d\u044f")),r.a.createElement("div",{className:"two column row"},r.a.createElement("div",{className:"column"},r.a.createElement(Z,{classEnter:this.state.indicators.ColdWaterKittchen.valid?a.join(" "):n.join(" "),id:"ColdWaterKittchen",label:"\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435",name:"ColdWaterKittchen",changed:function(t){return e.addIndicatorHandler("ColdWaterKittchen",t)},value:this.state.indicators.ColdWaterKittchen.value,invalid:this.state.indicators.ColdWaterKittchen.valid,errorMessage:t})),r.a.createElement("div",{className:"column"},r.a.createElement(Z,{classEnter:this.state.indicators.HotWaterBathroom.valid?a.join(" "):n.join(" "),id:"HotWaterBathroom",label:"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435",name:"HotWaterBathroom",changed:function(t){return e.addIndicatorHandler("HotWaterBathroom",t)},value:this.state.indicators.HotWaterBathroom.value,invalid:this.state.indicators.HotWaterBathroom.valid,errorMessage:t})))),r.a.createElement("div",{className:"ui two column centered grid indicator_container"},r.a.createElement("div",{className:"left floated column"},r.a.createElement(M.a,{variant:"h5"},"\u0412\u0430\u043d\u043d\u0430\u044f")),r.a.createElement("div",{className:"two column row"},r.a.createElement("div",{className:"column"},r.a.createElement(Z,{classEnter:this.state.indicators.ColdWaterBathroom.valid?a.join(" "):n.join(" "),id:"ColdWaterBathroom",label:"\u0425\u043e\u043b\u043e\u0434\u043d\u0430\u044f \u0432\u043e\u0434\u0430",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435",name:"ColdWaterBathroom",changed:function(t){return e.addIndicatorHandler("ColdWaterBathroom",t)},value:this.state.indicators.ColdWaterBathroom.value,invalid:this.state.indicators.ColdWaterBathroom.valid,errorMessage:t})),r.a.createElement("div",{className:"column"},r.a.createElement(Z,{classEnter:this.state.indicators.HotWaterKittchen.valid?a.join(" "):n.join(" "),id:"HotWaterKittchen",label:"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435",name:"HotWaterKittchen",changed:function(t){return e.addIndicatorHandler("HotWaterKittchen",t)},value:this.state.indicators.HotWaterKittchen.value,invalid:this.state.indicators.HotWaterKittchen.valid,errorMessage:t})))),r.a.createElement("div",{className:"ui one column centered grid"},r.a.createElement("div",{style:{textAlign:"center"},className:"column"},r.a.createElement(O.a,{variant:"contained",color:"primary",disableElevation:!0,onClick:this.modalHandlerOpen},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u043a\u0430\u0437\u0430\u043d\u0438\u044f")))))}}]),t}(n.Component),ie=Object(m.g)(re),oe=a(13),le=(a(399),a(229)),ce=a.n(le),se=a(472),de=a(478),ue=Object(p.a)((function(e){return Object(de.a)({root:{margin:"10px 0",width:"100%"},input:{"&:-webkit-autofill":{WebkitBoxShadow:"0 0 0 30px white inset !important"}}})})),me=function(e){var t=ue();return r.a.createElement(se.a,Object.assign({className:t.root,variant:"outlined",inputProps:{className:t.input}},e))},he=a(471),ve=a(227),Ee=a.n(ve),pe=a(228),ge=a.n(pe),fe=Object(p.a)((function(e){return Object(de.a)({root:{margin:"10px 0",width:"100%"},input:{"&:-webkit-autofill":{WebkitBoxShadow:"0 0 0 30px white inset !important"}}})})),be=function(e){var t=fe(),a=r.a.useState({showPassword:!1}),n=Object(U.a)(a,2),i=n[0],o=n[1];return r.a.createElement(se.a,Object.assign({className:t.root,variant:"outlined",type:i.showPassword?"text":"password",inputProps:{className:t.input},InputProps:{endAdornment:r.a.createElement(he.a,{position:"end"},r.a.createElement(b.a,{"aria-label":"toggle password visibility",onClick:function(){o(Object(x.a)({},i,{showPassword:!i.showPassword}))},edge:"end"},i.showPassword?r.a.createElement(Ee.a,null):r.a.createElement(ge.a,null)))}},e))},ye=a(7),we=Object(ye.a)({root:{width:"100%",textTransform:"none",margin:"30px 0 10px 0"}})(O.a),ke=function(e){return r.a.createElement(we,Object.assign({variant:"contained",color:"primary"},e),e.children)},Oe=a(475),Ce=Object(ye.a)({root:{marginBottom:"10px"}})(Oe.a),Ne=function(e){return r.a.createElement(Ce,e,e.children)},Se=function(e,t){return{type:"AUTH_SUCCESS",idToken:e,userId:t}},je=function(){return localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("userId"),{type:"AUTH_LOGOUT"}},xe=function(e){return function(t){setTimeout((function(){t(je())}),1e3*e)}},We=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",rememberMe:!1,validateFields:{email:!1,password:!1},fieldValidationErrors:{email:"\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!",password:"\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!"},willSend:!0},a.inputHandler=function(e){var t=e.target.name,n=e.target.value;a.validation(t,n),a.setState(Object(oe.a)({},t,n))},a.validation=function(e,t){var n=Object(x.a)({},a.state.validateFields),r=Object(x.a)({},a.state.fieldValidationErrors);switch(e){case"email":n.email=/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(t),0===t.length?r.email="\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!":r.email="\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0441\u0442\u044c \u043f\u043e\u0447\u0442\u044b";break;case"password":n.password=t.length>=6,0===t.length?r.password="\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u043b\u0435!":r.password="\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u0435\u0435 6 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432"}a.setState({validateFields:n,fieldValidationErrors:r})},a.checkboxHandler=function(){var e=a.state.rememberMe;a.setState({rememberMe:!e})},a.formSenderHandler=function(){a.state.validateFields.email&&a.state.validateFields.password?(a.setState({willSend:!0}),a.props.onAuth(a.state.email,a.state.password,a.state.rememberMe)):a.setState({willSend:!1})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=!1,t=!1;return this.state.willSend||(e=!this.state.validateFields.email,t=!this.state.validateFields.password),r.a.createElement("div",{className:"auth_container"},r.a.createElement("form",null,r.a.createElement("div",{className:"lockIconContainer"},r.a.createElement("div",{className:"roundIcon"},r.a.createElement(ce.a,null))),r.a.createElement("h1",{className:"authHeader"},"\u0412\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442"),this.props.errorMessage?r.a.createElement(Ne,{severity:"error"},this.props.errorMessage):null,r.a.createElement(me,{key:"email",id:"email",label:"\u041f\u043e\u0447\u0442\u0430",name:"email",error:e,helperText:e?this.state.fieldValidationErrors.email:null,onChange:this.inputHandler,value:this.state.email}),r.a.createElement(be,{key:"password",id:"password",label:"\u041f\u0430\u0440\u043e\u043b\u044c",name:"password",error:t,helperText:t?this.state.fieldValidationErrors.password:null,onChange:this.inputHandler,value:this.state.password}),r.a.createElement(ke,{onClick:this.formSenderHandler},"\u0412\u043e\u0439\u0442\u0438 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442")))}}]),t}(n.Component),Ie=Object(h.b)((function(e){return{isAuth:null!==e.token,loading:e.loading,errorMessage:e.error}}),(function(e){return{onAuth:function(t,a){return e(function(e,t){return function(a){a({type:"AUTH_START"});var n={email:e,password:t,returnSecureToken:!0},r="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=".concat(X.AUTH_API_KEY);H.post(r,n).then((function(e){console.log(e);var t=new Date((new Date).getTime()+1e3*e.data.expiresIn);localStorage.setItem("token",e.data.idToken),localStorage.setItem("expirationDate",t),localStorage.setItem("userId",e.data.localId),a(Se(e.data.idToken,e.data.localId)),a(xe(e.data.expiresIn))})).catch((function(e){console.log(e),a(function(e){return{type:"AUTH_FAIL",error:e}}(e.response.data.error))}))}}(t,a))}}}))(We),He=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.onLogout(this.props.history)}},{key:"render",value:function(){return r.a.createElement(m.a,{to:"/"})}}]),t}(n.Component),De=Object(h.b)(null,(function(e){return{onLogout:function(){return e(je())}}}))(He),Te=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.onTryAutoSignup()}},{key:"render",value:function(){var e=r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/auth",component:Ie}),r.a.createElement(m.a,{to:"/auth"}));return this.props.isAuth&&(e=r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/outlay",component:G}),r.a.createElement(m.b,{path:"/send-indicators",component:ie}),r.a.createElement(m.b,{path:"/logout",component:De}),r.a.createElement(m.a,{to:"/send-indicators"}))),r.a.createElement(j,{isAuth:this.props.isAuth},e)}}]),t}(n.Component),_e=Object(h.b)((function(e){return{isAuth:null!==e.token}}),(function(e){return{onTryAutoSignup:function(){return e((function(e){var t=localStorage.getItem("token");if(t){var a=new Date(localStorage.getItem("expirationDate"));if(a<=new Date)e(je());else{var n=localStorage.getItem("userId");e(Se(t,n)),e(xe((a.getTime()-(new Date).getTime())/1e3))}}else e(je())}))}}}))(Te);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ae=a(85),Be=a(230),Ye=a(38),Ke=Object(Ye.a)(),Me=function(e,t){return Object(x.a)({},e,{},t)},Le={token:null,userId:null,error:null,loading:!1},Ue=function(e){return Me(e,{error:null,loading:!0})},Fe=function(e,t){return Me(e,{token:t.idToken,userId:t.userId,error:null,loading:!1})},Pe=function(e,t){var a;return a=401===t.error?"\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443":"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 \u043f\u043e\u0437\u0434\u043d\u0435\u0435",Me(e,{error:a,loading:!1})},Re=function(e){return Me(e,{token:null,userId:null})},Ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_START":return Ue(e);case"AUTH_SUCCESS":return Fe(e,t);case"AUTH_FAIL":return Pe(e,t);case"AUTH_LOGOUT":return Re(e);default:return e}},Ge=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ae.c,ze=Object(Ae.d)(Ve,Ge(Object(Ae.a)(Be.a))),Je=r.a.createElement(h.a,{store:ze},r.a.createElement(C.a,{history:Ke,basename:"/"},r.a.createElement(_e,null)));o.a.render(Je,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},64:function(e){e.exports=JSON.parse('{"SERVICE_ID":"gmail","RECIPIENT":"verkholantsev@gmail.com","ADDRESS":"\u0443\u043b. \u041c\u0430\u043a\u0430\u0440\u0435\u043d\u043a\u043e, 6 - \u043a\u0432. 88","TEMPLATE_ID":"template_83dCi3ca","USER_ID":"user_rEIgP6Z8hPXkwIosFYkR7","AUTH_API_KEY":"AIzaSyCQ-YIBbLpl1SOF7KzaSR0v7HLz61N-yno"}')}},[[249,1,2]]]);
//# sourceMappingURL=main.35e3993c.chunk.js.map