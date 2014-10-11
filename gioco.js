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
    var acookie;
    data = data === void 0 ? {} : data;
    acookie = this.getCookie('gioco_user_cookie');
    if (aid && acookie) {
      data.resource = {
        aid: aid,
        acookie: acookie
      };
    } else if (aid && !acookie) {
      data.resource = {
        aid: aid
      };
    } else {
      acookie || (acookie = this.createCookie('gioco_user_cookie', this.rand()));
      data.resource = {
        acookie: acookie
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

  Gioco.prototype.createCookie = function(name, value, days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    return document.cookie = name + "=" + value + expires + "; path=/";
  };

  Gioco.prototype.getCookie = function(c_name) {
    var c_end, c_start;
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
    }
    return null;
  };

  Gioco.prototype.rand = function() {
    return CryptoJS.MD5(Math.random().toString(36).substr(2) + navigator["appCodeName"] + navigator["appName"] + navigator["appVersion"] + navigator["userAgent"] + navigator["platform"] + Math.random().toString(36).substr(2)).toString();
  };

  return Gioco;

})();
