require 'carrierwave/mongoid'
class Post
  # attr_accessible :photo, :photo_cache
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :content, type: String
  field :photo, type: String
  mount_uploader :photo, PhotoUploader
  

end
