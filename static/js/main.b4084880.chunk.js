(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(7),i=a.n(s),o=(a(15),a(1)),c=a(2),l=a(4),u=a(3),d=a(5),m=(a(16),function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={expanded:!1},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"toggle",value:function(){this.setState({expanded:!this.state.expanded}),console.log("toggle")}},{key:"render",value:function(){var e,t=this;if(this.state.expanded){var a="";for(var n in this.props.artist.genres)a+=this.props.artist.genres[n]+", ";e=r.a.createElement("div",{className:"expanded_artist"},r.a.createElement("section",{className:"img_box"},r.a.createElement("img",{src:this.props.artist.images[0].url})),r.a.createElement("div",{className:"artist_details"},r.a.createElement("h1",{id:"expanded_title"},this.props.artist.name),r.a.createElement("p",{id:"expand_details"},"Number of followers: ",this.props.artist.followers.total),r.a.createElement("p",{id:"expand_details"},"Genres: ",a),r.a.createElement("p",{id:"expand_details"},r.a.createElement("a",{href:this.props.artist.external_urls.spotify},r.a.createElement("span",null,"View the artists Spotify page")))))}else e=r.a.createElement("div",{className:"unexpanded_artist_title"},r.a.createElement("p",null,this.props.artist.name));return r.a.createElement("div",{className:"Artist",onClick:function(){return t.toggle()}},e)}}]),t}(r.a.Component)),p=a(8),h=new(a.n(p).a),g=function(e){function t(){var e;Object(o.a)(this,t);var a=(e=Object(l.a)(this,Object(u.a)(t).call(this))).getHashParams().access_token;return a&&(console.log("got token"),h.setAccessToken(a)),e.state={loggedIn:!!a,nowPlaying:{name:"Not Checked",albumArt:""},topArtists:[]},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"getHashParams",value:function(){for(var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);e=a.exec(n);)t[e[1]]=decodeURIComponent(e[2]);return t}},{key:"getData",value:function(){var e=this;this.state.loggedIn&&h.getMyTopArtists({time_range:"long_term"}).then(function(t){return e.setState({topArtists:t.items})})}},{key:"getArtistPictures",value:function(){var e="";if(this.state.loggedIn){for(var t=this.state.topArtists,a=[],n=0;n<t.length;n++)a.push(t[n].images[0].url);e=a.map(function(e){return r.a.createElement("img",{src:e})})}return e}},{key:"makeArtists",value:function(){return this.state.topArtists.map(function(e){return r.a.createElement(m,{artist:e})})}},{key:"generateRandomString",value:function(e){for(var t="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)t+=a.charAt(Math.floor(Math.random()*a.length));return t}},{key:"redirect",value:function(){var e=this.generateRandomString(16);localStorage.setItem("spotify_auth_state",e);var t="https://accounts.spotify.com/authorize";t+="?response_type=token",t+="&client_id="+encodeURIComponent("d8c9e8ca3c784898bdf939f51ff6136f"),t+="&scope="+encodeURIComponent("user-read-private user-read-email"),t+="&redirect_uri="+encodeURIComponent("http://localhost:3000"),t+="&state="+encodeURIComponent(e),window.location=t}},{key:"render",value:function(){var e,t=this;return this.state.loggedIn?(this.getData(),e=this.makeArtists()):e=r.a.createElement("button",{type:"button",onClick:function(){return t.redirect()}},"View my top artists"),r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement("h1",{id:"main_title"},"Statify"),r.a.createElement("h2",{id:"sub_title"},"View your top spotify artists!")),e)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.b4084880.chunk.js.map