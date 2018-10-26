class CreateFeedUsers < ActiveRecord::Migration
  def change
    create_table :feed_users do |t|
      t.integer :feed_id
      t.integer :user_id
      t.string :tag
      t.boolean :private

      t.timestamps
    end
  end
end
