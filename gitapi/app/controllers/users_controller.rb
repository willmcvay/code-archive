class UsersController < ApplicationController 
  
  def index
    @gitapi = Gitapi.new params[:search]
  end
end