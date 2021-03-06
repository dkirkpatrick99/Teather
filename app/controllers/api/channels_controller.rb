class Api::ChannelsController < ApplicationController

  def create
    @channel = Channel.new(channel_params)
    @channel.admin_id = current_user.id
    stack_bot = User.find_by(username: "stack_bot")
    if @channel.save
      broadcastNewChannelAll(@channel)
      params[:channel][:invitedUsersIds].each do |userId|
        @membership = Membership.create(user_id: userId.to_i, memberable_id: @channel.id, memberable_type: Channel)
        broadcastNewMembership(@membership)
      end
    Message.create(user_id: stack_bot.id, body: "Channel messages have started", messageable_id: @channel.id, messageable_type: Channel)

      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    @channel = Channel.find(params[:id])
    if @channel
      render :show
    else
      render json: ['Sorry, that channel does not exist.'], status: 404  
    end

  end

  def index
    @channels = Channel.all
    render :index
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update_attributes(channel_params)
      render :show
    else
      render json: ['Sorry, your update did not work.'], status: 400   
    end

  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    broadcastNewUserAll(current_user)
    # @channel = Channel.find_by(name: "Global")
    # broadcastNewChannelAll(@channel)
    render :show
  end

  private 
  def channel_params
    params.require(:channel).permit(:name, :description, :is_private)
  end
 def broadcastNewMembership(membership)
    ActionCable.server.broadcast "notifications_#{membership.user_id}", {membership: membership, type: 'membershipAdd'}
  end
  # def broadcastNewChannel(channel, user)
  #   ActionCable.server.broadcast "notifications_#{user}", {channelId: channel.id, type: 'channelAdd'}
  # end
  def broadcastNewChannelAll(channel)
    ActionCable.server.broadcast "notifications_all", {channelId: channel.id, type: 'channelAdd'}
  end

  def broadcastNewUserAll(user)
    ActionCable.server.broadcast "notifications_all", {userId: user.id, type: 'userAdd'}
  end

  def broadcastNewUserAll(user)
    ActionCable.server.broadcast "notifications_all", {userId: user.id, type: 'userAdd'}
  end

end


