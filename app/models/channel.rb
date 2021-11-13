# == Schema Information
#
# Table name: channels
#
#  id          :bigint           not null, primary key
#  admin_id    :integer          not null
#  name        :string           not null
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Channel < ApplicationRecord
  validates :name, :admin_id, presence: true
  validates :name, uniqueness: true
  validates_inclusion_of :is_private, :in => [true, false]


  has_many :memberships, as: :memberable, dependent: :destroy
  has_many :users, through: :memberships
  belongs_to :user,
    foreign_key: :admin_id,
    primary_key: :id

  has_many :messages, as: :messageable, dependent: :destroy


    # validates :name, presence: true
    # validates :admin_id, presence: true
    # # validates :is_dm, :is_private, inclusion: { in: [true, false] }
    
    # belongs_to :admin,
    # foreign_key: :admin_id,
    # class_name: :User
    
    # has_many :memberships,
    # foreign_key: :channel_id,
    # class_name: :Membership
    
    # has_many :messages,
    # foreign_key: :channel_id,
    # class_name: :Message
    
    # # Through association for users using memberships table
    # has_many :users,
    #     through: :memberships,
    #     source: :user

end
