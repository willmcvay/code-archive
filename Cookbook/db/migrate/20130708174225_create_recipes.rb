class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :steps
      t.string :cuisine
      t.string :image

      t.timestamps
    end
  end
end
