class AddDmAndPrivateToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :is_private, :boolean, default: false, null: false
    add_column :channels, :is_dm, :boolean, default: false, null: false
  end
end
