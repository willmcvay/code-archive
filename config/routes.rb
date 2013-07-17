Dj::Application.routes.draw do

get '/login', to: 'sessions#new'
resources :sessions, only: [:new, :create, :destroy]
resources :users
resources :comments, except: [:new] do
  # get '/:artist_id/', action: 'new', as: '', on: :new
  # get '/:comment_id/', action: 'new', as: '', on: :new

end
resources :mixes
resources :artists
root to: 'home#home'

end
