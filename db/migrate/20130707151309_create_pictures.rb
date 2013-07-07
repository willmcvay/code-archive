class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :pictures

      t.timestamps
    end
  end
end
