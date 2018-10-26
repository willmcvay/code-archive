class Friend
  include Mongoid::Document
  field :title, type: String
  field :content, type: String
  field :photo, type: String
end
