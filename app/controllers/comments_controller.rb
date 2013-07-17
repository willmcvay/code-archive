class CommentsController < ApplicationController

before_filter :authenticate
  def index
    @comments = Comment.all
  end

  def show
    @comment = Comment.find(params[:id])
  end


  def edit
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(params[:comment])
    @comment.save

    if @comment.artist_id
      redirect_to artist_path(@comment.artist)
    elsif @comment.mix_id
      redirect_to mix_path(@comment.mix)
    else
      redirect_to root_url, notice: "This shouldn't happen!"
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update_attributes(params[:comment])
    @comment.save
    redirect_to comments_path
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
       if @comment.artist_id
      redirect_to artist_path(@comment.artist)
    elsif @comment.mix_id
      redirect_to mix_path(@comment.mix)
    end
  end
end
