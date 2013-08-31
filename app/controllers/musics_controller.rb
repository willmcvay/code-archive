class MusicsController < ApplicationController

  def index
    @albums = Album.all
    @tracks = Track.all
  end

  def show
    @album = Album.find(params[:id])
    @track = Track.find(params[:id])
    @comment = AlbumComment.new 
  end

  def photo
    content = @album.photo.read
    if stale?(etag: content, last_modified: @album.updated_at.utc, public: true)
      send_data content, type: @album.photo.file.content_type, disposition: "inline"
      expires_in 0, public: true
    end
  end
end