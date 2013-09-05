class Gig
  include Mongoid::Timestamps
  include Mongoid::Document
  field :town, type: String
  field :gigdate, type: String
  field :venue, type: String
  field :address, type: String
  field :price, type: String
  field :contactvenue, type: String
  field :box_office_link, type: String
end
