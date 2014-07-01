// Generated by CoffeeScript 1.7.1
var Gioco;

Gioco = (function() {
  function Gioco(token) {
    this.options = {
      url: 'http://app.gioco.pro/api',
      headers: {
        token: token
      }
    };
  }

  Gioco.prototype.getResource = function(aid) {
    var params;
    params = {
      url: '/resource/get_resource.json'
    };
    return this.sendRequest(params, aid, 'get');
  };

  Gioco.prototype.addBagde = function(name, aid) {
    var params;
    params = {
      url: '/resource/add_badge.json',
      data: {
        badge: {
          name: name
        }
      }
    };
    return this.sendRequest(params, aid, 'post');
  };

  Gioco.prototype.removeBagde = function(name, aid) {
    var params;
    params = {
      url: '/resource/remove_badge.json',
      data: {
        badge: {
          name: name
        }
      }
    };
    return this.sendRequest(params, aid, 'delete');
  };

  Gioco.prototype.addPoints = function(points, aid) {
    var params;
    params = {
      url: '/resource/add_points.json',
      data: {
        points: points
      }
    };
    return this.sendRequest(params, aid, post);
  };

  Gioco.prototype.removePoints = function(points, aid) {
    var params;
    params = {
      url: '/resource/remove_points.json',
      data: {
        points: points
      }
    };
    return this.sendRequest(params, aid, 'delete');
  };

  Gioco.prototype.addLevel = function(levels, aid) {
    var params;
    params = {
      url: '/resource/add_level.json',
      data: {
        levels: levels
      }
    };
    return this.sendRequest(params, aid('post'));
  };

  Gioco.prototype.removeLevel = function(levels, aid) {
    var params;
    params = {
      url: '/resource/remove_level.json',
      data: {
        levels: levels
      }
    };
    return this.sendRequest(params, aid, 'delete');
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
    params.data = this.mountResourceRequest(params.data, aid);
    params.headers = {
      Token: this.options.headers.token
    };
    return $.ajax(params);
  };

  return Gioco;

})();
