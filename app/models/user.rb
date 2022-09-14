# frozen_string_literal: true

class User < ApplicationRecord
  MAXIMUM_NAME_LENGTH = 255
  validates :name, presence: true, length: { maximum: MAXIMUM_NAME_LENGTH }
end
