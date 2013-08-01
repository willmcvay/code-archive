class User < ActiveRecord::Base

  has_many :feeds, through: :feed_user
  has_many :entries, through: :entry_user

  attr_accessible :bio, :email, :first_name, :last_name, :photo, :role
end
