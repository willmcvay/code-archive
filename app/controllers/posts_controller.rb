class PostsController < ApplicationController

  def index
    @posts = Post.desc(:created_at).page params[:page]
    @comment = Comment.new
  end

  def show
    @post = Post.find(params[:id])
    @comment = PostComment.new 
    
  end

  def photo
    content = @post.photo.read
    if stale?(etag: content, last_modified: @post.updated_at.utc, public: true)
      send_data content, type: @post.photo.file.content_type, disposition: "inline"
      expires_in 0, public: true
    end
  end
end