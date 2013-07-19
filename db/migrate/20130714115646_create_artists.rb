class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :djname
      t.string :image
      t.text :biog
      t.string :location
      t.string :wallpaper
      t.string :twitter
      t.string :soundcloud
      t.string :facebook

      t.timestamps
    end
  end
end
