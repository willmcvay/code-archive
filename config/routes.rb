Bandsite::Application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root to: "home#home"
  
  resources :posts do 
    get 'page/:page', action: :index, on: :collection
    get :photo, on: :member
  end

  resources :photos
  resources :comments
  end

