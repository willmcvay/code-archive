require 'carrierwave/mongoid'
class Document
  include Mongoid::Document
  field :name, type: String
  field :album, type: String
  field :attachment, type: String
  has_and_belongs_to_many :fans
  mount_uploader :attachment, TrackUploader
end
