class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.integer "admin_id", null: false
      t.string "name", null: false
      t.string "description"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
    add_index :channels, :admin_id
  end
end
