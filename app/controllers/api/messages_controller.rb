class Api::MessagesController < ApplicationController

        before_action :require_logged_in

    def index
        if params[:channelId]
            @messages = Channel.find_by(id: params[:channelId]).messages
            render :index
        else 
            @messages = Direct.find_by(id: params[:directId]).messages
            render :index
        end

    end

    def show
        @message = Message.find(params[:id])
        render :show
    end

    def create
        # THIS METHOD INTENTIONALLY LEFT BLANK
        # Messages created via Action Cable websocket
    end

    # def update
    #     @message = Message.find(params[:id])
    #     if @message.update_attributes(message_params)
    #         broadcastEdit(formatEdit(@message))
    #         render :show
    #         # broadcastEdit(@message) # If you use this method, you'll need to pass the Message by id instead of jsut teh edits you made?
    #     else
    #         render json: ['Sorry, your update did not work.'], status: 400
    #     end
    # end

    private 
    def message_params
        params.require(:message).permit(:body, :messageable_id, :messageable_type, :user_id)
    end

end
