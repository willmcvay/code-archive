Bandsite::Application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root to: "home#home"
  
  resources :posts do 
    get 'page/:page', action: :index, on: :collection
    get :photo, on: :member
    resources :post_comments
  end

  get 'music', to: 'musics#show'
  get 'press', to: 'press#show'
  get 'dates', to: 'tour#show'
  get 'friends', to: 'friends#index'
  get 'treasure_chest', to: 'rewards#index'
  get 'contact', to: 'contacts#index'

  resources :photos
  resources :comments
  end

