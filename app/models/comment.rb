class Comment < ActiveRecord::Base
  attr_accessible :comment, :djname, :artist_id
  belongs_to :artist
end
