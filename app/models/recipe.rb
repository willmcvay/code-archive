class Recipe < ActiveRecord::Base
  attr_accessible :cuisine, :image, :name, :steps, :ingredient_ids
  has_and_belongs_to_many :ingredients
end
