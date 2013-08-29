class AlbumCommentsController < ApplicationController

  def create
    @albumComment = AlbumComment.create(params[:album_comment])
    redirect_to album_path(params[:album_id])
  end
end