class Track
  include Mongoid::Document
  field :song, type: String
  field :name, type: String
  has_many :fans
  accepts_nested_attributes_for :fans
  validates_associated :fans
  belongs_to :album
  has_many :comments, class_name: "TrackComment"
  accepts_nested_attributes_for :comments
  validates_associated :comments
end
