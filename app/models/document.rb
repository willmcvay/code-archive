require 'carrierwave/mongoid'

class Document

  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :attachment, type: String
  field :live, type: String
  has_and_belongs_to_many :fans
  mount_uploader :attachment, TrackUploader
end
