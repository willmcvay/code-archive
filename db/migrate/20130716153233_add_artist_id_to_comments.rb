class AddArtistIdToComments < ActiveRecord::Migration
  def change
     add_column :comments, :artist_id, :integer
  end
end
