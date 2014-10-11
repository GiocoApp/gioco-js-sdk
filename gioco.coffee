class Gioco
  constructor: (token) ->
    @options =
      url: 'https://app.gioco.pro/api/',
      headers:
        token: token

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
    params.url     = @options.url + params.url
    params.type    = type
    params.data    = @mountResourceRequest(params.data, aid)
    params.headers = {Token: @options.headers.token}
    $.ajax params

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

  rand: ->
    CryptoJS.MD5(Math.random().toString(36).substr(2) + navigator["appCodeName"] + navigator["appName"] + navigator["appVersion"] + navigator["userAgent"] + navigator["platform"] + Math.random().toString(36).substr(2)).toString()
