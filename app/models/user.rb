# frozen_string_literal: true

class User < ApplicationRecord
  has_many :assigned_task, class_name: "Task", foreign_key: :assigned_user_id
  MAXIMUM_NAME_LENGTH = 255
  validates :name, presence: true, length: { maximum: MAXIMUM_NAME_LENGTH }
end
