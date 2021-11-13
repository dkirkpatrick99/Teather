class AddMemerableToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :memberable_id, :integer, null:false
    add_column :messages, :memberable_type, :string, null:false
    add_index :messages, :memberable_id
    add_index :messages, :user_id
  end
end
