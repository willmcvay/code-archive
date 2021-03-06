class Gig
  include Mongoid::Document
  include Mongoid::Timestamps

  field :town, type: String
  field :gigdate, type: String
  field :venue, type: String
  field :address, type: String
  field :price, type: String
  field :contactvenue, type: String
  field :box_office_link, type: String
end
