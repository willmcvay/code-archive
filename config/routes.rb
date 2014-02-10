Cards::Application.routes.draw do

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root to: "home#home"
  resources :scores
  
end
