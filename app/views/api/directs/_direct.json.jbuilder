json.extract! direct, :id, :created_at
messages = []
last_message = 0
direct.messages.each do |message|
  messages.push(message.id)
  last_message = message.created_at.to_time.to_i
end
users = []
usernames = []
direct.users.each do |user|
    users.push({user_id: user.id, onlineStatus: user.online})
  if user != current_user
    usernames.push(user.username)
  end
end
json.message_ids messages
json.user_ids users
json.name usernames.join(', ')
json.last_activity last_message