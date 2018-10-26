class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.string :title
      t.text :url
      t.text :feed_url
      t.text :etag
      t.datetime :last_modified

      t.timestamps
    end
  end
end
