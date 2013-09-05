require 'carrierwave/mongoid'
class Fan
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable, :confirmable

  # :rememberable, :trackable,

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :documents_attributes, :photo_id, :song, :album_id, :track_id, :comments_attributes, :name
  # :remember_me

  ## Database authenticatable
  field :email,              :type => String, :default => ""
  field :encrypted_password, :type => String, :default => ""

  ## Recoverable
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time

  ## Rememberable
  # field :remember_created_at, :type => Time

  ## Trackable
  # field :sign_in_count,      :type => Integer, :default => 0
  # field :current_sign_in_at, :type => Time
  # field :last_sign_in_at,    :type => Time
  # field :current_sign_in_ip, :type => String
  # field :last_sign_in_ip,    :type => String

  ## Confirmable
  field :confirmation_token,   :type => String
  field :confirmed_at,         :type => Time
  field :confirmation_sent_at, :type => Time
  field :unconfirmed_email,    :type => String

  ## Lockable
  # field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  # field :locked_at,       :type => Time

  ## Token authenticatable
  # field :authentication_token, :type => String
  field :email, type: String
  field :password, type: String
  field :role, type: String
  field :name, type: String
  ROLES = ["standard", "premium", "turbo", "mega", "daddy"]
  has_and_belongs_to_many :documents
  accepts_nested_attributes_for :documents
  validates_associated :documents
  belongs_to :photo
  belongs_to :track
  belongs_to :album
  has_many :comments, class_name: "FanComment"
  accepts_nested_attributes_for :comments
  validates_associated :comments
  mount_uploader :song, TrackUploader

  before_validation :set_default_role


  def password_required? 
    false 
  end 


private
def set_default_role
  self.role ||= "standard"
end





end

