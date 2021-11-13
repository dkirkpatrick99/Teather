class AddMemerableToMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :memberships, :memberable_id, :integer, null:false
    add_column :memberships, :memberable_type, :string, null:false
    add_index :memberships, [:user_id, :memberable_id]
  end
end
