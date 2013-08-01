class Feed < ActiveRecord::Base

  has_many :entries
  has_many :users, through: :feed_user

  attr_accessible :etag, :feed_url, :last_modified, :title, :url
end
