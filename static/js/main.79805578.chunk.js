(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(7),i=n.n(r),s=(n(15),n(1)),l=n(2),c=n(4),u=n(3),m=n(5),d=(n(16),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={expanded:!1},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"toggle",value:function(){this.setState({expanded:!this.state.expanded}),console.log("toggle inner")}},{key:"render",value:function(){var e,t=this;if(this.state.expanded){var n="";for(var a in this.props.artist.genres)n+=this.props.artist.genres[a]+", ";e=o.a.createElement("div",{className:"expanded_artist"},o.a.createElement("section",{className:"img_box"},o.a.createElement("img",{src:this.props.artist.images[0].url})),o.a.createElement("div",{className:"artist_details"},o.a.createElement("h1",{id:"expanded_title"},this.props.artist.name),o.a.createElement("p",{id:"expand_details"},"Followers: ",this.props.artist.followers.total),o.a.createElement("p",{id:"expand_details"},"Genres: ",n)),o.a.createElement("a",{id:"spotify_link_button",href:this.props.artist.external_urls.spotify,target:"blank",title:"Go to artist's spotify page"},o.a.createElement("i",{className:"fa fa-spotify fa-2x"})))}else e=o.a.createElement("div",{className:"unexpanded_artist_title"},o.a.createElement("p",null,this.props.artist.name));return o.a.createElement("div",{className:"Artist",onClick:function(){return t.toggle()}},e)}}]),t}(o.a.Component)),h=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"login_container"},o.a.createElement("h1",{id:"main_title"},"Statify"),o.a.createElement("p",{className:"login_info_text"},"This application uses your spotify user listening information to provide statistics on your top artists. Spotify's own login service is used for authentication. To find out your listening info click the button below and log in to your account."),o.a.createElement("button",{className:"login_button buttonDefault",onClick:this.props.redirect},"GO TO SPOTIFY LOGIN"))}}]),t}(o.a.Component),f=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("footer",{id:"main_footer"},o.a.createElement("p",null,"Created by ",o.a.createElement("a",{href:"#"},"Jake Good")),o.a.createElement("a",null,o.a.createElement("i",{className:"fa fa-github"})),o.a.createElement("a",null,o.a.createElement("i",{className:"fa fa-person"})))}}]),t}(o.a.Component),p=n(8),g=new(n.n(p).a),v=function(e){function t(){var e;Object(s.a)(this,t);var n=(e=Object(c.a)(this,Object(u.a)(t).call(this))).getHashParams().access_token;return n&&(console.log("got token"),g.setAccessToken(n)),e.state={loggedIn:!!n,nowPlaying:{name:"Not Checked",albumArt:""},topArtists:[],nresults:"50",time_range:"short_term",expand_all:!1},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"getHashParams",value:function(){for(var e,t={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);e=n.exec(a);)t[e[1]]=decodeURIComponent(e[2]);return t}},{key:"getData",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.time_range;this.state.loggedIn&&g.getMyTopArtists({time_range:t,limit:this.state.nresults}).then(function(t){return e.setState({topArtists:t.items})}),console.log("api call")}},{key:"getArtistPictures",value:function(){var e="";if(this.state.loggedIn){for(var t=this.state.topArtists,n=[],a=0;a<t.length;a++)n.push(t[a].images[0].url);e=n.map(function(e){return o.a.createElement("img",{src:e})})}return e}},{key:"makeArtists",value:function(){return this.state.topArtists.map(function(e){return o.a.createElement(d,{artist:e})})}},{key:"toggle",value:function(){this.setState({expand_all:!this.state.expand_all})}},{key:"generateRandomString",value:function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<e;a++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}},{key:"handleResults",value:function(e){this.setState({time_range:e}),this.getData(e)}},{key:"scrollFunction",value:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}},{key:"componentDidMount",value:function(){var e=this;Object({NODE_ENV:"production",PUBLIC_URL:"/Statify"}).BROWSER&&document.addEventListener("scroll",function(t){return e._handleOnScrollDocument(t)},!0)}},{key:"redirect",value:function(){var e=window.location.href,t=this.generateRandomString(16);localStorage.setItem("spotify_auth_state",t);var n="https://accounts.spotify.com/authorize";n+="?response_type=token",n+="&client_id="+encodeURIComponent("d8c9e8ca3c784898bdf939f51ff6136f"),n+="&scope="+encodeURIComponent("user-top-read"),n+="&redirect_uri="+encodeURIComponent(e),n+="&state="+encodeURIComponent(t),window.location=n}},{key:"logout",value:function(){window.location.hash="",this.setState({loggedIn:!1})}},{key:"render",value:function(){var e,t,n,a=this;return console.log("re render"),this.state.loggedIn?(e=this.makeArtists(this.state.expand_all),t=o.a.createElement("header",null,o.a.createElement("div",{className:"headerDiv"},o.a.createElement("h1",{id:"main_title"},"Statify"),o.a.createElement("button",{className:"buttonInverse logoutButton",onClick:function(){return a.logout()}},"Log out")),o.a.createElement("h2",{id:"sub_title"},"How recent do you want your statistics?"),o.a.createElement("div",{className:"button_container"},o.a.createElement("button",{className:"buttonDefault",onClick:function(){return a.handleResults("short_term")}},"1 month"),o.a.createElement("button",{className:"buttonDefault",onClick:function(){return a.handleResults("medium_term")}},"3 months"),o.a.createElement("button",{className:"buttonDefault",onClick:function(){return a.handleResults("long_term")}},"Several years")),n)):e=o.a.createElement("div",null,o.a.createElement(h,{redirect:function(){return a.redirect()}})),(document.body.scrollTop>20||document.documentElement.scrollTop>20)&&(n=o.a.createElement("button",{title:"Return to top ",className:"expand_button",onClick:function(){return a.scrollFunction()}},o.a.createElement("i",{className:"fa fa-angle-up fa-2x"})),console.log("scrolled")),o.a.createElement("div",{className:"App"},t,e,o.a.createElement(f,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(17);i.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.79805578.chunk.js.map