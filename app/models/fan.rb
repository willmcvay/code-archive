class Fan
  include Mongoid::Document
  field :email, type: String
  field :password, type: String
  field :role, type: String
  ROLES = ["standard", "premium", "turbo", "mega", "daddy"]
  belongs_to :document
  belongs_to :photo
  belongs_to :track
  belongs_to :album
  has_many :comments, class_name: "FanComment"
  accepts_nested_attributes_for :comments
  validates_associated :comments
end

