class Review
  include Mongoid::Document
  field :title, type: String
  field :content, type: String
  field :photo, type: String
  has_many :comments, class_name: "ReviewComment"
  accepts_nested_attributes_for :comments
  validates_associated :comments
end
