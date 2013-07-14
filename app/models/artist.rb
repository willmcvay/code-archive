class Artist < ActiveRecord::Base
  attr_accessible :biog, :djname, :facebook, :image, :location, :soundcloud, :twitter, :wallpaper, :mix_ids, :comment_ids
  has_many :comment_ids, :mix_ids
end
