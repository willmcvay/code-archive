require 'carrierwave/mongoid'

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

  has_many :comments, class_name: "AlbumComment"
  accepts_nested_attributes_for :comments
  validates_associated :comments

  mount_uploader :photo, PhotoUploader
  
end
