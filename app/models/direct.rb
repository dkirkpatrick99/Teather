class Direct < ApplicationRecord
  validates :name, presence: true
#   NUMBER_OF_PERMITTED_MEMBERSHIPS = 9;
  has_many :memberships, as: :memberable, dependent: :destroy
  has_many :users, through: :memberships
  has_many :messages, as: :messageable, dependent: :destroy

#   def validate_user_limit(memberhip)
#     raise Exception.new if memberhips.size >= NUMBER_OF_PERMITTED_MEMBERSHIPS
#   end
end
