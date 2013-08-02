class Feed < ActiveRecord::Base

  has_many :entries
  has_many :users, through: :feed_user
  validates_uniqueness_of :feed_url
  attr_accessible :etag, :feed_url, :last_modified, :title, :url

  def create_feed(url)
    return RSSReader.new.create_rss_feed(url)
  end
end
