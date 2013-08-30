class PostCommentsController < ApplicationController

  def create
    @post_comment = PostComment.create(params[:post_comment])
      respond_to do |format|  
        @post_comment.save  
        # format.html { redirect_to(post_path(params[:post_id]) }  
        format.js  
    end
  end
end