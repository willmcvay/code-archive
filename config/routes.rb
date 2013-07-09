Cookingbook::Application.routes.draw do

get '/login', to: 'sessions#new'
resources :sessions, only: [:new, :create, :destroy]
resources :users
resources :recipes
resources :ingredients
resources :recipes_ingredients

  # get '/home', to: "home#index"
  # get '/ingredients', to: "ingredients#index"
  # get '/recipes', to: "recipes#index"

  root to: 'home#home'
end
