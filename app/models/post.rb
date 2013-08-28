require 'carrierwave/mongoid'
class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :content, type: String
  field :photo, type: String
  mount_uploader :photo, PhotoUploader
  embeds_many :comments
  accepts_nested_attributes_for :comments
  validates_associated :comments
end
