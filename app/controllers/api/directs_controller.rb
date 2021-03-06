class Api::DirectsController < ApplicationController
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
  def index
    if params[:id] == "all"
      @directs = Direct.all
      render :index
    else
      @directs = User.find(params[:id]).directs
      render :index
    end
  end
  def show
    @direct = Direct.find(params[:id])
    render :show
  end

  def destroy
    @direct = Direct.find(params[:id])
    @direct.destroy
    broadcastNewUserAll(current_user)
    # broadcastNewDirect(Direct.first, current_user.id)
    render :show
  end

  private 
  def direct_params
    params.require(:direct).permit(:invitedUsers)
  end
  def broadcastNewMembership(membership)
    ActionCable.server.broadcast "notifications_#{membership.user_id}", {membership: membership, type: 'membershipAdd'}
  end
  def broadcastNewDirect(direct, user)
    ActionCable.server.broadcast "notifications_#{user}", {directId: direct.id, type: 'directAdd'}
  end
  def broadcastNewUserAll(user)
    ActionCable.server.broadcast "notifications_all", {userId: user.id, type: 'userAdd'}
  end
end
