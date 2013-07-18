class Artist < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  mount_uploader :wallpaper, WallpaperUploader
  attr_accessible :biog, :djname, :facebook, :image, :location, :soundcloud, :twitter, :wallpaper, :mix_ids, :comment_ids, :genre, :user_id
  has_many :comments
  has_many :mixes
  belongs_to :user
end
