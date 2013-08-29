class Photoalbum
  include Mongoid::Document
  field :name, type: String
  has_many :fans
  accepts_nested_attributes_for :fans
  validates_associated :fans
  has_many :photos
  accepts_nested_attributes_for :photos
  validates_associated :photos
end
