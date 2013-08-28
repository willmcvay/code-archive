class PostCommentsController < ApplicationController

  def create
    @postComment = PostComment.create(params[:post_comment])
    redirect_to post_path(params[:post_id])
  end
end