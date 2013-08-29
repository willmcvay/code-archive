class Gig
  include Mongoid::Document
  field :title, type: String
  field :gigdate, type: Time
  field :venue, type: String
  field :address, type: String
  field :price, type: String
end
