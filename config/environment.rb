# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
SenseCamp::Application.initialize!

  ActionMailer::Base.smtp_settings = {
  :address => 'smtp.sendgrid.net',
  :port => '587',
  :authentication => :plain,
  :user_name => ENV['SENDGRID_USERNAME'],
  :password => ENV['SENDGRID_PASSWORD'],
  :domain => 'heroku.com',
  :enable_starttls_auto => true
}


ENV['MONGOHQ_ENV'] = "mongodb://heroku:zC9baZEHGuTcvcV9y3KHk8b7TagYYgDXbf21kbMACE1c5bojsW7ihaz05su_pfidp-KK-dHZ0VuP-35JvZh6gA@lennon.mongohq.com:10072/app24493903"
