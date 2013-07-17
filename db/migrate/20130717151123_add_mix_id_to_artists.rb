class AddMixIdToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :mix_id, :integer
  end
end
