class User < ActiveRecord::Base
  attr_accessible :djname, :email, :password, :password_confirmation
  has_secure_password validates :djname, presence: true, uniquness: true
end

