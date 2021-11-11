class RemoveChannelAndParentFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :channel_id
    remove_column :messages, :parent_id
  end
end
