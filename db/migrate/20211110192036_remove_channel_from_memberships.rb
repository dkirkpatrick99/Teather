class RemoveChannelFromMemberships < ActiveRecord::Migration[5.2]
  def change
    remove_column :memberships, :channel_id
  end
end
