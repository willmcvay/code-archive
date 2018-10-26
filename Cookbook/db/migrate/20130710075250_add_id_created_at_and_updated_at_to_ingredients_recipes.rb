class AddIdCreatedAtAndUpdatedAtToIngredientsRecipes < ActiveRecord::Migration
  def up
    add_column :ingredients_recipes, :id, :primary_key
    add_column :ingredients_recipes, :created_at, :datetime
    add_column :ingredients_recipes, :updated_at, :datetime
    add_column :ingredients_recipes, :quantity, :string

    IngredientsRecipe.all.each do |ig|
      ig.created_at = Time.now
      ig.updated_at = ig.created_at
      ig.save
    end

    change_column :ingredients_recipes, :created_at, :datetime, null: false
    change_column :ingredients_recipes, :updated_at, :datetime, null: false
  end

  def down
    remove_column :ingredients_recipes, :id
    remove_column :ingredients_recipes, :created_at
    remove_column :ingredients_recipes, :updated_at
  end
end


class IngredientsRecipe < ActiveRecord::Base
end