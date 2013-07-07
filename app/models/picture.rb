class Picture < ActiveRecord::Base
  attr_accessible :pictures
  has_many :recipes
end
