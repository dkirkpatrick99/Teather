json.extract! membership, :id, :user_id, :memberable_id, :memberable_type
if membership.memberable_type == 'Channel'
  json.privacy membership.memberable.is_private
  json.name membership.memberable.name
else
  usernames = []
  membership.memberable.users.each do |user|
    if user != current_user
      usernames.push(user.username)
    end
  end
  json.name usernames.join(', ')
  json.size usernames.length
end