class FansController < ApplicationController

before_filter :authenticate_fan!

  protected

  def after_sign_in_path_for(resource) 
    redirect_to fans_path
  end

  def index
    @comment = Comment.new
  end

  def show
    @fan = Fan.find(params[:id])
    @comment = FanComment.new 
  end


end
