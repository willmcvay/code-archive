class Ingredient < ActiveRecord::Base
  attr_accessible :ingredients
  has_many :recipes
end
