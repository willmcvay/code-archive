class Artist < ActiveRecord::Base
  attr_accessible :biog, :djname, :facebook, :image, :location, :soundcloud, :twitter, :wallpaper
end
