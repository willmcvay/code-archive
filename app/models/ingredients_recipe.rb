class IngredientsRecipe < ActiveRecord::Base
  belongs_to :ingredient
  belongs_to :recipe

  attr_accessible :quantity, :ingredient_id

  validates :ingredient_id, uniqueness: { scope: :recipe_id }

end
