require 'carrierwave/mongoid'
class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :content, type: String
  field :photo, type: String
  mount_uploader :photo, PhotoUploader
  has_many :comments, class_name: "PostComment"
  accepts_nested_attributes_for :comments
  validates_associated :comments
end
