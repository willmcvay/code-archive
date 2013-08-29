class Track
  include Mongoid::Document
  field :song, type: String
  field :name, type: String
end
