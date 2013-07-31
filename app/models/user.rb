class User < ActiveRecord::Base
  has_secure_password
  validates :djname, presence: true, uniqueness: true

  attr_accessible :djname,
                        :email,
                        :password,
                        :password_confirmation,
                         :artist_id,
                         :role

  has_one :artist
  has_one :mix

  def role?(role)
    self.role == role.to_s
  end
end

