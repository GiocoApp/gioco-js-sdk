class Gioco
  constructor: (token) ->
    @options =
      url: 'http://localhost:3000/api/',
      headers:
        token: if window.giocoSettings then window.giocoSettings.token else token

  getResource: (aid) ->
    params =
      url: 'get_resource.json',
    @sendRequest(params, aid, 'get')

  getRanking: (size=100, batch=1) ->
    data = {size: size, batch: batch}
    params =
      url: 'ranking/retrieve.json',
      data: data
    @sendRequest(params, null, 'get')

  trackEvent: (name, aid) ->
    data = {event:{name:name}}
    params =
      url: 'track_event.json',
      data: data
    @sendRequest(params, aid, 'post')

  mountResourceRequest: (data, aid) ->
    data    = if data==undefined then {} else data
    acookie = @getCookie('gioco_user_cookie')

    if aid && acookie
      data.resource = {aid:aid, acookie: acookie}
    else if aid && !acookie
      data.resource = {aid:aid}
    else
      acookie ||= @createCookie('gioco_user_cookie', @rand())
      data.resource = {acookie: acookie}
    data

  sendRequest: (params, aid, type) ->
    if window.XMLHttpRequest
      xmlhttp = new XMLHttpRequest()
    else
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")

    params.url  = @options.url + params.url
    params.data = @mountResourceRequest(params.data, aid)

    if type == 'get'
      xmlhttp.open(type, params.url + '?' + @convertToRequest(params.data), false);
      xmlhttp.setRequestHeader("Token", @options.headers.token);
      xmlhttp.send();
    else if type == 'post'
      xmlhttp.open(type, params.url, false);
      xmlhttp.setRequestHeader("Token", @options.headers.token);
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify(params.data));

    if xmlhttp.readyState==4 && xmlhttp.status==200
      JSON.parse xmlhttp.responseText

  createCookie: (name, value, days) ->
    if days
      date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = "; expires=" + date.toGMTString();
    else
      expires = ""

    document.cookie = name + "=" + value + expires + "; path=/";

  getCookie: (c_name) ->
    if document.cookie.length > 0
      c_start = document.cookie.indexOf(c_name + "=")
      if c_start != -1
        c_start = c_start + c_name.length + 1
        c_end   = document.cookie.indexOf(";", c_start)
        if c_end == -1
          c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end));
    return null

  convertToRequest: (content) ->
    request  = ""
    for key, val of content
      if key == 'resource' || key == 'event'
        for subkey, subval of val
          request += "#{key}[#{subkey}]=#{subval}&"
      else
        request += "#{key}=#{val}&"
    return request

  rand: ->
    CryptoJS.MD5(Math.random().toString(36).substr(2) + navigator["appCodeName"] + navigator["appName"] + navigator["appVersion"] + navigator["userAgent"] + navigator["platform"] + Math.random().toString(36).substr(2)).toString()