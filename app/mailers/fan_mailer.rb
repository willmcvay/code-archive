class FanMailer < ActionMailer::Base
  default from: "ashley@squarerootsgardens.com"

  def registration_confirmation(fan)
    mail(:to => fan.email, :subject => "Registration Confirmation")
  end
end
