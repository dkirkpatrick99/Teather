class AddNameAndEmailToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :formal_name, :string
    add_column :users, :email, :string
    add_index :users, :email
  end
end
