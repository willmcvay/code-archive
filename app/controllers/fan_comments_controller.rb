class FanCommentsController < ApplicationController

  def create
    @fanComment = FanComment.create(params[:fan_comment])
    redirect_to fan_path(params[:fan_id])
  end
end