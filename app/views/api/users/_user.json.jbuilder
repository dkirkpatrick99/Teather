json.extract! user, :id, :username, :formal_name, :email, :online
channels = []
json.channels user.channels do |channel|
  channels.push(channel.id)
end
json.channel_ids = channels