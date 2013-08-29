class Photo
  include Mongoid::Document
  field :name, type: String
  field :photo, type: String
end
