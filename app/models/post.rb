class Post
  mount_uploader :photo, PhotoUploader
  attr_accessible :photo, :photo_cache
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :content, type: String
  field :photo, type: String
  

end
