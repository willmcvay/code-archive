class FanMailer < ActionMailer::Base
  default from: "<<email address here>>"

  def registration_confirmation(fan)
    mail(:to => fan.email, :subject => "Registration Confirmation")
  end
end
