var Gioco;

Gioco = (function() {
  function Gioco(token) {
    this.options = {
      url: 'https://app.gioco.pro/api/',
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

  Gioco.prototype.getRanking = function(size, batch) {
    var data, params;
    if (size == null) {
      size = 100;
    }
    if (batch == null) {
      batch = 1;
    }
    data = {
      size: size,
      batch: batch
    };
    params = {
      url: 'ranking/retrieve.json',
      data: data
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
    if (aid) {
      data.resource = {
        aid: aid
      };
    }
    return data;
  };

  Gioco.prototype.sendRequest = function(params, aid, type) {
    params.url = this.options.url + params.url;
    params.type = type;
    params.data = this.mountResourceRequest(params.data, aid);
    params.headers = {
      Token: this.options.headers.token
    };
    return $.ajax(params);
  };

  return Gioco;

})();
