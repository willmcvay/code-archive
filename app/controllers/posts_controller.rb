class PostsController < ApplicationController

def index
    @posts = Post.asc(:created_at).page params[:page]
    @comment = Comment.new
  end

  def show
    @post = Post.find(params[:id])
    @comment = Comment.new

    end
  

  def photo
    content = @post.photo.read
    if stale?(etag: content, last_modified: @post.updated_at.utc, public: true)
      send_data content, type: @post.photo.file.content_type, disposition: "inline"
      expires_in 0, public: true
    end
  end


  def new
    @post = Post.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(params[:post])

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render json: @post, status: :created, location: @post }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end
end