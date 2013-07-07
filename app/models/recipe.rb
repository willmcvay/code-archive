class Recipe < ActiveRecord::Base
  belongs_to :ingredients
  belongs_to :pictures
  attr_accessible :food_type, :name, :steps, :ingredients_id, :pictures_id
end
