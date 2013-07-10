class Recipe < ActiveRecord::Base
  mount_uploader :recipe_image, RecipeImageUploader
  attr_accessible :cuisine, :image, :name, :steps, :ingredient_ids, :recipe_image
  has_and_belongs_to_many :ingredients
end
