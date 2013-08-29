class Album
  include Mongoid::Document
  field :name, type: String
  field :photo, type: String
  has_many :fans
  accepts_nested_attributes_for :fans
  validates_associated :fans
  has_many :tracks
  accepts_nested_attributes_for :tracks
  validates_associated :tracks
end
