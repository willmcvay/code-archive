class ReviewCommentsController < ApplicationController

  def create
    @review_comment = ReviewComment.create(params[:review_comment])
    respond_to do |format|  
        @review_comment.save  
        format.js  
    end
  end
end

