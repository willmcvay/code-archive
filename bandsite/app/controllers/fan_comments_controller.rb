class FanCommentsController < ApplicationController

  def create
    @fan_comment = FanComment.create(params[:fan_comment])
      
      respond_to do |format|  
      @fan_comment.save 
      format.js  
    end
  end
end