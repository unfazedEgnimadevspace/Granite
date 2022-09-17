# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      name: "Akalugo Daniel", email: "akalugidaniel@gmail.com", password: "welcome",
      password_confirmation: "welcome")
  end

  def test_user_should_not_be_valid_or_saved_without_a_name
    @user.name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Name can't be blank"
  end

  def test_user_name_should_be_of_valid_length
    @user.name = "a" * (User::MAXIMUM_NAME_LENGTH + 1)
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Name is too long (maximum is 35 characters)"
  end

  def test_user_email_should_be_valid_before_being_saved
    @user.email = ""
    assert @user.invalid?

    @user.save

    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_email_unique_constraints_is_been_followed
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_user_email_length_constraint_is_not_exceeded
    @user.email = "a" * User::MAXIMUM_EMAIL_LENGTH + "@test.com"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email is too long (maximum is 255 characters)"
  end

  def test_right_emails_are_accepted
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
      first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_wrong_emails_should_not_be_accepted
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
      @sam-sam.com sam@sam+exam.com fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_users_email_should_be_stored_in_lowercase
    upper_email = "SAM@EXAMPLE.COM"
    @user.email = upper_email
    @user.save!
    assert_equal @user.email, upper_email.downcase!
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  def test_user_should_have_matching_password_and_password_confirmation
    @user.password_confirmation = "#{@user.password}-random"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end

  def test_users_should_have_unique_auth_token
    @user.save!
    second_user = User.create!(
      name: "Olive Sans", email: "olive@example.com",
      password: "welcome", password_confirmation: "welcome")

    assert_not_same @user.authentication_token, second_user.authentication_token
  end
end
