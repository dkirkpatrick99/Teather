json.extract! user, :id, :username, :formal_name, :email, :online
channels = []
json.channels user.channels do |channel|
  channels.push(channel.id)
end

memberships = []
json.memberships user.memberships do |membership|
  memberships.push(membership)
end
json.channel_ids channels
json.user_memberships memberships