class HomeController < ApplicationController

  def home
  	@photos = Photo.all
  	@post = Post.all
  end

    def post_photo
    	content = @post.photo.read
	    if stale?(etag: content, last_modified: @post.updated_at.utc, public: true)
	      send_data content, type: @post.photo.file.content_type, disposition: "inline"
	      expires_in 0, public: true
	    end
  	end
end