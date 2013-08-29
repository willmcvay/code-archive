Bandsite::Application.routes.draw do
  devise_for :users
  devise_for :fans

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root to: "home#home"
  
  resources :posts do 
    get 'page/:page', action: :index, on: :collection
    get :photo, on: :member
    resources :post_comments
  end

  resources :tracks do
    resources :track_comments
  end

  resources :albums do
    get :photo, on: :member
  end

  resources :fans do
    get :photo, on: :member
    resources :fan_comments
  end

  resources :reviews do
    get :photo, on: :member
    resources :review_comments
  end

  get 'music', to: 'musics#show'
  get 'press', to: 'press#show'
  get 'dates', to: 'tour#show'
  get 'friends', to: 'friends#index'
  get 'treasure_chest', to: 'rewards#index'
  get 'contact', to: 'contacts#index'
  get 'photogallery', to: 'photogallerys#index'

  resources :comments
end

