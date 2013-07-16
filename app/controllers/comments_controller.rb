class CommentsController < ApplicationController

before_filter :authenticate
  def index
    @comments = Comment.all
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def new
    @comment = Comment.new
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(params[:comment])
    @comment.save
    redirect_to comments_path
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
    redirect_to comments_path
  end
end
