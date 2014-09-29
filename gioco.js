// Generated by CoffeeScript 1.7.1
var Gioco;

Gioco = (function() {
  function Gioco(token) {
    this.options = {
      url: 'http://app.gioco.pro/api/',
      headers: {
        token: token
      }
    };
  }

  Gioco.prototype.getResource = function(aid) {
    var params;
    params = {
      url: 'get_resource.json'
    };
    return this.sendRequest(params, aid, 'get');
  };

  Gioco.prototype.getRanking = function() {
    var params;
    params = {
      url: 'ranking/retrieve.json'
    };
    return this.sendRequest(params, null, 'get');
  };

  Gioco.prototype.trackEvent = function(name, aid) {
    var data, params;
    data = {
      event: {
        name: name
      }
    };
    params = {
      url: 'track_event.json',
      data: data
    };
    return this.sendRequest(params, aid, 'post');
  };

  Gioco.prototype.mountResourceRequest = function(data, aid) {
    data = data === void 0 ? {} : data;
    data.resource = {
      aid: aid
    };
    return data;
  };

  Gioco.prototype.sendRequest = function(params, aid, type) {
    params.url = this.options.url + params.url;
    params.type = type;
    if (aid) {
      params.data = this.mountResourceRequest(params.data, aid);
    }
    params.headers = {
      Token: this.options.headers.token
    };
    return $.ajax(params);
  };

  return Gioco;

})();
