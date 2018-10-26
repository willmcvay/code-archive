class CreateMixes < ActiveRecord::Migration
  def change
    create_table :mixes do |t|
      t.references :artist
      t.string :mix
      t.string :genre
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
