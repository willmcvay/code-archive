class Entry < ActiveRecord::Base

  belongs_to :feed
  has_many :users, through: :entry_user
  

  attr_accessible :author, :categories, :content, :feed_id, :published, :summary, :title, :url

end
