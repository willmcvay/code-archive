class AddFieldsToMixes < ActiveRecord::Migration
  def change
    add_column :mixes, :mixname, :string
  end
end
