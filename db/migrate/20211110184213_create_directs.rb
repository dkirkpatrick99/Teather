class CreateDirects < ActiveRecord::Migration[5.2]
  def change
    create_table :directs do |t|
      t.integer :admin_id
      t.integer :reciever_id
      t.string :name, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.timestamps
    end
  end
end
