class FansController < ApplicationController

before_filter :authenticate_fan!


  def index
    @documents = Document.all
    @fans = Fan.all
    @comments = FanComment.all
    @comment = FanComment.new 
  end

  protected

  def after_sign_in_path_for(resource) 
    redirect_to fans_path
  end

end
