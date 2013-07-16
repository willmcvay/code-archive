class Mix < ActiveRecord::Base
  mount_uploader :mix, MixUploader
  mount_uploader :image, ImageUploader
  attr_accessible :description, :djname, :genre, :image, :mix, :artist_id, :comment_id
  belongs_to :artist
  has_many :comments
end
