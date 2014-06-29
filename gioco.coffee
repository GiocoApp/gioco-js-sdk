class Gioco
  constructor: (token) ->
    @options =
      url: 'http://localhost:3000/api',
      headers:
        token: token

  getResource: (aid) ->
    params =
      url: '/resource/get_resource.json',
    @sendRequest(params, aid, 'get')

  addBagde: (name, aid) ->
    params =
      url: '/resource/add_badge.json',
      data: {badge:{name:name}}
    @sendRequest(params, aid, 'post')

  removeBagde: (name, aid) ->
    params =
      url: '/resource/remove_badge.json',
      data: {badge:{name:name}}
    @sendRequest(params, aid, 'delete')

  addPoints: (points, aid) ->
    params =
      url: '/resource/add_points.json',
      data: {points:points}
    @sendRequest(params, aid, post)

  removePoints: (points, aid) ->
    params =
      url: '/resource/remove_points.json',
      data: {points:points}
    @sendRequest(params, aid, 'delete')

  addLevel: (levels, aid) ->
    params =
      url: '/resource/add_level.json',
      data: {levels:levels}
    @sendRequest(params, aid 'post')

  removeLevel: (levels, aid) ->
    params =
      url: '/resource/remove_level.json',
      data: {levels:levels}
    @sendRequest(params, aid, 'delete')

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