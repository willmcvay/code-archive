class Recipe < ActiveRecord::Base
  mount_uploader :recipe_image, RecipeImageUploader
  attr_accessible :cuisine, :image, :name, :steps, :ingredient_ids, :recipe_image, :ingredients_recipes_attributes
  has_many :ingredients_recipes, dependent: :destroy
  has_many :ingredients, through: :ingredients_recipes
  accepts_nested_attributes_for :ingredients_recipes, allow_destroy: true
end

