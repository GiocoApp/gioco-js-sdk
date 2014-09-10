class Gioco
  constructor: (token) ->
    @options =
      url: 'http://app.gioco.pro/api/',
      headers:
        token: token

  getResource: (aid) ->
    params =
      url: 'get_resource.json',
    @sendRequest(params, aid, 'get')

  trackEvent: (name, aid) ->
    data = {event:{name:name}}
    params =
      url: 'track_event.json',
      data: data
    @sendRequest(params, aid, 'post')

  mountResourceRequest: (data, aid) ->
    data = if data==undefined then {} else data
    data.resource = {aid:aid}
    data

  sendRequest: (params, aid, type) ->
    params.url     = @options.url + params.url
    params.type    = type
    params.data    = @mountResourceRequest(params.data, aid)
    params.headers = {Token: @options.headers.token}
    $.ajax params
