json.extract! channel, :admin_id, :name, :description, :is_private, :id, :created_at
json.admin channel.user.username
messages = []
channel.messages.each do |message|
  messages.push(message.id)
end
users = []
channel.users.each do |user|
  users.push(user.id)
end
json.message_ids = messages
json.user_ids = users
