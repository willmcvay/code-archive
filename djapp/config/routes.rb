Dj::Application.routes.draw do

get '/login', to: 'sessions#new'
resources :sessions, only: [:new, :create, :destroy]
resources :users
resources :comments, except: [:new] do
end

resources :mixes
resources :artists
root to: 'home#home'
get '/permission_denied', to: 'home#warning', as: :warning
end
