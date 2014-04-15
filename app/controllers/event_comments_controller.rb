class EventCommentsController < ApplicationController

  def create
    @event_comment = EventComment.create(params[:event_comment])
      respond_to do |format|  
        @event_comment.save 
        format.js  
    end
  end
end