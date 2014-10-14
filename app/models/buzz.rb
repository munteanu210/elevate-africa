# == Schema Information
#
# Table name: buzzes
#
#  id         :integer          not null, primary key
#  created_at :datetime
#  updated_at :datetime
#  content    :text
#  admin_id   :integer
#  video_link :string(255)
#  headline   :string(255)
#  subhead    :string(255)
#  picture    :string(255)
#  box_size   :integer          default(1)
#  box_color  :string(255)
#

class Buzz < ActiveRecord::Base

  BOX_SIZE_SELECT = [['1 square wide', 1], ['2 squares wide', 2], ['3 squares wide', 3]]
  BOX_COLORS = ["#F8991E", "#FFC953", "#AAAAAA"]
  belongs_to :admin

  validates :headline, presence: true
  validates :subhead, presence: true
  validates :content, presence: true

  mount_uploader :picture, PictureUploader

  before_create :assign_color

  def get_date
    created_at.strftime("%b %d, %Y")
  end

  def assign_color
    self.box_color = BOX_COLORS.shuffle.min do |color1, color2|
      Buzz.where(box_color: color1).count <=> Buzz.where(box_color: color2).count
    end
  end
end
