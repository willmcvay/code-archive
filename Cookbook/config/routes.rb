Cookingbook::Application.routes.draw do

get '/login', to: 'sessions#new'
resources :sessions, only: [:new, :create, :destroy]
resources :users
resources :recipes do
    collection do
      match 'search', to: 'recipes#search', via: [:get, :post], as: :search
    end
  end

resources :ingredients
resources :recipes_ingredients

root to: 'home#home'
end



