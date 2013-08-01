class AddGuidToEntrys < ActiveRecord::Migration
  def change
    add_column :entries, :guid, :text
  end
end
