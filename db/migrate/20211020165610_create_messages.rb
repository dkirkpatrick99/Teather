class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer :user_id, null: false
      t.integer :parent_id
      t.text :body
      t.integer :channel_id, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
    end
  end
end
