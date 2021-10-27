# App.chat = App.cable.subscriptions.create "ChatChannel",
#   connected: ->
#     # Called when the subscription is ready for use on the server
#     console.log("Connected to Chat-Channel...")
#   disconnected: ->
#     # Called when the subscription has been terminated by the server

#   received: (data) ->
#     console.log(data)
#     # Called when there's incoming data on the websocket for this channel