Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :update, :destroy, :show]
    resource :session, only: [:create, :destroy, :update, :show]
    resources :channels, only: [:create, :index, :show, :destroy, :update] 
    resources :messages, only: [:create, :index, :show, :update]
    resources :memberships, only: [:create, :index, :destroy, :show]
    resources :directs, only: [:create, :index, :show]
  end
  
  mount ActionCable.server, at: '/cable'

end
