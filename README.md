# Teather

**Teather** is a web-based instant-messaging application that improves workplace communication and collaboration. A live demo is available at https://teather-together.herokuapp.com/#/
 
## Tech/Framework Used
**Teather** was built with
+ Ruby on Rails
+ React/Redux
+ JavaScript
+ Action Cable for WebSockets.


## Features
+ Live messaging
<!-- + Message editing -->
+ Create, browse, and join channels for topic-based discussion
+ Privacy feature on channels for protection of sensitive discussions
+ Direct messaging between individuals and groups
+ Online presence status

## Feature Highlights
Live messaging

<!-- ![alt text](https://media.giphy.com/media/TKRVyMb5SxLxAgwLMP/giphy.gif "sample conversation") -->

<!-- Live message editing

![alt text](https://media.giphy.com/media/l2ExAAkcFEbtl2WRpS/giphy.gif "sample conversation") -->

*./app/controllers/api/directs_controller.rb*
```ruby
  def create
    @direct = Direct.new(direct_params)
    @direct.name = "Direct Message";
    stack_bot = User.find_by(username: "stack_bot")
    if @direct.save
      params[:direct][:invitedUsersIds].each do |userId|
        @membership = Membership.create(user_id: userId.to_i, memberable_id: @direct.id, memberable_type: Direct)
        broadcastNewMembership(@membership)
        broadcastNewDirect(@direct, @membership.user_id)
      end
      Message.create(user_id: stack_bot.id, body: "Direct messages have started", messageable_id: @direct.id, messageable_type: Direct)
      render :show
    else
      render json: @direct.errors.full_messages, status: 422
    end
  end
```
```ruby
  def broadcastNewDirect(direct, user)
    ActionCable.server.broadcast "notifications_#{user}", {directId: direct.id, type: 'directAdd'}
  end
```
*./app/channels/chat_direct.rb*
```ruby
  def subscribed
    direct = Direct.find(params[:id].to_i).id
    stream_for direct
  end
```
## Future Features
+ Video Chat
+ Notifications
+ Internet connection loss handling
+ Emoji reactions 🎉

## How To Use
+ Clone git locally
+ Run npm install and bundle install
+ rails s and npm start to start the server
+ Open separate sessions in browser using incognito mode to highlight instant messaging