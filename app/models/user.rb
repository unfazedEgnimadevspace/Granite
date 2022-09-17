# frozen_string_literal: true

class User < ApplicationRecord
  has_many :assigned_task, class_name: "Task", foreign_key: :assigned_user_id
  has_many :created_tasks, class_name: "Task", foreign_key: :task_owner_id
  before_destroy :assign_task_to_task_owner
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
  has_secure_password
  has_secure_token :authentication_token
  MAXIMUM_NAME_LENGTH = 35
  MAXIMUM_EMAIL_LENGTH = 255
  validates :name, presence: true, length: { maximum: MAXIMUM_NAME_LENGTH }
  validates :email, presence: true, length: { maximum: MAXIMUM_EMAIL_LENGTH }, format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end

    def assign_task_to_task_owner
      task_whose_owner_is_not_current_user = assigned_tasks.select { |task| task.task_owner_id != id }
      task_whose_owner_is_not_current_user.each do |task|
        task.update(assigned_user_id: task.task_owner_id)
      end
    end
end
