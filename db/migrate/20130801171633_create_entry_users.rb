class CreateEntryUsers < ActiveRecord::Migration
  def change
    create_table :entry_users do |t|
      t.integer :entry_id
      t.integer :user_id
      t.boolean :read
      t.boolean :favourite
      t.boolean :archive

      t.timestamps
    end
  end
end
