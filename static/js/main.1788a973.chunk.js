(this["webpackJsonppokedex-react"]=this["webpackJsonppokedex-react"]||[]).push([[0],{19:function(e,t,a){},24:function(e,t,a){e.exports=a(39)},29:function(e,t,a){},30:function(e,t,a){e.exports=a.p+"static/media/logo.ee7cd8ed.svg"},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(21),i=a.n(r),s=(a(29),a(30),a(4)),l=a(5),c=a(7),m=a(6),u=a(2),p=a(8),d=(a(31),a(32),a(19),a(33),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={name:null,type:null,color:null},fetch(e.url).then((function(e){return e.json()})).then((function(e){var t;a.setState({name:e.name,type:e.type.name,color:(t=e.type.name,"normal"===t?"#A8A878":"fighting"===t?"#C03028":"flying"===t?"#A890F0":"poison"===t?"#A040A0":"ground"===t?"#E0C068":"rock"===t?"#B8A038":"bug"===t?"#A8B820":"ghost"===t?"#705898":"steel"===t?"#B8B8D0":"fire"===t?"#F08030":"water"===t?"#6890F0":"grass"===t?"#78C850":"electric"===t?"#F8D030":"psychic"===t?"#F85888":"ice"===t?"#98D8D8":"dragon"===t?"#7038F8":"dark"===t?"#705848":"fairy"===t?"#EE99AC":"???"===t?"#68A090":void 0)})})),a.routeToInformation=a.routeToInformation.bind(Object(u.a)(a)),a.updateClick=a.updateClick.bind(Object(u.a)(a)),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"updateClick",value:function(){this.setState({clicked:!0}),window.location.href="/pokeinfo/"+this.state.name}},{key:"routeToInformation",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"move-card"},o.a.createElement("div",{className:"name"},function(e){if("string"!==typeof e)return"";for(var t=e.length,a="",n=0;n<t;n++)"-"===e.charAt(n)?a+=" ":a+=e.charAt(n);return a}(this.state.name)),o.a.createElement("div",{style:{backgroundColor:this.state.color},className:"type-box"},this.state.type))}}]),t}(n.Component)),f=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"center-loading"},o.a.createElement("div",{className:"loading-screen"}," ",o.a.createElement("h1",null,"Loading..."),o.a.createElement("div",{className:"loading-screen-image"})))}}]),t}(n.Component),h=a(11),v=function(e){return"string"!==typeof e?"":e.charAt(0).toUpperCase()+e.slice(1)},g=function(e){return"normal"===e?"#A8A878":"fighting"===e?"#C03028":"flying"===e?"#A890F0":"poison"===e?"#A040A0":"ground"===e?"#E0C068":"rock"===e?"#B8A038":"bug"===e?"#A8B820":"ghost"===e?"#705898":"steel"===e?"#B8B8D0":"fire"===e?"#F08030":"water"===e?"#6890F0":"grass"===e?"#78C850":"electric"===e?"#F8D030":"psychic"===e?"#F85888":"ice"===e?"#98D8D8":"dragon"===e?"#7038F8":"dark"===e?"#705848":"fairy"===e?"#EE99AC":"???"===e?"#68A090":void 0};function k(e){var t=Object(h.e)();return o.a.createElement("button",{className:"previous-btn",type:"submit",onClick:function(){var a=e.currentNum-1;a>0&&(t.push("/pokeinfo/"+a),window.location.reload())}})}var b=function(e){function t(e){var a;return Object(s.a)(this,t),a=Object(c.a)(this,Object(m.a)(t).call(this,e)),console.log(a.props.match.params),a.state={searchedName:a.props.match.params.name,name:null,idnum:null,moves:null,abilities:null,description:null,genus:null,color:null,allinformation:null,isLoaded:!1,error:!1},fetch("https://pokeapi.co/api/v2/pokemon/"+a.state.searchedName).then((function(e){return e.json()})).then((function(e){a.setState({name:e.name,idnum:e.id,moves:e.moves,abilities:e.abilities,pokemonHeight:e.height,allInformation:e,isLoaded:!0}),fetch(a.state.allInformation.species.url).then((function(e){return e.json()})).then((function(e){for(var t=e.flavor_text_entries,n=0;"en"!==t[n].language.name;)n++;"en"===t[n].language.name&&a.setState({description:t[n].flavor_text});var o=e.genera;for(n=0;"en"!==o[n].language.name;)n++;if("en"===o[n].language.name&&a.setState({genus:o[n].genus}),"white"===e.color.name||"yellow"==e.color.name){var r=a.state.allInformation.types;r.length>=1?a.setState({color:g(r[0].type.name)}):a.setState({color:"gray"})}else a.setState({color:e.color.name})})),document.title=v(a.state.name)})),a.navToPrevious=a.navToPrevious.bind(Object(u.a)(a)),a.navToNext=a.navToNext.bind(Object(u.a)(a)),a.returnAbilityString=a.returnAbilityString.bind(Object(u.a)(a)),a.returnTypeBoxes=a.returnTypeBoxes.bind(Object(u.a)(a)),a.displayPrevButton=a.displayPrevButton.bind(Object(u.a)(a)),a.displayPokemonSprites=a.displayPokemonSprites.bind(Object(u.a)(a)),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"navToPrevious",value:function(){parseInt(this.state.allInformation.id,10)}},{key:"navToNext",value:function(){window.location.href="/#/pokeinfo/"+(parseInt(this.state.allInformation.id,10)+1)}},{key:"returnToPokedex",value:function(){window.location.href=""}},{key:"returnAbilityString",value:function(){var e=this.state.allInformation.abilities;return console.log(e),2===e.length?v(e[0].ability.name)+", "+v(e[1].ability.name):1===e.length?v(e[0].ability.name):"N/A"}},{key:"returnTypeBoxes",value:function(){var e=this.state.allInformation.types;if(2===e.length){var t=g(e[0].type.name),a=g(e[1].type.name);return o.a.createElement(o.a.Fragment,null,o.a.createElement("span",{style:{backgroundColor:t,textTransform:"uppercase",margin:"5px",padding:"2px 10px 2px 10px"}},e[0].type.name),o.a.createElement("span",{style:{backgroundColor:a,textTransform:"uppercase",margin:"5px",padding:"2px 10px 2px 10px"}},e[1].type.name))}if(1===e.length){t=g(e[0].type.name);return o.a.createElement(o.a.Fragment,null,o.a.createElement("span",{style:{backgroundColor:t,textTransform:"uppercase",margin:"5px",padding:"2px 10px 2px 10px"}},e[0].type.name))}return o.a.createElement("span",{style:{backgroundColor:g("???")}},"???")}},{key:"componentDidMount",value:function(){}},{key:"displayPrevButton",value:function(){return this.state.idnum>1?o.a.createElement(k,{currentNum:this.state.idnum}):null}},{key:"displayPokemonSprites",value:function(){return null!=this.state.allInformation.sprites.front_shiny?o.a.createElement("div",{className:"sprites"},o.a.createElement("div",{className:"two-sprites"},o.a.createElement("div",null," ",o.a.createElement("strong",null,"Normal")),o.a.createElement("img",{src:this.state.allInformation.sprites.front_default}),o.a.createElement("img",{src:this.state.allInformation.sprites.back_default})),o.a.createElement("div",{className:"two-sprites"},o.a.createElement("div",null,o.a.createElement("strong",null,"Shiny")),o.a.createElement("img",{src:this.state.allInformation.sprites.front_shiny}),o.a.createElement("img",{src:this.state.allInformation.sprites.back_shiny}))):o.a.createElement("div",{className:"sprites"},o.a.createElement("div",{className:"one-sprite"},o.a.createElement("img",{src:this.state.allInformation.sprites.front_default}),o.a.createElement("img",{src:this.state.allInformation.sprites.back_default})))}},{key:"showInformation",value:function(){var e=this.state.allInformation;console.log(e.types);var t=e.types,a=document.getElementById("pokemon-information-background");if(2===t.length){var n=g(t[0].type.name),r=g(t[1].type.name);null!==a&&(a.style.background="linear-gradient(to left, "+n+", "+r+")")}else 1===t.length?null!==a&&(a.style.background=g(e.types[0].type.name)):null!==a&&(a.style.background=g("???"));if(!0===this.state.isLoaded&&!1===this.state.error)return o.a.createElement("div",{className:"pokeinfo"},o.a.createElement("div",{className:"pokemon-idnum"},o.a.createElement("span",null,"#",this.state.idnum)),o.a.createElement("div",{className:"info-box"},o.a.createElement("div",{className:"typeandstat-info"},o.a.createElement("div",{className:"types"},this.returnTypeBoxes())),this.displayPokemonSprites()),o.a.createElement("div",{className:"short-description"},o.a.createElement("div",{className:"genus-text"},this.state.genus),o.a.createElement("div",{className:"flavor-text"},this.state.description)),o.a.createElement("div",{className:"section-box",style:{background:this.state.color}}," ",o.a.createElement("span",null,"Profile")),o.a.createElement("div",{className:"profile-info-box"},o.a.createElement("strong",null,"Height:"),o.a.createElement("span",null,10*this.state.allInformation.height,"cm"),o.a.createElement("strong",null,"Weight:"),o.a.createElement("span",null,function(e){return(e/10).toFixed(2)}(this.state.allInformation.weight),"kgs")),o.a.createElement("div",{className:"profile-info-box"},o.a.createElement("strong",null,"Abilities:"),o.a.createElement("span",null,this.returnAbilityString()),o.a.createElement("strong",null,"Base Experience:"),o.a.createElement("span",null,this.state.allInformation.base_experience)),o.a.createElement("div",{className:"section-box",style:{background:this.state.color}}," ",o.a.createElement("span",null,"Moves")),o.a.createElement("div",{className:"moves-box"},o.a.createElement("ul",null,this.state.moves.map((function(e){return o.a.createElement("div",{key:e.move.name},o.a.createElement(d,{name:e.move.name,url:e.move.url}))})))),o.a.createElement("br",null))}},{key:"render",value:function(){return o.a.createElement(f,null)}}]),t}(n.Component),y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={imageUrl:e.imageUrl,name:e.name,information:e.information,moves:null,abilities:null,clicked:!1},a.routeToInformation=a.routeToInformation.bind(Object(u.a)(a)),a.updateClick=a.updateClick.bind(Object(u.a)(a)),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"updateClick",value:function(){this.setState({clicked:!0}),window.location.href="/pokedex-react/#/pokeinfo/"+this.state.name}},{key:"routeToInformation",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"pokemon-image-border"},o.a.createElement("div",{className:"pokemon-id-number"},this.state.information.id),o.a.createElement("img",{className:"pokemon-image",src:this.state.imageUrl,alt:this.state.name,onClick:this.updateClick})))}}]),t}(n.Component),E=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("h1",null,"An error occured."))}}]),t}(n.Component),x=a(13),j=function(e){for(var t=e.length,a=1;a<t;a++){for(var n=e[a],o=a-1;o>=0&&e[o].id>n.id;)e[o+1]=e[o],o-=1;e[o+1]=n}return e},O=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={pokemonList:[],pokemonDataList:[],searchedPokemonDataList:[],isLoaded:!1},fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000").then((function(e){return e.json()})).then((function(e){a.setState({pokemonList:e.results}),a.state.pokemonList.map((function(e){fetch(e.url).then((function(e){return e.json()})).then((function(e){var t=j(a.state.pokemonDataList);null!=e.sprites.front_default&&t.push({name:e.name,id:e.id,imageUrl:e.sprites.front_default,allInformation:e}),a.setState({pokemonDataList:t,searchedPokemonDataList:t}),a.setState({isLoaded:!0})}))}))})),console.log(a.state.pokemonDataList),a.returnMappedImages=a.returnMappedImages.bind(Object(u.a)(a)),a.showPokemonResults=a.showPokemonResults.bind(Object(u.a)(a)),a.setState({isLoaded:!0}),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"showPokemonResults",value:function(){var e=document.getElementById("pokemon-search-bar").value,t=[];""===e?t=this.state.pokemonDataList:this.state.pokemonDataList.map((function(a){a.name.toLowerCase().includes(e.toLowerCase())&&t.push(a)})),this.setState({searchedPokemonDataList:t})}},{key:"returnMappedImages",value:function(){return o.a.createElement("div",{className:"grid"},this.state.searchedPokemonDataList.map((function(e){return o.a.createElement(y,{className:"grid-item",imageUrl:e.imageUrl,name:e.name,information:e.allInformation,key:e.name})})))}},{key:"componentDidMount",value:function(){var e=j(this.state.pokemonDataList);this.setState({pokemonDataList:e}),console.log(this.state.pokemonDataList)}},{key:"updateSelectedPokemonInformation",value:function(){}},{key:"render",value:function(){var e=this.state;e.name,e.idnum,e.error,e.isLoaded,e.pokemon,e.pokemonHeight,e.abilities,e.moves,e.pokemonList,e.pokemonDataList;return!0===this.state.isLoaded?o.a.createElement(x.a,{basename:"/pokedex-react"},o.a.createElement("div",null,o.a.createElement(h.a,{exact:!0,path:"/"},o.a.createElement("div",{className:"pokedex"},o.a.createElement("div",{className:"pokedex-division",id:"pokedex-division"},o.a.createElement("input",{className:"pokemon-search",type:"text",onChange:this.showPokemonResults,id:"pokemon-search-bar",placeholder:"Search for a pokemon..."}),this.returnMappedImages()))),o.a.createElement(h.a,{path:"/pokeinfo/:name",component:b}),o.a.createElement(h.a,{path:"/error",component:E}))):o.a.createElement(f,null)}}]),t}(n.Component);var N=function(){return o.a.createElement(O,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));document.getElementById("root").style.backgroundColor="red",i.a.render(o.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[24,1,2]]]);
//# sourceMappingURL=main.1788a973.chunk.js.map