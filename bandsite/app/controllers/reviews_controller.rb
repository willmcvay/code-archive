class ReviewsController < ApplicationController
  
  def index
    @reviews = Review.asc(:created_at).page params[:page]
    @comment = Comment.new
  end

  def show
    @review = Review.find(params[:id])
    @comment = ReviewComment.new 
  end

  def photo
    content = @review.photo.read
    if stale?(etag: content, last_modified: @review.updated_at.utc, public: true)
      send_data content, type: @review.photo.file.content_type, disposition: "inline"
      expires_in 0, public: true
    end
  end
end
