class AddMixIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :mix_id, :integer
  end
end
