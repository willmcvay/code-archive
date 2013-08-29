class Document
  include Mongoid::Document
  field :name, type: String
  field :attachment, type: String
end
