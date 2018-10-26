class PostCommentsController < ApplicationController

  def create
    @post_comment = PostComment.create(params[:post_comment])
      respond_to do |format|  
        @post_comment.save 
        format.js  
    end
  end

 
end