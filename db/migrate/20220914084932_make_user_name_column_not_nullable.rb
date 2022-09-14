# frozen_string_literal: true

class MakeUserNameColumnNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :name, false
  end
end
