(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{157:function(e,t,n){},262:function(e,t,n){},263:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),c=n.n(r),s=n(13),i=n.n(s),o=(n(156),n(157),n(14)),l=n(8),u=n.n(l),j=n(20),d=n(28),p=n(11),b=n(12),h=n(79);function m(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};Object(j.a)(u.a.mark((function a(){return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch(e,n).then(function(){var e=Object(j.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t,e.next=3,n.json();case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.log(e)}));case 2:case"end":return a.stop()}}),a)})))()}function f(e,t){return x.apply(this,arguments)}function x(){return(x=Object(j.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 2:return a=e.sent,e.next=5,a.json();case 5:return r=e.sent,console.log("sending"),e.abrupt("return",[r,a.status]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){var t=new h.a,n=JSON.parse(atob(e.token.split(".")[1])).exp,a=new Date(1e3*n);console.log(e),console.log(a),t.set("token",e.token,{path:"/",expires:a,sameSite:"Lax"})}function y(){return(new h.a).get("token")}function v(){var e=(new h.a).get("token");if(void 0===e)return 0;var t=JSON.parse(atob(e.split(".")[1])).exp;return new Date(1e3*t)}function g(){return v()>0}function w(){return v()-Date.now()}var k=function(){function e(t,n,a,r){Object(p.a)(this,e),this.name=t,this.version=n,this.collection=a,this.key=r,this.__prepareDB()}return Object(b.a)(e,[{key:"__prepareDB",value:function(e){var t=this,n=indexedDB.open(this.name,this.version);n.onupgradeneeded=function(e){n.result.createObjectStore(t.collection,{keyPath:t.key}),alert("Upgrade called, ".concat(t.name,", ").concat(t.version))},n.onsuccess=function(e){console.log("Successuly opened database, ".concat(t.name,", ").concat(t.version))},n.onerror=function(e){alert("Error called, ".concat(e.target.error))}}},{key:"DB",value:function(){var e=Object(j.a)(u.a.mark((function e(){var t=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var n=indexedDB.open(t.name,t.version);n.onsuccess=function(){return e(n.result)}})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.DB();case 2:return a=e.sent,e.next=5,new Promise((function(e){var r=a.transaction(t,"readonly").objectStore(t).get(n);r.onsuccess=function(){return e(r.result)}}));case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getAll",value:function(){var e=Object(j.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.DB();case 2:return n=e.sent,e.next=5,new Promise((function(e){var a=n.transaction(t,"readonly").objectStore(t).getAll();a.onsuccess=function(){return e(a.result)}}));case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.DB();case 2:return a=e.sent,e.next=5,new Promise((function(e){var r=a.transaction(t,"readwrite").objectStore(t).delete(n);r.onsuccess=function(){return e(r.result)}}));case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"deleteAll",value:function(){var e=Object(j.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.DB();case 2:return n=e.sent,e.next=5,new Promise((function(e){var a=n.transaction(t,"readwrite").objectStore(t).clear();a.onsuccess=function(){return e(a.result)}}));case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"createCollection",value:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var a=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){a.version+=1;var r=indexedDB.open(a.name,a.version);r.onupgradeneeded=function(){r.result.createObjectStore(t,{keyPath:n}),e(r.result)}})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"deleteCollection",value:function(){var e=Object(j.a)(u.a.mark((function e(t){var n=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){n.version+=1;var a=indexedDB.open(n.name,n.version);a.onupgradeneeded=function(){a.result.deleteObjectStore(t),e(a.result)}})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"insert",value:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.DB();case 2:return a=e.sent,e.next=5,new Promise((function(e){var r=a.transaction(t,"readwrite").objectStore(t).put(n);r.onsuccess=function(){return e(r.result)}}));case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}();var S=n(319),z=n(306),N=n(307),D=n(308),B=n(309),T=n(141),P=n(80),C=n(310),E=n(15),_={glassMorphism:{background:"rgba(255, 255, 255, 0.25)",boxShadow:"0 8px 32px 0 rgba(31, 38, 135, 0.37)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",borderRadius:"10px"},myMakeStyles:function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1)},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}},q=n(78),M=n.n(q),W=n(60),F=n.n(W),L=n(19),J=L.b({fname:L.c().required("Imi\u0119 jest wymagane"),lname:L.c().required("Nazwisko jest wymagane"),bdate:L.a("Niepoprawny format daty").required("Data urodzenia jest wymagana"),pesel:L.c().required("Pesel jest wymagany"),email:L.c().email("Nieprawid\u0142owy email").required("Email jest wymagany"),phone:L.c().required("Numer telefonu jest wymagany"),city:L.c().required("Miasto/miejscowo\u015b\u0107 jest wymagane"),street:L.c().required("Ulica jest wymagana"),home_number:L.c().required("Numer domu jest wymagany"),zip:L.c().required("Kod pocztowy jest wymagany"),password:L.c().required("Nie wpisano has\u0142a.").min(8,"Has\u0142o jest zbyt kr\xf3tkie - powinno mie\u0107 conajmniej 8 znak\xf3w.")}),A=function(e){var t=Object.assign({},e),n=Object(E.d)(t),r=Object(o.a)(n,2),c=(r[0],r[1]),s=c.error&&c.touched?c.error:"";return Object(a.jsx)(S.a,Object(d.a)(Object(d.a)({},t),{},{margin:"normal",helperText:s,error:!!s}))};function I(e){var t=e.loginSetter,n=Object(r.useState)([]),c=Object(o.a)(n,2),s=(c[0],c[1],Object(z.a)(_.myMakeStyles));return Object(a.jsx)("div",{children:Object(a.jsx)(N.a,{component:"main",maxWidth:"xs",children:Object(a.jsx)(D.a,{children:Object(a.jsx)(B.a,{children:Object(a.jsxs)(T.a,{style:_.glassMorphism,children:[Object(a.jsx)("div",{children:Object(a.jsx)(M.a,{className:s.avatar})}),Object(a.jsx)(P.a,{component:"h1",variant:"h5",children:"Zarejestruj si\u0119 na szczepienie"}),Object(a.jsx)(E.c,{validationSchema:J,initialValues:{fname:"",lname:"",bdate:"",pesel:"",email:"",phone:"",city:"",street:"",home_number:"",zip:"",password:"",patient_info:null},onSubmit:function(){var e=Object(j.a)(u.a.mark((function e(n,a){var r,c,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.setSubmitting,c=a.resetForm,r(!0),n.password=F()(n.password),console.log(n),r(!1),e.next=7,f(ye+"resources/patients/create",n);case 7:s=e.sent,i=Object(o.a)(s,2),i[0],200===i[1]?alert("Sukces"):alert("Niepowodzenie"),t(!0),setTimeout((function(){console.log("setting"),t(!1)}),1e4),c();case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){e.values;var t=e.isSubmitting;e.errors,e.touched;return Object(a.jsxs)(E.b,{children:[Object(a.jsx)(E.a,{name:"fname",placeholder:"Jan",type:"input",label:"imi\u0119",as:A}),Object(a.jsx)(E.a,{name:"lname",placeholder:"Kowalski",type:"input",label:"nazwisko",as:A}),Object(a.jsx)(E.a,{name:"bdate",placeholder:"2003-05-13",type:"input",label:"data urodzenia",as:A}),Object(a.jsx)(E.a,{name:"pesel",placeholder:"12345679",type:"input",label:"pesel",as:A}),Object(a.jsx)(E.a,{name:"email",placeholder:"janKowalski@poczta.com",type:"input",label:"email",as:A}),Object(a.jsx)(E.a,{name:"phone",placeholder:"+48 123456789",type:"input",label:"telefon",as:A}),Object(a.jsx)(E.a,{name:"city",placeholder:"Krak\xf3w",type:"input",label:"miasto/miejscowo\u015b\u0107",as:A}),Object(a.jsx)(E.a,{name:"street",placeholder:"Kwiatowa",type:"input",label:"ulica",as:A}),Object(a.jsx)(E.a,{name:"home_number",placeholder:"354",type:"input",label:"number domu",as:A}),Object(a.jsx)(E.a,{name:"zip",placeholder:"58-023",type:"input",label:"kod pocztowy",as:A}),Object(a.jsx)(E.a,{name:"password",placeholder:"***********",type:"password",label:"has\u0142o",as:A}),Object(a.jsx)(C.a,{disabled:t,type:"submit",children:"Prze\u015blij zg\u0142oszenie"})]})}})]})})})})})}var K=n(311),G=n(312),Z=n(313),U=n(136),V=n.n(U),H=n(314),R=n(139),Q=n(46),X=n(138),Y=n(16),$=Object(z.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,color:"black"}}}));function ee(){var e=Object(Y.f)(),t=$(),n=c.a.useState(g()),s=Object(o.a)(n,2),i=s[0],l=s[1],u=c.a.useState(null),j=Object(o.a)(u,2),d=j[0],p=j[1],b=Boolean(d),h=v(),m=c.a.useState(h),f=Object(o.a)(m,2),x=f[0],O=f[1];Object(r.useEffect)((function(){if(0!==h){l(!0);try{setTimeout((function(){O(Object(X.a)(v(),{unit:"second"})),0===v()&&(O(0),l(!1))}),1e3)}catch(e){}console.log(x)}}));var y=function(){p(null)};return Object(a.jsxs)("div",{className:t.root,children:[Object(a.jsx)(K.a,{position:"static",style:_.glassMorphism,children:Object(a.jsxs)(G.a,{children:[Object(a.jsx)(C.a,{onClick:function(){return e.push("/")},children:Object(a.jsx)(P.a,{variant:"h6",className:t.title,children:"Dziabadaj"})}),!i&&Object(a.jsx)(C.a,{component:Q.b,to:"/login",children:"Login"}),i&&Object(a.jsxs)("div",{children:[Object(a.jsx)(Z.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){p(e.currentTarget)},children:Object(a.jsx)(V.a,{})}),Object(a.jsxs)(R.a,{id:"menu-appbar",anchorEl:d,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:b,onClose:y,children:[Object(a.jsx)(H.a,{onClick:function(){y(),e.push("/details")},children:"Szczeg\xf3\u0142y konta"}),Object(a.jsx)(H.a,{onClick:function(){y(),e.push("/vaccinations")},children:"Zaplanowane szczepenia"})]})]})]})}),x?"Do wylogowania pozosta\u0142o: ".concat(x):""]})}var te=n(320),ne=n(137),ae=n.n(ne),re=L.b({email:L.c().email("Niepoprawny email").required("Email jest wymagany"),password:L.c().required("Nie wpisano has\u0142a.").min(8,"Has\u0142o jest zbyt kr\xf3tkie - powinno mie\u0107 conajmniej 8 znak\xf3w.")}),ce=function(e){var t=e.loginSetter,n=Object(Y.f)(),r={margin:"8px 0"};return Object(a.jsx)("div",{children:Object(a.jsx)(B.a,{children:Object(a.jsxs)(T.a,{elevation:10,style:Object(d.a)(Object(d.a)({},{padding:40,height:"40vh",width:330,margin:"30px auto"}),_.glassMorphism),children:[Object(a.jsxs)(B.a,{align:"center",children:[Object(a.jsx)(te.a,{style:{backgroundColor:"#1bbd7e"},children:Object(a.jsx)(ae.a,{})}),Object(a.jsx)("h2",{children:"Zaloguj si\u0119"})]}),Object(a.jsx)(E.c,{validationSchema:re,initialValues:{email:"",password:""},onSubmit:function(){var e=Object(j.a)(u.a.mark((function e(a,r){var c,s,i,l,j,d,p;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=r.setSubmitting,s=r.resetForm,c(!0),a.password=F()(a.password),e.next=5,f(ye+"auth/login",a);case 5:if(i=e.sent,l=Object(o.a)(i,2),j=l[0],d=l[1],console.log(j),200==d){e.next=15;break}return alert(j),e.abrupt("return");case 15:O(j);case 16:if(p=g(),t(p),p){e.next=20;break}return e.abrupt("return");case 20:n.push("/"),setTimeout((function(){console.log("setting"),t(!1)}),w()),console.log(w()),console.log(a),c(!1),s();case 26:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){e.values;var t=e.isSubmitting;e.errors;return Object(a.jsxs)(E.b,{children:[Object(a.jsx)(E.a,{name:"email",placeholder:"janKowalski@poczta.com",type:"input",label:"email",margin:"normal",as:A}),Object(a.jsx)(E.a,{name:"password",placeholder:"***********",type:"password",label:"has\u0142o",margin:"normal",as:A}),Object(a.jsx)(C.a,{style:r,disabled:t,type:"submit",children:"Zaloguj"})]})}})]})})})},se=n(305),ie=n(265),oe=n(315),le=(Object(z.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper}}})),{padding:20,height:"80vh",width:330,margin:"10px auto"});function ue(){var e=Object(r.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){m(ye+"/resources/patients/current",c,{method:"GET",headers:{"x-access-tokens":y()}})}),[]),console.log(n),Object(a.jsx)("div",{children:Object(a.jsx)(B.a,{children:n&&Object(a.jsx)("div",{children:Object(a.jsx)(se.a,{className:!0,children:Object(a.jsxs)(T.a,{elevation:10,style:Object(d.a)(Object(d.a)({},le),_.glassMorphism),children:[Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.fname,secondary:"imi\u0119"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.lname,secondary:"nazwisko"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.bdate,secondary:"data urodzenia"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.email,secondary:"email"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.phone,secondary:"telefon"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.pesel,secondary:"pesel"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.city,secondary:"miasto"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.street,secondary:"ulica"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.homeNumber,secondary:"numer domu"})}),Object(a.jsx)(ie.a,{children:Object(a.jsx)(oe.a,{primary:n.zip,secondary:"kod pocztowy"})})]})})})})})}var je=n(316),de=n(318),pe=n(317),be=Object(z.a)({root:{minWidth:275,maxWidth:500},bullet:{display:"inline-block",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});function he(e){var t=be();return Object(a.jsxs)(je.a,{className:t.root,children:[Object(a.jsxs)(pe.a,{children:[Object(a.jsx)(P.a,{className:t.title,color:"textSecondary",gutterBottom:!0,children:e.data.clinic_name}),Object(a.jsx)(P.a,{variant:"h5",component:"h2",children:e.data.name}),Object(a.jsxs)(P.a,{className:t.pos,color:"textSecondary",children:["dzienny limit: ",e.data.daily_limit]}),Object(a.jsxs)(P.a,{variant:"body2",component:"p",children:["miasto: ",e.data.city]}),Object(a.jsxs)(P.a,{children:["kod-pocztowy: ",e.data.zip]}),Object(a.jsxs)(P.a,{children:["ulica: ",e.data.street]}),Object(a.jsxs)(P.a,{children:["numer budynku: ",e.data.building_number]}),Object(a.jsxs)(P.a,{children:["telefon: ",e.data.phone]}),Object(a.jsxs)(P.a,{children:["email: ",e.data.email]}),Object(a.jsxs)(P.a,{children:["informacje kontaktowe: ",e.data.contact_info]}),Object(a.jsxs)(P.a,{children:["informacje o plac\xf3wce: ",e.data.facility_info]}),Object(a.jsxs)(P.a,{children:["kraj: ",e.data.country]})]}),Object(a.jsx)(de.a,{children:Object(a.jsx)(C.a,{size:"small",onClick:function(){e.idSetter(e.data.id)},children:"Wybierz"})})]})}var me=Object(z.a)({root:{minWidth:275,maxWidth:500},bullet:{display:"inline-block",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});function fe(e){var t=me();return Object(a.jsx)(je.a,{className:t.root,children:Object(a.jsxs)(pe.a,{children:[Object(a.jsxs)(P.a,{className:t.title,color:"textSecondary",gutterBottom:!0,children:["status: ",e.data.status]}),Object(a.jsx)(P.a,{variant:"h5",component:"h2",children:e.data.name}),Object(a.jsxs)(P.a,{className:t.pos,color:"textSecondary",children:["miasto: ",e.data.city]}),Object(a.jsxs)(P.a,{variant:"body2",component:"p",children:["data: ",e.data.date]}),Object(a.jsxs)(P.a,{children:["kod-pocztowy: ",e.data.zip]}),Object(a.jsxs)(P.a,{children:["ulica: ",e.data.street]}),Object(a.jsxs)(P.a,{children:["numer budynku: ",e.data.building_number]}),Object(a.jsxs)(P.a,{children:["telefon: ",e.data.phone]}),Object(a.jsxs)(P.a,{children:["email: ",e.data.email]})]})})}var xe=L.b({date:L.a("Niepoprawny format daty").required("Data urodzenia jest wymagana")});function Oe(e){e.loginSetter;var t=Object(r.useState)([]),n=Object(o.a)(t,2),c=(n[0],n[1],Object(r.useState)(null)),s=Object(o.a)(c,2),i=s[0],l=s[1],p=Object(r.useState)(null),b=Object(o.a)(p,2),h=b[0],f=b[1],x=Object(z.a)(_.myMakeStyles),O=Object(r.useState)(null),v=Object(o.a)(O,2),g=v[0],w=v[1];return Object(r.useEffect)((function(){m(ye+"resources/facilites/all",w,{method:"GET"})}),[]),Object(r.useEffect)(Object(j.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(ye+"vaccination/current",{method:"GET",headers:{"Content-Type":"application/json","x-access-tokens":y()}});case 2:return t=e.sent,e.next=5,t.json();case 5:if(n=e.sent,200==t.status){e.next=9;break}return f(null),e.abrupt("return");case 9:f(n);case 10:case"end":return e.stop()}}),e)}))),[]),console.log(h),console.log("vacc = ?",null===h),console.log(g),Object(a.jsx)("div",{children:Object(a.jsx)(N.a,{component:"main",maxWidth:"xs",children:Object(a.jsx)(D.a,{children:Object(a.jsxs)(B.a,{children:[!!h&&Object(a.jsx)(fe,{data:h},h.id),!h&&Object(a.jsxs)(T.a,{style:_.glassMorphism,children:[Object(a.jsx)("div",{children:Object(a.jsx)(M.a,{className:x.avatar})}),Object(a.jsx)(P.a,{component:"h1",variant:"h5",children:"Zarejestruj si\u0119 na szczepienie"}),Object(a.jsx)(E.c,{validationSchema:xe,initialValues:{date:""},onSubmit:function(){var e=Object(j.a)(u.a.mark((function e(t,n){var a,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.setSubmitting,n.resetForm,a(!0),t=Object(d.a)(Object(d.a)({},t),{},{facility_id:i}),console.log(t),a(!1),e.next=7,fetch(ye+"vaccination/register",{method:"POST",headers:{"Content-Type":"application/json","x-access-tokens":y()},body:JSON.stringify(t)});case 7:return r=e.sent,e.next=10,r.json();case 10:c=e.sent,200===r.status&&location.reload(),401===r.status&&alert("U\u017cytkownik niezalogowany"),200!=r.status&&alert("Niepowodzenie"),console.log(c);case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){e.values;var t=e.isSubmitting;e.errors,e.touched;return Object(a.jsxs)(E.b,{children:[Object(a.jsx)(E.a,{name:"date",placeholder:"2020-01-01",type:"input",label:"data",as:A}),Object(a.jsx)(C.a,{disabled:t,type:"submit",children:"Prze\u015blij zg\u0142oszenie"})]})}}),"Wybrano: ",g&&i&&g.find((function(e){return e.id===i})).name]}),!h&&g&&g.map((function(e,t){return Object(a.jsx)(he,{data:e,idSetter:l},e.id)}))]})})})})}n(262);var ye="/api/v1/";Object(z.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1)},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));var ve=function(){var e=Object(r.useState)(!1),t=Object(o.a)(e,2),n=t[0],c=t[1];return addEventListener("load",(function(){function e(e){if(navigator.onLine){var t=ye+"resources/patients/create",n=new k("offDB",1,"formData","email");n.getAll("formData").then((function(e){e.forEach((function(e){f(t,e)}))})),n.deleteAll("formData").then((function(e){return alert("Wys\u0142ano zachowane dane")}))}}addEventListener("online",e),addEventListener("offline",e)})),Object(a.jsx)(Q.a,{children:Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(ee,{}),Object(a.jsxs)(Y.c,{children:[Object(a.jsx)(Y.a,{path:"/login",children:Object(a.jsx)(ce,{loginSetter:c})}),Object(a.jsx)(Y.a,{path:"/details",children:Object(a.jsx)(ue,{})}),Object(a.jsx)(Y.a,{path:"/vaccinations",children:Object(a.jsx)(Oe,{})}),Object(a.jsx)(Y.a,{exact:!0,path:"/",children:function(){return console.log({IsLogged:n}),n?Object(a.jsx)(ue,{}):Object(a.jsx)(I,{})}})]})]})})},ge=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,321)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};i.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(ve,{})}),document.getElementById("root")),ge()}},[[263,1,2]]]);
//# sourceMappingURL=main.1ace90d7.chunk.js.map