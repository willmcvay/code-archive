require 'carrierwave/mongoid'
class Photo
  include Mongoid::Document
  field :name, type: String
  field :photo, type: String
  field :photo, type: String
  mount_uploader :photo, PhotoUploader
  has_many :fans
  accepts_nested_attributes_for :fans
  validates_associated :fans
  belongs_to :album
end
