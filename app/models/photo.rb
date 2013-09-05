require 'carrierwave/mongoid'
class Photo
  include Mongoid::Document
   include Mongoid::Timestamps
  field :name, type: String
  field :photo, type: String
  mount_uploader :photo, PhotoUploader
end
