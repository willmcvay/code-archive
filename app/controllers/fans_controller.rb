class FansController < ApplicationController

  def index
    @comment = Comment.new
  end

  def show
    @fan = Fan.find(params[:id])
    @comment = FanComment.new 
  end
end
