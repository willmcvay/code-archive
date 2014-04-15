class EventsController < ApplicationController
  
  def index
    @events = Event.asc(:created_at).page params[:page]
    @comment = Comment.new
  end

  def show
    @event = Event.find(params[:id])
    @comment = EventComment.new 
  end

  def photo
    content = @event.photo.read
    if stale?(etag: content, last_modified: @event.updated_at.utc, public: true)
      send_data content, type: @event.photo.file.content_type, disposition: "inline"
      expires_in 0, public: true
    end
  end
end
