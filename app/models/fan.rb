class Fan
  include Mongoid::Document
  field :email, type: String
  field :password, type: String
  field :role, type: String
end
