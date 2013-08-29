class ReviewCommentsController < ApplicationController

  def create
    @reviewComment = ReviewComment.create(params[:review_comment])
    redirect_to review_path(params[:review_id])
  end
end