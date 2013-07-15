Dj::Application.routes.draw do

get '/login', to: 'sessions#new'
resources :sessions, only: [:new, :create, :destroy]
resources :users
resources :comments
resources :mixs
resources :artists
root to: 'home#home'

end
