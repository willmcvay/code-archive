require 'carrierwave/mongoid'

class Track

  include Mongoid::Document

  field :song, type: String
  field :name, type: String

  has_many :fans
  accepts_nested_attributes_for :fans
  validates_associated :fans

  belongs_to :album

  mount_uploader :song, TrackUploader

end
