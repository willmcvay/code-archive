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
    get :song, on: :member
    resources :track_comments
  end

  resources :albums do
    get :photo, on: :member
  end

  resources :fans do
    resources :fan_comments
  end

  resources :friends do
    get :photo, on: :member
  end

  resources :reviews do
    get :photo, on: :member
    resources :review_comments
  end

  get 'musics', to: 'musics#index'
  get 'reviews', to: 'reviews#index'
  get 'gigs', to: 'gigs#index'
  get 'friends', to: 'friends#index'
  get 'treasure_chest', to: 'fans#index'
  get 'contacts', to: 'contacts#index'
  get 'photogallery', to: 'photogallerys#index'

  resources :comments
end

