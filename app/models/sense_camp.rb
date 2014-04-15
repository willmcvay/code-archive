class SenseCamp
  include Mongoid::Document
  include Mongoid::Timestamps

  field :info, type: String
  field :detail, type: String
end
