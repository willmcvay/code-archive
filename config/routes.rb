Dj::Application.routes.draw do

resources :comments
resources :mixs
resources :artists
root to: 'home#home'

end
