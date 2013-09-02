class FanMailer < ActionMailer::Base
  default from: "gwyneth@gwynethherbert.com"

  def registration_confirmation(fan)
    mail(:to => fan.email, :subject => "Registration Confirmation")
  end
end
