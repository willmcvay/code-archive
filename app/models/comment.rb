class Comment < ActiveRecord::Base
  attr_accessible :comment, :djname, :artist_id, :mix_id
  belongs_to :artist
  belongs_to :mix
end
