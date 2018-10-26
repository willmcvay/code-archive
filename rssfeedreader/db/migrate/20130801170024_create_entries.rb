class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :title
      t.text :url
      t.text :author
      t.text :summary
      t.text :content
      t.datetime :published
      t.text :categories
      t.integer :feed_id

      t.timestamps
    end
  end
end
