class Mix < ActiveRecord::Base
  attr_accessible :description, :djname, :genre, :image, :mix, :artist_id, :comment_id
  belongs_to :artist
  has_many :comments
end
