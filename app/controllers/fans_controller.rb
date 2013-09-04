class FansController < ApplicationController


before_filter :authenticate_fan!


  def index
    # @current_fan = current_fan.params[:id]
    @fans = Fan.all
   @albums = Album.all
   @tracks = Track.all
  end

  def show
    @album = Albums.find(params[:id])
    @track = Track.find(params[:id])
    @comment = FanComment.new 
  end

  protected

  def after_sign_in_path_for(resource) 
    redirect_to fans_path
  end

end
