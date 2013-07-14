class Mix < ActiveRecord::Base
  attr_accessible :description, :djname, :genre, :image, :mix, :artist_id
  belongs_to :artist
end
