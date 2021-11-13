class ReplaceMemerableFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :memberable_id
    remove_column :messages, :memberable_type
    add_column :messages, :messageable_id, :integer, null:false
    add_column :messages, :messageable_type, :string, null:false
    add_index :messages, :messageable_id

  end
end
