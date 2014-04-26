SenseCamp::Application.routes.draw do

  get "contact", to: 'static_pages#contact'

  # mount Rich::Engine => '/rich', :as => 'rich'

  devise_for :users

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root to: "home#home"

  resources :posts do
    get 'page/:page', action: :index, on: :collection
    get :photo, on: :member
    resources :post_comments
  end

  resources :speakers do
    get :photo, on: :member
  end

  resources :events do
    get :photo, on: :member
    resources :event_comments
  end

  get 'reviews', to: 'reviews#index'
  get 'sense_camps', to: 'sense_camps#index'
  get 'speakers', to: 'speakers#index'
  get 'tickets', to: 'tickets#index'
  get 'make_senses', to: 'make_senses#index'

  resources :comments
end

