json.extract! message, :body, :id, :user_id, :messageable_id, :messageable_type, :user_id, :created_at, :updated_at
json.username message.user.username
json.formal_name message.user.formal_name
