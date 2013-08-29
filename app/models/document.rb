class Document
  include Mongoid::Document
  field :name, type: String
  field :attachment, type: String
  has_many :fans
  accepts_nested_attributes_for :fans
  validates_associated :fans
end
