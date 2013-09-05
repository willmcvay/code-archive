require 'carrierwave/mongoid'

class Track

  include Mongoid::Document
  include Mongoid::Timestamps
  field :song, type: String
  field :name, type: String
  field :lyrics, type: String
  field :track_number, type: String

  belongs_to :album

  mount_uploader :song, TrackUploader

end
