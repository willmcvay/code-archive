SquareRootsGardens::Application.routes.draw do

  mount Rich::Engine => '/rich', :as => 'rich'

  devise_for :users

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  root to: "home#home"
  
  resources :posts do 
    get 'page/:page', action: :index, on: :collection
    get :photo, on: :member
    resources :post_comments
  end

  get 'photogallery', to: 'photogallerys#index'

  resources :comments
end

